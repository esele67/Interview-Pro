import React from "react";
import { AuthProvider, useAuth, AuthPage } from "./components/Auth";
import InterviewPro from "./components/InterviewPro";
import "./components/styles.css";

function AppInner() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#07080D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          width: 36,
          height: 36,
          border: "2.5px solid rgba(108,126,255,0.15)",
          borderTop: "2.5px solid #6C7EFF",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return user ? <InterviewPro /> : <AuthPage />;
}

function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

export default App;