// pages/api/f1data.js
// Backend API route — Vercel runs this server-side
// Reads your personal config from .env.local and merges with live F1 data

import {
  getDriverStandings, getConstructorStandings,
  getSchedule, getLastRaceResult, getNextRace,
} from '../../lib/f1api';

export default async function handler(req, res) {
  try {
    const [drivers, constructors, schedule, lastRace] = await Promise.all([
      getDriverStandings(), getConstructorStandings(),
      getSchedule(), getLastRaceResult(),
    ]);
    const nextRace = await getNextRace(schedule);

    // Personal config from my-config.js — sent to frontend
    const { MY_CONFIG } = require('../../my-config');
    const config = MY_CONFIG;

    // Cache 1 hour on Vercel CDN — auto-refreshes after that
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

    res.status(200).json({
      config, drivers, constructors, schedule,
      lastRace, nextRace,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('F1 API error:', err);
    res.status(500).json({ error: 'Failed to fetch F1 data', details: err.message });
  }
}
