import React, { useState, useEffect, useRef, useCallback } from "react";
import { COMPANIES, BEHAVIORAL_CATEGORIES, RESOURCES, storage } from "./data";
import { Icons } from "./Icons";

// Maps string keys from data.js icon fields to actual SVG components
function IconByKey({ name }) {
  const map = {
    Crown: Icons.Crown, Shield: Icons.Shield, Trophy: Icons.Trophy,
    TrendUp: Icons.TrendUp, Target: Icons.Target, Clipboard: Icons.Clipboard,
    SystemDesign: Icons.SystemDesign, Book: Icons.Book, Play: Icons.Play,
    Globe: Icons.Globe, Code: Icons.Code, Computer: Icons.Computer,
    Lightbulb: Icons.Lightbulb, Mic: Icons.Mic,
  };
  const Comp = map[name];
  return Comp ? <Comp /> : null;
}

// ─── COMPANY BOARDS ──────────────────────────────────────────────────────────
export function CompanyBoards() {
  const [active, setActive] = useState(null);
  const [checked, setChecked] = useState(() => {
    const init = {};
    COMPANIES.forEach(c => { init[c.id] = new Set(storage.get(`company_${c.id}`, [])); });
    return init;
  });

  const toggle = useCallback((companyId, qId) => {
    setChecked(prev => {
      const set = new Set(prev[companyId]);
      set.has(qId) ? set.delete(qId) : set.add(qId);
      storage.set(`company_${companyId}`, [...set]);
      return { ...prev, [companyId]: set };
    });
  }, []);

  const company = active ? COMPANIES.find(c => c.id === active) : null;

  if (company) {
    const checkedSet = checked[company.id];
    return (
      <div className="page-content">
        <button className="back-btn" onClick={() => setActive(null)}><Icons.Back /> Companies</button>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: `${company.color}18`, color: company.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, fontFamily: "var(--font-display)", border: `1px solid ${company.color}30` }}>
            {company.logo}
          </div>
          <div>
            <div className="page-title" style={{ marginBottom: 2 }}>{company.name}</div>
            <span className={`diff-badge diff-${company.difficulty === "Very Hard" ? "Hard" : company.difficulty}`}>{company.difficulty}</span>
            <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 8 }}>{company.avgPackage}</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14, marginBottom: 28 }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 20px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", marginBottom: 8, letterSpacing: 0.5, fontFamily: "var(--font-mono)" }}>INTERVIEW PROCESS</div>
            <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{company.process}</div>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 20px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", marginBottom: 8, letterSpacing: 0.5, fontFamily: "var(--font-mono)" }}>FOCUS AREAS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {company.focusAreas.map((f, i) => (
                <span key={i} className="tag" style={{ background: `${company.color}15`, color: company.color, border: `1px solid ${company.color}25` }}>{f}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Prep Tips */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 20px", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700, color: "var(--muted)", marginBottom: 12, letterSpacing: 0.5, fontFamily: "var(--font-mono)" }}>
            <span style={{ color: "var(--accent)" }}><Icons.Lightbulb /></span>
            PREP TIPS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {company.tips.map((tip, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "var(--text2)", lineHeight: 1.5 }}>
                <span style={{ color: company.color, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}.</span>
                {tip}
              </div>
            ))}
          </div>
        </div>

        <div className="section-title" style={{ marginBottom: 14 }}>Frequently Asked Questions</div>
        <div className="q-list">
          {company.questions.map((q, i) => {
            const solved = checkedSet.has(q.id);
            return (
              <div key={q.id} className={`q-row${solved ? " solved" : ""}`} onClick={() => toggle(company.id, q.id)}>
                <div className="q-check">{solved && <Icons.CheckMark />}</div>
                <span className="q-num">{i + 1}</span>
                <span className="q-title">{q.title}</span>
                <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", fontWeight: 700, padding: "2px 6px", borderRadius: 99, background: "rgba(251,146,60,0.12)", color: "#FB923C", flexShrink: 0 }}>{q.freq}</span>
                <span className={`diff-badge diff-${q.difficulty}`}>{q.difficulty}</span>
                <a href={q.link} target="_blank" rel="noopener noreferrer" className="q-ext-link" onClick={e => e.stopPropagation()}>
                  <Icons.External />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-title">Company <span>Boards</span></div>
        <div className="page-subtitle">Tailored prep for each company's unique interview style</div>
      </div>
      <div className="cards-grid">
        {COMPANIES.map(c => {
          const done = checked[c.id]?.size || 0;
          const pct = c.questions.length ? Math.round((done / c.questions.length) * 100) : 0;
          return (
            <div key={c.id} className="card" onClick={() => setActive(c.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${c.color}18`, color: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, fontFamily: "var(--font-display)", border: `1px solid ${c.color}25` }}>
                  {c.logo}
                </div>
                <span className={`diff-badge diff-${c.difficulty === "Very Hard" ? "Hard" : c.difficulty}`}>{c.difficulty}</span>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 800, marginBottom: 2 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>{c.avgPackage}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
                {c.focusAreas.slice(0, 2).map((f, i) => (
                  <span key={i} className="tag" style={{ fontSize: 10, background: `${c.color}12`, color: c.color }}>{f}</span>
                ))}
              </div>
              <div className="prog-bar-track">
                <div className="prog-bar-fill" style={{ width: `${pct}%`, background: c.color }}/>
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 5, fontFamily: "var(--font-mono)" }}>{done}/{c.questions.length} questions tracked</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── BEHAVIORAL PREP ─────────────────────────────────────────────────────────
export function BehavioralPrep() {
  const [answers,        setAnswers]        = useState(() => storage.get("behavioral_answers", {}));
  const [activeQ,        setActiveQ]        = useState(null);
  const [draftAnswer,    setDraftAnswer]    = useState("");
  const [activeCategory, setActiveCategory] = useState(BEHAVIORAL_CATEGORIES[0].id);

  const saveAnswer = () => {
    if (!activeQ) return;
    const updated = { ...answers, [activeQ]: draftAnswer };
    setAnswers(updated);
    storage.set("behavioral_answers", updated);
    setActiveQ(null);
    setDraftAnswer("");
  };

  const category = BEHAVIORAL_CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-title">Behavioral <span>Prep</span></div>
        <div className="page-subtitle">Write and save STAR answers for common behavioral questions</div>
      </div>

      {/* Category tabs */}
      <div className="filter-bar" style={{ marginBottom: 24 }}>
        {BEHAVIORAL_CATEGORIES.map(c => (
          <button key={c.id} className={`filter-btn${activeCategory === c.id ? " active" : ""}`} onClick={() => setActiveCategory(c.id)}>
            <span style={{ marginRight: 4, opacity: 0.8 }}><IconByKey name={c.icon} /></span>
            {c.name}
          </button>
        ))}
      </div>

      {/* STAR guide */}
      <div style={{ background: "var(--surface)", border: "1px solid rgba(108,126,255,0.2)", borderRadius: 14, padding: "14px 18px", marginBottom: 20, display: "flex", gap: 20, flexWrap: "wrap" }}>
        {[["S","Situation","Set the context"],["T","Task","What was your role?"],["A","Action","What did you do?"],["R","Result","What was the outcome?"]].map(([letter, label, desc]) => (
          <div key={letter} style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 160 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(108,126,255,0.12)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{letter}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>{label}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {category.questions.map((q, i) => {
          const hasAnswer = answers[q] && answers[q].trim().length > 0;
          const isEditing = activeQ === q;
          return (
            <div key={i} style={{ background: "var(--surface)", border: `1px solid ${hasAnswer ? "rgba(46,204,143,0.2)" : "var(--border)"}`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", cursor: "pointer" }}
                onClick={() => { setActiveQ(isEditing ? null : q); setDraftAnswer(answers[q] || ""); }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: hasAnswer ? "rgba(46,204,143,0.12)" : "var(--surface2)", color: hasAnswer ? "var(--green)" : "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {hasAnswer ? <Icons.CheckSmall /> : <Icons.Circle />}
                </div>
                <div style={{ flex: 1, fontSize: 13.5, fontWeight: 500, color: "var(--text)", lineHeight: 1.5 }}>{q}</div>
                <span style={{ color: "var(--muted)", flexShrink: 0 }}>
                  {isEditing ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
                </span>
              </div>
              {isEditing && (
                <div style={{ padding: "0 16px 16px" }}>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6, fontFamily: "var(--font-mono)" }}>YOUR STAR ANSWER</div>
                  <textarea value={draftAnswer} onChange={e => setDraftAnswer(e.target.value)}
                    placeholder={"Situation: ...\nTask: ...\nAction: ...\nResult: ..."}
                    rows={6} style={{ width: "100%", background: "var(--surface2)", border: "1px solid var(--border2)", borderRadius: 8, padding: "10px 12px", color: "var(--text)", fontSize: 13, fontFamily: "var(--font-body)", resize: "vertical", outline: "none", lineHeight: 1.6 }}/>
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button onClick={saveAnswer} className="btn btn-primary" style={{ padding: "8px 18px" }}>Save Answer</button>
                    <button onClick={() => setActiveQ(null)} className="btn btn-ghost" style={{ padding: "8px 14px" }}>Cancel</button>
                  </div>
                </div>
              )}
              {!isEditing && hasAnswer && (
                <div style={{ padding: "0 16px 14px 50px", fontSize: 13, color: "var(--muted)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {answers[q].length > 200 ? answers[q].slice(0, 200) + "…" : answers[q]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MOCK TIMER ──────────────────────────────────────────────────────────────
export function MockTimer() {
  const [duration,  setDuration]  = useState(45 * 60);
  const [timeLeft,  setTimeLeft]  = useState(45 * 60);
  const [running,   setRunning]   = useState(false);
  const [phase,     setPhase]     = useState("idle");
  const intervalRef = useRef(null);

  const PHASES = [
    { label: "Understand", time: 5,  color: "#7B8CFF", desc: "Read & clarify the problem"         },
    { label: "Plan",       time: 10, color: "#FCD34D", desc: "Think through your approach"         },
    { label: "Code",       time: 20, color: "#34D399", desc: "Write clean, working code"           },
    { label: "Test",       time: 5,  color: "#FB923C", desc: "Walk through test cases"             },
    { label: "Optimize",   time: 5,  color: "#F87171", desc: "Discuss complexity & improvements"  },
  ];

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else {
      clearInterval(intervalRef.current);
      if (timeLeft === 0 && running) { setRunning(false); setPhase("done"); }
    }
    return () => clearInterval(intervalRef.current);
  }, [running, timeLeft]);

  const start    = () => { setTimeLeft(duration); setRunning(true); setPhase("active"); };
  const pause    = () => setRunning(r => !r);
  const reset    = () => { setRunning(false); setTimeLeft(duration); setPhase("idle"); };
  const setPreset = min => { const s = min * 60; setDuration(s); setTimeLeft(s); setRunning(false); setPhase("idle"); };

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const pct = duration ? ((duration - timeLeft) / duration) * 100 : 0;
  const circumference = 2 * Math.PI * 90;

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-title">Mock Interview <span>Timer</span></div>
        <div className="page-subtitle">Simulate real interview conditions with timed problem solving</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 700 }}>
        {/* Timer circle */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ position: "relative", width: 200, height: 200, marginBottom: 16 }}>
            <svg width="200" height="200" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="100" cy="100" r="90" fill="none" stroke="var(--surface2)" strokeWidth="8"/>
              <circle cx="100" cy="100" r="90" fill="none" stroke={phase === "done" ? "var(--red)" : "var(--accent)"} strokeWidth="8"
                strokeDasharray={circumference} strokeDashoffset={circumference * (1 - pct / 100)} strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s linear" }}/>
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 42, fontWeight: 800, letterSpacing: -2, color: phase === "done" ? "var(--red)" : "var(--text)" }}>
              {mm}:{ss}
            </div>
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
            {phase === "idle" ? "Ready to start" : phase === "done" ? "Time's up!" : running ? "Interview in progress" : "Paused"}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {phase === "idle" && (
              <button onClick={start} className="btn btn-primary" style={{ padding: "10px 28px", fontSize: 14 }}>Start</button>
            )}
            {phase === "active" && (<>
              <button onClick={pause} className="btn btn-ghost" style={{ padding: "10px 20px" }}>{running ? "Pause" : "Resume"}</button>
              <button onClick={reset} className="btn btn-danger" style={{ padding: "10px 20px" }}>Reset</button>
            </>)}
            {phase === "done" && (
              <button onClick={reset} className="btn btn-ghost" style={{ padding: "10px 24px" }}>Try Again</button>
            )}
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
            {[20, 30, 45, 60].map(m => (
              <button key={m} onClick={() => setPreset(m)} style={{ background: duration === m * 60 ? "rgba(108,126,255,0.15)" : "var(--surface2)", color: duration === m * 60 ? "var(--accent)" : "var(--muted)", border: `1px solid ${duration === m * 60 ? "rgba(108,126,255,0.3)" : "var(--border)"}`, borderRadius: 8, padding: "5px 10px", fontSize: 12, cursor: "pointer", fontFamily: "var(--font-mono)" }}>{m}m</button>
            ))}
          </div>
        </div>
        {/* Phase guide */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px 20px" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Time Allocation Guide</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {PHASES.map(p => (
              <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0 }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 1 }}>{p.label} <span style={{ color: "var(--muted)", fontWeight: 400 }}>· {p.time}min</span></div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "12px 14px", background: "var(--surface2)", borderRadius: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", marginBottom: 6, fontFamily: "var(--font-mono)" }}>GOLDEN RULES</div>
            {["Always clarify edge cases first","Think before you code","Communicate your thought process","Test with examples before submitting"].map((r, i) => (
              <div key={i} style={{ fontSize: 12, color: "var(--text2)", marginBottom: 4, lineHeight: 1.5, display: "flex", gap: 6, alignItems: "flex-start" }}>
                <span style={{ color: "var(--accent)", marginTop: 1, flexShrink: 0 }}><Icons.CheckSmall /></span>{r}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── RESUME CHECKLIST ────────────────────────────────────────────────────────
const RESUME_ITEMS = [
  { id: 1,  cat: "Content",        item: "Contact info complete (LinkedIn, GitHub, email, phone)",           critical: true  },
  { id: 2,  cat: "Content",        item: "Professional summary / objective statement included",              critical: false },
  { id: 3,  cat: "Content",        item: "All work experience has quantified achievements (%, $, numbers)", critical: true  },
  { id: 4,  cat: "Content",        item: "Tech stack / skills section clearly listed",                       critical: true  },
  { id: 5,  cat: "Content",        item: "Education includes CGPA if above 7.0 / 3.5",                      critical: false },
  { id: 6,  cat: "Projects",       item: "Minimum 2–3 strong projects with tech stack listed",              critical: true  },
  { id: 7,  cat: "Projects",       item: "Each project has a GitHub link and/or live demo",                 critical: true  },
  { id: 8,  cat: "Projects",       item: "Project descriptions show impact, not just features",             critical: false },
  { id: 9,  cat: "Projects",       item: "Projects use relevant tech for roles you're targeting",           critical: false },
  { id: 10, cat: "GitHub",         item: "GitHub profile has a README with pinned repositories",            critical: true  },
  { id: 11, cat: "GitHub",         item: "Contribution graph shows regular activity",                       critical: false },
  { id: 12, cat: "GitHub",         item: "Each repo has a good README describing the project",              critical: false },
  { id: 13, cat: "Format",         item: "Resume is 1 page (for < 5 years experience)",                     critical: true  },
  { id: 14, cat: "Format",         item: "Consistent fonts, spacing, and formatting throughout",            critical: true  },
  { id: 15, cat: "Format",         item: "ATS-friendly format (no tables, no graphics)",                    critical: true  },
  { id: 16, cat: "Format",         item: "PDF format, not Word document",                                   critical: false },
  { id: 17, cat: "Format",         item: "No spelling or grammatical errors",                               critical: true  },
  { id: 18, cat: "Online Presence",item: "LinkedIn profile matches resume and is complete",                 critical: true  },
  { id: 19, cat: "Online Presence",item: "Portfolio website or personal site exists",                       critical: false },
  { id: 20, cat: "Online Presence",item: "Professional profile photo on LinkedIn",                          critical: false },
];

export function ResumeChecklist() {
  const [checked, setChecked] = useState(() => new Set(storage.get("resume_checked", [])));
  const categories = [...new Set(RESUME_ITEMS.map(i => i.cat))];

  const toggle = id => {
    const s = new Set(checked);
    s.has(id) ? s.delete(id) : s.add(id);
    setChecked(s);
    storage.set("resume_checked", [...s]);
  };

  const score = Math.round((checked.size / RESUME_ITEMS.length) * 100);
  const criticalTotal = RESUME_ITEMS.filter(i => i.critical).length;
  const criticalDone  = RESUME_ITEMS.filter(i => i.critical && checked.has(i.id)).length;

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-title">Resume <span>Checklist</span></div>
        <div className="page-subtitle">Ensure your resume passes ATS and impresses human reviewers</div>
      </div>
      <div className="stat-row">
        <div className="stat-pill"><div className="stat-pill-val" style={{ color: score >= 80 ? "var(--green)" : "var(--yellow)" }}>{score}%</div><div className="stat-pill-label">Score</div></div>
        <div className="stat-pill"><div className="stat-pill-val">{checked.size}</div><div className="stat-pill-label">Done</div></div>
        <div className="stat-pill"><div className="stat-pill-val" style={{ color: criticalDone === criticalTotal ? "var(--green)" : "var(--red)" }}>{criticalDone}/{criticalTotal}</div><div className="stat-pill-label">Critical Done</div></div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <div className="prog-bar-track" style={{ height: 8 }}>
          <div className="prog-bar-fill" style={{ width: `${score}%`, background: score >= 80 ? "var(--green)" : score >= 50 ? "var(--yellow)" : "var(--red)" }}/>
        </div>
      </div>
      {categories.map(cat => {
        const items = RESUME_ITEMS.filter(i => i.cat === cat);
        return (
          <div key={cat} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)", letterSpacing: 1, textTransform: "uppercase", fontFamily: "var(--font-mono)", marginBottom: 10 }}>{cat}</div>
            <div className="q-list">
              {items.map(item => {
                const done = checked.has(item.id);
                return (
                  <div key={item.id} className={`q-row${done ? " solved" : ""}`} onClick={() => toggle(item.id)}>
                    <div className="q-check">{done && <Icons.CheckMark />}</div>
                    <span className="q-title" style={{ fontSize: 13 }}>{item.item}</span>
                    {item.critical && <span className="tag" style={{ background: "rgba(240,96,96,0.1)", color: "var(--red)", fontSize: 10, flexShrink: 0 }}>Critical</span>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── RESOURCES HUB ──────────────────────────────────────────────────────────
export function ResourcesHub() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(RESOURCES.map(r => r.category))];
  const filtered   = filter === "All" ? RESOURCES : RESOURCES.filter(r => r.category === filter);

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-title">Resources <span>Hub</span></div>
        <div className="page-subtitle">The best free resources to ace your tech interview</div>
      </div>
      <div className="filter-bar">
        {categories.map(c => (
          <button key={c} className={`filter-btn${filter === c ? " active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {filtered.map(r => (
          <a key={r.id} href={r.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div className="card"
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border2)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                  <IconByKey name={r.icon} />
                </div>
                <span className="tag" style={{ background: "var(--surface2)", color: "var(--muted)", fontSize: 10, fontFamily: "var(--font-mono)" }}>{r.category}</span>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{r.name}</div>
              <div style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.5 }}>{r.desc}</div>
              <div style={{ marginTop: 12, fontSize: 12, color: "var(--accent)", display: "flex", alignItems: "center", gap: 4 }}>
                Visit <Icons.External />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── INTERVIEW LOG ──────────────────────────────────────────────────────────
// PURPOSE: Your personal interview diary. Every time you attend a real or mock
// interview, log it here. Over time you'll spot patterns — which question types
// trip you up, which companies you vibe with, and what you need to improve.
// It's completely private to your account.
export function InterviewLog() {
  const [logs,     setLogs]     = useState(() => storage.get("interview_logs", []));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ company: "", role: "", date: "", type: "Technical", result: "Pending", notes: "", questions: "", improve: "" });

  const save = () => {
    if (!form.company.trim()) return;
    const updated = [{ ...form, id: Date.now() }, ...logs];
    setLogs(updated);
    storage.set("interview_logs", updated);
    setForm({ company: "", role: "", date: "", type: "Technical", result: "Pending", notes: "", questions: "", improve: "" });
    setShowForm(false);
  };

  const remove = id => {
    const updated = logs.filter(l => l.id !== id);
    setLogs(updated);
    storage.set("interview_logs", updated);
  };

  const resultColor = { Passed: "var(--green)", Failed: "var(--red)", Pending: "var(--yellow)", Rejected: "var(--red)" };

  return (
    <div className="page-content">
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <div className="page-title">Interview <span>Log</span></div>
            <div className="page-subtitle">
              Your personal diary of every interview — real or mock. Log what was asked, how it went,
              and what to improve. Over time, patterns emerge that accelerate your growth.
            </div>
          </div>
          <button onClick={() => setShowForm(s => !s)} className="btn btn-primary" style={{ flexShrink: 0, padding: "9px 18px", marginTop: 4 }}>
            {showForm ? "Cancel" : <><Icons.Plus /> Log Interview</>}
          </button>
        </div>
      </div>

      {/* Stats bar */}
      {logs.length > 0 && (
        <div className="stat-row" style={{ marginBottom: 20 }}>
          <div className="stat-pill"><div className="stat-pill-val">{logs.length}</div><div className="stat-pill-label">Total</div></div>
          <div className="stat-pill"><div className="stat-pill-val" style={{ color: "var(--green)" }}>{logs.filter(l => l.result === "Passed").length}</div><div className="stat-pill-label">Passed</div></div>
          <div className="stat-pill"><div className="stat-pill-val" style={{ color: "var(--yellow)" }}>{logs.filter(l => l.result === "Pending").length}</div><div className="stat-pill-label">Pending</div></div>
          <div className="stat-pill"><div className="stat-pill-val" style={{ color: "var(--red)" }}>{logs.filter(l => ["Failed","Rejected"].includes(l.result)).length}</div><div className="stat-pill-label">Rejected</div></div>
        </div>
      )}

      {/* New entry form */}
      {showForm && (
        <div style={{ background: "var(--surface)", border: "1px solid rgba(108,126,255,0.2)", borderRadius: 16, padding: "24px", marginBottom: 24 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, marginBottom: 18 }}>New Interview Entry</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              ["company", "Company *",      "text",   "e.g. Google"],
              ["role",    "Role *",          "text",   "e.g. SWE Intern"],
              ["date",    "Date",            "date",   ""],
              ["type",    "Interview Type",  "select", ["Technical","System Design","Behavioral","HR","Online Assessment"]],
              ["result",  "Result",          "select", ["Pending","Passed","Failed","Rejected"]],
            ].map(([key, label, type, placeholder]) => (
              <div key={key}>
                <div className="inp-label">{label}</div>
                {type === "select" ? (
                  <select value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className="inp">
                    {placeholder.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className="inp"/>
                )}
              </div>
            ))}
          </div>
          {[
            ["notes",     "Overall Notes — how did it go?"],
            ["questions", "Questions you were asked"],
            ["improve",   "What to improve for next time"],
          ].map(([key, label]) => (
            <div key={key} style={{ marginTop: 12 }}>
              <div className="inp-label">{label}</div>
              <textarea value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} rows={3}
                placeholder={label + "..."}
                style={{ width: "100%", background: "var(--surface2)", border: "1px solid var(--border2)", borderRadius: 7, padding: "9px 11px", color: "var(--text)", fontSize: 13, fontFamily: "var(--font-body)", resize: "vertical", outline: "none", lineHeight: 1.6 }}/>
            </div>
          ))}
          <button onClick={save} className="btn btn-primary" style={{ marginTop: 16, padding: "10px 24px" }}>Save Entry</button>
        </div>
      )}

      {/* Empty state */}
      {logs.length === 0 && !showForm && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--muted)" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14, opacity: 0.4 }}><Icons.EmptyLog /></div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: "var(--text2)" }}>No interviews logged yet</div>
          <div style={{ fontSize: 13, lineHeight: 1.6 }}>
            Click "Log Interview" above after any real or mock interview.<br/>
            Track what was asked, how you felt, and what to work on next.
          </div>
        </div>
      )}

      {/* Log entries */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {logs.map(log => (
          <div key={log.id} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 800 }}>{log.company}</div>
                <div style={{ fontSize: 13, color: "var(--text2)" }}>{log.role}{log.type ? ` · ${log.type}` : ""}{log.date ? ` · ${log.date}` : ""}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span className="tag" style={{ background: `${resultColor[log.result]}18`, color: resultColor[log.result], border: `1px solid ${resultColor[log.result]}30` }}>{log.result}</span>
                <button onClick={() => remove(log.id)} className="btn-logout" title="Delete entry"><Icons.Trash /></button>
              </div>
            </div>
            {log.notes    && <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 8, lineHeight: 1.6 }}><strong style={{ color: "var(--muted)", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: 0.5 }}>NOTES </strong>{log.notes}</div>}
            {log.questions && <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 8, lineHeight: 1.6 }}><strong style={{ color: "var(--muted)", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: 0.5 }}>QUESTIONS </strong>{log.questions}</div>}
            {log.improve   && <div style={{ fontSize: 13, color: "var(--orange)", lineHeight: 1.6 }}><strong style={{ color: "var(--muted)", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: 0.5 }}>IMPROVE </strong>{log.improve}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}