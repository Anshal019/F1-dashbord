// lib/f1api.js — reads base URLs from config/.env.local

const F1_BASE     = process.env.NEXT_PUBLIC_F1_API_BASE  || 'https://api.jolpi.ca/ergast/f1';
const OPENF1_BASE = process.env.NEXT_PUBLIC_OPENF1_BASE  || 'https://api.openf1.org/v1';

export async function getDriverStandings() {
  const res = await fetch(`${F1_BASE}/current/driverStandings.json`, { next: { revalidate: 3600 } });
  const data = await res.json();
  const list = data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings || [];
  return list.map(d => ({
    pos: parseInt(d.position), name: `${d.Driver.givenName} ${d.Driver.familyName}`,
    code: d.Driver.code, nat: d.Driver.nationality,
    team: d.Constructors?.[0]?.name || '', pts: parseFloat(d.points), wins: parseInt(d.wins),
  }));
}

export async function getConstructorStandings() {
  const res = await fetch(`${F1_BASE}/current/constructorStandings.json`, { next: { revalidate: 3600 } });
  const data = await res.json();
  const list = data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings || [];
  return list.map(c => ({ pos: parseInt(c.position), team: c.Constructor.name, pts: parseFloat(c.points), wins: parseInt(c.wins) }));
}

export async function getSchedule() {
  const res = await fetch(`${F1_BASE}/current.json`, { next: { revalidate: 86400 } });
  const data = await res.json();
  return (data?.MRData?.RaceTable?.Races || []).map(r => ({
    round: parseInt(r.round), name: r.raceName, circuit: r.Circuit.circuitName,
    country: r.Circuit.Location.country, locality: r.Circuit.Location.locality,
    date: r.date, time: r.time || '12:00:00Z', sprint: !!r.Sprint,
  }));
}

export async function getLastRaceResult() {
  const res = await fetch(`${F1_BASE}/current/last/results.json`, { next: { revalidate: 3600 } });
  const data = await res.json();
  const race = data?.MRData?.RaceTable?.Races?.[0];
  if (!race) return null;
  return {
    name: race.raceName, circuit: race.Circuit.circuitName, date: race.date, round: race.round,
    podium: (race.Results || []).slice(0,3).map(r => ({
      pos: r.position, name: `${r.Driver.givenName} ${r.Driver.familyName}`,
      team: r.Constructor.name, time: r.Time?.time || r.status || '', points: r.points,
    })),
  };
}

export async function getNextRace(schedule) {
  const now = new Date();
  return schedule.find(r => new Date(r.date + 'T' + r.time) > now) || null;
}

export const TEAM_COLORS = {
  'Mercedes':'#00d2be','Ferrari':'#e8002d','McLaren':'#ff8000',
  'Haas F1 Team':'#b6babd','Alpine F1 Team':'#0090ff','Red Bull':'#3671c6',
  'RB F1 Team':'#6692ff','Audi':'#e40045','Williams':'#64c4ff',
  'Cadillac':'#333333','Aston Martin':'#358c75',
};

export const COUNTRY_FLAGS = {
  'Australia':'🇦🇺','China':'🇨🇳','Japan':'🇯🇵','Bahrain':'🇧🇭','Saudi Arabia':'🇸🇦',
  'USA':'🇺🇸','United States':'🇺🇸','Canada':'🇨🇦','Monaco':'🇲🇨','Spain':'🇪🇸',
  'Austria':'🇦🇹','UK':'🇬🇧','United Kingdom':'🇬🇧','Belgium':'🇧🇪','Hungary':'🇭🇺',
  'Netherlands':'🇳🇱','Italy':'🇮🇹','Azerbaijan':'🇦🇿','Singapore':'🇸🇬',
  'Mexico':'🇲🇽','Brazil':'🇧🇷','Qatar':'🇶🇦','Abu Dhabi':'🇦🇪',
};
