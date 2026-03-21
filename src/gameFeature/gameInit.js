import { fetchDeckCards } from "./gameFetch";
import { GameState } from "./gameState";

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
    if (player.deck.length === 0) break;
    const card = player.deck.pop();
    player.hand.push(card);
  }
}

export async function initGame(deck1Id, deck2Id) {
  const [deck1, deck2] = await Promise.all([
    fetchDeckCards(deck1Id),
    fetchDeckCards(deck2Id),
  ]);

  const state = new GameState(shuffleDeck(deck1), shuffleDeck(deck2));

  drawCards(state.players[1], 5);
  drawCards(state.players[2], 5);

  state.addLog("Game initialized");

  return state;
}
