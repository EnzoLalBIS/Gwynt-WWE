import React from "react";

export default function ActionScreen() {
  return (
    <div style={screenStyle}>

      <video
        src="/videos/action.mp4"   // change le chemin si besoin
        autoPlay
        muted
        loop
        style={videoStyle}
      />

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

  overflow: "hidden"
};

const videoStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0.9
};