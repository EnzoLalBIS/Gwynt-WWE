import React, { useState, useEffect, useRef } from "react";
import GameBoard from "../components/gameboard.jsx";
import Sidebar from "../components/sidebar.jsx";
import ActionScreen from "../components/actionScreen.jsx";
import PlayerHand from "../components/playerHand.jsx";
import { initGame } from "../gameFeature/gameInit";
import { playCard, passTurn } from "../gameFeature/gameLoop";
import { botPlay } from "../gameFeature/boto";

export default function Game({ currentUser, playerDeckId }) {
  const gameStateRef = useRef(null);
  const [renderData, setRenderData] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  function syncRender() {
    const s = gameStateRef.current;
    setRenderData({
      activePlayer: s.activePlayer,
      gameOver: s.gameOver || false,
      winner: s.winner,
      players: {
        1: {
          score: s.players[1].score,
          hand: s.players[1].hand,
          field: {
            boost: {
              cards: s.players[1].field.boost.cards,
              score: s.players[1].field.boost.score,
            },
            hype: {
              cards: s.players[1].field.hype.cards,
              score: s.players[1].field.hype.score,
            },
            inRing: {
              cards: s.players[1].field.inRing.cards,
              score: s.players[1].field.inRing.score,
            },
          },
          passed: s.players[1].passed,
        },
        2: {
          score: s.players[2].score,
          hand: s.players[2].hand,
          field: {
            boost: {
              cards: s.players[2].field.boost.cards,
              score: s.players[2].field.boost.score,
            },
            hype: {
              cards: s.players[2].field.hype.cards,
              score: s.players[2].field.hype.score,
            },
            inRing: {
              cards: s.players[2].field.inRing.cards,
              score: s.players[2].field.inRing.score,
            },
          },
          passed: s.players[2].passed,
        },
      },
    });
  }

  useEffect(() => {
    const botDeckId = playerDeckId === 1 ? 2 : 1;
    initGame(playerDeckId, botDeckId).then((state) => {
      gameStateRef.current = state;
      syncRender();
    });
  }, []);

  function handleCardSelect(card, index) {
    if (selectedCard && selectedCard.index === index) {
      setSelectedCard(null);
      return;
    }
    const realCard = gameStateRef.current.players[1].hand[index];
    setSelectedCard({ card: realCard, index });
  }

  async function handleRowClick(rowKey) {
    if (!selectedCard) return;
    if (gameStateRef.current.activePlayer !== 1) return;

    const success = await playCard(
      gameStateRef.current,
      1,
      selectedCard.index,
      rowKey,
    );

    if (!success) return;

    setSelectedCard(null);
    syncRender();

    if (gameStateRef.current.activePlayer === 2) {
      await botPlay(gameStateRef, syncRender, playCard);
    }
  }

  async function handlePassTurn() {
    if (gameStateRef.current.activePlayer !== 1) return;

    passTurn(gameStateRef.current, 1);
    syncRender();

    if (gameStateRef.current.activePlayer === 2) {
      await botPlay(gameStateRef, syncRender, playCard);
    }
  }

  if (!renderData) {
    return <div style={{ color: "white" }}>Loading game...</div>;
  }

  if (renderData.gameOver) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          background: "linear-gradient(180deg, #1e2f52, #0c1424)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "'Russo One', sans-serif",
        }}
      >
        <div
          style={{ fontSize: "48px", color: "#fca616", marginBottom: "20px" }}
        >
          {renderData.winner === 0
            ? "DRAW"
            : `PLAYER ${renderData.winner} WINS`}
        </div>
        <div style={{ fontSize: "24px", marginBottom: "40px" }}>
          {renderData.players[1].score} - {renderData.players[2].score}
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "12px 32px",
            background: "rgba(252,166,22,0.2)",
            border: "2px solid #fca616",
            borderRadius: "8px",
            color: "white",
            fontFamily: "'Russo One', sans-serif",
            fontSize: "16px",
            cursor: "pointer",
            letterSpacing: "1px",
          }}
        >
          PLAY AGAIN
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: "url('/assets/background_ring.webp')",
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
      }}
    >
      <Sidebar
        playerScore={renderData.players[1].score}
        enemyScore={renderData.players[2].score}
        onPass={handlePassTurn}
        playerPassed={renderData.players[1].passed}
        playerName={currentUser ? currentUser.user_Name : "Player"}
      />

      <GameBoard
        playerField={renderData.players[1].field}
        enemyField={renderData.players[2].field}
        selectedCard={selectedCard}
        onRowClick={handleRowClick}
      />

      <ActionScreen />

      <PlayerHand
        cards={renderData.players[1].hand}
        selectedCard={selectedCard}
        onCardSelect={handleCardSelect}
      />
    </div>
  );
}
