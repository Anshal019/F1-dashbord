# 🏎 Anshal Maheta — F1 Dashboard 2026

A modern, auto-updating personal Formula 1 dashboard built to track the entire 2026 season in real-time. This project serves as a centralized hub for all F1 data, featuring a premium dark-mode aesthetic and live statistics.

## ✨ Features

- **Live Championship Standings:** Real-time tracking of both Driver and Constructor points, including gaps to the leader and interactive progress bars.
- **Next Race Countdown:** A live countdown timer for the upcoming Grand Prix, including the track name, round number, and specific date/time.
- **Interactive Calendar:** A complete schedule of the 2026 season, highlighting completed races, sprint weekends, and the next destination.
- **Race Results:** Instant updates on the latest podium finishers (P1, P2, P3) complete with team colors and race times.
- **Personalized Profile:** A customizable hero section featuring the creator's avatar, bio, favorite team badge, and social links.
- **Auto-Updating Data:** Powered by a free, no-authentication-required API that automatically refreshes within hours of a race finishing.

## 🛠 Tech Stack

- **Frontend Framework:** Next.js 14 / React 18
- **Styling:** Vanilla CSS with custom CSS variables for team colors, responsive media queries, and dynamic animations.
- **Data Source:** [Jolpica F1 API](https://api.jolpi.ca/ergast/f1/) (Free, open-source racing data API)
- **Deployment:** Vercel

## 📁 Project Architecture

The dashboard is designed to be lightweight and modular:
- **`pages/index.js`:** The main dashboard UI, containing all the frontend React components (Hero, Ticker, Standings, Calendar).
- **`pages/api/f1data.js`:** The backend serverless function that handles data fetching, formatting, and caching to ensure the dashboard loads instantly.
- **`lib/f1api.js`:** Utility functions including mappings for official F1 team colors and country flags.
- **`my-config.js` / `.env.local`:** Configuration files that control the personalized text, images, and API endpoints without altering the core codebase.

## 🏁 Design Philosophy

The interface was built with a "Pit Wall" aesthetic in mind—prioritizing data density, high contrast, and immediate readability. It uses official team hex codes to instantly visually communicate who is leading the championship, while maintaining a sleek, minimal, and modern web application feel.
