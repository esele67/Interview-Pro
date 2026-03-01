import React from "react";

// ─── ALL SVG ICONS ────────────────────────────────────────────────────────────
export const Icons = {
  Dashboard: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.3" stroke="currentColor" strokeWidth="1.25"/>
      <rect x="9"   y="1.5" width="5.5" height="5.5" rx="1.3" stroke="currentColor" strokeWidth="1.25"/>
      <rect x="1.5" y="9"   width="5.5" height="5.5" rx="1.3" stroke="currentColor" strokeWidth="1.25"/>
      <rect x="9"   y="9"   width="5.5" height="5.5" rx="1.3" stroke="currentColor" strokeWidth="1.25"/>
    </svg>
  ),
  Code: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M5.5 4.5L2 8l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.5 4.5L14 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.5 2.5l-3 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  Courses: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M1 3.5l7-2 7 2v1L8 6.5 1 4.5V3.5z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
      <path d="M4 5.5v5c0 1 1.8 2 4 2s4-1 4-2v-5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      <path d="M14 4.5v4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      <circle cx="14" cy="9.5" r="0.8" fill="currentColor"/>
    </svg>
  ),
  Computer: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="1" y="2" width="14" height="9.5" rx="1.3" stroke="currentColor" strokeWidth="1.25"/>
      <path d="M5.5 14.5h5M8 11.5v3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      <path d="M4 6l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 9h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  SystemDesign: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="1"  y="1"  width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="11" y="1"  width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="6"  y="11" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M5 3h6M13 5v2.5a2 2 0 01-2 2H9M3 5v2.5a2 2 0 002 2h2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  ),
  Company: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M2.5 14V5.5L8 2.5l5.5 3V14" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
      <path d="M1 14h14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      <rect x="6.25" y="9.5" width="3.5" height="4.5" rx="0.5" stroke="currentColor" strokeWidth="1.1"/>
      <rect x="3" y="6.5" width="2" height="2" rx="0.4" stroke="currentColor" strokeWidth="1.1"/>
      <rect x="11" y="6.5" width="2" height="2" rx="0.4" stroke="currentColor" strokeWidth="1.1"/>
    </svg>
  ),
  Mic: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="5.5" y="1" width="5" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.25"/>
      <path d="M2.5 8a5.5 5.5 0 0011 0" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      <path d="M8 13.5v2M6 15.5h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  ),
  Timer: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <circle cx="8" cy="9.5" r="5.5" stroke="currentColor" strokeWidth="1.25"/>
      <path d="M8 7v2.5l1.5 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 1h4M8 1v1.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      <path d="M12.5 3.5l.8-.8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  ),
  FileCheck: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M9.5 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V5.5L9.5 1z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
      <path d="M9.5 1v4.5H14" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
      <path d="M5.5 9.5l1.5 1.5L10 7.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Clipboard: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M6 1.5h4M5 1.5H3.5a1 1 0 00-1 1v11a1 1 0 001 1h9a1 1 0 001-1v-11a1 1 0 00-1-1H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <rect x="5.5" y="1" width="5" height="2" rx="1" stroke="currentColor" strokeWidth="1.1"/>
      <path d="M5 6.5h6M5 9h6M5 11.5h3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Book: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M8 13.5V3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      <path d="M8 3.5C6.5 2.5 3 2.5 2 2.5v10c1 0 4.5 0 6 1 1.5-1 5-1 6-1v-10c-1 0-4.5 0-6 1z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
    </svg>
  ),
  Back: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  External: () => (
    <svg viewBox="0 0 12 12" fill="none" width="11" height="11">
      <path d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 1h3.5m0 0v3.5m0-3.5L5.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Logout: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.5 11L14 8l-3.5-3M14 8H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 18 18" fill="none" width="18" height="18">
      <path d="M2.5 4.5h13M2.5 9h13M2.5 13.5h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  ChevronLeft: () => (
    <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
      <path d="M10 3L6 8l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
      <path d="M6 3l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ChevronUp: () => (
    <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
      <path d="M3 9l4-4 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Lightbulb: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M8 2a4 4 0 013 6.7V10H5V8.7A4 4 0 018 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M5.5 10v.5a2.5 2.5 0 005 0V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M6.5 13h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Trophy: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M5 1.5h6v5a3 3 0 01-6 0V1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M2 1.5h3v3A2.5 2.5 0 012 2V1.5zM14 1.5h-3v3A2.5 2.5 0 0014 2V1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M8 9.5v2M6 14h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  TrendUp: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M1.5 11.5l4-4 3 2.5 5.5-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.5 4h4v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Crown: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M1.5 12h13M2 12L3.5 5l4.5 4 4.5-6L14 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M8 1.5L2 4v4.5c0 3 2.5 5.2 6 6 3.5-.8 6-3 6-6V4L8 1.5z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
      <path d="M5.5 8l2 2 3-3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Target: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="8" cy="8" r="1" fill="currentColor"/>
    </svg>
  ),
  Globe: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M8 1.5c-2 2-3 4-3 6.5s1 4.5 3 6.5M8 1.5c2 2 3 4 3 6.5s-1 4.5-3 6.5M1.5 8h13" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  ),
  Play: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M6.5 5.5l5 2.5-5 2.5V5.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
  Trash: () => (
    <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
      <path d="M3 4h10M6 4V2.5h4V4M5 4l.5 9h5L11 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  // ── State icons ──
  CheckMark: () => (
    <svg viewBox="0 0 12 12" fill="none" width="11" height="11">
      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // CheckSmall is identical to CheckMark - kept as alias so FeaturePages doesn't crash
  CheckSmall: () => (
    <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Circle: () => (
    <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  EmptyLog: () => (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <rect x="8" y="4" width="32" height="40" rx="3" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
      <path d="M16 16h16M16 23h16M16 30h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
      <path d="M28 34l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
    </svg>
  ),
};

// ─── LOGO MARK ────────────────────────────────────────────────────────────────
// Uses a unique gradient ID per instance via a static counter to avoid SVG
// gradient ID collisions when rendered in multiple places simultaneously.
let _logoCount = 0;
export function LogoMark({ size = 30 }) {
  const id = React.useRef(`lmg${++_logoCount}`).current;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6C7EFF"/>
          <stop offset="1" stopColor="#A78BFA"/>
        </linearGradient>
      </defs>
      {/* Rounded square background */}
      <rect width="32" height="32" rx="9" fill={`url(#${id})`}/>
      {/* Stylised "IP" mark:
          Left vertical = the "I"
          Bracket + curve = the "P" */}
      <line x1="9" y1="8" x2="9" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path
        d="M13 8h5a4 4 0 010 8h-5"
        stroke="white" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Accent dot bottom-right */}
      <circle cx="23" cy="24" r="2" fill="rgba(255,255,255,0.55)"/>
    </svg>
  );
}