import React, { useState, useCallback } from "react";
import { TECH_COURSES, CS_FUNDAMENTALS, SYSTEM_DESIGN_TOPICS, storage } from "./data";
import { Icons } from "./Icons";

// ─── GENERIC CHECKLIST PAGE ──────────────────────────────────────────────────
function ChecklistPage({ items, storagePrefix, colorKey = "color", itemsKey = "modules", title, subtitle, icon }) {
  const [activeId, setActiveId] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [checked, setChecked] = useState(() => {
    const init = {};
    items.forEach((t) => { init[t.id] = new Set(storage.get(`${storagePrefix}_${t.id}`, [])); });
    return init;
  });

  const totalAll = items.reduce((s, t) => s + (t[itemsKey]?.length || 0), 0);
  const totalDone = items.reduce((s, t) => s + (checked[t.id]?.size || 0), 0);
  const pctAll = totalAll ? Math.round((totalDone / totalAll) * 100) : 0;

  const toggle = useCallback((topicId, qId) => {
    setChecked((prev) => {
      const set = new Set(prev[topicId]);
      set.has(qId) ? set.delete(qId) : set.add(qId);
      storage.set(`${storagePrefix}_${topicId}`, [...set]);
      return { ...prev, [topicId]: set };
    });
  }, [storagePrefix]);

  const active = activeId ? items.find((t) => t.id === activeId) : null;

  if (active) {
    const checkedSet = checked[active.id];
    const list = active[itemsKey] || [];
    const done = checkedSet.size;
    const total = list.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const filtered = filter === "ALL" ? list
      : filter === "UNSOLVED" ? list.filter((q) => !checkedSet.has(q.id))
      : list.filter((q) => q.difficulty === filter);

    const hasDiff = list[0] && "difficulty" in list[0];

    return (
      <div className="page-content">
        <button className="back-btn" onClick={() => { setActiveId(null); setFilter("ALL"); }}>
          <Icons.Back /> {title}
        </button>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: `${active[colorKey] || "#7B8CFF"}18`, color: active[colorKey] || "#7B8CFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>
              {active.icon}
            </div>
            <div>
              <div className="page-title" style={{ marginBottom: 0 }}>{active.name}</div>
              {active.description && <div style={{ fontSize: 13, color: "var(--text2)", marginTop: 3 }}>{active.description}</div>}
            </div>
          </div>
          <div className="prog-bar-track" style={{ marginBottom: 6 }}>
            <div className="prog-bar-fill" style={{ width: `${pct}%`, background: pct === 100 ? "var(--green)" : (active[colorKey] || "#7B8CFF") }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
            <span>{done} / {total} completed</span><span>{pct}%</span>
          </div>
        </div>
        {hasDiff && (
          <div className="filter-bar">
            {["ALL", "UNSOLVED", "Easy", "Medium", "Hard"].map((f) => (
              <button key={f} className={`filter-btn${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
        )}
        {!hasDiff && (
          <div className="filter-bar">
            {["ALL", "UNSOLVED"].map((f) => (
              <button key={f} className={`filter-btn${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
        )}
        <div className="q-list">
          {filtered.map((q, i) => {
            const solved = checkedSet.has(q.id);
            return (
              <div key={q.id} className={`q-row${solved ? " solved" : ""}`} onClick={() => toggle(active.id, q.id)}>
                <div className="q-check">{solved && <Icons.CheckMark />}</div>
                <span className="q-num">{i + 1}</span>
                <span className="q-title">{q.title}</span>
                {q.difficulty && <span className={`diff-badge diff-${q.difficulty}`}>{q.difficulty}</span>}
                {q.link && (
                  <a href={q.link} target="_blank" rel="noopener noreferrer" className="q-ext-link" onClick={(e) => e.stopPropagation()}>
                    <Icons.External />
                  </a>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)", fontSize: 14 }}>No items match this filter.</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-title">{icon} <span>{title}</span></div>
        <div className="page-subtitle">{subtitle}</div>
      </div>
      <div className="stat-row">
        <div className="stat-pill">
          <div className="stat-pill-val" style={{ color: "var(--accent)" }}>{totalDone}</div>
          <div className="stat-pill-label">Completed</div>
        </div>
        <div className="stat-pill">
          <div className="stat-pill-val">{totalAll - totalDone}</div>
          <div className="stat-pill-label">Remaining</div>
        </div>
        <div className="stat-pill">
          <div className="stat-pill-val" style={{ color: "var(--green)" }}>{pctAll}%</div>
          <div className="stat-pill-label">Progress</div>
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <div className="prog-bar-track" style={{ height: 8 }}>
          <div className="prog-bar-fill" style={{ width: `${pctAll}%`, background: "linear-gradient(90deg, var(--accent), var(--green))" }} />
        </div>
      </div>
      <div className="cards-grid">
        {items.map((t) => {
          const list = t[itemsKey] || [];
          const done = checked[t.id]?.size || 0;
          const pct = list.length ? Math.round((done / list.length) * 100) : 0;
          const isDone = pct === 100;
          const color = t[colorKey] || "#7B8CFF";
          return (
            <div key={t.id} className={`card${isDone ? " completed" : ""}`} onClick={() => setActiveId(t.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 9, background: `${color}18`, color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>
                  {t.icon}
                </div>
                <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: isDone ? "rgba(52,211,153,0.12)" : done > 0 ? `${color}15` : "var(--surface2)", color: isDone ? "var(--green)" : done > 0 ? color : "var(--muted)" }}>
                  {isDone ? "DONE" : done > 0 ? `${pct}%` : "NEW"}
                </span>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{t.name}</div>
              {t.description && <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8 }}>{t.description}</div>}
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12 }}>{list.length} {itemsKey === "modules" ? "modules" : "topics"}</div>
              <div className="prog-bar-track">
                <div className="prog-bar-fill" style={{ width: `${pct}%`, background: isDone ? "var(--green)" : color }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5, fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                <span>{done} done</span><span>{list.length - done} left</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── EXPORTED PAGES ──────────────────────────────────────────────────────────
export function TechCourses() {
  return (
    <ChecklistPage
      items={TECH_COURSES}
      storagePrefix="course"
      colorKey="color"
      itemsKey="modules"
      title="Tech Courses"
      subtitle="Master the most in-demand technologies for product company interviews"
      icon="courses"
    />
  );
}

export function CSFundamentals() {
  return (
    <ChecklistPage
      items={CS_FUNDAMENTALS}
      storagePrefix="cs"
      colorKey="color"
      itemsKey="topics"
      title="CS Fundamentals"
      subtitle="Core computer science concepts asked in every product company interview"
      icon="cs"
    />
  );
}

export function SystemDesign() {
  return (
    <ChecklistPage
      items={SYSTEM_DESIGN_TOPICS}
      storagePrefix="sd"
      colorKey={null}
      itemsKey="topics"
      title="System Design"
      subtitle="Design large-scale distributed systems like a senior engineer"
      icon="sd"
    />
  );
}