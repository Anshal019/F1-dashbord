// ============================================================
//   👋 HI ANSHAL! THIS IS THE ONLY FILE YOU NEED TO EDIT.
//   Fill in your details below, save, deploy. That's it.
// ============================================================

const MY_CONFIG = {

  // ── YOUR NAME ─────────────────────────────────────────────
  name: "Anshal Maheta",

  // ── YOUR BIO (shown under your name) ──────────────────────
  bio: "Passionate F1 fan tracking every lap, every battle, every championship point. This is my personal pit wall — real 2026 standings, live countdown, full calendar. Auto-updates after every race. Lights out. 🏁",

  // ── YOUR PHOTO ────────────────────────────────────────────
  // Option A: Leave as "" to use your anshal-avatar.png (already included)
  // Option B: Paste any image URL from the web here
  photoUrl: "",   // example: "https://i.imgur.com/abc123.jpg"

  // ── YOUR SOCIAL LINKS ─────────────────────────────────────
  // Paste your links. Leave "" to hide that button.
  instagram: "https://instagram.com/YOUR_HANDLE",   // 👈 change this
  portfolio: "",   // example: "https://anshalmaheta.com"
  email:     "",   // example: "mailto:anshal@gmail.com"

  // ── YOUR FAVOURITE F1 TEAM ────────────────────────────────
  // This team gets highlighted in the constructor standings
  // Options: "Ferrari" | "Mercedes" | "McLaren" | "Red Bull" | etc.
  favouriteTeam: "Ferrari",

  // ── YOUR CHIPS (tags shown below your name) ───────────────
  chips: ["F1 Enthusiast", "Tifosi 🔴", "Race Analyst", "2026 Season", "Strategy Nerd"],

};

// ── F1 API ────────────────────────────────────────────────────
// Jolpica is FREE. No account, no credit card, no key needed.
// It auto-updates 30 minutes after every race. Just works.
// API URL: https://api.jolpi.ca/ergast/f1/
// Docs:    https://github.com/jolpica/jolpica-f1
//
// ⚠️  Only fill this if Jolpica goes down (very rare).
//     In that case, get a free key from openf1.org
const OPENF1_API_KEY = "";  // leave empty unless Jolpica is down

module.exports = { MY_CONFIG, OPENF1_API_KEY };
