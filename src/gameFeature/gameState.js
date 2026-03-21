export class GameState {
  constructor(player1Deck, player2Deck) {
    this.turn = 1;
    this.activePlayer = 1;

    this.players = {
      1: {
        id: 1,
        deck: [...player1Deck],
        hand: [],
        field: {
          boost: { cards: [], score: 0 },
          hype: { cards: [], score: 0 },
          inRing: { cards: [], score: 0 },
        },
        score: 0,
        damageReceived: 0,
        passed: false,
      },
      2: {
        id: 2,
        deck: [...player2Deck],
        hand: [],
        field: {
          boost: { cards: [], score: 0 },
          hype: { cards: [], score: 0 },
          inRing: { cards: [], score: 0 },
        },
        score: 0,
        damageReceived: 0,
        passed: false,
      },
    };

    this.log = [];
  }

  calculateScore(playerId) {
    const player = this.players[playerId];
    const field = player.field;

    field.boost.score = field.boost.cards.reduce((t, c) => t + c.dmg, 0);
    field.hype.score = field.hype.cards.reduce((t, c) => t + c.dmg, 0);
    field.inRing.score = field.inRing.cards.reduce((t, c) => t + c.dmg, 0);

    // Total score = cards on field minus damage received from effects
    player.score =
      field.boost.score +
      field.hype.score +
      field.inRing.score -
      player.damageReceived;
  }

  addLog(message) {
    const entry = `[Turn ${this.turn} | Player ${this.activePlayer}] ${message}`;
    this.log.push(entry);
    console.log(entry);
  }
}
