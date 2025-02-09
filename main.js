const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['C', 'D', 'H', 'S'];
const deck = shuffleDeck(buildDeck());
const playerHand = [];
const dealerHand = [];
let resultHTML = '';

// Function to create a single deck of cards
function buildDeck() {
  const deck = [];
  for (const value of values) {
    for (const suit of suits) {
      deck.push(`${value}-${suit}`);
    }
  }
  return deck;
}

// Function to shuffle the deck of cards
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Function to deal cards to the player and dealer
function dealCards(deck, playerHand, dealerHand) {
  for (let i = 0; i < 2; i++) {
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
  }
  updateDOM();
}

// Function to update the DOM with player and dealer cards
function updateDOM() {
  document.querySelector('.js-player-cards').innerHTML = playerHand.map(card => `
    <img class="playing-card" src="./images/cards/${card}.png" alt="Image of a playing card">
  `).join('');

  document.querySelector('.js-dealer-cards').innerHTML = `
    <img class="playing-card card-back" src="./images/cards/BACK.png" alt="Image of a playing card face down">
    <img class="playing-card" src="./images/cards/${dealerHand[0]}.png" alt="Image of a playing card face up">
  `;

  document.querySelector('.js-player-score').innerHTML = calculateHandTotal(playerHand);
}

// Function to calculate the total value of a hand
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
  return total;
}

// Function to handle the hit button
function hit(deck, playerHand) {
  playerHand.push(deck.pop());
  updateDOM();
  const total = calculateHandTotal(playerHand);
  if (total > 21) {
    document.querySelector('.js-result').innerHTML = 'Player Bust';
    stand(deck, dealerHand);
  }
}

// Function to handle the stand button and start the dealer's turn
function stand(deck, dealerHand) {
  document.querySelector('.js-dealer-cards').innerHTML = dealerHand.map(card => `
    <img class="playing-card" src="./images/cards/${card}.png" alt="Image of a playing card">
  `).join('');

  document.querySelector('.js-dealer-score').innerHTML = calculateHandTotal(dealerHand);

  while (calculateHandTotal(dealerHand) < 17) {
    dealerHand.push(deck.pop());
    document.querySelector('.js-dealer-cards').innerHTML += `
      <img class="playing-card" src="./images/cards/${dealerHand[dealerHand.length - 1]}.png" alt="Image of a playing card">
    `;
    document.querySelector('.js-dealer-score').innerHTML = calculateHandTotal(dealerHand);
  }

  determineWinner(playerHand, dealerHand);
}

// Function to disable the hit and stand buttons
function disableButtons() {
  document.querySelector('.js-hit-button').disabled = true;
  document.querySelector('.js-stand-button').disabled = true;
}

// Function to determine the winner of the game
function determineWinner(playerHand, dealerHand) {
  const playerTotal = calculateHandTotal(playerHand);
  const dealerTotal = calculateHandTotal(dealerHand);

  if (playerTotal > 21) {
    resultHTML = 'You Lose';
  } else if (dealerTotal > 21 || playerTotal > dealerTotal) {
    resultHTML = 'Player Wins';
  } else if (playerTotal < dealerTotal) {
    resultHTML = 'Dealer Wins';
  } else {
    resultHTML = 'Push';
  }

  document.querySelector('.js-result').innerHTML = resultHTML;
  disableButtons(); // Disable the buttons when the game is over
}

// Event listeners
document.querySelector('.js-hit-button').addEventListener('click', () => hit(deck, playerHand));
document.querySelector('.js-stand-button').addEventListener('click', () => stand(deck, dealerHand));
document.querySelector('.js-new-game-button').addEventListener('click', () => location.reload());
document.querySelector('.js-strategy-button').addEventListener('click', () => {
  document.querySelector('.js-strategy-div').classList.toggle('hidden');
});

// Initial deal
dealCards(deck, playerHand, dealerHand);
