import React, { useState, useEffect } from "react";

export default function Account({
  setScreen,
  currentUser,
  selectedDeckId,
  onDeckSelect,
}) {
  const [volume, setVolume] = useState(50);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/Deck")
      .then((res) => res.json())
      .then((json) => setDecks(json.data));
  }, []);

  const user = {
    pseudo: currentUser ? currentUser.user_Name : "Player",
    deck: decks.find((d) => d.id === selectedDeckId)?.name || "None",
  };

  return (
    <div style={container}>
      <div
        onClick={() => setScreen("menu")}
        style={backButton}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 0 15px rgba(252,166,22,0.9)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 0 10px rgba(252,166,22,0.5)";
        }}
      >
        ← BACK
      </div>

      <img src="/assets/logo.png" style={logo} />

      <div style={title}>ACCOUNT</div>

      <div style={grid}>
        <Card>
          <div style={cardTitle}>STATS</div>
          <div style={text}>👤 {user.pseudo}</div>
          <div style={text}>🎴 Deck: {user.deck}</div>
          <div style={subText}>Wins: 12</div>
          <div style={subText}>Losses: 5</div>
        </Card>

        <Card>
          <div style={cardTitle}>SETTINGS</div>
          <div style={text}>🔊 Volume</div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            style={slider}
          />
          <div style={subText}>{volume}%</div>
          <div style={button}>Change Password</div>
        </Card>

        <Card>
          <div style={cardTitle}>DECKS</div>
          {decks.map((deck) => {
            const isActive = deck.id === selectedDeckId;
            return (
              <div
                key={deck.id}
                onClick={() => onDeckSelect(deck.id)}
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  border: "2px solid #FCA616",
                  cursor: "pointer",
                  transition: "0.2s",
                  background: isActive ? "#FCA616" : "transparent",
                  color: isActive ? "#000" : "#FFFFFF",
                }}
              >
                {deck.name}
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

function Card({ children }) {
  return (
    <div
      style={card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 0 30px rgba(252,166,22,0.8)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 0 20px rgba(252,166,22,0.5)";
      }}
    >
      {children}
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
  position: "relative",
};

const backButton = {
  position: "absolute",
  top: "20px",
  left: "20px",
  padding: "8px 14px",
  borderRadius: "10px",
  border: "2px solid #FCA616",
  color: "#fff",
  cursor: "pointer",
  fontSize: "14px",
  fontFamily: "'Russo One', sans-serif",
  background: "rgba(0,0,0,0.6)",
  boxShadow: "0 0 10px rgba(252,166,22,0.5)",
  transition: "0.2s",
};

const logo = {
  width: "120px",
  marginBottom: "10px",
  filter: "drop-shadow(0 0 20px rgba(252,166,22,0.6))",
};

const title = {
  fontSize: "32px",
  color: "#fff",
  marginBottom: "40px",
  WebkitTextStroke: "1px #FCA616",
  textShadow: "0 0 10px rgba(252,166,22,0.7)",
};

const grid = {
  display: "flex",
  gap: "40px",
};

const card = {
  width: "260px",
  minHeight: "300px",
  background: "rgba(0,0,0,0.7)",
  border: "2px solid #FCA616",
  borderRadius: "16px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  cursor: "pointer",
  transition: "0.2s",
  boxShadow: "0 0 20px rgba(252,166,22,0.5)",
};

const cardTitle = {
  fontSize: "18px",
  color: "#fff",
  WebkitTextStroke: "1px #FCA616",
  marginBottom: "10px",
};

const text = {
  color: "#fff",
  fontSize: "14px",
};

const subText = {
  color: "rgba(255,255,255,0.7)",
  fontSize: "12px",
};

const button = {
  marginTop: "15px",
  padding: "8px",
  borderRadius: "8px",
  background: "#FCA616",
  color: "#000",
  textAlign: "center",
  cursor: "pointer",
};

const slider = {
  width: "100%",
};
