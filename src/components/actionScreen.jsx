import React from "react";

export default function ActionScreen({ animation }) {
  return (
    <div style={screenStyle}>
      {animation ? (
        <img
          src={`http://localhost:8081/assets/gif/${animation}.gif`}
          alt={animation}
          style={mediaStyle}
        />
      ) : (
        <div
          style={{
            ...mediaStyle,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "rgba(252,166,22,0.3)",
              fontSize: "12px",
              fontFamily: "'Russo One', sans-serif",
            }}
          >
            WAITING...
          </span>
        </div>
      )}
    </div>
  );
}

const screenStyle = {
  position: "absolute",
  top: "40px",
  right: "40px",
  width: "320px",
  height: "180px",
  background: "black",
  borderRadius: "12px",
  border: "2px solid rgba(252,166,22,0.9)",
  boxShadow: `
    0 0 15px rgba(252,166,22,0.9),
    inset 0 0 25px rgba(0,0,0,0.9)
  `,
  overflow: "hidden",
};

const mediaStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0.9,
};
