# JS-Blackjack

## Project Summary
This project is a simple Blackjack game implemented using HTML, CSS, and JavaScript. It allows users to play a game of Blackjack against a dealer.

## Project Structure
```
is-blackjack/
│
├── images/
│   ├── cards/
│   │   ├── 2-C.png
│   │   ├── 2-D.png
│   │   ├── ...
│   │   └── BACK.png
│   └── blackjack-strategy.png
│
├── index.html
├── styles.css
└── main.js
```

## Detailed Description
This project is a web-based Blackjack game where the player competes against a dealer. The game follows the standard rules of Blackjack, including card values and the ability to hit or stand. The project consists of three main files:
- 

index.html

: The HTML file that structures the game interface.
- 

styles.css

: The CSS file that styles the game interface.
- 

main.js

: The JavaScript file that contains the game logic, including deck creation, shuffling, dealing cards, and calculating hand totals.

## How to Play
1. **Objective**: The goal is to have a hand value closer to 21 than the dealer without exceeding 21.
2. **Card Values**:
   - Number cards (2-10) are worth their face value.
   - Face cards (J, Q, K) are worth 10.
   - Aces (A) can be worth 1 or 11, depending on which value benefits the hand more.
3. **Gameplay**:
   - The player and dealer are each dealt two cards. The player's cards are both face up, while the dealer has one card face up and one face down.
   - The player can choose to "Hit" (take another card) or "Stand" (keep their current hand).
   - If the player's hand exceeds 21, they "Bust" and lose the game.
   - Once the player stands, the dealer reveals their hidden card and must hit until their hand totals 17 or higher.
   - The winner is determined by whose hand is closer to 21 without exceeding it.

## Live Project
You can play the game live at the following URL: [Blackjack Game](https://bmeinert8.github.io/is-blackjack/)
