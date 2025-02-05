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

function calculateHandTotal(hand) {
  let total = 0;
  let aces = 0;

  for (const card of hand) {
    const value = card.split('-')[0];
    if (value === 'A') {
      aces += 1;
      total += 11;
    } else if (['J', 'Q', 'K'].includes(value)) {
      total += 10;
    } else {
      total += parseInt(value);
    }
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  console.log('Player Hand Total:', total);
  return(total);
}

calculateHandTotal(playerHand);
calculateHandTotal(dealerHand);

//function to handle the hit button
function hit(deck, playerHand){
  playerHand.push(deck.pop());
  const total = calculateHandTotal(playerHand);
  if(total > 21){
    console.log('Player Hand:', playerHand);
    console.log('Bust! You lose!');
  } else {
    console.log('Player Hand:', playerHand);
    console.log('Player Hand Total:', total);
  }
}