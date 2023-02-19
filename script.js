'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions

let playing, currentScore, activePlayer, scores;

const init = function () {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--active', 'player--winner');
  diceEl.classList.add('hidden');
};

init();

// Function to switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1:

    // Add dice to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }

    // Switch player and make current score 0
    else {
      switchPlayer();
    }
  }
});

// Hold button functionality

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;

    // Display the TOTAL score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;

      // Hide the dice
      diceEl.classList.add('hidden');

      // Adding the winner class to winner player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      // Removing the active class from the winner player
      document.querySelector(
        `.player--${activePlayer}`.classList.remove('player--active')
      );
    }

    //
    else {
      // Switch player and make current score 0
      switchPlayer();
    }
  }
});

// New game functionality
btnNew.addEventListener('click', init);
