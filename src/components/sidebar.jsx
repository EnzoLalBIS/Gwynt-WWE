import React from "react";

export default function Sidebar({
  playerScore,
  enemyScore,
  onPass,
  playerPassed,
  playerName,
}) {
  const enemy = {
    name: "Roman Reigns",
    deck: "Bloodline Control",
  };

  const player = {
    name: playerName || "Player",
    deck: "Bloodline Control",
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
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <PlayerCard title="ENEMY" player={enemy} score={enemyScore} />
      <PlayerCard
        title="PLAYER"
        player={player}
        score={playerScore}
        onPass={onPass}
        playerPassed={playerPassed}
      />
    </div>
  );
}

function PlayerCard({ title, player, score, onPass, playerPassed }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(10,15,25,0.95), rgba(0,0,0,0.9))",
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
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          letterSpacing: "2px",
          color: "#cfcfcf",
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontWeight: "700",
          fontSize: "22px",
          textShadow: "0 2px 6px rgba(0,0,0,0.9)",
        }}
      >
        {player.name}
      </div>

      <div style={{ opacity: 0.75, fontSize: "15px" }}>{player.deck}</div>

      <div
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        ⚔️ {score}
      </div>

      {onPass && (
        <button
          onClick={onPass}
          disabled={playerPassed}
          style={{
            marginTop: "8px",
            padding: "8px 16px",
            background: playerPassed
              ? "rgba(100,100,100,0.5)"
              : "rgba(252,166,22,0.2)",
            border: "2px solid #fca616",
            borderRadius: "8px",
            color: playerPassed ? "#888" : "white",
            fontFamily: "'Russo One', sans-serif",
            fontSize: "12px",
            cursor: playerPassed ? "not-allowed" : "pointer",
            letterSpacing: "1px",
          }}
        >
          {playerPassed ? "PASSED" : "PASS TURN"}
        </button>
      )}
    </div>
  );
}
