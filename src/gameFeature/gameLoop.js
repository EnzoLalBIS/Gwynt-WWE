import { triggerOnPlayEffect, triggerOnTurnStartEffects } from "./gameEffect";

const MAX_CARDS_PER_ROW = 5;

function checkGameOver(state) {
  // Check if all rows are full for both players
  const allRowsFull = (playerId) => {
    const field = state.players[playerId].field;
    return (
      field.boost.cards.length >= MAX_CARDS_PER_ROW &&
      field.hype.cards.length >= MAX_CARDS_PER_ROW &&
      field.inRing.cards.length >= MAX_CARDS_PER_ROW
    );
  };

  // Check if both players have no cards left
  const noCardsLeft = (playerId) =>
    state.players[playerId].hand.length === 0 &&
    state.players[playerId].deck.length === 0;

  if (
    (allRowsFull(1) && allRowsFull(2)) ||
    (noCardsLeft(1) && noCardsLeft(2)) ||
    (state.players[1].passed && state.players[2].passed)
  ) {
    endGame(state);
    return true;
  }

  return false;
}

export async function playCard(
  state,
  playerId,
  cardIndex,
  row,
  targetCardIndex = null,
) {
  const player = state.players[playerId];

  if (player.passed) {
    console.log(`Player ${playerId} has already passed`);
    return false;
  }

  if (cardIndex < 0 || cardIndex >= player.hand.length) {
    console.log(`Invalid card index ${cardIndex}`);
    return false;
  }

  if (!["boost", "hype", "inRing"].includes(row)) {
    console.log(`Invalid row: ${row}`);
    return false;
  }

  // Check if row is full
  if (player.field[row].cards.length >= MAX_CARDS_PER_ROW) {
    console.log(`Row ${row} is full for player ${playerId}`);
    return false;
  }

  const card = player.hand.splice(cardIndex, 1)[0];
  player.field[row].cards.push(card);

  state.addLog(`Player ${playerId} played ${card.name} on ${row}`);

  await triggerOnPlayEffect(card, playerId, state, targetCardIndex, row);

  state.calculateScore(playerId);
  state.addLog(`Player ${playerId} score: ${player.score}`);

  drawCard(state, playerId);

  // Check game over before switching turn
  if (checkGameOver(state)) return true;

  if (!state.players[1].passed || !state.players[2].passed) {
    await nextTurn(state);
  }

  return true;
}

function drawCard(state, playerId) {
  const player = state.players[playerId];

  if (player.deck.length === 0) {
    console.log(`Player ${playerId} has no cards left in deck`);
    return;
  }

  const card = player.deck.pop();
  player.hand.push(card);

  state.addLog(`Player ${playerId} drew ${card.name}`);
}

export function passTurn(state, playerId) {
  const player = state.players[playerId];

  if (player.passed) {
    console.log(`Player ${playerId} has already passed`);
    return false;
  }

  player.passed = true;
  state.addLog(`Player ${playerId} passed`);

  if (checkGameOver(state)) return true;

  nextTurn(state);
  return true;
}

async function nextTurn(state) {
  const nextPlayer = state.activePlayer === 1 ? 2 : 1;

  if (state.players[nextPlayer].passed) {
    state.addLog(
      `Player ${nextPlayer} has passed - Player ${state.activePlayer} continues`,
    );
    return;
  }

  state.activePlayer = nextPlayer;
  state.turn++;

  await triggerOnTurnStartEffects(state.activePlayer, state);

  state.addLog(`Turn ${state.turn} - Player ${state.activePlayer} to play`);
}

export function endGame(state) {
  const score1 = state.players[1].score;
  const score2 = state.players[2].score;

  state.addLog(`Game over - Player 1: ${score1} | Player 2: ${score2}`);

  if (score1 > score2) {
    state.winner = 1;
    state.addLog("Player 1 wins");
  } else if (score2 > score1) {
    state.winner = 2;
    state.addLog("Player 2 wins");
  } else {
    state.winner = 0;
    state.addLog("Draw");
  }

  state.gameOver = true;
}
