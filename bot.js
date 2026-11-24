// BUSINESS PRO — Telegram bot (server ichida ishlaydi, kompyuter yoniq bo'lishi shart emas).
// Mijoz faylni yuboradi → nusxa soni → rangli/oq-qora → izoh → telefon → tasdiq.
// Buyurtma bazaga yoziladi va ilovadagi «Buyurtmalar» bo'limida darhol ko'rinadi.
// Sozlash: Railway → Variables → TELEGRAM_BOT_TOKEN (BotFather bergan token).
"use strict";
const crypto = require("crypto");

module.exports = function createBot({ pool, putRecord, getRecord }) {
  const TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
  const API = (process.env.TELEGRAM_API_BASE || "https://api.telegram.org").replace(/\/$/, "");
  const TZ = process.env.SHOP_TZ || "Asia/Tashkent";
  const state = new Map();      // chat → suhbat bosqichi (vaqtinchalik)
  const linkCodes = new Map();  // egani ulash kodlari (15 daqiqa)
  let me = null;
  let shopCache = null;

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const esc = s => String(s ?? "").replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const money = n => Math.round(Number(n) || 0).toLocaleString("ru-RU").replace(/ /g, " ") + " so‘m";
  const nowParts = () => {
    const d = new Date();
    const date = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
    const time = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false }).format(d);
    return { date, time };
  };
  let lastId = 0;
  const uid = () => { const t = Date.now() * 1000 + Math.floor(Math.random() * 1000); lastId = t > lastId ? t : lastId + 1; return lastId; };
  const STATUS = { yangi: "🆕 Yangi", ishlanmoqda: "🖨 Ishlanmoqda", tayyor: "✅ Tayyor", berildi: "📦 Topshirildi", bekor: "❌ Bekor qilingan" };
  const MENU = { keyboard: [[{ text: "🖨 Print buyurtma" }, { text: "📋 Narxlar" }], [{ text: "📦 Buyurtmalarim" }, { text: "📞 Aloqa" }], [{ text: "❓ Qanday buyurtma beriladi" }]], resize_keyboard: true };
  const HOWTO = "📖 <b>Qanday buyurtma beriladi:</b>\n\n" +
    "1️⃣ Chop etiladigan <b>fayl yoki rasmni</b> shu yerga yuboring (📎 tugmasi)\n" +
    "2️⃣ <b>Nusxa sonini</b> tanlang\n" +
    "3️⃣ <b>Rangli</b> yoki <b>oq-qora</b> ekanini tanlang\n" +
    "4️⃣ Kerak bo‘lsa <b>izoh</b> yozing (ikki tomonlama, A3, sahifalar…)\n" +
    "5️⃣ <b>Telefon raqamingizni</b> yuboring — faqat birinchi marta\n" +
    "6️⃣ <b>✅ Tasdiqlash</b> ni bosing\n\n" +
    "Buyurtma tayyor bo‘lganda bot sizga summasi bilan xabar beradi 🔔\n\n" +
    "💡 <i>Rasmni sifatli chop etish uchun uni «Foto» emas, <b>«Fayl»</b> qilib yuboring: 📎 → Fayl.</i>";
  // Majburiy obuna: kanal ilovadagi Sozlamalardan olinadi (30 soniya keshlanadi)
  let setCache = { t: 0, shop: null, v: {} };
  const subCache = new Map();
  async function shopSettings(shop) {
    if (setCache.shop === shop && Date.now() - setCache.t < 30000) return setCache.v;
    const v = (await getRecord(shop, "meta", "settings")) || {};
    setCache = { t: Date.now(), shop, v };
    return v;
  }
  function chanOf(s) {
    let c = String((s && s.tgChannel) || "").trim();
    if (!c) return null;
    c = c.replace(/^https?:\/\//i, "").replace(/^(www\.)?t(elegram)?\.me\//i, "");
    const link = String((s && s.tgChannelLink) || "").trim() || null;
    if (/^-?\d{5,}$/.test(c)) return { id: c, link };
    c = c.replace(/^@/, "").split(/[/?#\s]/)[0];
    if (!/^[A-Za-z][A-Za-z0-9_]{3,}$/.test(c)) return null;
    return { id: "@" + c, link: link || `https://t.me/${c}`, name: "@" + c };
  }
  async function isSubscribed(shop, userId) {
    const ch = chanOf(await shopSettings(shop));
    if (!ch || !userId) return true;
    const c = subCache.get(userId);
    if (c && c > Date.now()) return true;
    try {
      const m = await tg("getChatMember", { chat_id: ch.id, user_id: userId });
      const ok = ["creator", "administrator", "member"].includes(m.status) || (m.status === "restricted" && m.is_member);
      if (ok) subCache.set(userId, Date.now() + 10 * 60000);
      return ok;
    } catch (e) {
      // Kanal noto'g'ri yoki bot admin emas — mijozni to'xtatib qo'ymaymiz
      console.error("Kanal obunasini tekshirib bo'lmadi:", e.message);
      return true;
    }
  }
  async function askSubscribe(chat, shop) {
    const ch = chanOf(await shopSettings(shop));
    const rows = [];
    if (ch && ch.link) rows.push([{ text: "📢 Kanalga o‘tish", url: ch.link }]);
    rows.push([{ text: "✅ Obuna bo‘ldim", callback_data: "sub:check" }]);
    return send(chat, `📢 <b>Botdan foydalanish uchun avval kanalimizga obuna bo‘ling${ch && ch.name ? " (" + esc(ch.name) + ")" : ""}.</b>\n\nKanalda yangiliklar, aksiyalar va chegirmalar bo‘ladi.\nObuna bo‘lgach, pastdagi <b>«✅ Obuna bo‘ldim»</b> tugmasini bosing.`, { reply_markup: { inline_keyboard: rows } });
  }
  async function welcome(chat, name, shop) {
    const s = await shopSettings(shop);
    await send(chat, `Assalomu alaykum, <b>${esc(name)}</b>! 👋\n\n<b>${esc(s.shop || "Kompyuter xizmatlari")}</b> botiga xush kelibsiz.\nPrint, kserokopiya va boshqa xizmatlarga shu yerdan buyurtma bering — navbat kutmasdan!`, { reply_markup: MENU });
    return send(chat, HOWTO, { reply_markup: MENU });
  }

  async function tg(method, body) {
    const r = await fetch(`${API}/bot${TOKEN}/${method}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body || {}) });
    const j = await r.json().catch(() => ({ ok: false, description: "javob o'qilmadi" }));
    if (!j.ok) throw new Error(`${method}: ${j.description || r.status}`);
    return j.result;
  }
  const send = (chat, text, extra = {}) => tg("sendMessage", { chat_id: chat, text, parse_mode: "HTML", disable_web_page_preview: true, ...extra });

  // Bot qaysi do'konga xizmat qiladi: BOT_SHOP_EMAIL yoki birinchi ochilgan hisob
  async function shopId() {
    if (shopCache) return shopCache;
    const e = (process.env.BOT_SHOP_EMAIL || "").trim().toLowerCase();
    const r = e ? await pool.query("select id from users where email=$1", [e]) : await pool.query("select id from users order by id limit 1");
    shopCache = r.rows[0] ? r.rows[0].id : null;
    return shopCache;
  }
  const settings = async shop => (await getRecord(shop, "meta", "settings")) || {};
  const owners = async shop => { const t = await getRecord(shop, "meta", "tg"); return t && Array.isArray(t.owners) ? t.owners : []; };
  async function nextNo(shop) { const r = await pool.query("select count(*)::int n from records where shop_id=$1 and col='orders'", [shop]); return r.rows[0].n + 1; }
  async function getUser(chat) { const r = await pool.query("select phone,name from tg_users where chat_id=$1", [chat]); return r.rows[0] || null; }
  async function saveUser(chat, phone, name) {
    await pool.query(`insert into tg_users(chat_id,phone,name) values($1,$2,$3)
      on conflict(chat_id) do update set phone=coalesce(excluded.phone,tg_users.phone), name=coalesce(excluded.name,tg_users.name), updated_at=now()`, [chat, phone, name]);
  }

  async function handle(u) {
    if (u.callback_query) return onCallback(u.callback_query);
    const m = u.message;
    if (!m || !m.chat || m.chat.type !== "private") return;
    const chat = m.chat.id, from = m.from || {};
    const name = [from.first_name, from.last_name].filter(Boolean).join(" ") || from.username || "Mijoz";
    let st = state.get(chat) || { step: "idle" };
    state.set(chat, st);
    const shop = await shopId();
    if (!shop) return send(chat, "Do‘kon hali sozlanmagan. Keyinroq urinib ko‘ring.");
    const text = (m.text || "").trim();

    // Do'kon egasini ulash havolasi — obunasiz ham ishlaydi
    if (text.startsWith("/start own_")) return linkOwner(chat, text.split(/\s+/)[1].slice(4), name);
    // Majburiy obuna: obuna bo'lmagan mijozga xizmat ko'rsatilmaydi (yuborgan fayli eslab qolinadi)
    if (!(await isSubscribed(shop, from.id))) {
      st.pending = text.startsWith("/start") ? null : m;
      return askSubscribe(chat, shop);
    }
    if (text.startsWith("/start")) { state.set(chat, { step: "idle" }); return welcome(chat, name, shop); }
    if (text === "/help" || text === "❓ Qanday buyurtma beriladi") return send(chat, HOWTO, { reply_markup: MENU });
    if (text === "/narxlar") return prices(chat, shop);
    if (text === "/buyurtmalarim") return myOrders(chat, shop);
    if (m.contact && st.step === "phone") {
      st.draft.phone = m.contact.phone_number;
      await saveUser(chat, st.draft.phone, name);
      return askConfirm(chat, st);
    }
    if (m.document || m.photo) {
      let f;
      if (m.document) f = { fileId: m.document.file_id, name: m.document.file_name || "fayl", mime: m.document.mime_type || "", size: m.document.file_size || 0, kind: "document" };
      else { const p = m.photo[m.photo.length - 1]; f = { fileId: p.file_id, name: `rasm_${nowParts().date}.jpg`, mime: "image/jpeg", size: p.file_size || 0, kind: "photo" }; }
      st = { step: "copies", draft: { file: f, name, username: from.username || "", caption: m.caption || "" } };
      state.set(chat, st);
      const big = f.size > 20 * 1024 * 1024 ? "\n⚠️ Fayl 20 MB dan katta — do‘konda ochish qiyin bo‘lishi mumkin." : "";
      return send(chat, `📄 <b>${esc(f.name)}</b> qabul qilindi.${big}\n\nNechta nusxa kerak?`, {
        reply_markup: { inline_keyboard: [[1, 2, 3, 5, 10].map(n => ({ text: String(n), callback_data: "cp:" + n })), [{ text: "Bekor qilish", callback_data: "cancel" }]] }
      });
    }
    if (st.step === "copies" && /^\d{1,4}$/.test(text)) return setCopies(chat, st, Number(text));
    if (st.step === "note" && text && !text.startsWith("/")) { st.draft.note = text.slice(0, 500); return askPhone(chat, st); }
    if (st.step === "phone" && /^[+\d][\d\s()-]{6,}$/.test(text)) {
      st.draft.phone = text.replace(/[^\d+]/g, "");
      await saveUser(chat, st.draft.phone, name);
      return askConfirm(chat, st);
    }
    if (text === "🖨 Print buyurtma") return send(chat, "Chop etiladigan faylni shu yerga yuboring 📎\n(PDF, Word, Excel yoki rasm — 20 MB gacha)", { reply_markup: MENU });
    if (text === "📋 Narxlar") return prices(chat, shop);
    if (text === "📦 Buyurtmalarim") return myOrders(chat, shop);
    if (text === "📞 Aloqa") return contact(chat, shop);
    if (st.step === "phone") return send(chat, "Iltimos, «📱 Raqamni yuborish» tugmasini bosing yoki raqamingizni yozing (masalan: +998 90 123 45 67).");
    if (st.step === "copies") return send(chat, "Nusxa sonini tugmadan tanlang yoki raqam bilan yozing (masalan: 4).");
    return send(chat, "Buyurtma berish uchun faylni yuboring yoki menyudan tanlang 👇", { reply_markup: MENU });
  }

  function setCopies(chat, st, n) {
    st.draft.copies = Math.max(1, Math.min(1000, n));
    st.step = "color";
    return send(chat, `Nusxa: <b>${st.draft.copies} ta</b>\n\nQanday chop etamiz?`, {
      reply_markup: { inline_keyboard: [[{ text: "🎨 Rangli", callback_data: "col:rangli" }, { text: "⚫ Oq-qora", callback_data: "col:oq-qora" }]] }
    });
  }
  function askNote(chat, st) {
    st.step = "note";
    return send(chat, "Qo‘shimcha izoh bormi?\nMasalan: <i>ikki tomonlama, A3, faqat 2–5 sahifalar, laminatsiya</i>.\n\nYozing yoki «Izohsiz» ni bosing.", {
      reply_markup: { inline_keyboard: [[{ text: "Izohsiz ➡️", callback_data: "note:none" }]] }
    });
  }
  async function askPhone(chat, st) {
    const u = await getUser(chat);
    if (u && u.phone) { st.draft.phone = u.phone; return askConfirm(chat, st); }
    st.step = "phone";
    return send(chat, "Tayyor bo‘lganda bog‘lanishimiz uchun telefon raqamingizni yuboring 👇", {
      reply_markup: { keyboard: [[{ text: "📱 Raqamni yuborish", request_contact: true }]], resize_keyboard: true, one_time_keyboard: true }
    });
  }
  function askConfirm(chat, st) {
    st.step = "confirm";
    const d = st.draft;
    return send(chat, `<b>Buyurtmangizni tekshiring:</b>\n\n📄 Fayl: ${esc(d.file.name)}\n🔢 Nusxa: ${d.copies} ta\n🎨 Turi: ${d.color === "rangli" ? "Rangli" : "Oq-qora"}\n📝 Izoh: ${esc(d.note || "—")}\n📱 Telefon: ${esc(d.phone)}`, {
      reply_markup: { inline_keyboard: [[{ text: "✅ Tasdiqlash", callback_data: "ok" }, { text: "❌ Bekor qilish", callback_data: "cancel" }]] }
    });
  }
  async function onCallback(q) {
    const chat = q.message && q.message.chat && q.message.chat.id;
    const data = q.data || "", userId = q.from && q.from.id;
    if (!chat) { tg("answerCallbackQuery", { callback_query_id: q.id }).catch(() => {}); return; }
    const shop = await shopId();
    if (data === "sub:check") {
      subCache.delete(userId);
      if (!(await isSubscribed(shop, userId))) {
        return tg("answerCallbackQuery", { callback_query_id: q.id, text: "Siz hali kanalga obuna bo‘lmagansiz. Avval «📢 Kanalga o‘tish» ni bosib, obuna bo‘ling.", show_alert: true }).catch(() => {});
      }
      tg("answerCallbackQuery", { callback_query_id: q.id, text: "✅ Obuna tasdiqlandi!" }).catch(() => {});
      const st0 = state.get(chat) || {}, pend = st0.pending;
      state.set(chat, { step: "idle" });
      const fn = (q.from && [q.from.first_name, q.from.last_name].filter(Boolean).join(" ")) || "Mijoz";
      await send(chat, "✅ <b>Rahmat, obuna tasdiqlandi!</b>");
      if (pend) return handle({ message: pend });
      return welcome(chat, fn, shop);
    }
    tg("answerCallbackQuery", { callback_query_id: q.id }).catch(() => {});
    if (!(await isSubscribed(shop, userId))) return askSubscribe(chat, shop);
    const st = state.get(chat);
    if (data === "cancel") { state.set(chat, { step: "idle" }); return send(chat, "Bekor qilindi. Yangi buyurtma uchun faylni yuboring.", { reply_markup: MENU }); }
    if (!st || !st.draft) return send(chat, "Bu buyurtma eskirgan. Faylni qaytadan yuboring.", { reply_markup: MENU });
    if (data.startsWith("cp:") && st.step === "copies") return setCopies(chat, st, Number(data.slice(3)));
    if (data.startsWith("col:") && st.step === "color") { st.draft.color = data.slice(4) === "rangli" ? "rangli" : "oq-qora"; return askNote(chat, st); }
    if (data === "note:none" && st.step === "note") { st.draft.note = ""; return askPhone(chat, st); }
    if (data === "ok" && st.step === "confirm") return createOrder(chat, st);
  }
  async function createOrder(chat, st) {
    const shop = await shopId(), d = st.draft, { date, time } = nowParts(), no = await nextNo(shop);
    const order = {
      id: uid(), no, date, time, status: "yangi", chatId: chat, customer: d.name, username: d.username, phone: d.phone,
      file: d.file, copies: d.copies, color: d.color, note: d.note || "", caption: d.caption || "", total: 0,
      history: [{ s: "yangi", at: `${date} ${time}` }]
    };
    await putRecord(shop, "orders", order.id, order);
    state.set(chat, { step: "idle" });
    await send(chat, `✅ <b>Buyurtma №${no} qabul qilindi!</b>\n\nTayyor bo‘lganda shu yerga xabar beramiz. Rahmat! 😊`, { reply_markup: MENU });
    for (const o of await owners(shop)) {
      try {
        await send(o, `🆕 <b>Yangi buyurtma №${no}</b>\n👤 ${esc(d.name)}${d.username ? " (@" + esc(d.username) + ")" : ""}\n📱 ${esc(d.phone)}\n🔢 ${d.copies} ta · ${d.color === "rangli" ? "Rangli" : "Oq-qora"}\n📝 ${esc(d.note || "—")}`);
        await tg(d.file.kind === "photo" ? "sendPhoto" : "sendDocument", { chat_id: o, [d.file.kind === "photo" ? "photo" : "document"]: d.file.fileId, caption: `№${no} — ${d.file.name}` });
      } catch (e) { console.error("Egaga xabar yuborilmadi:", e.message); }
    }
  }
  async function prices(chat, shop) {
    const r = await pool.query("select data from records where shop_id=$1 and col='services' and not deleted", [shop]);
    const list = r.rows.map(x => x.data).filter(s => s && Number(s.price) > 0);
    if (!list.length) return send(chat, "Narxlar hali kiritilmagan.", { reply_markup: MENU });
    const line = s => `• ${esc(s.name)} — ${money(s.price)}`;
    const xs = list.filter(s => s.type !== "mahsulot"), ps = list.filter(s => s.type === "mahsulot");
    let t = "📋 <b>Narxlar</b>\n";
    if (xs.length) t += "\n🛠 <b>Xizmatlar</b>\n" + xs.map(line).join("\n");
    if (ps.length) t += "\n\n📦 <b>Mahsulotlar</b>\n" + ps.map(line).join("\n");
    return send(chat, t.slice(0, 4000), { reply_markup: MENU });
  }
  async function myOrders(chat, shop) {
    const r = await pool.query("select data from records where shop_id=$1 and col='orders' and not deleted and data->>'chatId'=$2 order by seq desc limit 5", [shop, String(chat)]);
    if (!r.rows.length) return send(chat, "Sizda hali buyurtma yo‘q. Faylni yuboring 📎", { reply_markup: MENU });
    return send(chat, "📦 <b>Oxirgi buyurtmalaringiz:</b>\n\n" + r.rows.map(({ data: o }) =>
      `№${o.no} · ${esc(o.file && o.file.name)} · ${o.copies} ta\n${STATUS[o.status] || o.status}${o.total ? " · " + money(o.total) : ""}`).join("\n\n"), { reply_markup: MENU });
  }
  async function contact(chat, shop) {
    const s = await settings(shop);
    return send(chat, `🏪 <b>${esc(s.shop || "Kompyuter xizmatlari")}</b>\n${esc(s.sub || "")}${s.shopPhone ? "\n📞 " + esc(s.shopPhone) : ""}${s.shopAddr ? "\n📍 " + esc(s.shopAddr) : ""}`, { reply_markup: MENU });
  }
  async function linkOwner(chat, code, name) {
    const l = linkCodes.get(code);
    if (!l || l.until < Date.now()) return send(chat, "Ulash havolasi eskirgan. Ilovada qaytadan «Telegram'ga ulash» tugmasini bosing.");
    linkCodes.delete(code);
    const t = (await getRecord(l.shop, "meta", "tg")) || { owners: [] };
    const set = new Set((t.owners || []).map(String)); set.add(String(chat));
    await putRecord(l.shop, "meta", "tg", { owners: [...set].map(Number) });
    return send(chat, `✅ <b>${esc(name)}</b>, siz do‘kon egasi sifatida ulandingiz.\nYangi buyurtmalar shu yerga ham keladi.`, { reply_markup: MENU });
  }

  async function loop() {
    if (!TOKEN) { console.log("Telegram bot o'chiq: TELEGRAM_BOT_TOKEN o'rnatilmagan"); return; }
    while (!me) {
      try {
        me = await tg("getMe"); await tg("deleteWebhook", {});
        await tg("setMyCommands", { commands: [
          { command: "start", description: "Boshlash" }, { command: "help", description: "Qanday buyurtma beriladi" },
          { command: "narxlar", description: "Narxlar" }, { command: "buyurtmalarim", description: "Mening buyurtmalarim" }] }).catch(() => {});
        console.log("Telegram bot ishga tushdi: @" + me.username);
      }
      catch (e) { console.error("Telegram bot ulanmadi:", e.message); await sleep(15000); }
    }
    let offset = 0;
    for (;;) {
      try {
        const ups = await tg("getUpdates", { offset, timeout: 50, allowed_updates: ["message", "callback_query"] });
        for (const u of ups) {
          offset = u.update_id + 1;
          try { await handle(u); } catch (e) { console.error("Bot xatosi:", e.message); }
        }
      } catch (e) { console.error("getUpdates:", e.message); await sleep(5000); }
    }
  }

  return {
    STATUS, money, nowParts, esc,
    start() { loop(); },
    async info(shop) { return { enabled: !!TOKEN, ready: !!me, username: me ? me.username : null, linked: (await owners(shop)).length, serves: (await shopId()) === shop }; },
    linkUrl(shop) {
      if (!me) return null;
      const code = crypto.randomBytes(9).toString("base64url");
      linkCodes.set(code, { shop, until: Date.now() + 15 * 60000 });
      return `https://t.me/${me.username}?start=own_${code}`;
    },
    async unlink(shop) { await putRecord(shop, "meta", "tg", { owners: [] }); },
    async channelCheck(shop, channel, link) {
      subCache.clear();
      // Yangi qiymatni darhol qo'llaymiz (ilovadagi sinxronizatsiyani kutmasdan)
      setCache = { t: 0, shop: null, v: {} };
      const cur = await shopSettings(shop);
      setCache = { t: Date.now(), shop, v: { ...cur, tgChannel: String(channel || "").trim(), tgChannelLink: String(link || "").trim() } };
      if (!String(channel || "").trim()) return { ok: true, off: true };
      const ch = chanOf({ tgChannel: channel, tgChannelLink: link });
      if (!ch) return { ok: false, error: "Kanal noto‘g‘ri yozilgan. Masalan: @kanal_nomi yoki https://t.me/kanal_nomi" };
      if (!me) return { ok: false, error: "Bot hali ishga tushmagan — TELEGRAM_BOT_TOKEN ni tekshiring" };
      let title = ch.id;
      try { const c = await tg("getChat", { chat_id: ch.id }); title = c.title || title; }
      catch (e) { return { ok: false, error: "Kanal topilmadi yoki bot unga qo‘shilmagan. Botni kanalga administrator qilib qo‘shing." }; }
      try {
        const m = await tg("getChatMember", { chat_id: ch.id, user_id: me.id });
        if (!["administrator", "creator"].includes(m.status)) return { ok: false, title, error: `Bot «${title}» kanalida administrator emas. Kanal sozlamalari → Administratorlar → botni qo‘shing.` };
      } catch (e) { return { ok: false, title, error: "Botning kanaldagi huquqini tekshirib bo‘lmadi: " + e.message }; }
      if (/^-?\d+$/.test(ch.id) && !ch.link) return { ok: false, title, error: "Yopiq kanal uchun «Kanal havolasi» (taklif havolasi) ni ham yozing." };
      return { ok: true, title, link: ch.link };
    },
    async notifyCustomer(order, text) {
      if (!me || !order.chatId) return false;
      try { await send(order.chatId, text, { reply_markup: MENU }); return true; } catch (e) { console.error("Mijozga xabar:", e.message); return false; }
    },
    async fileResponse(fileId) {
      const f = await tg("getFile", { file_id: fileId });
      const r = await fetch(`${API}/file/bot${TOKEN}/${f.file_path}`);
      if (!r.ok) throw new Error("fayl yuklanmadi (" + r.status + ")");
      return r;
    }
  };
};
