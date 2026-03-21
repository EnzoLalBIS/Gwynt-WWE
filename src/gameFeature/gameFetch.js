export class Card {
  constructor({
    id,
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
    this.id = id;
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

export async function fetchDeckCards(deckId) {
  try {
    const response = await fetch(`http://localhost:8081/DeckCards/${deckId}`);
    const json = await response.json();

    if (!json.data || json.data.length === 0) {
      console.log(`No cards found for deck ${deckId}`);
      return [];
    }

    return json.data.map((c) => new Card(c));
  } catch (err) {
    console.error(`Error loading deck ${deckId}:`, err.message);
    return [];
  }
}
