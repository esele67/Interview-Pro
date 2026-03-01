import React, { useState, useCallback } from "react";
import "./styles.css";
import { Icons, LogoMark } from "./Icons";
import { DSA_TOPICS, TECH_COURSES, CS_FUNDAMENTALS, SYSTEM_DESIGN_TOPICS, storage } from "./data";
import Dashboard from "./Dashboard";
import DSATracker from "./DSATracker";
import { TechCourses, CSFundamentals, SystemDesign } from "./TrackerPages";
import { CompanyBoards, BehavioralPrep, MockTimer, ResumeChecklist, ResourcesHub, InterviewLog } from "./FeaturePages";
import { useAuth } from "./Auth";

// ─── PROGRESS ────────────────────────────────────────────────────────────────
function getOverallProgress() {
  const t1 = DSA_TOPICS.reduce((s, t) => s + t.questions.length, 0);
  const d1 = DSA_TOPICS.reduce((s, t) => s + new Set(storage.get(`dsa_${t.id}`, [])).size, 0);
  const t2 = TECH_COURSES.reduce((s, t) => s + t.modules.length, 0);
  const d2 = TECH_COURSES.reduce((s, t) => s + new Set(storage.get(`course_${t.id}`, [])).size, 0);
  const t3 = CS_FUNDAMENTALS.reduce((s, t) => s + t.topics.length, 0);
  const d3 = CS_FUNDAMENTALS.reduce((s, t) => s + new Set(storage.get(`cs_${t.id}`, [])).size, 0);
  const t4 = SYSTEM_DESIGN_TOPICS.reduce((s, t) => s + t.topics.length, 0);
  const d4 = SYSTEM_DESIGN_TOPICS.reduce((s, t) => s + new Set(storage.get(`sd_${t.id}`, [])).size, 0);
  const total = t1 + t2 + t3 + t4, done = d1 + d2 + d3 + d4;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
const NAV = [
  { section: "Overview", items: [
    { id: "dashboard",     label: "Dashboard",        Icon: Icons.Dashboard    },
  ]},
  { section: "Learning", items: [
    { id: "dsa",           label: "DSA Problems",     Icon: Icons.Code         },
    { id: "courses",       label: "Tech Courses",     Icon: Icons.Courses      },
    { id: "cs",            label: "CS Fundamentals",  Icon: Icons.Computer     },
    { id: "system-design", label: "System Design",    Icon: Icons.SystemDesign },
  ]},
  { section: "Interview Prep", items: [
    { id: "companies",     label: "Company Boards",   Icon: Icons.Company      },
    { id: "behavioral",    label: "Behavioral Prep",  Icon: Icons.Mic          },
    { id: "mock-timer",    label: "Mock Timer",       Icon: Icons.Timer        },
  ]},
  { section: "Career", items: [
    { id: "resume",        label: "Resume Checklist", Icon: Icons.FileCheck    },
    { id: "interview-log", label: "Interview Log",    Icon: Icons.Clipboard    },
    { id: "resources",     label: "Resources Hub",    Icon: Icons.Book         },
  ]},
];

const PAGE_MAP = {
  dashboard:       Dashboard,
  dsa:             DSATracker,
  courses:         TechCourses,
  cs:              CSFundamentals,
  "system-design": SystemDesign,
  companies:       CompanyBoards,
  behavioral:      BehavioralPrep,
  "mock-timer":    MockTimer,
  resume:          ResumeChecklist,
  "interview-log": InterviewLog,
  resources:       ResourcesHub,
};

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function InterviewPro() {
  const [page,       setPage]       = useState("dashboard");
  const [collapsed,  setCollapsed]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const navigate = useCallback((to) => {
    setPage(to); setMobileOpen(false); window.scrollTo(0, 0);
  }, []);

  const { done, total, pct } = getOverallProgress();
  const ActivePage = PAGE_MAP[page] || Dashboard;
  const initials   = user?.name
    ? user.name.trim().split(/\s+/).map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const ToggleBtn = () => (
    <button
      className="sidebar-toggle"
      onClick={() => setCollapsed(c => !c)}
      title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {collapsed ? <Icons.ChevronRight /> : <Icons.ChevronLeft />}
    </button>
  );

  return (
    <div className={`app-shell${collapsed ? " sidebar-collapsed" : ""}`}>
      <div className={`sidebar-overlay${mobileOpen ? " show" : ""}`} onClick={() => setMobileOpen(false)}/>

      {/* ── SIDEBAR ────────────────────────────────────────────────────── */}
      <aside className={`sidebar${mobileOpen ? " open" : ""}${collapsed ? " collapsed" : ""}`}>

        {/* Logo row */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-mark">
            <LogoMark size={32} />
          </div>
          <div className="sidebar-logo-text-wrap">
            <div className="sidebar-logo-name">Interview<span>Pro</span></div>
            <div className="sidebar-logo-tagline">Crack the Interview</div>
          </div>
          {/* Toggle only shown in logo row when EXPANDED */}
          {!collapsed && <ToggleBtn />}
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {NAV.map(({ section, items }) => (
            <div key={section}>
              <div className="sidebar-section-label">{section}</div>
              {items.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  className={`sidebar-item${page === id ? " active" : ""}`}
                  onClick={() => navigate(id)}
                  title={collapsed ? label : undefined}
                >
                  <span className="si-icon"><Icon /></span>
                  <span className="si-label">{label}</span>
                </button>
              ))}
            </div>
          ))}

          {/* When collapsed, show the expand toggle INSIDE the nav scroll area
              so it's always reachable at the top of the icon column */}
          {collapsed && (
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 6 }}>
              <ToggleBtn />
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {/* Progress bar — hidden when collapsed */}
          <div className="sf-progress-wrap">
            <div className="sf-label">
              <span>Overall Progress</span>
              <strong>{pct}%</strong>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${pct}%` }}/>
            </div>
            <div className="sf-count">{done} / {total} completed</div>
          </div>

          {/* User row */}
          <div className="user-row">
            <div className="user-avatar" title={user?.name}>{initials}</div>
            <div className="user-info">
              <div className="user-name">{user?.name || "User"}</div>
              <div className="user-email">{user?.email}</div>
            </div>
            {/* Logout always visible */}
            <button className="btn-logout" onClick={logout} title="Sign out">
              <Icons.Logout />
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN ───────────────────────────────────────────────────────── */}
      <main className="main-content">
        {/* Mobile topbar */}
        <div className="topbar">
          <div className="topbar-left">
            <button className="topbar-menu-btn" onClick={() => setMobileOpen(o => !o)}>
              <Icons.Menu />
            </button>
            <div className="topbar-logo-text">Interview<span>Pro</span></div>
          </div>
          <div className="topbar-avatar">{initials}</div>
        </div>

        <ActivePage key={page} navigate={navigate} />
      </main>
    </div>
  );
}