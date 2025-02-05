const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['C', 'D', 'H', 'S'];
const deck = shuffleDeck(buildDeck());
const playerHand = [];
const dealerHand = [];
let resultHTML = '';

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
  console.log(playerHand[0]);
  console.log(dealerHand[0]);
  console.log(playerHand[1]);
  return playerHand, dealerHand;
}

dealCards(deck, playerHand, dealerHand);

//display player cards on the DOM
let card1 = playerHand[0];
let card2 = playerHand[1];

document.querySelector('.js-player-cards')
  .innerHTML = `
    <img class="playing-card" src="./cards/${card1}.png" alt="Image of a playing card">
    <img class="playing-card" src="./cards/${card2}.png" alt="Image of a playing card">
`;

//display dealer cards on the DOM
let dealerCard1 = dealerHand[0];

document.querySelector('.js-dealer-cards')
  .innerHTML = `
     <img class="playing-card card-back" src="./cards/BACK.png" alt="Image of a playing card face down">
      <img class="playing-card" src="./cards/${dealerCard1}.png" alt="Image of a playing card face up">
  `

//function to calculate the total value of the player and dealers hands
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
  return(total);
}
calculateHandTotal(playerHand);

//display the total value of the player hand on the DOM
let displayTotal = calculateHandTotal(playerHand);

document.querySelector('.js-player-score')
  .innerHTML = `${displayTotal}`;

//function to handle the hit button
function hit(deck, playerHand){
  playerHand.push(deck.pop());
  const total = calculateHandTotal(playerHand);
  if (total > 21) {
    stand(deck, dealerHand);
  }
}

//update the DOM with the new card and hand total when the player hits
document.querySelector('.js-hit-button')
  .addEventListener('click', function(){
    hit(deck, playerHand);
    let newCard = playerHand[playerHand.length - 1];
    document.querySelector('.js-player-cards')
      .innerHTML += `
        <img class="playing-card" src="./cards/${newCard}.png" alt="Image of a playing card">
      `;
    let newTotal = calculateHandTotal(playerHand);
    document.querySelector('.js-player-score')
      .innerHTML = `${newTotal}`;
  });


  //function to handle the stand button and start the dealer's turn
function stand(deck, dealerHand){
  document.querySelector('.js-dealer-cards')
    .innerHTML = `
      <img class="playing-card" src="./cards/${dealerHand[0]}.png" alt="Image of a playing card">
      <img class="playing-card" src="./cards/${dealerHand[1]}.png" alt="Image of a playing card">
    `; 
  document.querySelector('.js-dealer-score')
  .innerHTML = `${calculateHandTotal(dealerHand)}`;
  while (calculateHandTotal(dealerHand) < 17) {
    dealerHand.push(deck.pop());
    document.querySelector('.js-dealer-cards')
      .innerHTML += `
        <img class="playing-card" src="./cards/${dealerHand[dealerHand.length - 1]}.png" alt="Image of a playing card">
      `;
    document.querySelector('.js-dealer-score')
      .innerHTML = `${calculateHandTotal(dealerHand)}`;
  } 
}

//event listener for the stand button
document.querySelector('.js-stand-button')
  .addEventListener('click', function(){
    stand(deck, dealerHand);
    determineWinner(playerHand, dealerHand);
    document.querySelector('.js-result')
  .innerHTML = resultHTML += `${determineWinner(playerHand, dealerHand)}`;
  });

//function to determine the winner of the game
function determineWinner(playerHand, dealerHand){
  const playerTotal = calculateHandTotal(playerHand);
  const dealerTotal = calculateHandTotal(dealerHand);

  if ((playerTotal === 21 && playerHand.length === 2) && (dealerTotal === 21 && dealerHand.length === 2)) {
    return 'Push';
  } else if ((playerTotal === 21 && playerHand.length === 2) && (dealerTotal !== 21 && dealerHand.length !== 2)) {
    return 'Player Wins';
  } else if (playerTotal > 21 && dealerTotal > 21) {
    return 'You Lose';
  } else if (playerTotal > 21) {
    return 'Dealer Wins';
  } else if (dealerTotal > 21) {
    return 'Player Wins';
  } else if (playerTotal > dealerTotal) {
    return 'Player Wins';
  } else if (playerTotal < dealerTotal) {
    return 'Dealer Wins';
  } else {
    return 'Push';
  }
  
}

//function to start a new game when the new game button is clicked
document.querySelector('.js-new-game-button')
  .addEventListener('click', function(){
    location.reload();
  });


 

