const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['C', 'D', 'H', 'S'];
const deck = shuffleDeck(buildDeck());
const playerHand = [];
const dealerHand = [];

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

//function to shuffle the deck of cards
function shuffleDeck(deck) {
  for(let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return(deck);
};

shuffleDeck(buildDeck());

//function to deal cards to the player and dealer
function dealCards(deck, playerHand, dealerHand){
  playerHand.push(deck.pop());
  dealerHand.push(deck.pop());
  playerHand.push(deck.pop());
  dealerHand.push(deck.pop());
  console.log(playerHand);
  console.log(dealerHand);
}

dealCards(deck, playerHand, dealerHand);
