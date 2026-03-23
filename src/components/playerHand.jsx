import React, { useState, useRef, useEffect } from "react";

export default function PlayerHand({ cards = [], selectedCard, onCardSelect }) {
  const [previewCard, setPreviewCard] = useState(null);
  const [previewEffect, setPreviewEffect] = useState(null);

  useEffect(() => {
    if (!previewCard || !previewCard.effect) {
      setPreviewEffect(null);
      return;
    }

    fetch(`http://localhost:8081/cardsEffects/${previewCard.id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.data && json.data.length > 0) {
          setPreviewEffect(json.data[0]);
        }
      });
  }, [previewCard]);

  return (
    <>
      {previewCard && (
        <div
          onClick={() => {
            setPreviewCard(null);
            setPreviewEffect(null);
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.85)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(180deg, #1e2f52, #0c1424)",
              border: "2px solid #fca616",
              borderRadius: "16px",
              overflow: "hidden",
              width: "280px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 0 30px rgba(252,166,22,0.6)",
            }}
          >
            {/* Image — full width no crop */}
            {previewCard.img ? (
              <img
                src={`http://localhost:8081/assets/image/${previewCard.img}`}
                alt={previewCard.name}
                style={{
                  width: "100%",
                  height: "280px",
                  objectFit: "contain",
                  background: "rgba(0,0,0,0.5)",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "280px",
                  background: "rgba(255,255,255,0.05)",
                }}
              />
            )}

            {/* Info block */}
            <div
              style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {/* Name */}
              <div
                style={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "700",
                  fontFamily: "'Russo One', sans-serif",
                  textAlign: "center",
                }}
              >
                {previewCard.name}
              </div>

              {/* DMG */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "#fca616", fontSize: "14px" }}>
                  ⚔️ DMG
                </span>
                <span
                  style={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "900",
                  }}
                >
                  {previewCard.dmg}
                </span>
              </div>

              {/* Description */}
              <div
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "12px",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                {previewCard.description}
              </div>

              {/* Effect */}
              {previewEffect && (
                <div
                  style={{
                    background: "rgba(252,166,22,0.1)",
                    border: "1px solid rgba(252,166,22,0.4)",
                    borderRadius: "8px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      color: "#fca616",
                      fontSize: "12px",
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    ✨ {previewEffect.description}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "11px",
                      textAlign: "center",
                    }}
                  >
                    {previewEffect.state.replace("_", " ")} —{" "}
                    {previewEffect.dmg > 0
                      ? `${previewEffect.dmg} dmg`
                      : "no damage"}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "10px",
                      textAlign: "center",
                    }}
                  >
                    {previewEffect.effect_trigger === "on_play"
                      ? "Triggers on play"
                      : "Triggers each turn start"}
                  </div>
                </div>
              )}

              {/* Close hint */}
              <div
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "10px",
                  textAlign: "center",
                }}
              >
                Click anywhere to close
              </div>
            </div>
          </div>
        </div>
      )}

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
                onLongPress={() => setPreviewCard(card)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

function CardItem({ card, rotation, isSelected, onClick, onLongPress }) {
  const pressTimer = useRef(null);
  const didLongPress = useRef(false);

  function handleMouseDown() {
    didLongPress.current = false;
    pressTimer.current = setTimeout(() => {
      didLongPress.current = true;
      onLongPress();
    }, 500);
  }

  function handleMouseUp() {
    clearTimeout(pressTimer.current);
  }

  function handleClick() {
    if (didLongPress.current) return;
    onClick();
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
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
    >
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
