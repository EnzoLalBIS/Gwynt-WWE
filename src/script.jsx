import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import AuthScreen from "./pages/auth";
import MainMenu from "./pages/mainMenu";
import Account from "./pages/account";
import Game from "./pages/game";

function App() {
  const [screen, setScreen] = useState("auth");
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedDeckId, setSelectedDeckId] = useState(2);

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
    return (
      <MainMenu
        startGame={() => setScreen("game")}
        onAccount={() => setScreen("account")}
        currentUser={currentUser}
      />
    );
  }

  if (screen === "account") {
    return (
      <Account
        setScreen={setScreen}
        currentUser={currentUser}
        selectedDeckId={selectedDeckId}
        onDeckSelect={setSelectedDeckId}
      />
    );
  }

  if (screen === "game") {
    return (
      <Game
        currentUser={currentUser}
        playerDeckId={selectedDeckId}
        setScreen={setScreen}
      />
    );
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
