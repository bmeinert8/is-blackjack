const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['C', 'D', 'H', 'S'];

//function to create a single deck of cards
function buildDeck() {
  const deck = [];
  for(const value of values) {
    for(const suit of suits) {
      deck.push(`${value}-${suit}`);
    }
  }
  return deck;
}

buildDeck();

//function to shuffle the deck of cards
function shuffleDeck(deck) {
  for(let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
}

shuffleDeck(buildDeck());
