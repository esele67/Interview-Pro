import React from "react";
import { DSA_TOPICS, TECH_COURSES, CS_FUNDAMENTALS, SYSTEM_DESIGN_TOPICS, storage } from "./data";
import { useAuth } from "./Auth";
import { Icons } from "./Icons";

const TOTAL_DSA     = DSA_TOPICS.reduce((s, t) => s + t.questions.length, 0);
const TOTAL_COURSES = TECH_COURSES.reduce((s, t) => s + t.modules.length, 0);
const TOTAL_CS      = CS_FUNDAMENTALS.reduce((s, t) => s + t.topics.length, 0);
const TOTAL_SD      = SYSTEM_DESIGN_TOPICS.reduce((s, t) => s + t.topics.length, 0);

function countDone(topics, prefix) {
  return topics.reduce((s, t) => s + new Set(storage.get(`${prefix}_${t.id}`, [])).size, 0);
}

const QUOTES = [
  "Every expert was once a beginner. Keep going.",
  "Consistency beats talent every single time.",
  "Your future self is watching you right now.",
  "Hard problems build strong engineers.",
  "One problem a day keeps the rejection away.",
  "The best time to start was yesterday. Now is next.",
];

const SECTION_ICONS = {
  dsa:           () => <Icons.Code />,
  courses:       () => <Icons.Courses />,
  cs:            () => <Icons.Computer />,
  "system-design": () => <Icons.SystemDesign />,
};

export default function Dashboard({ navigate }) {
  const { user } = useAuth();
  const dsaDone     = countDone(DSA_TOPICS,          "dsa");
  const coursesDone = countDone(TECH_COURSES,         "course");
  const csDone      = countDone(CS_FUNDAMENTALS,      "cs");
  const sdDone      = countDone(SYSTEM_DESIGN_TOPICS, "sd");
  const totalDone   = dsaDone + coursesDone + csDone + sdDone;
  const totalAll    = TOTAL_DSA + TOTAL_COURSES + TOTAL_CS + TOTAL_SD;
  const overallPct  = totalAll ? Math.round((totalDone / totalAll) * 100) : 0;
  const quote       = QUOTES[Math.floor(Date.now() / 86400000) % QUOTES.length];
  const firstName   = user?.name?.split(" ")[0] || "there";

  const sections = [
    { label: "DSA Problems",    done: dsaDone,     total: TOTAL_DSA,     color: "#6C7EFF", nav: "dsa",           icon: "dsa"           },
    { label: "Tech Courses",    done: coursesDone, total: TOTAL_COURSES, color: "#2ECC8F", nav: "courses",       icon: "courses"       },
    { label: "CS Fundamentals", done: csDone,      total: TOTAL_CS,      color: "#F5C842", nav: "cs",            icon: "cs"            },
    { label: "System Design",   done: sdDone,      total: TOTAL_SD,      color: "#9B8EFF", nav: "system-design", icon: "system-design" },
  ];

  const headline = overallPct === 0 ? "Let's get started"
    : overallPct < 30 ? "Building momentum"
    : overallPct < 60 ? "Making great progress"
    : overallPct < 90 ? "Almost interview ready"
    : "Offer incoming";

  const quickLinks = [
    { label: "Mock Timer",       nav: "mock-timer",    Icon: Icons.Timer,     color: "#F5954A",
      desc: "Practice timed coding sessions" },
    { label: "Behavioral Prep",  nav: "behavioral",    Icon: Icons.Mic,       color: "#F472B6",
      desc: "Master STAR-format answers" },
    { label: "Company Boards",   nav: "companies",     Icon: Icons.Company,   color: "#60A5FA",
      desc: "Study specific company patterns" },
    { label: "Resume Checklist", nav: "resume",        Icon: Icons.FileCheck, color: "#A3E635",
      desc: "Review your resume line by line" },
    { label: "Resources Hub",    nav: "resources",     Icon: Icons.Book,      color: "#9B8EFF",
      desc: "Curated courses and tools" },
    { label: "Interview Log",    nav: "interview-log", Icon: Icons.Clipboard, color: "#F5C842",
      desc: "Track every interview you attend" },
  ];

  return (
    <div className="page-content">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #11141F 0%, #171B28 100%)",
        border: "1px solid rgba(108,126,255,0.14)", borderRadius: 18,
        padding: "26px 28px 24px", marginBottom: 20,
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        gap: 16, minHeight: 160,
      }}>
        <div style={{ position: "absolute", top: -60, left: -40, width: 240, height: 240, background: "radial-gradient(circle, rgba(108,126,255,0.09) 0%, transparent 70%)", pointerEvents: "none" }}/>
        <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--muted)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 7 }}>
            Hey {firstName}
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(17px, 3vw, 23px)", fontWeight: 800, letterSpacing: -0.6, lineHeight: 1.2, marginBottom: 5 }}>
            {headline}
          </div>
          <div style={{ color: "var(--text2)", fontSize: 12.5, fontStyle: "italic", marginBottom: 20, lineHeight: 1.5 }}>
            "{quote}"
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 140 }}>
              <div className="prog-bar-track" style={{ height: 7, borderRadius: 99 }}>
                <div className="prog-bar-fill" style={{ width: `${overallPct}%`, background: "linear-gradient(90deg, #6C7EFF, #2ECC8F)", borderRadius: 99 }}/>
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 900, color: "var(--accent)", letterSpacing: -1, flexShrink: 0 }}>
              {overallPct}%
            </div>
            <div style={{ fontSize: 11.5, color: "var(--muted)", flexShrink: 0, fontFamily: "var(--font-mono)" }}>
              <span style={{ color: "var(--text)" }}>{totalDone}</span>/{totalAll}
            </div>
          </div>
        </div>
        <div style={{ position: "relative", flexShrink: 0, alignSelf: "flex-end", zIndex: 1, marginBottom: -24, marginRight: -4 }}>
          <img src="/avatar.png" alt="" style={{ height: 148, width: "auto", objectFit: "contain", objectPosition: "bottom", display: "block", filter: "drop-shadow(0 4px 20px rgba(108,126,255,0.25))", userSelect: "none" }} onError={e => { e.target.style.display = "none"; }}/>
        </div>
      </div>

      {/* ── SECTION CARDS ──────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 24 }}>
        {sections.map(s => {
          const pct = s.total ? Math.round((s.done / s.total) * 100) : 0;
          const SectionIcon = SECTION_ICONS[s.icon];
          return (
            <div key={s.nav} className="card" onClick={() => navigate(s.nav)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: `${s.color}18`, color: s.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <SectionIcon />
                </div>
                <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", fontWeight: 700, color: pct === 100 ? "var(--green)" : s.color }}>
                  {pct}%
                </span>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 13.5, fontWeight: 700, marginBottom: 3, letterSpacing: -0.2 }}>{s.label}</div>
              <div style={{ fontSize: 11.5, color: "var(--muted)", marginBottom: 10 }}>{s.done} / {s.total} done</div>
              <div className="prog-bar-track">
                <div className="prog-bar-fill" style={{ width: `${pct}%`, background: pct === 100 ? "var(--green)" : s.color }}/>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── QUICK ACCESS ───────────────────────────────────────────────── */}
      <div style={{ marginBottom: 20 }}>
        <div className="section-title" style={{ marginBottom: 12 }}>Quick Access</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
          {quickLinks.map(a => (
            <button key={a.nav} onClick={() => navigate(a.nav)}
              style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "11px 13px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 7, color: "var(--text)", fontFamily: "var(--font-body)", textAlign: "left", transition: "all 0.13s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${a.color}15`, color: a.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <a.Icon />
              </div>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: -0.1 }}>{a.label}</div>
                <div style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 1, lineHeight: 1.4 }}>{a.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── TIP ────────────────────────────────────────────────────────── */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 700, color: "var(--text2)", marginBottom: 5 }}>
          <span style={{ color: "var(--accent)" }}><Icons.Lightbulb /></span>
          Daily Tip
        </div>
        <div style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.6 }}>
          Aim for <span style={{ color: "var(--accent)", fontWeight: 700 }}>2 DSA problems</span> + <span style={{ color: "var(--green)", fontWeight: 700 }}>1 system design topic</span> daily. Consistency over intensity always wins interviews.
        </div>
      </div>
    </div>
  );
}