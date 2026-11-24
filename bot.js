// BUSINESS PRO — Telegram bot (server ichida ishlaydi, kompyuter yoniq bo'lishi shart emas).
// Mijoz xizmatni tanlaydi → (fayl / tavsif) → ism, manzil, telefon → tasdiq.
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
  const MENU = { keyboard: [[{ text: "🛠 Buyurtma berish" }], [{ text: "📋 Narxlar" }, { text: "📦 Buyurtmalarim" }], [{ text: "📍 Manzil va aloqa" }, { text: "❓ Qanday buyurtma beriladi" }]], resize_keyboard: true };
  const HOWTO = "📖 <b>Qanday buyurtma beriladi:</b>\n\n" +
    "1️⃣ <b>«🛠 Buyurtma berish»</b> tugmasini bosing\n" +
    "2️⃣ Kerakli <b>xizmatni</b> tanlang (ta’mirlash, foto, kserokopiya, vizitka…)\n" +
    "3️⃣ Foto, kserokopiya, vizitka, taklifnoma, albom uchun — <b>fayl yoki rasm</b> yuboring 📎\n" +
    "     Ta’mirlash va boshqa xizmatlar uchun — <b>nima kerakligini</b> yozing\n" +
    "4️⃣ <b>Ism-familiya, manzil</b> va <b>telefon</b> qoldiring (keyingi safar so‘ralmaydi)\n" +
    "5️⃣ <b>✅ Tasdiqlash</b> — «Buyurtma qabul qilindi» chiqadi\n\n" +
    "🔔 Buyurtma tayyor bo‘lganda bot sizga <b>summasi</b> va <b>ishxonamiz xaritasini</b> yuboradi — kelib olib ketasiz.\n" +
    "🔧 Ta’mirlash uchun qurilmani ishxonamizga olib kelasiz.\n\n" +
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
    await send(chat, `Assalomu alaykum, <b>${esc(name)}</b>! 👋\n\n<b>${esc(s.shop || "Kompyuter xizmatlari")}</b> botiga xush kelibsiz.\nKompyuter, noutbuk va printer ta’mirlash, tezkor foto, kserokopiya, vizitka va boshqa xizmatlarga shu yerdan buyurtma bering — navbat kutmasdan!`, { reply_markup: MENU });
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
  async function getUser(chat) { const r = await pool.query("select phone,name,addr,loc from tg_users where chat_id=$1", [chat]); return r.rows[0] || null; }
  async function saveUser(chat, phone, name, addr, loc) {
    await pool.query(`insert into tg_users(chat_id,phone,name,addr,loc) values($1,$2,$3,$4,$5)
      on conflict(chat_id) do update set phone=coalesce(excluded.phone,tg_users.phone), name=coalesce(excluded.name,tg_users.name),
        addr=coalesce(excluded.addr,tg_users.addr), loc=excluded.loc, updated_at=now()`, [chat, phone || null, name || null, addr || null, loc ? JSON.stringify(loc) : null]);
  }

  // ---------- Xizmatlar ro'yxati (botdagi buyurtma turlari) ----------
  // file: fayl so'raladi · copies: nusxa soni · color: rangli/oq-qora · g:"tamir" — qurilmani olib kelish kerak
  const SVC = [
    { k: "pc", t: "💻 Kompyuter ta’mirlash", g: "tamir", ask: "Kompyuterda qanday muammo bor? Qisqacha yozing.\n<i>Masalan: yonmayapti, sekin ishlaydi, Windows o‘rnatish kerak</i>" },
    { k: "nb", t: "💻 Noutbuk ta’mirlash", g: "tamir", ask: "Noutbukda qanday muammo bor? Qisqacha yozing.\n<i>Masalan: ekran singan, klaviatura ishlamaydi, qiziydi</i>" },
    { k: "pr", t: "🖨 Printer ta’mirlash", g: "tamir", ask: "Printerda qanday muammo bor? Modelini ham yozing.\n<i>Masalan: Canon 2900 — qog‘oz tortmayapti</i>" },
    { k: "dev", t: "🔧 Boshqa qurilmalar", g: "tamir", ask: "Qaysi qurilma va qanday muammo? Qisqacha yozing." },
    { k: "foto", t: "📸 Tezkor foto", file: true, copies: true, ask: "Rasmni yuboring 📎\n<i>Hujjat uchun foto (3×4, 4×6) bo‘lsa — o‘lchamini izohda yozasiz.</i>" },
    { k: "ksr", t: "📄 Kserokopiya / Print", file: true, copies: true, color: true, ask: "Chop etiladigan faylni yuboring 📎\n<i>PDF, Word, Excel yoki rasm</i>" },
    { k: "tak", t: "💌 Taklifnomalar", file: true, copies: true, ask: "Taklifnoma faylini yoki namunasini yuboring 📎\n<i>Matnni izohda yozishingiz ham mumkin</i>" },
    { k: "viz", t: "📇 Vizitka, flayer, buklet", file: true, copies: true, ask: "Vizitka / flayer faylini (PDF yoki rasm) yuboring 📎\n<i>Dizayn kerak bo‘lsa — logotip va matnni yuboring</i>" },
    { k: "alb", t: "📚 Albom tayyorlash", file: true, ask: "Albom uchun rasmlarni yuboring 📎\n<i>Bir nechta rasmni birdaniga tanlab yuborishingiz mumkin</i>" },
    { k: "lam", t: "🪪 Laminatsiya", ask: "Nimani laminatsiya qilamiz va nechta?\n<i>Masalan: 2 ta hujjat, 1 ta foto. Hujjatni o‘zingiz olib kelasiz.</i>" },
    { k: "dvd", t: "💿 DVD/CD → fleshka", ask: "Nechta disk ko‘chiriladi? Qisqacha yozing.\n<i>Disk va fleshkani o‘zingiz olib kelasiz.</i>" },
    { k: "net", t: "🌐 Internet xizmatlari", ask: "Qanday xizmat kerak? Qisqacha yozing.\n<i>Masalan: onlayn ariza, bilet, elektron pochta, hujjat yuklash</i>" },
  ];
  const svcOf = k => SVC.find(s => s.k === k) || SVC.find(s => s.k === "ksr");
  const svcKeyboard = () => {
    const rows = [];
    for (let i = 0; i < SVC.length; i += 2) rows.push(SVC.slice(i, i + 2).map(s => ({ text: s.t, callback_data: "svc:" + s.k })));
    rows.push([{ text: "❌ Bekor qilish", callback_data: "cancel" }]);
    return { inline_keyboard: rows };
  };
  const ORDER_BTNS = ["🛠 Buyurtma berish", "🖨 Print buyurtma"];

  // ---------- Do'kon lokatsiyasi ----------
  function parseLoc(v) {
    const s = String(v || "");
    let m = s.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || s.match(/@(-?\d+\.\d+),\s*(-?\d+\.\d+)/) ||
      s.match(/[?&](?:q|ll|query|destination|daddr|center)=(-?\d+\.\d+)(?:,|%2C)\s*(-?\d+\.\d+)/i) || s.match(/(-?\d{1,2}\.\d{3,})\s*[, ]\s*(-?\d{1,3}\.\d{3,})/);
    if (!m) return null;
    const lat = Number(m[1]), lng = Number(m[2]);
    return Math.abs(lat) <= 90 && Math.abs(lng) <= 180 ? { lat, lng } : null;
  }
  async function sendShopLocation(chat, shop) {
    const s = await settings(shop);
    if (!(Number.isFinite(s.shopLat) && Number.isFinite(s.shopLng))) return false;
    try {
      await tg("sendVenue", { chat_id: chat, latitude: s.shopLat, longitude: s.shopLng, title: s.shop || "Kompyuter xizmatlari", address: s.shopAddr || "Ishxonamiz", reply_markup: MENU });
      return true;
    } catch (e) {
      try { await tg("sendLocation", { chat_id: chat, latitude: s.shopLat, longitude: s.shopLng }); return true; } catch { return false; }
    }
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
    // Do'kon egasi lokatsiya yuborsa — ishxona lokatsiyasi sifatida saqlash taklif qilinadi
    if (m.location && st.step !== "addr" && (await owners(shop)).map(String).includes(String(chat))) {
      st.ownerLoc = { lat: m.location.latitude, lng: m.location.longitude };
      return send(chat, "📍 Shu joy <b>ishxona lokatsiyasi</b> sifatida saqlansinmi?\nBuyurtma tayyor bo‘lganda mijozlarga shu xarita yuboriladi.", {
        reply_markup: { inline_keyboard: [[{ text: "✅ Ha, saqlash", callback_data: "own:loc" }, { text: "Yo‘q", callback_data: "own:no" }]] }
      });
    }
    // Majburiy obuna: obuna bo'lmagan mijozga xizmat ko'rsatilmaydi (yuborgan narsasi eslab qolinadi)
    if (!(await isSubscribed(shop, from.id))) {
      st.pending = text.startsWith("/start") ? null : m;
      return askSubscribe(chat, shop);
    }
    if (text.startsWith("/start")) { state.set(chat, { step: "idle" }); return welcome(chat, name, shop); }
    if (text === "/help" || text === "❓ Qanday buyurtma beriladi" || text === "❓ Yordam") return send(chat, HOWTO, { reply_markup: MENU });
    if (text === "/narxlar" || text === "📋 Narxlar") return prices(chat, shop);
    if (text === "/buyurtmalarim" || text === "📦 Buyurtmalarim") return myOrders(chat, shop);
    if (text === "/manzil" || text === "📍 Manzil va aloqa" || text === "📞 Aloqa") return contact(chat, shop);
    if (text === "/buyurtma" || ORDER_BTNS.includes(text)) return chooseService(chat, name, from.username);
    if (text === "❌ Bekor qilish") { state.set(chat, { step: "idle" }); return send(chat, "Bekor qilindi.", { reply_markup: MENU }); }

    // Fayl yoki rasm
    if (m.document || m.photo) {
      let f;
      if (m.document) f = { fileId: m.document.file_id, name: m.document.file_name || "fayl", mime: m.document.mime_type || "", size: m.document.file_size || 0, kind: "document" };
      else { const p = m.photo[m.photo.length - 1]; f = { fileId: p.file_id, name: `rasm_${nowParts().date}_${(st.draft && st.draft.files ? st.draft.files.length : 0) + 1}.jpg`, mime: "image/jpeg", size: p.file_size || 0, kind: "photo" }; }
      // Ta'mirlash va boshqa xizmatlarda fayl shart emas, lekin yuborsa — qo'shib qo'yamiz
      if (st.draft && st.step === "desc") { st.draft.files.push(f); return send(chat, "📎 Fayl ham qo‘shildi. Endi nima kerakligini matn bilan yozing ✍️"); }
      // Xizmat tanlanmasdan fayl yuborilsa — «Kserokopiya / Print» deb olamiz
      if (!st.draft || !["file", "copies", "color", "note"].includes(st.step)) {
        st = { step: "file", draft: { svc: svcOf("ksr"), files: [], name: "", tgName: name, username: from.username || "", caption: "" } };
        state.set(chat, st);
      }
      if (st.step !== "file") { st.draft.files.push(f); return send(chat, `📎 Yana bitta fayl qo‘shildi (jami ${st.draft.files.length} ta).`); }
      st.draft.files.push(f);
      if (m.caption) st.draft.caption = (st.draft.caption ? st.draft.caption + "\n" : "") + m.caption.slice(0, 300);
      // Bir nechta rasm birdaniga kelsa (albom) — bitta javob beramiz
      clearTimeout(st.fileTimer);
      st.fileTimer = setTimeout(() => afterFiles(chat, st).catch(e => console.error("Bot xatosi:", e.message)), 1200);
      return;
    }

    if (st.step === "file") return send(chat, "Iltimos, faylni yoki rasmni yuboring 📎 (pastdagi qisqich tugmasi).\nFayl yo‘q bo‘lsa — «❌ Bekor qilish».");
    if (st.step === "desc" && text && !text.startsWith("/")) { st.draft.note = text.slice(0, 600); return askName(chat, st); }
    if (st.step === "copies" && /^\d{1,4}$/.test(text)) return setCopies(chat, st, Number(text));
    if (st.step === "note" && text && !text.startsWith("/")) { st.draft.note = text.slice(0, 600); return askName(chat, st); }
    if (st.step === "name" && text && !text.startsWith("/")) {
      if (text.length < 3) return send(chat, "Ism va familiyangizni to‘liq yozing (masalan: <b>Akmal Karimov</b>).");
      st.draft.name = text.slice(0, 80); return askAddr(chat, st);
    }
    if (st.step === "addr" && m.location) {
      st.draft.loc = { lat: m.location.latitude, lng: m.location.longitude };
      st.draft.addr = "📍 Xaritadagi joy";
      return askPhone(chat, st);
    }
    if (st.step === "addr" && text && !text.startsWith("/")) {
      if (text.length < 4) return send(chat, "Manzilni to‘liqroq yozing (mahalla, ko‘cha, uy).");
      st.draft.addr = text.slice(0, 200); st.draft.loc = null; return askPhone(chat, st);
    }
    if (st.step === "phone" && m.contact) { st.draft.phone = m.contact.phone_number; return askConfirm(chat, st); }
    if (st.step === "phone" && /^[+\d][\d\s()-]{6,}$/.test(text)) { st.draft.phone = text.replace(/[^\d+]/g, ""); return askConfirm(chat, st); }

    if (st.step === "phone") return send(chat, "Iltimos, «📱 Raqamni yuborish» tugmasini bosing yoki raqamingizni yozing (masalan: +998 90 123 45 67).");
    if (st.step === "addr") return send(chat, "Manzilingizni yozing yoki «📍 Lokatsiyani yuborish» tugmasini bosing.");
    if (st.step === "copies") return send(chat, "Nusxa sonini tugmadan tanlang yoki raqam bilan yozing (masalan: 4).");
    if (st.step === "desc") return send(chat, "Iltimos, nima kerakligini matn bilan yozing ✍️");
    return send(chat, "Buyurtma berish uchun <b>«🛠 Buyurtma berish»</b> ni bosing 👇", { reply_markup: MENU });
  }

  function chooseService(chat, tgName, username) {
    state.set(chat, { step: "svc", draft: { files: [], tgName, username: username || "" } });
    return send(chat, "🛠 <b>Qaysi xizmat kerak?</b>\nTanlang 👇", { reply_markup: svcKeyboard() });
  }
  function onService(chat, st, k) {
    const svc = svcOf(k);
    st.draft.svc = svc; st.draft.files = []; st.draft.note = "";
    st.step = svc.file ? "file" : "desc";
    return send(chat, `<b>${esc(svc.t)}</b>\n\n${svc.ask}`, { reply_markup: { keyboard: [[{ text: "❌ Bekor qilish" }]], resize_keyboard: true } });
  }
  async function afterFiles(chat, st) {
    if (state.get(chat) !== st || st.step !== "file") return;
    const d = st.draft, n = d.files.length;
    const big = d.files.some(f => f.size > 20 * 1024 * 1024) ? "\n⚠️ 20 MB dan katta fayl bor — ochish qiyin bo‘lishi mumkin." : "";
    const head = n === 1 ? `📄 <b>${esc(d.files[0].name)}</b> qabul qilindi.` : `📎 <b>${n} ta fayl</b> qabul qilindi.`;
    if (d.svc.copies) {
      st.step = "copies";
      return send(chat, `${head}${big}\n\nNechta nusxa kerak?`, {
        reply_markup: { inline_keyboard: [[1, 2, 3, 5, 10].map(x => ({ text: String(x), callback_data: "cp:" + x })), [{ text: "❌ Bekor qilish", callback_data: "cancel" }]] }
      });
    }
    await send(chat, `${head}${big}`);
    return askNote(chat, st);
  }
  function setCopies(chat, st, n) {
    st.draft.copies = Math.max(1, Math.min(1000, n));
    if (!st.draft.svc.color) return askNote(chat, st);
    st.step = "color";
    return send(chat, `Nusxa: <b>${st.draft.copies} ta</b>\n\nQanday chop etamiz?`, {
      reply_markup: { inline_keyboard: [[{ text: "🎨 Rangli", callback_data: "col:rangli" }, { text: "⚫ Oq-qora", callback_data: "col:oq-qora" }]] }
    });
  }
  function askNote(chat, st) {
    st.step = "note";
    const ex = st.draft.svc.k === "foto" ? "3×4, 6 ta; fon oq bo‘lsin" : st.draft.svc.k === "alb" ? "20×30 albom, 30 sahifa, muqovada ism" : st.draft.svc.k === "viz" ? "100 ta vizitka, ikki tomonlama" : "ikki tomonlama, A3, faqat 2–5 sahifalar";
    return send(chat, `Qo‘shimcha izoh bormi?\nMasalan: <i>${ex}</i>.\n\nYozing yoki «Izohsiz» ni bosing.`, {
      reply_markup: { inline_keyboard: [[{ text: "Izohsiz ➡️", callback_data: "note:none" }]] }
    });
  }
  // Mijoz ma'lumotlari: avval saqlangan bo'lsa — bitta tugma bilan tasdiqlaydi
  async function askName(chat, st) {
    const u = await getUser(chat);
    if (u && u.name && u.addr && u.phone) {
      st.step = "who";
      st.saved = u;
      return send(chat, `Ma’lumotlaringiz:\n👤 ${esc(u.name)}\n📍 ${esc(u.addr)}\n📱 ${esc(u.phone)}\n\nShular bilan davom etamizmi?`, {
        reply_markup: { inline_keyboard: [[{ text: "✅ Ha, to‘g‘ri", callback_data: "who:ok" }, { text: "✏️ O‘zgartirish", callback_data: "who:edit" }]] }
      });
    }
    st.step = "name";
    return send(chat, "👤 <b>Ism va familiyangizni</b> yozing:", {
      reply_markup: { keyboard: [[{ text: st.draft.tgName }], [{ text: "❌ Bekor qilish" }]], resize_keyboard: true, one_time_keyboard: true }
    });
  }
  function askAddr(chat, st) {
    st.step = "addr";
    return send(chat, "📍 <b>Manzilingizni</b> yozing (mahalla, ko‘cha, uy)\nyoki pastdagi tugma bilan <b>lokatsiyangizni</b> yuboring:", {
      reply_markup: { keyboard: [[{ text: "📍 Lokatsiyani yuborish", request_location: true }], [{ text: "❌ Bekor qilish" }]], resize_keyboard: true, one_time_keyboard: true }
    });
  }
  async function askPhone(chat, st) {
    const u = await getUser(chat);
    if (u && u.phone && !st.editing) { st.draft.phone = u.phone; return askConfirm(chat, st); }
    st.step = "phone";
    return send(chat, "📱 Bog‘lanishimiz uchun <b>telefon raqamingizni</b> yuboring 👇", {
      reply_markup: { keyboard: [[{ text: "📱 Raqamni yuborish", request_contact: true }], [{ text: "❌ Bekor qilish" }]], resize_keyboard: true, one_time_keyboard: true }
    });
  }
  async function askConfirm(chat, st) {
    st.step = "confirm";
    const d = st.draft;
    await saveUser(chat, d.phone, d.name, d.addr, d.loc);
    const lines = [`<b>Buyurtmangizni tekshiring:</b>\n`, `🛠 Xizmat: <b>${esc(d.svc.t)}</b>`];
    if (d.files.length) lines.push(`📎 Fayl: ${d.files.length === 1 ? esc(d.files[0].name) : d.files.length + " ta"}`);
    if (d.copies) lines.push(`🔢 Nusxa: ${d.copies} ta`);
    if (d.color) lines.push(`🎨 Turi: ${d.color === "rangli" ? "Rangli" : "Oq-qora"}`);
    lines.push(`📝 ${d.svc.file ? "Izoh" : "Tavsif"}: ${esc(d.note || "—")}`);
    lines.push(`\n👤 ${esc(d.name)}`, `📍 ${esc(d.addr)}`, `📱 ${esc(d.phone)}`);
    return send(chat, lines.join("\n"), {
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
    const st = state.get(chat);
    if (data === "own:loc" && st && st.ownerLoc) {
      const s = await settings(shop);
      await putRecord(shop, "meta", "settings", { ...s, shopLat: st.ownerLoc.lat, shopLng: st.ownerLoc.lng });
      setCache = { t: 0, shop: null, v: {} }; delete st.ownerLoc;
      return send(chat, "✅ Ishxona lokatsiyasi saqlandi. Endi mijozlarga «📍 Manzil va aloqa» va buyurtma tayyor bo‘lganda shu xarita yuboriladi.", { reply_markup: MENU });
    }
    if (data === "own:no") { if (st) delete st.ownerLoc; return; }
    if (!(await isSubscribed(shop, userId))) return askSubscribe(chat, shop);
    if (data === "cancel") { state.set(chat, { step: "idle" }); return send(chat, "Bekor qilindi. Yangi buyurtma uchun «🛠 Buyurtma berish» ni bosing.", { reply_markup: MENU }); }
    if (data === "neworder") { const fn = (q.from && [q.from.first_name, q.from.last_name].filter(Boolean).join(" ")) || "Mijoz"; return chooseService(chat, fn, q.from && q.from.username); }
    if (!st || !st.draft) return send(chat, "Bu buyurtma eskirgan. «🛠 Buyurtma berish» ni qaytadan bosing.", { reply_markup: MENU });
    if (data.startsWith("svc:") && st.step === "svc") return onService(chat, st, data.slice(4));
    if (data.startsWith("cp:") && st.step === "copies") return setCopies(chat, st, Number(data.slice(3)));
    if (data.startsWith("col:") && st.step === "color") { st.draft.color = data.slice(4) === "rangli" ? "rangli" : "oq-qora"; return askNote(chat, st); }
    if (data === "note:none" && st.step === "note") { st.draft.note = ""; return askName(chat, st); }
    if (data === "who:ok" && st.step === "who") {
      const u = st.saved; Object.assign(st.draft, { name: u.name, addr: u.addr, phone: u.phone, loc: u.loc || null });
      return askConfirm(chat, st);
    }
    if (data === "who:edit" && st.step === "who") { st.editing = true; st.step = "name"; return send(chat, "👤 <b>Ism va familiyangizni</b> yozing:", { reply_markup: { keyboard: [[{ text: st.saved.name }], [{ text: "❌ Bekor qilish" }]], resize_keyboard: true, one_time_keyboard: true } }); }
    if (data === "ok" && st.step === "confirm") return createOrder(chat, st);
  }
  async function createOrder(chat, st) {
    const shop = await shopId(), d = st.draft, { date, time } = nowParts(), no = await nextNo(shop);
    const order = {
      id: uid(), no, date, time, status: "yangi", chatId: chat,
      service: { k: d.svc.k, t: d.svc.t, g: d.svc.g || "" },
      customer: d.name, tgName: d.tgName, username: d.username, phone: d.phone, addr: d.addr || "", loc: d.loc || null,
      file: d.files[0] || null, files: d.files, copies: d.copies || 0, color: d.color || "", note: d.note || "", caption: d.caption || "", total: 0,
      history: [{ s: "yangi", at: `${date} ${time}` }]
    };
    await putRecord(shop, "orders", order.id, order);
    state.set(chat, { step: "idle" });
    const tamir = d.svc.g === "tamir";
    const after = tamir
      ? "🔧 Qurilmangizni <b>ishxonamizga olib keling</b> — ustamiz ko‘rib chiqadi va narxini aytadi. Kerak bo‘lsa, o‘zimiz qo‘ng‘iroq qilamiz."
      : "⏳ Buyurtmangiz tayyor bo‘lganda <b>shu yerga xabar beramiz</b>.\nTayyor buyurtmani <b>ishxonamizdan</b> olib ketasiz.";
    await send(chat, `✅ <b>Buyurtma №${no} qabul qilindi!</b>\n🛠 ${esc(d.svc.t)}\n\n${after}\n\nRahmat! 😊`, { reply_markup: MENU });
    await sendShopLocation(chat, shop);
    for (const o of await owners(shop)) {
      try {
        const lines = [`🆕 <b>Yangi buyurtma №${no}</b>`, `🛠 ${esc(d.svc.t)}`, `👤 ${esc(d.name)}${d.username ? " (@" + esc(d.username) + ")" : ""}`, `📱 ${esc(d.phone)}`, `📍 ${esc(d.addr || "—")}`];
        if (d.copies) lines.push(`🔢 ${d.copies} ta${d.color ? " · " + (d.color === "rangli" ? "Rangli" : "Oq-qora") : ""}`);
        lines.push(`📝 ${esc(d.note || "—")}`);
        await send(o, lines.join("\n"));
        if (d.loc) await tg("sendLocation", { chat_id: o, latitude: d.loc.lat, longitude: d.loc.lng }).catch(() => {});
        for (const f of d.files.slice(0, 10)) {
          await tg(f.kind === "photo" ? "sendPhoto" : "sendDocument", { chat_id: o, [f.kind === "photo" ? "photo" : "document"]: f.fileId, caption: `№${no} — ${f.name}` });
        }
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
    if (!r.rows.length) return send(chat, "Sizda hali buyurtma yo‘q. «🛠 Buyurtma berish» ni bosing 👇", { reply_markup: MENU });
    return send(chat, "📦 <b>Oxirgi buyurtmalaringiz:</b>\n\n" + r.rows.map(({ data: o }) =>
      `№${o.no} · ${esc(o.service ? o.service.t : "📄 Kserokopiya / Print")}${o.copies ? " · " + o.copies + " ta" : ""}\n${STATUS[o.status] || o.status}${o.total ? " · " + money(o.total) : ""}`).join("\n\n"), { reply_markup: MENU });
  }
  async function contact(chat, shop) {
    const s = await settings(shop);
    const tel = s.shopPhone ? `\n📞 <b>${esc(s.shopPhone)}</b>` : "";
    await send(chat, `🏪 <b>${esc(s.shop || "Kompyuter xizmatlari")}</b>${s.sub ? "\n" + esc(s.sub) : ""}${tel}${s.shopAddr ? "\n📍 " + esc(s.shopAddr) : ""}${s.shopHours ? "\n🕘 " + esc(s.shopHours) : ""}`, { reply_markup: MENU });
    return sendShopLocation(chat, shop);
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
          { command: "buyurtma", description: "Buyurtma berish" }, { command: "narxlar", description: "Narxlar" },
          { command: "buyurtmalarim", description: "Mening buyurtmalarim" }, { command: "manzil", description: "Manzil va aloqa" }] }).catch(() => {});
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
    STATUS, money, nowParts, esc, parseLoc,
    sendShopLocation(chat, shop) { return me ? sendShopLocation(chat, shop) : false; },
    async resolveLoc(v) {
      let p = parseLoc(v);
      if (p || !/^https?:\/\/(maps\.app\.goo\.gl|goo\.gl\/maps|maps\.google|www\.google\.[a-z.]+\/maps|yandex\.[a-z]+\/maps)/i.test(String(v).trim())) return p;
      try { const r = await fetch(String(v).trim(), { redirect: "follow" }); p = parseLoc(r.url) || parseLoc(await r.text()); } catch {}
      return p;
    },
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
      try { await send(order.chatId, text, { reply_markup: MENU }); if (order.status === "tayyor") await sendShopLocation(order.chatId, await shopId()); return true; } catch (e) { console.error("Mijozga xabar:", e.message); return false; }
    },
    async fileResponse(fileId) {
      const f = await tg("getFile", { file_id: fileId });
      const r = await fetch(`${API}/file/bot${TOKEN}/${f.file_path}`);
      if (!r.ok) throw new Error("fayl yuklanmadi (" + r.status + ")");
      return r;
    }
  };
};
