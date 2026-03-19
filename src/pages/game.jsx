import React from "react";

import GameBoard from "../components/gameboard.jsx";
import Sidebar from "../components/sidebar.jsx";
import ActionScreen from "../components/actionScreen.jsx";
import PlayerHand from "../components/playerHand.jsx";

export default function Game() {
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