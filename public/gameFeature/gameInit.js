function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function drawCards(player, amount) {
  for (let i = 0; i < amount; i++) {
    if (player.deck.length === 0) {
      console.log(`Player ${player.id} has no cards left in deck`);
      break;
    }
    const card = player.deck.pop();
    player.hand.push(card);
  }
}

async function initGame(deck1Id, deck2Id) {
  const [deck1, deck2] = await Promise.all([
    fetchDeckCards(deck1Id),
    fetchDeckCards(deck2Id),
  ]);

  const state = new GameState(shuffleDeck(deck1), shuffleDeck(deck2));

  drawCards(state.players[1], 5);
  drawCards(state.players[2], 5);

  state.addLog("Game initialized");
  state.addLog(
    `Player 1 hand: ${state.players[1].hand.map((c) => c.name).join(", ")}`,
  );
  state.addLog(
    `Player 2 hand: ${state.players[2].hand.map((c) => c.name).join(", ")}`,
  );

  return state;
}
