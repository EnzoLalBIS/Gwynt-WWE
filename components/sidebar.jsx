import React from "react";

export default function Sidebar() {

  const enemy = {
    name: "Roman Reigns",
    deck: "Bloodline Control",
    hp: 20
  };

  const player = {
    name: "Enzo",
    deck: "Bloodline Control",
    hp: 20
  };

  return (
    <div
      style={{
        height: "90%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "white",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >

      {/* Enemy */}
      <PlayerCard title="ENEMY" player={enemy} />

      {/* Player */}
      <PlayerCard title="PLAYER" player={player} />

    </div>
  );
}

function PlayerCard({ title, player }) {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, rgba(10,15,25,0.95), rgba(0,0,0,0.9))",
        border: "2px solid #fca616",
        borderRadius: "16px",
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        boxShadow: `
          0 0 10px rgba(252,166,22,0.6),
          inset 0 0 6px rgba(252,166,22,0.2)
        `,
        backdropFilter: "blur(4px)"
      }}
    >

      <div
        style={{
          fontSize: "12px",
          letterSpacing: "2px",
          color: "#cfcfcf",
          textTransform: "uppercase"
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontWeight: "700",
          fontSize: "22px",
          textShadow: "0 2px 6px rgba(0,0,0,0.9)"
        }}
      >
        {player.name}
      </div>

      <div
        style={{
          opacity: 0.75,
          fontSize: "15px"
        }}
      >
        {player.deck}
      </div>

      <div
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        ❤️ {player.hp}
      </div>

    </div>
  );
}