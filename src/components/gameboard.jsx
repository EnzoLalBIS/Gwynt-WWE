import React from "react";

const enemyRows = [
  "Boost",
  "Hype",
  "In-Ring"
];

const playerRows = [
  "In-Ring",
  "Hype",
  "Boost"
];

export default function GameBoard() {
  return (
    <div
      style={{
        maxHeight : "90%",
        justifyContent: "center",

        left: "15%",

      
        top: "12px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        gap: "6px"
      }}
    >

      {/* Enemy rows */}
      {enemyRows.map((label, i) => (
        <Row key={i} label={label} type={label} />
      ))}

      {/* Separation */}
      <div
        style={{
          height: "2px",
          background: "rgba(255,255,255,0.4)",
          margin: "8px 0"
        }}
      />

      {/* Player rows */}
      {playerRows.map((label, i) => (
        <Row key={i} label={label} type={label} />
      ))}

      {/* Space for player hand */}
      <div style={{ height: "10%" }} />

    </div>
  );
}

function Row({ label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontWeight: "800",
        letterSpacing: "0.5px",
        textShadow: "2px 2px 8px rgba(0,0,0,1)"
      }}
    >
      <div style={{ width: "10%", color: "rgba(252, 166, 22, 1)" }}>{label}</div>

      <div
        style={{
          display: "flex",
          gap: "4px",
          flex: 1
        }}
      >
        {[...Array(5)].map((_, i) => (
          <CardSlot key={i} />
        ))}
      </div>
    </div>
  );
}

function CardSlot() {
  return (
    <div
      style={{
        backgroundColor: "rgba(12, 20, 36, 0.8)",
        width: "70px",
        aspectRatio: "3/4",
        border: "2px solid rgba(252, 166, 22, 0.5)",
        borderRadius: "8px"
      }}
    />
  );
}