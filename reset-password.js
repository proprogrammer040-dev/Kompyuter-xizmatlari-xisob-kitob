// Parolni tiklash (administrator uchun):
//   railway run node reset-password.js dokon@gmail.com YangiParol123
"use strict";
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const [email, pass] = process.argv.slice(2);
if (!email || !pass || pass.length < 6) { console.log("Foydalanish: node reset-password.js <email> <yangi_parol (kamida 6 belgi)>"); process.exit(1); }
const url = process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString: url, ssl: /railway\.internal|localhost|127\.0\.0\.1/.test(url) ? false : { rejectUnauthorized: false } });
(async () => {
  const r = await pool.query("update users set pass=$1 where email=$2 returning id", [await bcrypt.hash(pass, 10), email.trim().toLowerCase()]);
  console.log(r.rowCount ? "Parol yangilandi ✓" : "Bunday email topilmadi");
  await pool.end();
})().catch(e => { console.error(e.message); process.exit(1); });
