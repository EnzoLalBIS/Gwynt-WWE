import React, { useState } from "react";

export default function AuthScreen({ onContinue }) {
  const [mode, setMode] = useState("login");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError("");

    if (!userName || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (mode === "register" && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      if (mode === "register") {
        const res = await fetch("http://localhost:8081/postUsers/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_Name: userName, password }),
        });
        const json = await res.json();

        if (json.message !== "Account created successfully") {
          setError(json.message);
          setLoading(false);
          return;
        }

        // Auto switch to login after register
        setMode("login");
        setError("");
        setLoading(false);
        return;
      }

      // Login
      const res = await fetch("http://localhost:8081/postUsers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_Name: userName, password }),
      });
      const json = await res.json();

      if (!json.success) {
        setError(json.message);
        setLoading(false);
        return;
      }

      onContinue(json.user);
    } catch (err) {
      setError("Server error, please try again");
      setLoading(false);
    }
  }

  return (
    <div style={container}>
      <img src="/assets/logo.png" style={logo} alt="logo" />

      <div style={box}>
        <div style={tabs}>
          <button
            onClick={() => {
              setMode("login");
              setError("");
            }}
            style={{ ...tab, ...(mode === "login" ? activeTab : {}) }}
          >
            Login
          </button>
          <button
            onClick={() => {
              setMode("register");
              setError("");
            }}
            style={{ ...tab, ...(mode === "register" ? activeTab : {}) }}
          >
            Register
          </button>
        </div>

        <input
          placeholder="Username"
          style={input}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          style={input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {mode === "register" && (
          <input
            placeholder="Confirm password"
            type="password"
            style={input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {error && (
          <div
            style={{ color: "#ff4444", fontSize: "12px", textAlign: "center" }}
          >
            {error}
          </div>
        )}

        <button style={button} onClick={handleSubmit} disabled={loading}>
          {loading
            ? "..."
            : mode === "login"
              ? "Enter Kayfabe"
              : "Create Account"}
        </button>
      </div>
    </div>
  );
}

const container = {
  height: "100vh",
  background: "linear-gradient(180deg, #1e2f52, #0c1424)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "'Russo One', sans-serif",
};

const logo = {
  width: "140px",
  marginBottom: "20px",
  filter: "drop-shadow(0 0 20px rgba(252,166,22,0.6))",
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
  gap: "12px",
};

const tabs = {
  display: "flex",
  gap: "10px",
  marginBottom: "10px",
};

const tab = {
  flex: 1,
  padding: "8px",
  cursor: "pointer",
  background: "transparent",
  border: "none",
  color: "white",
  opacity: 0.6,
  fontFamily: "'Russo One', sans-serif",
};

const activeTab = {
  opacity: 1,
  WebkitTextStroke: "1px #FCA616",
};

const input = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #FCA616",
  background: "#0c1424",
  color: "white",
};

const button = {
  marginTop: "10px",
  padding: "10px",
  borderRadius: "10px",
  border: "none",
  background: "#FCA616",
  color: "black",
  fontWeight: "bold",
  cursor: "pointer",
};
