class GameState {
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
        passed: false,
      },
    };

    this.log = [];
  }

  calculateScore(playerId) {
    const field = this.players[playerId].field;

    // Calculate score for each row separately
    field.boost.score = field.boost.cards.reduce(
      (total, card) => total + card.dmg,
      0,
    );
    field.hype.score = field.hype.cards.reduce(
      (total, card) => total + card.dmg,
      0,
    );
    field.inRing.score = field.inRing.cards.reduce(
      (total, card) => total + card.dmg,
      0,
    );

    // Total player score = sum of all rows
    this.players[playerId].score =
      field.boost.score + field.hype.score + field.inRing.score;
  }

  addLog(message) {
    const entry = `[Turn ${this.turn} | Player ${this.activePlayer}] ${message}`;
    this.log.push(entry);
    console.log(entry);
  }
}
