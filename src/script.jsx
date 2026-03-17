import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import MainMenu from "./pages/mainMenu";
import Game from "./pages/game";

function App() {
  const [screen, setScreen] = useState("menu");

  if (screen === "menu") {
    return <MainMenu startGame={() => setScreen("game")} />;
  }

  if (screen === "game") {
    return <Game />;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);