import React from "react";

export default function MainMenu({ startGame, onAccount, currentUser }) {
  return (
    <div style={container}>
      {/* Account button top right */}
      <div
        onClick={onAccount}
        style={accountBtn}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(252,166,22,0.2)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(0,0,0,0.5)")
        }
      >
        <span
          style={{ fontSize: "12px", color: "#fca616", letterSpacing: "1px" }}
        >
          {currentUser ? currentUser.user_Name.toUpperCase() : "ACCOUNT"}
        </span>
      </div>

      {/* Logo */}
      <img src="/assets/logo.png" alt="logo" style={logo} />

      {/* Menu Box */}
      <div style={menuBox}>
        <MenuItem
          title="Career"
          subtitle="Build your legacy as a General Manager"
        />
        <MenuItem
          title="One Night Event"
          subtitle="Simulate a one-night show"
          onClick={startGame}
        />
        <MenuItem
          title="Global Ranking"
          subtitle="Compete with other bookers"
        />
      </div>

      {/* Bottom lines */}
      <div style={lines}></div>

      {/* Badge */}
      <img src="/assets/img_user.png" alt="badge" style={badge} />
    </div>
  );
}

function MenuItem({ title, subtitle, onClick }) {
  return (
    <div
      style={menuItem}
      onClick={() => {
        console.log("CLICK WORKS:", title);
        if (onClick) onClick();
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.background = "rgba(252,166,22,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.background = "transparent";
      }}
    >
      <div style={menuTitle}>{title}</div>
      <div style={menuSubtitle}>{subtitle}</div>
    </div>
  );
}

const container = {
  height: "100vh",
  width: "100vw",
  background: "linear-gradient(180deg, #1e2f52, #0c1424)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  fontFamily: "'Russo One', sans-serif",
  overflow: "visible", // ← change hidden en visible
};

const logo = {
  width: "180px",
  marginBottom: "20px",
  filter: "drop-shadow(0 0 20px rgba(252,166,22,0.6))",
};

const menuBox = {
  border: "2px solid #fca616",
  borderRadius: "18px",
  padding: "30px 60px",
  background: "rgba(0,0,0,0.7)",
  boxShadow: "0 0 30px rgba(252,166,22,0.6)",
  textAlign: "center",
};

const menuItem = {
  margin: "14px 0",
  cursor: "pointer",
  transition: "0.2s ease",
  borderRadius: "10px",
  padding: "8px 16px",
};

const menuTitle = {
  fontSize: "32px",
  color: "#FFFFFF",
  WebkitTextStroke: "0.5px #FCA616",
  textShadow: `
    0 0 2px #FCA616,
    0 0 1px rgba(252,166,22,0.7)
  `,
  fontWeight: "800",
  pointerEvents: "none",
  letterSpacing: "0.5px",
  lineHeight: "1.1",
};

const menuSubtitle = {
  fontSize: "12px",
  color: "rgba(255,255,255,0.6)",
  marginTop: "2px",
  pointerEvents: "none",
};

const badge = {
  position: "absolute",
  bottom: "30px",
  right: "30px",
  width: "120px",
  filter: "drop-shadow(0 0 15px rgba(252,166,22,0.7))",
};

const lines = {
  position: "absolute",
  bottom: "0",
  width: "100%",
  height: "3px",
  background: "#fca616",
  boxShadow: `
    0 -6px 0 #fca616,
    0 -12px 0 #fca616
  `,
};

const accountBtn = {
  position: "absolute",
  top: "20px",
  right: "20px",
  padding: "8px 16px",
  background: "rgba(0,0,0,0.5)",
  border: "1px solid #fca616",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.2s ease",
};
