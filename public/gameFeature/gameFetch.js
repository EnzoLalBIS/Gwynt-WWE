class Card {
  constructor({
    name,
    type,
    dmg,
    role,
    effect,
    animation,
    img,
    description,
    music,
    Qtt,
  }) {
    this.name = name;
    this.type = type;
    this.dmg = dmg;
    this.role = role;
    this.effect = effect;
    this.animation = animation;
    this.img = img;
    this.description = description;
    this.music = music;
    this.qtt = Qtt;
  }
}

async function fetchDeckCards(deckId) {
  try {
    const response = await fetch(`http://localhost:8081/DeckCards/${deckId}`);
    const json = await response.json();

    if (!json.data || json.data.length === 0) {
      console.warn(`No cards found for deck ${deckId}`);
      return [];
    }

    const cards = json.data.map((c) => new Card(c));

    console.log(`Deck ${deckId} - ${cards.length} cards loaded:`);
    cards.forEach((c) =>
      console.log(
        `  - ${c.name} | type: ${c.type} | dmg: ${c.dmg} | effect: ${c.effect}`,
      ),
    );

    return cards;
  } catch (err) {
    console.error(`Error loading deck ${deckId}:`, err.message);
    return [];
  }
}
