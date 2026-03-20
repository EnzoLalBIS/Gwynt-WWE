import React, { useState } from "react";

export default function AuthScreen({ onContinue }) {
  const [mode, setMode] = useState("login");

  return (
    <div style={container}>

      {/* Logo */}
      <img src="/assets/logo.png" style={logo} alt="logo" />

      <div style={box}>

        {/* Tabs */}
        <div style={tabs}>
          <button
            onClick={() => setMode("login")}
            style={{
              ...tab,
              ...(mode === "login" ? activeTab : {})
            }}
          >
            Login
          </button>

          <button
            onClick={() => setMode("register")}
            style={{
              ...tab,
              ...(mode === "register" ? activeTab : {})
            }}
          >
            Register
          </button>
        </div>

        {/* Inputs */}
        <input placeholder="Email" style={input} />

        <input placeholder="Password" type="password" style={input} />

        {mode === "register" && (
          <input
            placeholder="Confirm password"
            type="password"
            style={input}
          />
        )}

        {/* CTA */}
        <button style={button} onClick={onContinue}>
          {mode === "login" ? "Enter Kayfabe" : "Create Account"}
        </button>

      </div>

    </div>
  );
}

/* ===================== STYLES ===================== */

const container = {
  height: "100vh",
  background: "linear-gradient(180deg, #1e2f52, #0c1424)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "'Russo One', sans-serif"
};

const logo = {
  width: "140px",
  marginBottom: "20px",
  filter: "drop-shadow(0 0 20px rgba(252,166,22,0.6))"
};

const box = {
  border: "2px solid #FCA616",
  borderRadius: "16px",
  padding: "30px",
  background: "rgba(0,0,0,0.7)",
  boxShadow: "0 0 25px rgba(252,166,22,0.6)",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const tabs = {
  display: "flex",
  gap: "10px",
  marginBottom: "10px"
};

const tab = {
  flex: 1,
  padding: "8px",
  cursor: "pointer",
  background: "transparent",
  border: "none",
  color: "white",
  opacity: 0.6,
  fontFamily: "'Russo One', sans-serif"
};

const activeTab = {
  opacity: 1,
  WebkitTextStroke: "1px #FCA616"
};

const input = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #FCA616",
  background: "#0c1424",
  color: "white"
};

const button = {
  marginTop: "10px",
  padding: "10px",
  borderRadius: "10px",
  border: "none",
  background: "#FCA616",
  color: "black",
  fontWeight: "bold",
  cursor: "pointer"
};