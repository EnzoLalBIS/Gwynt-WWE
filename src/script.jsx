import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import AuthScreen from "./pages/auth";
import MainMenu from "./pages/mainMenu";
import Game from "./pages/game";

function App() {
  const [screen, setScreen] = useState("auth");
  const [currentUser, setCurrentUser] = useState(null);

  if (screen === "auth") {
    return (
      <AuthScreen
        onContinue={(user) => {
          setCurrentUser(user);
          setScreen("menu");
        }}
      />
    );
  }

  if (screen === "menu") {
    return <MainMenu startGame={() => setScreen("game")} />;
  }

  if (screen === "game") {
    return <Game currentUser={currentUser} playerDeckId={2} />;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
