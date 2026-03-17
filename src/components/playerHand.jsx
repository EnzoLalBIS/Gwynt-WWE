import React from "react";

export default function PlayerHand() {

  const cards = [
    1,2,3,4,5,6,7,8,9,10,11,12
  ];

  return (
    <div style={handContainer}>

      <div style={handScroller}>

        {cards.map((card, i) => {

          const rotation = (i - cards.length / 2) * 2;

          return (
            <div
              key={i}
              style={{
                ...cardStyle,
                transform: `rotate(${rotation}deg)`
              }}

              onMouseEnter={(e)=>{
                e.currentTarget.style.transform += " translateY(-35px) scale(1.15)";
                e.currentTarget.style.zIndex = 10;
              }}

              onMouseLeave={(e)=>{
                e.currentTarget.style.transform = `rotate(${rotation}deg)`;
                e.currentTarget.style.zIndex = 1;
              }}

            />
          );
        })}

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
  alignItems: "flex-end"
};

const handScroller = {
  display: "flex",
  gap: "10px",

  overflowX: "auto",
  overflowY: "hidden",

  padding: "20px",
  paddingTop: "70px",

  scrollbarWidth: "none",
  msOverflowStyle: "none"
};

const cardStyle = {
  width: "100px",
  minWidth: "100px",

  aspectRatio: "3/4",

  background: "#0c1424",
  border: "2px solid #fca616",
  borderRadius: "12px",

  cursor: "pointer",

  transition: "all 0.2s ease",

  boxShadow: "0 0 12px rgba(252,166,22,0.6)"
};