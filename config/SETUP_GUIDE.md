# 🏎 ANSHAL MAHETA — F1 DASHBOARD SETUP GUIDE
# Read this once, follow steps, done forever.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 TOTAL TIME: ~15 minutes
 COST: ₹0 (completely free)
 CODING NEEDED: Zero
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 0 — WHAT YOU NEED INSTALLED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Install these first (only once ever):

  Node.js  →  go to nodejs.org → click "Download Node.js (LTS)" → install
  Git      →  go to git-scm.com → download for your OS → install

To check if they're installed, open Terminal (Mac) or Command Prompt (Windows):
  node --version    ← should show v18 or higher
  git --version     ← should show any version

Done? Move to Step 1.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 — FILL YOUR CONFIG FILE (2 minutes)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open the file:  config/.env.local

Fill ONLY these lines (the rest are already set):

  NEXT_PUBLIC_YOUR_NAME        → your name (already set as "Anshal Maheta")
  NEXT_PUBLIC_YOUR_INSTAGRAM   → your Instagram URL
  NEXT_PUBLIC_YOUR_PORTFOLIO   → your website (if you have one)
  NEXT_PUBLIC_YOUR_EMAIL       → your email

The F1 API lines are ALREADY FILLED — you don't touch them.
The optional sections (Telegram, Email) can be left blank.

Save the file. Done.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2 — COPY CONFIG FILE TO ROOT (30 seconds)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The .env.local file needs to be in the main project folder.

  Mac/Linux:
    Open Terminal inside the f1-anshal folder, then run:
    cp config/.env.local .env.local

  Windows:
    Open Command Prompt inside the f1-anshal folder, then run:
    copy config\.env.local .env.local

That's it. The project now reads your config.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3 — RUN IT LOCALLY (test before deploying)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open Terminal inside the f1-anshal folder:

  npm install         ← downloads the packages (one time only)
  npm run dev         ← starts the server

Open your browser → go to:  http://localhost:3000

You should see your F1 dashboard with live data!

To stop the server: press Ctrl+C in the terminal.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 4 — PUSH TO GITHUB (2 minutes)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  1. Go to github.com → Sign up / Log in (free)
  2. Click the "+" button top right → "New repository"
  3. Name it: f1-dashboard
  4. Keep it Public → click "Create repository"
  5. GitHub shows you commands — copy the ones that say
     "…or push an existing repository"

In your Terminal (inside the f1-anshal folder):

  git init
  git add .
  git commit -m "F1 Dashboard by Anshal Maheta"
  git branch -M main
  git remote add origin https://github.com/YOUR_USERNAME/f1-dashboard.git
  git push -u origin main

Replace YOUR_USERNAME with your actual GitHub username.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 5 — DEPLOY ON VERCEL (3 minutes, free forever)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  1. Go to vercel.com → click "Sign Up" → choose "Continue with GitHub"
  2. Click "Add New Project"
  3. Find your "f1-dashboard" repo → click "Import"
  4. You see a settings page:
       Framework Preset  → Next.js (auto-detected, don't change)
       Root Directory    → leave blank
       Build Command     → leave blank
  5. Click "Environment Variables" section
     Add each line from your config/.env.local here:
       Name  = NEXT_PUBLIC_YOUR_NAME
       Value = Anshal Maheta
       → click Add
     (Repeat for each line that has a value)
  6. Click "Deploy"
  7. Wait ~60 seconds → Vercel shows: "Congratulations!"

Your live URL appears at the top, something like:
  https://f1-dashboard-anshal-maheta.vercel.app

Copy it. Paste it in your Instagram bio. Set it as your browser homepage. Done!


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 6 — SET AS BROWSER HOMEPAGE (optional, 1 min)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Chrome  → Settings → On startup → Open a specific page → paste your URL
  Safari  → Settings → General → Homepage → paste your URL
  Firefox → Settings → Home → Custom URLs → paste your URL


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HOW AUTO-UPDATE WORKS (no action needed from you)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Race finishes
    ↓ (~30 minutes later)
  Jolpica F1 API updates with new results
    ↓ (when next visitor opens your site)
  Your backend fetches fresh data
    ↓
  Dashboard shows new standings, podium, calendar

You do NOTHING. It just works.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OPTIONAL — TELEGRAM RACE ALERTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Get a Telegram message after every race with the podium result.

  1. Open Telegram on your phone
  2. Search: @BotFather → open it → tap "Start"
  3. Send this message: /newbot
  4. It asks for a name → type: Anshal F1 Bot
  5. It asks for a username → type: anshal_f1_bot
     (if taken, try: anshal_maheta_f1bot)
  6. BotFather replies with a TOKEN like:
       1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
     Copy that. Paste as TELEGRAM_BOT_TOKEN in your .env.local

  7. To get your Chat ID:
     Search: @userinfobot in Telegram
     Send any message to it
     It replies: "Your ID: 987654321"
     Paste that as TELEGRAM_CHAT_ID in your .env.local

  8. Copy the updated .env.local to root again (step 2)
  9. Redeploy on Vercel:
       Go to vercel.com → your project → Settings → Environment Variables
       Add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID
       Go to Deployments → click "Redeploy"

After every race → you get a Telegram message like:
  🏁 Miami GP done!
  🥇 Antonelli (Mercedes)
  🥈 Norris (McLaren)
  🥉 Leclerc (Ferrari)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TROUBLESHOOTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "npm: command not found"
  → Node.js is not installed. Go back to Step 0.

  Dashboard loads but shows old data
  → Wait 1 hour. The API caches for 1 hour after a race.

  Vercel deploy fails
  → Make sure you pushed ALL files including package.json
  → In Vercel, make sure Framework = Next.js

  My photo doesn't show
  → Check that anshal-avatar.png is in the public/ folder
  → Redeploy after adding it

  Anything else?
  → Paste your error into Claude and ask for help!


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILES IN THIS PROJECT (what each does)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  config/
    .env.local        ← YOUR CONFIG — fill this first

  lib/
    f1api.js          ← Connects to F1 API, fetches data

  pages/
    index.js          ← Your dashboard (what you see)
    api/f1data.js     ← Backend — fetches & serves F1 data

  public/
    anshal-avatar.png ← Your photo

  package.json        ← Project info (don't touch)
  next.config.js      ← Next.js settings (don't touch)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built for Anshal Maheta 🏎 · Tifosi Forever 🔴
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
