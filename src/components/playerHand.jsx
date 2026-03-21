import React from "react";

export default function PlayerHand({ cards = [], selectedCard, onCardSelect }) {
  return (
    <div style={handContainer}>
      <div style={handScroller}>
        {cards.map((card, i) => {
          const rotation = (i - cards.length / 2) * 2;
          const isSelected = selectedCard && selectedCard.index === i;
          return (
            <CardItem
              key={card.id || i}
              card={card}
              rotation={rotation}
              isSelected={isSelected}
              onClick={() => onCardSelect(card, i)}
            />
          );
        })}
      </div>
    </div>
  );
}

function CardItem({ card, rotation, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        ...cardStyle,
        transform: isSelected
          ? `rotate(${rotation}deg) translateY(-45px) scale(1.2)`
          : `rotate(${rotation}deg)`,
        border: isSelected
          ? "2px solid rgba(255,255,255,0.9)"
          : "2px solid #fca616",
        boxShadow: isSelected
          ? "0 0 20px rgba(255,255,255,0.8)"
          : "0 0 12px rgba(252,166,22,0.6)",
        zIndex: isSelected ? 10 : 1,
      }}
      onMouseEnter={(e) => {
        if (isSelected) return;
        e.currentTarget.style.transform = `rotate(${rotation}deg) translateY(-35px) scale(1.15)`;
        e.currentTarget.style.zIndex = 10;
      }}
      onMouseLeave={(e) => {
        if (isSelected) return;
        e.currentTarget.style.transform = `rotate(${rotation}deg)`;
        e.currentTarget.style.zIndex = 1;
      }}
    >
      {/* Card image fills the whole card */}
      <div style={{ position: "relative", width: "100%", flex: 1 }}>
        {card.img ? (
          <img
            src={`http://localhost:8081/assets/image/${card.img}`}
            alt={card.name}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px 8px 0 0",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "8px 8px 0 0",
            }}
          />
        )}
      </div>

      {/* Name and dmg at bottom */}
      <div
        style={{
          background: "rgba(0,0,0,0.8)",
          padding: "4px",
          borderRadius: "0 0 8px 8px",
          flexShrink: 0,
        }}
      >
        <div style={cardNameStyle}>{card.name}</div>
        <div style={cardDmgStyle}>{card.dmg}</div>
      </div>
    </div>
  );
}

const handContainer = {
  position: "absolute",
  bottom: "0px",
  right: "40px",
  width: "35%",
  height: "260px",
  display: "flex",
  alignItems: "flex-end",
};

const handScroller = {
  display: "flex",
  gap: "10px",
  overflowX: "auto",
  overflowY: "hidden",
  padding: "20px",
  paddingTop: "70px",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
};

const cardStyle = {
  width: "100px",
  minWidth: "100px",
  height: "140px",
  background: "#0c1424",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const cardNameStyle = {
  color: "white",
  fontSize: "9px",
  fontWeight: "700",
  textAlign: "center",
};

const cardDmgStyle = {
  color: "#fca616",
  fontSize: "16px",
  fontWeight: "900",
  textAlign: "center",
};
