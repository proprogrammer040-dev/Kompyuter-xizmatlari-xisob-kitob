# BUSINESS PRO — server versiyasi (Railway + PostgreSQL)

Kompyuter va telefonda bitta hisob bilan ishlaydigan hisob-kitob ilovasi.
Ma'lumotlar sizning Railway serveringizdagi PostgreSQL bazada saqlanadi.

## Nima bor
- **Telegram bot (buyurtmalar)** — server ichida 24 soat ishlaydi, kompyuter yoniq bo'lishi shart emas.
  Mijoz faylni yuboradi → nusxa soni → rangli/oq-qora → izoh → telefon → tasdiq. Buyurtma ilovadagi
  «Buyurtmalar» bo'limida darhol chiqadi (ovoz bilan). «Ishga olish → Tayyor (summa) → Topshirish»
  bosilganda mijozga avtomatik xabar boradi, topshirilganda savdo o'zi yoziladi. Botda «Narxlar»,
  «Buyurtmalarim», «Aloqa» bo'limlari bor
- **Haftalik solishtirish** — Hisobot bo'limida: bu hafta va o'tgan hafta (tushum, foyda, savdolar soni, %)
- Kirish ekrani: «Kompyuter Xizmatlari №1» yozuvi elektr sharli animatsiya bilan ochiladi,
  keyin kirish / ro'yxatdan o'tish oynasi chiqadi. Ilova har ochilganda qisqa salomlashuv ko'rsatiladi
  (bosilsa o'tkazib yuboriladi)
- Profil rasmi: Sozlamalar → Profil → «Rasm yuklash» (yoki yuqoridagi dumaloq rasmni bosing).
  Rasm kvadrat qilib kesiladi, kichraytiriladi va hamma qurilmada ko'rinadi
- Savdo ikki turga bo'lingan: «🛠 Xizmat ko'rsatish» va «📦 Mahsulot sotish». Har biri metall kartochkalar
  (React Bits «ReflectiveCard») ko'rinishida — kartochkani bosing, sonini tanlang (1, 5, 10…), to'lov turini
  belgilang va «Saqlash». Mahsulot omborga bog'lanadi va sotilganda qoldiq o'zi kamayadi.
  Ombor bo'limidagi «Sotuvga» tugmasi tovarni bir bosishda mahsulotga aylantiradi.
  Hisobotlarda tushum va foyda xizmat/mahsulot bo'yicha alohida ko'rsatiladi
- Ombor: mavjud tovarga kirim qilinganda narx faqat siz tasdiqlasangiz o'zgaradi (bo'sh qoldirilsa eski narx qoladi);
  tugagan yoki keraksiz tovarni «O'chirish» bilan olib tashlash mumkin (savdo tarixi saqlanadi)
- Xarajatlar: oy, tur va izoh bo'yicha filtr, jami summa va turlar bo'yicha tezkor tugmalar
- Kartochkalar: har biriga nomiga mos belgi va rang avtomatik qo'yiladi (23 xil belgi: foto, printer, kserokopiya,
  kitob, banner, krujka, dizayn, ta'mir, Windows, hujjat, fleshka, kabel, telefon...). Belgi, rang yoki rasmni
  «Xizmat va mahsulotlar» jadvalida qo'lda o'zgartirish mumkin
- O'chirish paroli: har qanday o'chirish (savdo, xarajat, tovar, xizmat, ombordan chiqim, oyni qayta ochish)
  4 xonali parol bilan himoyalangan. 5 marta xato kiritilsa 1 daqiqa bloklanadi. Parolni unutsangiz — hisob paroli bilan tiklanadi.
  Sozlamalar → «O'chirishlar tarixi»da nima, qachon, kim va qaysi qurilmadan o'chirgani ko'rinadi
- Animatsiyali RGB fon (React Bits «MicroSlats»): ilova fonida to'lqinli plastinkalar, rangi o'zidan aylanib turadi,
  sichqoncha/barmoq yurgan joyda yorug' iz qoladi. Telefonda 30 kadr/soniya (batareya tejaladi).
  Sozlamalar → «Ilova ko'rinishi»da har bir qurilmada alohida o'chirib qo'yish mumkin
- Hisobotlar: yil tanlanadi, 12 oy kartasi ko'rinadi — oyni (yoki diagrammadagi ustunni) bosganda
  shu oyning tushumi, xarajati, sof foydasi, kunlik diagrammasi va xarajatlar doira diagrammasi ochiladi.
  Yil bo'yicha umumiy diagramma (tushum, chiqim, sof foyda) va yillik PDF
- Yangi dizayn: kompyuterda chap yon panel, telefonda pastki menyu, Inter shrifti
- Email + parol bilan kirish (parollar shifrlangan holda saqlanadi)
- Bir qurilmadagi o'zgarish boshqasida 1 soniyada ko'rinadi (real vaqt)
- Internet uzilsa ham ishlaydi: yozuvlar telefonda navbatda turadi, internet kelganda o'zi yuboriladi
- Telefon va kompyuterga ilova sifatida o'rnatiladi
- Oylik foyda/zarar, PDF hisobot, arxiv, qarzlar, ombor — avvalgidek

## Papka tuzilishi
```
server.js            — server (API + ilova fayllari)
bot.js               — Telegram bot (buyurtmalar)
reset-password.js    — parolni tiklash skripti
public/              — ilovaning o'zi (index.html, ikonlar, sw.js)
public/vendor/crystal-ball.js — shar animatsiyasi (ogl bilan birga yig'ilgan, internetsiz ishlaydi)
public/vendor/micro-slats.js — RGB fon animatsiyasi (manbasi: micro-slats.src.js)
public/vendor/reflective-card.js — metall kartochkalar (bitta umumiy WebGL bilan, ko'p kartochka uchun)
public/fonts/        — Inter shrifti
crystal-ball.src.js  — animatsiyaning manba kodi (o'zgartirsangiz qayta yig'ish kerak, pastga qarang)
package.json, railway.json
```

## Railway'ga joylash (≈15 daqiqa)

### 1. Kodni GitHub'ga yuklang
1. github.com → **New repository** → nom: `business-pro` → **Private** → Create.
2. **uploading an existing file** havolasini bosing → shu papkadagi hamma narsani
   (node_modules dan tashqari) sudrab tashlang → **Commit changes**.

### 2. Railway loyiha
1. railway.com → GitHub bilan kiring → **New Project** → **Deploy from GitHub repo** →
   `business-pro` ni tanlang.
2. Loyiha ichida **+ New** → **Database** → **PostgreSQL**.

### 3. O'zgaruvchilar (Variables)
`business-pro` servisi → **Variables** → quyidagilarni qo'shing:

| Nomi | Qiymati |
|---|---|
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` |
| `JWT_SECRET` | uzun tasodifiy matn (kamida 32 belgi, masalan klaviaturada aralash bosing) |

`JWT_SECRET` ni hech kimga bermang va o'zgartirmang (o'zgarsa hamma qaytadan kiradi).

### 4. Manzil olish
Servis → **Settings** → **Networking** → **Generate Domain**.
Manzil chiqadi: `https://business-pro-production-xxxx.up.railway.app`

Tekshirish: `https://...up.railway.app/api/health` → `{"ok":true}` chiqishi kerak.

### 5. Ishlatish
- Kompyuterda manzilni Chrome/Edge'da oching → **Yangi hisob ochish**.
- Manzil satridagi **O'rnatish** belgisi (yoki Sozlamalar → Ilovani o'rnatish).
- Telefonda o'sha manzil → o'sha email/parol bilan **Kirish** → ⋮ → **Ilovani o'rnatish**
  (iPhone: Safari → Ulashish → Bosh ekranga qo'shish).

### 6. Begonalar hisob ochmasligi uchun (tavsiya)
O'zingizning hisobingizni ochib bo'lgach, Variables ga qo'shing:
`ALLOW_REGISTER` = `0`. Shundan keyin yangi hisob ochib bo'lmaydi, mavjudlari ishlayveradi.

## Telegram botni ulash (5 daqiqa)
1. Telegram'da **@BotFather** ni oching → `/newbot` → botga nom bering (masalan «Kompyuter xizmatlari №1»)
   va username (oxiri `bot` bilan tugashi kerak, masalan `kompyuter_xizmat1_bot`).
2. BotFather bergan **token**ni nusxalang (`123456789:AA...` ko'rinishida).
3. Railway → `business-pro` servisi → **Variables** → yangi o'zgaruvchi:
   `TELEGRAM_BOT_TOKEN` = shu token. (Ixtiyoriy: `BOT_SHOP_EMAIL` = do'kon hisobingiz emaili.)
4. Railway servisni qayta ishga tushiradi. **Deploy Logs**da `Telegram bot ishga tushdi: @...` chiqadi.
5. Ilovada Sozlamalar → **Telegram bot**: bot holati ko'rinadi.
   - «📲 Telegram'ga ulash» — yangi buyurtmalar sizning Telegram'ingizga ham keladi (fayli bilan).
   - Sozlamalar → Do'kon: **telefon** va **manzil**ni yozing — bot mijozlarga «Aloqa»da ko'rsatadi.
6. Mijozlarga `t.me/<bot_username>` havolasini yuboring (Instagram, Telegram kanal, do'kon eshigidagi QR).

### Kanalga majburiy obuna
Bot mijozga xizmat ko'rsatishdan oldin Telegram kanalingizga obuna bo'lishni so'raydi va tekshiradi.
1. Kanalingizni oching → **Administratorlar** → **Admin qo'shish** → botingizni qidirib toping → saqlang
   (maxsus huquq shart emas, faqat admin bo'lishi kifoya).
2. Ilovada Sozlamalar → Telegram bot → **Majburiy obuna kanali**: `@kanal_nomi` yoki `https://t.me/kanal_nomi`.
   Yopiq kanal bo'lsa, «Kanal havolasi»ga taklif havolasini (`https://t.me/+...`) ham yozing.
3. **Saqlash va tekshirish** ni bosing — yashil «kanali ulandi» yozuvi chiqishi kerak.
Maydonni bo'shatib saqlasangiz, obuna talab qilinmaydi. Bot kanalda admin bo'lmasa, tekshiruv o'tkazib
yuboriladi (mijozlar to'xtab qolmaydi), ilova esa sababini ko'rsatadi.

Mijoz uchun tartib: Start → kanalga obuna → «✅ Obuna bo'ldim» → fayl → nusxa → rang → izoh → telefon → Tasdiqlash.
Bot menyusida doim «❓ Qanday buyurtma beriladi» tugmasi va `/help` buyrug'i bor.

Eslatma: Railway'da servis **1 ta nusxa (replica)** bo'lib ishlashi kerak (standart holat shunday) —
bitta bot tokeni bilan ikki server bir vaqtda ishlay olmaydi.

## Eski ma'lumotlarni ko'chirish
Eski versiyada: Sozlamalar → **Zaxira nusxasini yuklab olish** (.json fayl).
Yangi versiyada kirgach: Sozlamalar → **Zaxira nusxasini tiklash** → o'sha faylni tanlang.

## Parolni unutsa
Railway → Postgres servisi → Variables → `DATABASE_PUBLIC_URL` qiymatini nusxalang. Kompyuterda
(shu papkada, `npm install` qilingandan keyin):
```
DATABASE_URL="<nusxalangan manzil>" node reset-password.js dokon@gmail.com YangiParol123
```
(Windows PowerShell: `$env:DATABASE_URL="..."; node reset-password.js dokon@gmail.com YangiParol123`)

## Lokal ishga tushirish (dasturchilar uchun)
```
npm install
DATABASE_URL=postgres://user:pass@localhost:5432/bp JWT_SECRET=test node server.js
```
→ http://localhost:3000

## Bilish kerak
- Railway pullik xizmat (sinov kreditidan keyin tarif kerak bo'ladi — narxini railway.com/pricing da ko'ring).
  Bitta do'kon uchun eng kichik resurs yetadi.
- Oyiga bir marta ilovadan zaxira nusxa olib qo'yish tavsiya etiladi.
- Ilova faqat joriy va o'tgan oy yozuvlarini yuklaydi; eski oylar arxivdagi yakuniy hisobotdan olinadi —
  shuning uchun yillar o'tsa ham tez ishlaydi.

## Animatsiyani sozlash
Shar rangi va ko'rinishi `public/index.html` ichidagi `mountBall()` funksiyasida:
`preset:"abyss", color:"#4C8DFF", size, particleCount, glow, flares, crackle ...`
Masalan rangni `#F25BD0` (pushti) yoki preset ni `"ember"`, `"frost"`, `"solar"` qilish mumkin.

Manba kodini (`crystal-ball.src.js`) o'zgartirsangiz:
```
npm install ogl esbuild
npx esbuild crystal-ball.src.js --bundle --format=iife --global-name=CrystalBallLib --minify --outfile=public/vendor/crystal-ball.js
```
Animatsiya WebGL2 talab qiladi (zamonaviy Chrome, Edge, Safari, Android). Juda eski qurilmalarda
uning o'rniga oddiy yonib turadigan halqa ko'rsatiladi — ilova baribir ishlaydi.

Kartochkalar manbasi `reflective-card.src.js` — qayta yig'ish:
```
npx esbuild reflective-card.src.js --bundle --format=iife --global-name=ReflectiveLib --minify --outfile=public/vendor/reflective-card.js
```

Animatsiyalar: «CrystalizedBall» va «ReflectiveCard», React Bits (reactbits.dev) — React'siz versiyaga o'tkazilgan.
