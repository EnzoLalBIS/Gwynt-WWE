import React from "react";

const rowKeyMap = {
  "In-Ring": "inRing",
  Hype: "hype",
  Boost: "boost",
};

const enemyRows = ["Boost", "Hype", "In-Ring"];
const playerRows = ["In-Ring", "Hype", "Boost"];

export default function GameBoard({
  playerField,
  enemyField,
  selectedCard,
  onRowClick,
  selectingTarget,
  onTargetSelect,
}) {
  return (
    <div
      style={{
        maxHeight: "90%",
        justifyContent: "center",
        left: "15%",
        top: "12px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        gap: "6px",
      }}
    >
      {enemyRows.map((label, i) => (
        <Row
          key={i}
          label={label}
          cards={enemyField[rowKeyMap[label]].cards}
          score={enemyField[rowKeyMap[label]].score}
          isClickable={false}
          selectingTarget={selectingTarget}
          onTargetSelect={onTargetSelect}
          rowOffset={enemyRows
            .slice(0, i)
            .reduce((acc, r) => acc + enemyField[rowKeyMap[r]].cards.length, 0)}
        />
      ))}

      <div
        style={{
          height: "2px",
          background: "rgba(255,255,255,0.4)",
          margin: "8px 0",
        }}
      />

      {playerRows.map((label, i) => (
        <Row
          key={i}
          label={label}
          cards={playerField[rowKeyMap[label]].cards}
          score={playerField[rowKeyMap[label]].score}
          isClickable={!!selectedCard && !selectingTarget}
          onRowClick={() => onRowClick(rowKeyMap[label])}
          selectingTarget={false}
          rowOffset={0}
        />
      ))}

      <div style={{ height: "10%" }} />
    </div>
  );
}

function Row({
  label,
  cards,
  score,
  isClickable,
  onRowClick,
  selectingTarget,
  onTargetSelect,
  rowOffset = 0,
}) {
  return (
    <div
      onClick={isClickable ? onRowClick : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontWeight: "800",
        letterSpacing: "0.5px",
        textShadow: "2px 2px 8px rgba(0,0,0,1)",
        cursor: isClickable ? "pointer" : "default",
        border: isClickable
          ? "1px solid rgba(252,166,22,0.4)"
          : "1px solid transparent",
        borderRadius: "8px",
        padding: "2px",
        transition: "border 0.2s ease",
      }}
    >
      <div
        style={{
          width: "10%",
          color: "rgba(252, 166, 22, 1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>{label}</span>
        <span style={{ fontSize: "12px" }}>{score}</span>
      </div>

      <div style={{ display: "flex", gap: "4px", flex: 1 }}>
        {cards.map((card, i) => (
          <FieldCard
            key={i}
            card={card}
            isTarget={selectingTarget && card.dmg > 0}
            onClick={
              selectingTarget && card.dmg > 0
                ? () => onTargetSelect(rowOffset + i)
                : undefined
            }
          />
        ))}
        {[...Array(Math.max(0, 5 - cards.length))].map((_, i) => (
          <CardSlot key={`empty-${i}`} />
        ))}
      </div>
    </div>
  );
}

function FieldCard({ card, isTarget, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: "70px",
        height: "93px",
        border: isTarget ? "2px solid #ff4444" : "2px solid #fca616",
        boxShadow: isTarget ? "0 0 12px rgba(255,68,68,0.8)" : "none",
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        flexShrink: 0,
        cursor: isTarget ? "pointer" : "default",
        transition: "border 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {card.img ? (
        <img
          src={`http://localhost:8081/assets/image/${card.img}`}
          alt={card.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(12,20,36,0.8)",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          background: "rgba(0,0,0,0.75)",
          padding: "2px 0",
          zIndex: 1,
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "7px",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          {card.name}
        </div>
        <div
          style={{
            color: isTarget ? "#ff4444" : "#fca616",
            fontSize: "12px",
            fontWeight: "900",
            textAlign: "center",
          }}
        >
          {card.dmg}
        </div>
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
        height: "93px",
        border: "2px solid rgba(252, 166, 22, 0.5)",
        borderRadius: "8px",
        flexShrink: 0,
      }}
    />
  );
}
