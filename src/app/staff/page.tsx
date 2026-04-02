"use client";

import { useState, useEffect } from "react";

const EXPECTED = "yoro2026";

export default function StaffPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem("yoro-staff-auth");
    if (saved === "ok") {
      setAuthed(true);
    }
    setChecking(false);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === EXPECTED) {
      sessionStorage.setItem("yoro-staff-auth", "ok");
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (checking) return null;

  if (!authed) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f0eb",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            borderRadius: 16,
            padding: "2.5rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            textAlign: "center",
            maxWidth: 360,
            width: "100%",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🪲</div>
          <h1
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "#1a472a",
              marginBottom: "0.3rem",
            }}
          >
            養老昆虫クラブ
          </h1>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#888",
              marginBottom: "1.5rem",
            }}
          >
            スタッフエリア
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="パスワード"
            autoFocus
            style={{
              width: "100%",
              padding: "0.8rem 1rem",
              border: error ? "2px solid #e53935" : "1px solid #ddd",
              borderRadius: 8,
              fontSize: "1rem",
              outline: "none",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          />
          {error && (
            <p
              style={{
                color: "#e53935",
                fontSize: "0.82rem",
                marginBottom: "0.8rem",
                marginTop: "-0.5rem",
              }}
            >
              パスワードが違います
            </p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.8rem",
              background: "#1a472a",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            入る
          </button>
        </form>
      </div>
    );
  }

  return (
    <iframe
      src="/staff/calendar.html"
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
      }}
    />
  );
}
