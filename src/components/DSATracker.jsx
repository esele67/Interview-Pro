import React, { useState, useCallback } from "react";
import { DSA_TOPICS, storage } from "./data";
import { Icons } from "./Icons";

const TOTAL_DSA = DSA_TOPICS.reduce((s, t) => s + t.questions.length, 0);

function getChecked(topicId) { return new Set(storage.get(`dsa_${topicId}`, [])); }
function saveChecked(topicId, set) { storage.set(`dsa_${topicId}`, [...set]); }

export default function DSATracker() {
  const [activeTopic, setActiveTopic] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [checked, setChecked] = useState(() => {
    const init = {};
    DSA_TOPICS.forEach((t) => { init[t.id] = getChecked(t.id); });
    return init;
  });

  const totalDone = DSA_TOPICS.reduce((s, t) => s + (checked[t.id]?.size || 0), 0);
  const overallPct = TOTAL_DSA ? Math.round((totalDone / TOTAL_DSA) * 100) : 0;

  const toggle = useCallback((topicId, qId) => {
    setChecked((prev) => {
      const set = new Set(prev[topicId]);
      set.has(qId) ? set.delete(qId) : set.add(qId);
      saveChecked(topicId, set);
      return { ...prev, [topicId]: set };
    });
  }, []);

  const topic = activeTopic ? DSA_TOPICS.find((t) => t.id === activeTopic) : null;

  if (topic) {
    const checkedSet = checked[topic.id];
    const done = checkedSet.size;
    const total = topic.questions.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const countByDiff = { Easy: 0, Medium: 0, Hard: 0 };
    topic.questions.forEach((q) => { countByDiff[q.difficulty]++; });
    const filtered = filter === "ALL" ? topic.questions
      : filter === "UNSOLVED" ? topic.questions.filter((q) => !checkedSet.has(q.id))
      : topic.questions.filter((q) => q.difficulty === filter);

    return (
      <div className="page-content">
        <button className="back-btn" onClick={() => { setActiveTopic(null); setFilter("ALL"); }}>
          <Icons.Back /> All Topics
        </button>
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 9, background: `${topic.color}16`, color: topic.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>
              {topic.icon}
            </div>
            <div>
              <div className="page-title" style={{ marginBottom: 2 }}>{topic.name}</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Easy", "Medium", "Hard"].map((d) => (
                  <span key={d} style={{ fontSize: 11, color: "var(--muted)" }}>
                    <span className={`diff-badge diff-${d}`}>{d}</span> ×{countByDiff[d]}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="prog-bar-track" style={{ marginBottom: 5 }}>
            <div className="prog-bar-fill" style={{ width: `${pct}%`, background: pct === 100 ? "var(--green)" : `linear-gradient(90deg, ${topic.color}, ${topic.accent})` }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
            <span>{done}/{total} solved</span><span>{pct}%</span>
          </div>
        </div>
        <div className="filter-bar">
          {["ALL", "UNSOLVED", "Easy", "Medium", "Hard"].map((f) => (
            <button key={f} className={`filter-btn${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="q-list">
          {filtered.map((q, i) => {
            const solved = checkedSet.has(q.id);
            return (
              <div key={q.id} className={`q-row${solved ? " solved" : ""}`} onClick={() => toggle(topic.id, q.id)}>
                <div className="q-check">{solved && <Icons.CheckMark />}</div>
                <span className="q-num">{i + 1}</span>
                <span className="q-title">{q.title}</span>
                <span className={`diff-badge diff-${q.difficulty}`}>{q.difficulty}</span>
                <a href={q.link} target="_blank" rel="noopener noreferrer" className="q-ext-link" onClick={(e) => e.stopPropagation()}>
                  <Icons.External />
                </a>
              </div>
            );
          })}
          {filtered.length === 0 && <div style={{ textAlign: "center", padding: "36px 0", color: "var(--muted)", fontSize: 13 }}>No questions match this filter.</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-title">DSA <span>Problems</span></div>
        <div className="page-subtitle">100 curated questions across 12 topics</div>
      </div>
      <div className="stat-row">
        <div className="stat-pill"><div className="stat-pill-val" style={{ color: "var(--accent)" }}>{totalDone}</div><div className="stat-pill-label">Solved</div></div>
        <div className="stat-pill"><div className="stat-pill-val">{TOTAL_DSA - totalDone}</div><div className="stat-pill-label">Remaining</div></div>
        <div className="stat-pill"><div className="stat-pill-val" style={{ color: "var(--green)" }}>{overallPct}%</div><div className="stat-pill-label">Complete</div></div>
        <div className="stat-pill"><div className="stat-pill-val">{DSA_TOPICS.filter((t) => checked[t.id]?.size === t.questions.length).length}</div><div className="stat-pill-label">Topics Done</div></div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div className="prog-bar-track" style={{ height: 6 }}>
          <div className="prog-bar-fill" style={{ width: `${overallPct}%`, background: "linear-gradient(90deg, var(--accent), var(--green))" }} />
        </div>
      </div>
      <div className="cards-grid">
        {DSA_TOPICS.map((t) => {
          const done = checked[t.id]?.size || 0;
          const pct = t.questions.length ? Math.round((done / t.questions.length) * 100) : 0;
          const isDone = pct === 100;
          return (
            <div key={t.id} className={`card${isDone ? " completed" : ""}`} onClick={() => setActiveTopic(t.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: `${t.color}16`, color: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
                  {t.icon}
                </div>
                <span style={{ fontSize: 9.5, fontFamily: "var(--font-mono)", fontWeight: 700, padding: "2px 7px", borderRadius: 99, background: isDone ? "rgba(46,204,143,0.1)" : done > 0 ? `${t.color}14` : "var(--surface2)", color: isDone ? "var(--green)" : done > 0 ? t.color : "var(--muted)" }}>
                  {isDone ? "DONE" : done > 0 ? `${pct}%` : "NEW"}
                </span>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, marginBottom: 2, letterSpacing: -0.2 }}>{t.name}</div>
              <div style={{ fontSize: 11.5, color: "var(--muted)", marginBottom: 10 }}>{t.questions.length} questions</div>
              <div className="prog-bar-track">
                <div className="prog-bar-fill" style={{ width: `${pct}%`, background: isDone ? "var(--green)" : t.color }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 10.5, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                <span>{done} done</span><span>{t.questions.length - done} left</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}