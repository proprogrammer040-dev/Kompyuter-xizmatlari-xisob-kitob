// BUSINESS PRO — server (Node.js + Express + PostgreSQL). Railway uchun tayyor.
"use strict";
const path = require("path");
const crypto = require("crypto");
const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error("XATO: DATABASE_URL o'rnatilmagan (Railway → Variables → ${{Postgres.DATABASE_URL}})"); process.exit(1); }
let JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  JWT_SECRET = crypto.randomBytes(32).toString("hex");
  console.warn("OGOHLANTIRISH: JWT_SECRET o'rnatilmagan — vaqtinchalik kalit ishlatilmoqda. Server qayta ishga tushsa hamma qaytadan kirishi kerak bo'ladi.");
}

// Railway ichki tarmog'i (*.railway.internal) SSL talab qilmaydi; tashqi ulanish uchun SSL yoqiladi
const useSSL = process.env.PGSSL === "1" || (!/railway\.internal|localhost|127\.0\.0\.1/.test(DATABASE_URL) && process.env.PGSSL !== "0");
const pool = new Pool({ connectionString: DATABASE_URL, ssl: useSSL ? { rejectUnauthorized: false } : false, max: 10 });

const COLS = new Set(["services", "stock", "debts", "sales", "expenses", "payments", "stockIn", "archive", "meta"]);
const ALWAYS = ["services", "stock", "archive", "meta", "debts"]; // sana bo'yicha cheklanmaydigan to'plamlar

async function migrate() {
  await pool.query(`
    create table if not exists users(
      id serial primary key, email text unique not null, pass text not null,
      created_at timestamptz default now());
    create sequence if not exists rec_seq;
    create table if not exists records(
      shop_id int not null references users(id) on delete cascade,
      col text not null, id text not null, data jsonb, date text,
      deleted boolean not null default false,
      seq bigint not null default nextval('rec_seq'),
      primary key(shop_id, col, id));
    create index if not exists records_shop_seq on records(shop_id, seq);
    create index if not exists records_shop_date on records(shop_id, col, date);
    create table if not exists applied_ops(
      shop_id int not null, op_id text not null, at timestamptz default now(),
      primary key(shop_id, op_id));
  `);
}

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(express.json({ limit: "8mb" }));
app.use((req, res, next) => {
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Referrer-Policy", "same-origin");
  next();
});

/* ---------- Oddiy cheklov (parolni taxmin qilishga qarshi) ---------- */
const hits = new Map();
function limit(max, windowMs) {
  return (req, res, next) => {
    const k = req.ip + req.path, now = Date.now();
    const h = (hits.get(k) || []).filter(t => now - t < windowMs);
    if (h.length >= max) return res.status(429).json({ error: "Juda ko'p urinish. 10 daqiqadan keyin qayta urining" });
    h.push(now); hits.set(k, h); next();
  };
}
setInterval(() => { const now = Date.now(); for (const [k, v] of hits) if (!v.some(t => now - t < 600000)) hits.delete(k); }, 600000).unref();

/* ---------- Avtorizatsiya ---------- */
const sign = u => jwt.sign({ uid: u.id, email: u.email }, JWT_SECRET, { expiresIn: "180d" });
function auth(req, res, next) {
  const h = req.headers.authorization || "";
  const t = h.startsWith("Bearer ") ? h.slice(7) : req.query.token;
  try { req.user = jwt.verify(t, JWT_SECRET); next(); }
  catch { res.status(401).json({ error: "Qaytadan kiring" }); }
}
const normEmail = e => String(e || "").trim().toLowerCase();
const validEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 200;

app.get("/api/health", async (req, res) => {
  try { await pool.query("select 1"); res.json({ ok: true }); } catch { res.status(500).json({ ok: false }); }
});

app.post("/api/register", limit(10, 600000), async (req, res) => {
  const email = normEmail(req.body.email), pass = String(req.body.password || "");
  if (!validEmail(email)) return res.status(400).json({ error: "Email noto'g'ri yozilgan" });
  if (pass.length < 6) return res.status(400).json({ error: "Parol kamida 6 ta belgi bo'lsin" });
  if (process.env.ALLOW_REGISTER === "0") return res.status(403).json({ error: "Yangi hisob ochish o'chirilgan" });
  try {
    const r = await pool.query("insert into users(email,pass) values($1,$2) returning id,email", [email, await bcrypt.hash(pass, 10)]);
    res.json({ token: sign(r.rows[0]), user: r.rows[0] });
  } catch (e) {
    if (e.code === "23505") return res.status(409).json({ error: "Bu email bilan hisob allaqachon bor — «Kirish»ni bosing" });
    console.error(e); res.status(500).json({ error: "Server xatosi" });
  }
});

app.post("/api/login", limit(20, 600000), async (req, res) => {
  const email = normEmail(req.body.email), pass = String(req.body.password || "");
  const r = await pool.query("select id,email,pass from users where email=$1", [email]);
  const u = r.rows[0];
  if (!u || !(await bcrypt.compare(pass, u.pass))) return res.status(401).json({ error: "Email yoki parol noto'g'ri" });
  res.json({ token: sign(u), user: { id: u.id, email: u.email } });
});

app.post("/api/password", auth, limit(10, 600000), async (req, res) => {
  const { old, password } = req.body || {};
  if (String(password || "").length < 6) return res.status(400).json({ error: "Yangi parol kamida 6 ta belgi bo'lsin" });
  const r = await pool.query("select pass from users where id=$1", [req.user.uid]);
  if (!r.rows[0] || !(await bcrypt.compare(String(old || ""), r.rows[0].pass))) return res.status(400).json({ error: "Eski parol noto'g'ri" });
  await pool.query("update users set pass=$1 where id=$2", [await bcrypt.hash(String(password), 10), req.user.uid]);
  res.json({ ok: true });
});

/* ---------- Ma'lumotlar ---------- */
// Birinchi yuklash: joriy va o'tgan oy yozuvlari + doimiy to'plamlar (eski oylar arxivdan)
app.get("/api/bootstrap", auth, async (req, res) => {
  const from = /^\d{4}-\d{2}-\d{2}$/.test(req.query.from || "") ? req.query.from : "0000-00-00";
  const shop = req.user.uid;
  const m = await pool.query("select coalesce(max(seq),0)::text as seq, count(*)::int as n from records where shop_id=$1", [shop]);
  const r = await pool.query(
    `select col,id,data from records where shop_id=$1 and not deleted
       and (col = any($3) or date >= $2)
       and (col <> 'debts' or coalesce((data->>'remaining')::numeric,0) > 0)`,
    [shop, from, ALWAYS]);
  res.json({ seq: m.rows[0].seq, empty: m.rows[0].n === 0, rows: r.rows });
});

// O'zgarishlar: oxirgi ko'rilgan seq dan keyingilari
app.get("/api/sync", auth, async (req, res) => {
  const since = /^\d+$/.test(req.query.since || "") ? req.query.since : "0";
  const r = await pool.query(
    "select col,id,data,deleted,seq::text as seq from records where shop_id=$1 and seq>$2 order by seq limit 2000",
    [req.user.uid, since]);
  const rows = r.rows;
  res.json({ seq: rows.length ? rows[rows.length - 1].seq : since, more: rows.length === 2000, rows });
});

// Yozuvlar: navbatdagi amallar to'plami bitta tranzaksiyada qo'llanadi
app.post("/api/ops", auth, async (req, res) => {
  const ops = Array.isArray(req.body.ops) ? req.body.ops : null;
  if (!ops || ops.length > 500) return res.status(400).json({ error: "Noto'g'ri so'rov" });
  for (const o of ops) {
    if (!o || typeof o.opId !== "string" || o.opId.length > 80 || !["put", "patch", "inc", "del", "settings"].includes(o.op)) return res.status(400).json({ error: "Noto'g'ri amal" });
    if (o.op !== "settings" && (!COLS.has(o.col) || o.col === "meta" || typeof o.id !== "string" || !o.id || o.id.length > 64)) return res.status(400).json({ error: "Noto'g'ri to'plam" });
    if (["put", "patch", "settings"].includes(o.op) && (!o.v || typeof o.v !== "object" || Array.isArray(o.v))) return res.status(400).json({ error: "Noto'g'ri qiymat" });
    if (o.op === "inc" && (!Array.isArray(o.v) || typeof o.v[0] !== "string" || !/^[a-zA-Z_]{1,30}$/.test(o.v[0]) || !Number.isFinite(o.v[1]))) return res.status(400).json({ error: "Noto'g'ri qiymat" });
  }
  const shop = req.user.uid, c = await pool.connect();
  let applied = 0;
  try {
    await c.query("begin");
    await c.query("select pg_advisory_xact_lock($1)", [shop]); // bitta do'kon yozuvlari ketma-ket
    for (const o of ops) {
      const fresh = await c.query("insert into applied_ops(shop_id,op_id) values($1,$2) on conflict do nothing", [shop, o.opId]);
      if (!fresh.rowCount) continue; // allaqachon qo'llangan (qayta yuborilgan)
      applied++;
      if (o.op === "put") {
        const date = typeof o.v.date === "string" ? o.v.date : null;
        await c.query(`insert into records(shop_id,col,id,data,date) values($1,$2,$3,$4,$5)
          on conflict(shop_id,col,id) do update set data=excluded.data, date=excluded.date, deleted=false, seq=nextval('rec_seq')`,
          [shop, o.col, o.id, o.v, date]);
      } else if (o.op === "patch") {
        await c.query(`update records set data=data || $4::jsonb, seq=nextval('rec_seq') where shop_id=$1 and col=$2 and id=$3 and not deleted`,
          [shop, o.col, o.id, o.v]);
      } else if (o.op === "inc") {
        await c.query(`update records set data=jsonb_set(data, array[$4::text], to_jsonb(coalesce((data->>$4)::numeric,0) + $5::numeric)), seq=nextval('rec_seq')
          where shop_id=$1 and col=$2 and id=$3 and not deleted`, [shop, o.col, o.id, o.v[0], o.v[1]]);
      } else if (o.op === "del") {
        await c.query(`update records set deleted=true, data=null, seq=nextval('rec_seq') where shop_id=$1 and col=$2 and id=$3`, [shop, o.col, o.id]);
      } else if (o.op === "settings") {
        await c.query(`insert into records(shop_id,col,id,data) values($1,'meta','settings',$2)
          on conflict(shop_id,col,id) do update set data=coalesce(records.data,'{}'::jsonb) || excluded.data, deleted=false, seq=nextval('rec_seq')`, [shop, o.v]);
      }
    }
    await c.query("commit");
  } catch (e) {
    await c.query("rollback").catch(() => {});
    console.error("ops xatosi:", e.message);
    return res.status(500).json({ error: "Saqlashda server xatosi" });
  } finally { c.release(); }
  if (applied) notify(shop);
  res.json({ ok: true, applied });
});

// To'liq zaxira (barcha oylar)
app.get("/api/export", auth, async (req, res) => {
  const r = await pool.query("select col,id,data from records where shop_id=$1 and not deleted order by seq", [req.user.uid]);
  res.json({ rows: r.rows });
});

/* ---------- Real vaqt: Server-Sent Events ---------- */
const streams = new Map(); // shop_id -> Set(res)
app.get("/api/events", auth, (req, res) => {
  res.set({ "Content-Type": "text/event-stream", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive", "X-Accel-Buffering": "no" });
  res.flushHeaders();
  res.write("retry: 3000\n\n");
  const shop = req.user.uid;
  if (!streams.has(shop)) streams.set(shop, new Set());
  streams.get(shop).add(res);
  const ping = setInterval(() => res.write(": ping\n\n"), 25000);
  req.on("close", () => { clearInterval(ping); const s = streams.get(shop); if (s) { s.delete(res); if (!s.size) streams.delete(shop); } });
});
function notify(shop) {
  const s = streams.get(shop); if (!s) return;
  for (const res of s) res.write("data: changed\n\n");
}

/* ---------- Ilova fayllari ---------- */
app.use(express.static(path.join(__dirname, "public"), {
  setHeaders(res, p) { if (/\.(html|js|json)$/.test(p)) res.set("Cache-Control", "no-cache"); }
}));
app.use("/api", (req, res) => res.status(404).json({ error: "Topilmadi" }));

migrate().then(() => {
  app.listen(PORT, () => console.log(`BUSINESS PRO server ishga tushdi: port ${PORT}`));
}).catch(e => { console.error("Bazaga ulanib bo'lmadi:", e.message); process.exit(1); });
