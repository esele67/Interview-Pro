import React, { createContext, useContext, useState, useEffect } from "react";
import { storage } from "./data";

// ─────────────────────────────────────────────────────────────────────────────
// HOW AUTH WORKS (localStorage backend)
//
// There is no external server. Your browser IS the database.
//
//  Sign up  → saves { id, name, email, password } to "ip_users" array
//  Sign in  → finds matching row by email+password
//  Session  → "ip_token" + "ip_user" persist across refreshes
//  Sign out → clears those two keys
//
// ALL PROGRESS DATA IS USER-SCOPED. Every localStorage key is prefixed with
// the user's unique id:  "u:<id>:dsa_arrays", "u:<id>:course_react" etc.
// That means user A and user B never see each other's completed tasks, even
// on the same browser / same machine.
//
// CONNECTING A REAL BACKEND LATER:
//   1. Build POST /auth/signup and POST /auth/login endpoints (Node/Python/etc.)
//      Both return  { token, user: { id, name, email } }
//   2. Set  REACT_APP_API_URL=https://your-api.com  in a .env file
//   3. Restart dev server — the code below switches automatically.
// ─────────────────────────────────────────────────────────────────────────────

const API_BASE = process.env.REACT_APP_API_URL || null;
const AuthContext = createContext(null);
export function useAuth() { return useContext(AuthContext); }

// ─── API CALLS ────────────────────────────────────────────────────────────────
async function apiSignup(name, email, password) {
  if (API_BASE) {
    const res  = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Signup failed");
    return data;
  }
  const users = JSON.parse(localStorage.getItem("ip_users") || "[]");
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
    throw new Error("An account with this email already exists.");
  const user = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim(), email: email.toLowerCase().trim(), password,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem("ip_users", JSON.stringify([...users, user]));
  const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
  return { token, user: { id: user.id, name: user.name, email: user.email } };
}

async function apiLogin(email, password) {
  if (API_BASE) {
    const res  = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    return data;
  }
  const users = JSON.parse(localStorage.getItem("ip_users") || "[]");
  const user  = users.find(
    u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
  );
  if (!user) throw new Error("Incorrect email or password.");
  const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
  return { token, user: { id: user.id, name: user.name, email: user.email } };
}

// ─── AUTH PROVIDER ────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token  = localStorage.getItem("ip_token");
    const stored = localStorage.getItem("ip_user");
    if (token && stored) {
      try {
        const u = JSON.parse(stored);
        storage.setUserId(u.id);   // ← scope all storage reads to this user
        setUser(u);
      } catch {}
    }
    setLoading(false);
  }, []);

  const signup = async (name, email, password) => {
    const { token, user: u } = await apiSignup(name, email, password);
    localStorage.setItem("ip_token", token);
    localStorage.setItem("ip_user",  JSON.stringify(u));
    storage.setUserId(u.id);       // ← new user gets their own isolated storage
    setUser(u);
  };

  const login = async (email, password) => {
    const { token, user: u } = await apiLogin(email, password);
    localStorage.setItem("ip_token", token);
    localStorage.setItem("ip_user",  JSON.stringify(u));
    storage.setUserId(u.id);       // ← switch storage scope to this user's id
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("ip_token");
    localStorage.removeItem("ip_user");
    storage.clearUserId();         // ← clear storage scope
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── INLINE ICONS ─────────────────────────────────────────────────────────────
function EyeOpen() {
  return (
    <svg viewBox="0 0 18 18" fill="none" width="14" height="14">
      <path d="M1 9s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  );
}
function EyeOff() {
  return (
    <svg viewBox="0 0 18 18" fill="none" width="14" height="14">
      <path d="M2 2l14 14M7.6 7.7A2.5 2.5 0 0010.3 11M5.5 5.6C3.8 6.7 2 8.7 2 9s2.7 5.5 7 5.5c1.3 0 2.5-.4 3.5-1M9 3.5c4 0 7 5.5 7 5.5s-.7 1.3-2 2.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function PasswordInput({ value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <input
        type={show ? "text" : "password"} value={value} onChange={onChange}
        placeholder={placeholder || "Password"} className="inp"
        style={{ paddingRight: 38 }}
      />
      <button type="button" onClick={() => setShow(s => !s)} tabIndex={-1}
        style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--muted)", cursor: "pointer", display: "flex", alignItems: "center", padding: 2 }}>
        {show ? <EyeOpen /> : <EyeOff />}
      </button>
    </div>
  );
}

// ─── AUTH PAGE ────────────────────────────────────────────────────────────────
export function AuthPage() {
  const [mode,  setMode]  = useState("login");
  const [form,  setForm]  = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [busy,  setBusy]  = useState(false);
  const { login, signup } = useAuth();

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setError("");
    const email = form.email.trim(), pw = form.password;
    if (mode === "signup") {
      if (!form.name.trim())   return setError("Full name is required.");
      if (!email.includes("@"))return setError("Enter a valid email address.");
      if (pw.length < 6)       return setError("Password must be at least 6 characters.");
      if (pw !== form.confirm) return setError("Passwords do not match.");
    } else {
      if (!email.includes("@"))return setError("Enter a valid email address.");
      if (!pw)                 return setError("Password is required.");
    }
    setBusy(true);
    try {
      if (mode === "login") await login(email, pw);
      else                  await signup(form.name.trim(), email, pw);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const switchMode = () => {
    setMode(m => m === "login" ? "signup" : "login");
    setError("");
    setForm({ name: "", email: "", password: "", confirm: "" });
  };

  return (
    <div className="auth-shell">
      <div className="auth-glow" style={{ top: "5%", left: "25%" }}/>
      <div className="auth-glow" style={{ bottom: "10%", right: "15%", background: "radial-gradient(circle, rgba(155,142,255,0.045) 0%, transparent 70%)" }}/>

      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <div className="auth-logo-mark">
            <AuthLogoMark />
          </div>
          <div className="auth-logo-name">Interview<span>Pro</span></div>
        </div>

        <div className="auth-title">{mode === "login" ? "Welcome back" : "Create account"}</div>
        <div className="auth-sub">
          {mode === "login" ? "Sign in to continue your preparation" : "Start your interview preparation today"}
        </div>

        {error && <div className="auth-error" style={{ marginBottom: 14 }}>{error}</div>}

        <form className="auth-form" onSubmit={submit} noValidate>
          {mode === "signup" && (
            <div className="auth-field">
              <label className="inp-label">Full Name</label>
              <input className="inp" type="text" placeholder="Jane Smith" value={form.name} onChange={set("name")} autoFocus/>
            </div>
          )}
          <div className="auth-field">
            <label className="inp-label">Email Address</label>
            <input className="inp" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} autoFocus={mode === "login"}/>
          </div>
          <div className="auth-field">
            <label className="inp-label">Password</label>
            <PasswordInput value={form.password} onChange={set("password")} placeholder={mode === "signup" ? "Min. 6 characters" : "Your password"}/>
          </div>
          {mode === "signup" && (
            <div className="auth-field">
              <label className="inp-label">Confirm Password</label>
              <PasswordInput value={form.confirm} onChange={set("confirm")} placeholder="Repeat your password"/>
            </div>
          )}
          <button type="submit" className="btn btn-primary"
            style={{ width: "100%", marginTop: 6, padding: "10px 0", fontSize: 13.5 }} disabled={busy}>
            {busy ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="auth-switch">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={switchMode}>{mode === "login" ? "Sign up free" : "Sign in"}</button>
        </div>
      </div>
    </div>
  );
}

// Small inline logo for auth page (avoids importing from Icons to keep Auth self-contained)
function AuthLogoMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
      <line x1="9" y1="8" x2="9" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M13 8h5a4 4 0 010 8h-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="23" cy="24" r="2" fill="rgba(255,255,255,0.6)"/>
    </svg>
  );
}