import React from "react";
import ReactDOM from "react-dom/client";
import GameBoard from "../components/gameboard.jsx";
import Sidebar from "../components/sidebar.jsx";
import ActionScreen from "../components/actionScreen.jsx";
import PlayerHand from "../components/playerHand.jsx";

function App() {
  return (
    <div
      style={{
        backgroundImage: "url('/assets/background_ring.webp')",
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex"
      }}
    >
      <Sidebar />

      <GameBoard />

      <ActionScreen />

      <PlayerHand />

    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);