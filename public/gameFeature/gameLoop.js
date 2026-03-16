function playCard(state, playerId, cardIndex, row) {
  const player = state.players[playerId];

  // Check if player has already passed
  if (player.passed) {
    console.log(`Player ${playerId} has already passed`);
    return false;
  }

  // Check if card exists in hand
  if (cardIndex < 0 || cardIndex >= player.hand.length) {
    console.log(`Invalid card index ${cardIndex} for player ${playerId}`);
    return false;
  }

  // Check if row is valid
  if (!["boost", "hype", "inRing"].includes(row)) {
    console.log(`Invalid row ${row}`);
    return false;
  }

  // Move card from hand to field
  const card = player.hand.splice(cardIndex, 1)[0];
  player.field[row].cards.push(card);

  state.addLog(`Player ${playerId} played ${card.name} on ${row}`);

  // Recalculate scores
  state.calculateScore(playerId);

  state.addLog(`Player ${playerId} score: ${player.score}`);

  // Draw a card from deck
  drawCard(state, playerId);

  // Switch to next player
  nextTurn(state);

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

function passTurn(state, playerId) {
  const player = state.players[playerId];

  if (player.passed) {
    console.log(`Player ${playerId} has already passed`);
    return false;
  }

  player.passed = true;
  state.addLog(`Player ${playerId} passed`);

  // Check if both players have passed
  if (state.players[1].passed && state.players[2].passed) {
    endGame(state);
    return true;
  }

  // Switch to next player
  nextTurn(state);

  return true;
}

function nextTurn(state) {
  // If next player has passed, stay on current player
  const nextPlayer = state.activePlayer === 1 ? 2 : 1;

  if (state.players[nextPlayer].passed) {
    state.addLog(
      `Player ${nextPlayer} has passed, Player ${state.activePlayer} continues`,
    );
    return;
  }

  state.activePlayer = nextPlayer;
  state.turn++;

  state.addLog(`Turn ${state.turn} - Player ${state.activePlayer} to play`);
}

function endGame(state) {
  const score1 = state.players[1].score;
  const score2 = state.players[2].score;

  state.addLog(`Game over - Player 1: ${score1} | Player 2: ${score2}`);

  if (score1 > score2) {
    state.addLog("Player 1 wins");
  } else if (score2 > score1) {
    state.addLog("Player 2 wins");
  } else {
    state.addLog("Draw");
  }
}
