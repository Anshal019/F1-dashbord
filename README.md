# 🏎 Anshal Maheta — F1 Dashboard 2026
Auto-updating personal F1 dashboard. One config file. Zero maintenance.

---

## ✅ STEP 1 — Edit my-config.js (THE ONLY FILE YOU TOUCH)

Open `my-config.js` and fill in your details:

```js
name:        "Anshal Maheta",
instagram:   "https://instagram.com/your_handle",   // ← change this
portfolio:   "https://yourwebsite.com",              // ← or leave ""
email:       "mailto:you@gmail.com",                 // ← or leave ""
favouriteTeam: "Ferrari",                            // ← your fav team
```

Save the file. That's it for personalizing.

---

## ✅ STEP 2 — Test it locally

```bash
npm install
npm run dev
```
Open http://localhost:3000 — you'll see your dashboard with live data.

---

## ✅ STEP 3 — Deploy free on Vercel

### 3a. Push to GitHub
```bash
git init
git add .
git commit -m "F1 Dashboard by Anshal Maheta"
```
Go to github.com → New repository → name it `f1-dashboard` → copy the commands it gives you → paste in terminal.

### 3b. Deploy on Vercel
1. Go to vercel.com → Sign up free with GitHub
2. Click "Add New Project"
3. Select your `f1-dashboard` repo
4. Click Deploy (no settings to change!)
5. ✅ Done! You get a live link instantly.

---

## 🔄 How Auto-Update Works

```
Race ends  →  Jolpica API updates (30 min later)
           →  Your /api/f1data fetches fresh data
           →  Dashboard shows new standings automatically
```

NO manual work. NO cron jobs. NO database.
The API is FREE. No account needed. No API key needed.

API used: https://api.jolpi.ca/ergast/f1/
It updates after every single race, all season.

---

## 📁 Project Files Explained

```
my-config.js          ← 👈 THE ONLY FILE YOU EDIT
├── lib/f1api.js       ← fetches from Jolpica API (don't touch)
├── pages/
│   ├── api/f1data.js  ← backend API route (don't touch)
│   └── index.js       ← dashboard UI (don't touch)
├── public/
│   └── anshal-avatar.png  ← your photo (already included)
└── package.json       ← dependencies (don't touch)
```

---

## ❓ FAQ

**Q: Does it really auto-update?**
A: Yes. The backend caches data for 1 hour. After each race, within 1.5 hours, your dashboard shows the new standings. Automatically.

**Q: What if I want to change my photo?**
A: Replace `public/anshal-avatar.png` with your own image (keep the same filename). Or set `photoUrl` in my-config.js to any image URL.

**Q: What if Jolpica API is down?**
A: Very rare. If it happens, the dashboard shows the last cached data. Usually back up within hours.

**Q: I updated my-config.js. How do I publish the change?**
A: Just run: `git add . && git commit -m "update config" && git push`
Vercel auto-deploys in 30 seconds.

