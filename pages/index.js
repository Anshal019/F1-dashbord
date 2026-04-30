import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { TEAM_COLORS, COUNTRY_FLAGS } from "../lib/f1api";

const YOUR_NAME      = process.env.NEXT_PUBLIC_YOUR_NAME      || "Anshal Maheta";
const YOUR_INSTAGRAM = process.env.NEXT_PUBLIC_YOUR_INSTAGRAM || "#";
const YOUR_PORTFOLIO = process.env.NEXT_PUBLIC_YOUR_PORTFOLIO || "#";
const YOUR_EMAIL     = process.env.NEXT_PUBLIC_YOUR_EMAIL     || "#";

export default function Home() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [cd, setCd]           = useState({ d:0, h:0, m:0, s:0 });
  const timer = useRef(null);

  useEffect(() => {
    fetch("/api/f1data").then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  useEffect(() => {
    // Using a reliable Google library sound to prevent hotlink blocking
    const audio = new Audio("https://actions.google.com/sounds/v1/transportation/pass_by_high_speed_car.ogg");
    audio.volume = 1.0; // Max volume

    const playSound = () => {
      audio.play().catch(err => console.log("Audio play failed:", err));
      window.removeEventListener("click", playSound);
      window.removeEventListener("keydown", playSound);
      window.removeEventListener("touchstart", playSound);
    };

    // Attempt to play immediately (browsers often block this)
    audio.play().catch(() => {
      // Wait for the very first interaction to play the exhaust sound
      window.addEventListener("click", playSound);
      window.addEventListener("keydown", playSound);
      window.addEventListener("touchstart", playSound);
    });

    return () => {
      window.removeEventListener("click", playSound);
      window.removeEventListener("keydown", playSound);
      window.removeEventListener("touchstart", playSound);
    };
  }, []);


  useEffect(() => {
    if (!data?.nextRace) return;
    const t = new Date(`${data.nextRace.date}T${data.nextRace.time}`);
    timer.current = setInterval(() => {
      const diff = t - new Date();
      if (diff <= 0) return clearInterval(timer.current);
      setCd({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer.current);
  }, [data]);

  const pad = n => String(n).padStart(2, "0");
  const cfg = data?.config || {};
  const maxD = data?.drivers?.[0]?.pts || 1;
  const maxC = data?.constructors?.[0]?.pts || 1;
  const tc   = t => TEAM_COLORS[t] || "#888";
  const flag = c => COUNTRY_FLAGS[c] || "🏁";
  const posColor = p => p==1?"#ffd700":p==2?"#c0c0c0":p==3?"#cd7f32":"#888";
  const isPast = d => new Date(d) < new Date();

  const tickerItems = data ? [
    ...(data.drivers||[]).slice(0,3).map(d=>`${d.pos===1?"🏆":d.pos===2?"🥈":"🥉"} ${d.name.toUpperCase()} — ${d.pts} PTS`),
    `🏎 NEXT: ${data.nextRace?.name?.toUpperCase()||"TBA"}`,
    ...(data.constructors||[]).slice(0,3).map(c=>`🔴 ${c.team.toUpperCase()} ${c.pts} PTS`),
    `⚡ 2026 F1 · NEW ERA · NEW TEAMS`,
  ] : ["🏎 LOADING F1 DATA..."];

  const photoSrc = cfg.photoUrl && cfg.photoUrl.trim() !== "" ? cfg.photoUrl : "/anshal-avatar.png";

  return (
    <>
      <Head>
        <title>{cfg.name || "F1 Dashboard"} · 2026</title>
        <meta name="description" content={cfg.bio || "Personal F1 Dashboard"} />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      </Head>
      <style dangerouslySetInnerHTML={{ __html: `
        :root{--red:#e10600;--dark:#1a1a1a;--card:#1f1f1f;--border:#2a2a2a;--text:#f0f0f0;--muted:#888;--gold:#ffd700;--silver:#c0c0c0;--bronze:#cd7f32;--green:#00d2be;}
        *{margin:0;padding:0;box-sizing:border-box;} body{background:#0f0f0f;color:var(--text);font-family:'Barlow',sans-serif;}
        a{text-decoration:none;color:inherit;}

        .ticker{background:var(--red);padding:8px 0;overflow:hidden;position:sticky;top:0;z-index:100;}
        .ticker-inner{display:flex;animation:tick 35s linear infinite;white-space:nowrap;}
        .ticker-inner:hover{animation-play-state:paused;}
        .ti{padding:0 36px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:1px;text-transform:uppercase;}
        @keyframes tick{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

        .hero{background:linear-gradient(135deg,#0f0f0f,#1a0a0a,#0f0f0f);border-bottom:2px solid var(--red);padding:56px 40px 48px;display:flex;align-items:center;gap:44px;flex-wrap:wrap;}
        .avatar{width:156px;height:156px;border-radius:50%;border:4px solid var(--red);flex-shrink:0;overflow:hidden;box-shadow:0 0 0 6px rgba(232,0,45,.15),0 0 30px rgba(232,0,45,.3);transition:box-shadow .3s;}
        .avatar:hover{box-shadow:0 0 0 8px rgba(232,0,45,.25),0 0 50px rgba(232,0,45,.4);}
        .avatar img{width:100%;height:100%;object-fit:cover;object-position:center top;}
        .eyebrow{font-family:'Barlow Condensed',sans-serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:var(--red);font-weight:700;margin-bottom:8px;}
        .hname{font-family:'Barlow Condensed',sans-serif;font-size:60px;font-weight:900;line-height:1;text-transform:uppercase;letter-spacing:-1px;margin-bottom:8px;}
        .hname span{color:var(--red);}
        .bio{color:var(--muted);font-size:15px;line-height:1.6;max-width:580px;margin-bottom:16px;}
        .chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;}
        .chip{background:var(--card);border:1px solid var(--border);padding:4px 14px;border-radius:20px;font-size:12px;font-family:'Barlow Condensed',sans-serif;letter-spacing:1px;text-transform:uppercase;font-weight:600;}
        .chip-fav{border-color:var(--red);color:var(--red);}
        .links{display:flex;gap:10px;flex-wrap:wrap;}
        .btn{padding:9px 22px;border-radius:4px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:14px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;border:none;transition:all .2s;display:inline-block;}
        .btn-red{background:var(--red);color:#fff;} .btn-red:hover{background:#c00500;}
        .btn-out{border:2px solid var(--border);color:var(--muted);background:transparent;} .btn-out:hover{border-color:var(--red);color:var(--text);}

        .wrap{max-width:1380px;margin:0 auto;padding:28px 22px;}
        .slabel{font-family:'Barlow Condensed',sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--red);font-weight:700;margin-bottom:4px;}
        .shead{font-family:'Barlow Condensed',sans-serif;font-size:30px;font-weight:900;text-transform:uppercase;margin-bottom:20px;line-height:1;}

        .nr{background:linear-gradient(135deg,var(--card),#250a0a);border:1px solid var(--red);border-radius:8px;padding:28px 30px;margin-bottom:28px;display:flex;align-items:center;gap:28px;flex-wrap:wrap;}
        .nrflag{font-size:52px;line-height:1;}
        .nrround{font-family:'Barlow Condensed',sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--red);margin-bottom:4px;}
        .nrname{font-family:'Barlow Condensed',sans-serif;font-size:34px;font-weight:900;text-transform:uppercase;line-height:1;margin-bottom:4px;}
        .nrdate{color:var(--muted);font-size:14px;}
        .cd{display:flex;gap:12px;flex-wrap:wrap;}
        .cdb{text-align:center;background:rgba(225,6,0,.12);border:1px solid rgba(225,6,0,.3);border-radius:6px;padding:12px 18px;min-width:66px;}
        .cdn{font-family:'Barlow Condensed',sans-serif;font-size:38px;font-weight:900;color:var(--red);line-height:1;display:block;}
        .cdl{font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-top:2px;}

        .card{background:var(--card);border:1px solid var(--border);border-radius:8px;overflow:hidden;margin-bottom:26px;}
        .cardh{padding:16px 22px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;}
        .cardt{font-family:'Barlow Condensed',sans-serif;font-size:19px;font-weight:800;text-transform:uppercase;letter-spacing:1px;}
        .live{display:inline-flex;align-items:center;gap:5px;font-size:11px;color:var(--green);font-family:'Barlow Condensed',sans-serif;letter-spacing:1px;text-transform:uppercase;}
        .ldot{width:7px;height:7px;background:var(--green);border-radius:50%;animation:pulse 2s infinite;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}

        table{width:100%;border-collapse:collapse;}
        th{padding:9px 15px;text-align:left;font-family:'Barlow Condensed',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);font-weight:700;background:rgba(255,255,255,.02);border-bottom:1px solid var(--border);}
        td{padding:11px 15px;border-bottom:1px solid rgba(255,255,255,.04);font-size:14px;}
        tr:last-child td{border-bottom:none;} tr:hover td{background:rgba(225,6,0,.04);}
        .pn{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:18px;}
        .dn{font-weight:600;} .ds{font-size:12px;color:var(--muted);}
        .pv{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:16px;}
        .dot{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px;}
        .bg{background:rgba(255,255,255,.05);border-radius:4px;height:5px;overflow:hidden;margin-top:4px;}
        .bf{height:100%;border-radius:4px;transition:width .8s ease;}

        .podium{display:flex;gap:14px;padding:22px;flex-wrap:wrap;}
        .ps{flex:1;min-width:130px;border-radius:8px;padding:18px 14px;text-align:center;}
        .p1{background:linear-gradient(135deg,#3d2c00,#1a1200);border:1px solid var(--gold);}
        .p2{background:linear-gradient(135deg,#1e1e1e,#141414);border:1px solid var(--silver);margin-top:20px;}
        .p3{background:linear-gradient(135deg,#1e140a,#0f0a06);border:1px solid var(--bronze);margin-top:40px;}
        .pp{font-family:'Barlow Condensed',sans-serif;font-size:44px;font-weight:900;line-height:1;}
        .pd{font-family:'Barlow Condensed',sans-serif;font-size:19px;font-weight:800;text-transform:uppercase;margin-top:6px;}
        .pt{font-size:12px;color:var(--muted);margin-top:3px;}
        .ptime{font-size:12px;color:var(--muted);margin-top:6px;font-family:monospace;}

        .cg{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px;padding:18px;}
        .ri{border:1px solid var(--border);border-radius:6px;padding:13px 15px;display:flex;align-items:center;gap:12px;transition:border-color .2s;}
        .ri:hover{border-color:var(--red);} .ri.done{opacity:.55;} .ri.nxt{border-color:var(--red);background:rgba(225,6,0,.06);}
        .rnum{font-family:'Barlow Condensed',sans-serif;font-size:26px;font-weight:900;color:var(--border);min-width:34px;}
        .ri.nxt .rnum{color:var(--red);} .rflag{font-size:22px;}
        .rgp{font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;}
        .rdt{font-size:12px;color:var(--muted);margin-top:2px;}
        .badge{font-family:'Barlow Condensed',sans-serif;font-size:9px;letter-spacing:1px;text-transform:uppercase;font-weight:700;padding:2px 6px;border-radius:3px;margin-top:4px;display:inline-block;}
        .bd{background:rgba(255,255,255,.05);color:var(--muted);}
        .bn{background:var(--red);color:#fff;}
        .bs{background:rgba(0,210,190,.12);color:var(--green);border:1px solid rgba(0,210,190,.3);margin-left:4px;}
        .bfav{background:rgba(232,0,45,.15);color:var(--red);border:1px solid rgba(232,0,45,.3);}

        .two{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-bottom:26px;}
        .load{text-align:center;padding:80px 20px;}
        .spin{width:48px;height:48px;border:3px solid var(--border);border-top:3px solid var(--red);border-radius:50%;animation:spin .8s linear infinite;margin:0 auto 16px;}
        @keyframes spin{to{transform:rotate(360deg)}}
        footer{border-top:1px solid var(--border);padding:22px;text-align:center;color:var(--muted);font-size:13px;}
        footer span{color:var(--red);}
        .upd{font-size:11px;color:#444;margin-top:6px;}

        @media(max-width:900px){.two{grid-template-columns:1fr;}.hero{padding:36px 20px;gap:28px;}.hname{font-size:40px;}}
        @media(max-width:580px){.cdb{padding:10px 12px;min-width:50px;}.cdn{font-size:26px;}.hname{font-size:32px;}.podium{flex-direction:column;}.p2,.p3{margin-top:0;}}
      `}} />

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="ti">{t}</span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="avatar">
          <img src={photoSrc} alt={cfg.name || "F1 Fan"} />
        </div>
        <div>
          <div className="eyebrow">🏁 F1 Fan · Pit Wall Builder · Race Analyst</div>
          <div className="hname">
            {(cfg.name || "YOUR NAME").split(" ").map((w, i) => (
              <span key={i} style={i === 1 ? { color: "var(--red)" } : {}}>{w} </span>
            ))}
          </div>
          <div className="bio">{cfg.bio || "F1 enthusiast and pit wall builder."}</div>
          <div className="chips">
            {(cfg.chips || ["F1 Enthusiast"]).map((c, i) => (
              <span key={i} className={`chip ${i === 0 ? "chip-fav" : ""}`}>{c}</span>
            ))}
          </div>
          <div className="links">
            {cfg.instagram && <a href={cfg.instagram} target="_blank" className="btn btn-red">📸 Instagram</a>}
            {cfg.portfolio  && <a href={cfg.portfolio}  target="_blank" className="btn btn-out">🌐 Portfolio</a>}
            {cfg.email      && <a href={cfg.email}      className="btn btn-out">📧 Contact</a>}
          </div>
        </div>
      </div>

      <div className="wrap">
        {loading && <div className="load"><div className="spin"/><p style={{color:"var(--muted)"}}>Fetching live F1 data…</p></div>}
        {error   && <div style={{textAlign:"center",padding:40,color:"var(--muted)"}}>⚠️ {error}</div>}

        {data && <>
          {/* NEXT RACE */}
          {data.nextRace && (
            <div className="nr">
              <div className="nrflag">{flag(data.nextRace.country)}</div>
              <div style={{flex:1,minWidth:180}}>
                <div className="nrround">Round {data.nextRace.round} · Next Race</div>
                <div className="nrname">{data.nextRace.name}</div>
                <div className="nrdate">{new Date(data.nextRace.date).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})} · {data.nextRace.circuit}</div>
              </div>
              <div className="cd">
                {[["d","Days"],["h","Hrs"],["m","Min"],["s","Sec"]].map(([k,l])=>(
                  <div key={k} className="cdb"><span className="cdn">{pad(cd[k])}</span><span className="cdl">{l}</span></div>
                ))}
              </div>
            </div>
          )}

          {/* PODIUM */}
          {data.lastRace && (
            <>
              <div className="slabel">Last Race</div>
              <div className="shead">{data.lastRace.name}</div>
              <div className="card">
                <div className="cardh">
                  <span className="cardt">🏆 Race Podium</span>
                  <span className="live"><span className="ldot"/>Round {data.lastRace.round} Result</span>
                </div>
                <div className="podium">
                  {[1,0,2].map(i => {
                    const p = data.lastRace.podium[i];
                    if (!p) return null;
                    const pos = parseInt(p.pos);
                    return (
                      <div key={pos} className={`ps p${pos}`}>
                        <div className="pp" style={{color:posColor(pos)}}>{pos}</div>
                        <div className="pd">{p.name.split(" ").pop()}</div>
                        <div className="pt">{p.team}</div>
                        <div className="ptime">{p.time}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* STANDINGS */}
          <div className="slabel">2026 Championship</div>
          <div className="shead">Live Standings</div>
          <div className="two">
            <div className="card">
              <div className="cardh">
                <span className="cardt">👨‍🏎️ Drivers</span>
                <span className="live"><span className="ldot"/>Live</span>
              </div>
              <table>
                <thead><tr><th>Pos</th><th>Driver</th><th>Team</th><th>Pts</th><th style={{minWidth:80}}>Gap</th></tr></thead>
                <tbody>
                  {data.drivers.map(d => (
                    <tr key={d.pos}>
                      <td><span className="pn" style={{color:posColor(d.pos)}}>{d.pos}</span></td>
                      <td><div className="dn">{d.name}</div><div className="ds">{d.nat}</div></td>
                      <td style={{fontSize:12,color:"var(--muted)"}}>
                        <span className="dot" style={{background:tc(d.team)}}/>
                        {d.team}
                        {d.team === cfg.favouriteTeam && <span className="badge bfav" style={{marginLeft:6}}>⭐ Fav</span>}
                      </td>
                      <td><span className="pv">{d.pts}</span></td>
                      <td>
                        <div style={{fontSize:11,color:"var(--muted)"}}>{d.pts===maxD?"Leader":`-${maxD-d.pts}`}</div>
                        <div className="bg"><div className="bf" style={{width:`${Math.round(d.pts/maxD*100)}%`,background:tc(d.team)}}/></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card">
              <div className="cardh">
                <span className="cardt">🏭 Constructors</span>
                <span className="live"><span className="ldot"/>Live</span>
              </div>
              <table>
                <thead><tr><th>Pos</th><th>Team</th><th>Pts</th><th style={{minWidth:100}}>Championship</th></tr></thead>
                <tbody>
                  {data.constructors.map(c => (
                    <tr key={c.pos}>
                      <td><span className="pn" style={{color:posColor(c.pos)}}>{c.pos}</span></td>
                      <td>
                        <span className="dot" style={{background:tc(c.team)}}/>
                        <strong>{c.team}</strong>
                        {c.team === cfg.favouriteTeam && <span className="badge bfav" style={{marginLeft:6}}>⭐</span>}
                      </td>
                      <td><span className="pv">{c.pts}</span></td>
                      <td>
                        <div className="bg"><div className="bf" style={{width:`${maxC>0?Math.round(c.pts/maxC*100):0}%`,background:tc(c.team)}}/></div>
                        <div style={{fontSize:11,color:"var(--muted)",marginTop:3}}>{c.pts===maxC?"Leaders":`-${maxC-c.pts}`}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CALENDAR */}
          <div className="slabel">2026 Season</div>
          <div className="shead">Race Calendar</div>
          <div className="card">
            <div className="cg">
              {data.schedule.map(r => {
                const done = isPast(r.date);
                const isNext = data.nextRace && r.round === parseInt(data.nextRace.round);
                return (
                  <div key={r.round} className={`ri ${done?"done":""} ${isNext?"nxt":""}`}>
                    <div className="rnum">{String(r.round).padStart(2,"0")}</div>
                    <div className="rflag">{flag(r.country)}</div>
                    <div style={{flex:1}}>
                      <div className="rgp">{r.name.replace(" Grand Prix","").replace(" GP","")}</div>
                      <div className="rdt">{new Date(r.date).toLocaleDateString("en-GB",{day:"numeric",month:"short"})} · {r.locality}</div>
                      <div>
                        {done  && <span className="badge bd">Done</span>}
                        {isNext && <span className="badge bn">Next ▶</span>}
                        {r.sprint && <span className="badge bs">Sprint</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>}
      </div>

      <footer>
        Built by <span>{cfg.name || "Anshal Maheta"}</span> &nbsp;·&nbsp;
        Data: Jolpica F1 API (free, auto-updates) &nbsp;·&nbsp;
        <span>2026 Season</span>
        {data?.updatedAt && <div className="upd">Last fetched: {new Date(data.updatedAt).toLocaleString()}</div>}
      </footer>
    </>
  );
}
