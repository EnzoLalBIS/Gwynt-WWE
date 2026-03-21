export async function botPlay(gameStateRef, syncRender, playCard) {
  const state = gameStateRef.current;
  const bot = state.players[2];

  if (bot.passed || bot.hand.length === 0) return;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const cardIndex = Math.floor(Math.random() * bot.hand.length);

  // Only pick rows that are not full
  const rows = ["boost", "hype", "inRing"];
  const availableRows = rows.filter((row) => bot.field[row].cards.length < 5);

  if (availableRows.length === 0) {
    console.log("Bot has no available rows - passing");
    return;
  }

  const row = availableRows[Math.floor(Math.random() * availableRows.length)];

  await playCard(state, 2, cardIndex, row);

  syncRender();
}
