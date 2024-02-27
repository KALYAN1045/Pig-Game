'use strict';

const new_game = document.querySelector('.btn--new');
const roll_dice = document.querySelector('.btn--roll');
const hold_score = document.querySelector('.btn--hold');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const close_modal = document.querySelector('.close-modal');

function display_dice(num) {
  var img = document.querySelector('.dice');
  img.src = `dice-${String(num)}.png`;
}

let curr_player = 0;

const get_player = function () {
  return document.getElementById(`current--${curr_player}`);
};

const get_score = function () {
  return document.getElementById(`score--${curr_player}`);
};

const change_player = function () {
  if (curr_player == 0) {
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.add('player--active');
    curr_player = 1;
  } else {
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
    curr_player = 0;
  }
};

function add_score(num) {
  let player_id = get_player();
  let curr_score = Number(player_id.textContent);
  curr_score += num;
  player_id.textContent = curr_score;
}

const decrement_score = function () {
  let player_id = get_player();
  player_id.textContent = 0;
};

function start_new() {
  // Reset scores for Player 1
  document.getElementById('score--0').textContent = 0;
  document.getElementById('current--0').textContent = 0;

  // Reset scores for Player 2
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--1').textContent = 0;

  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
  curr_player = 0;
}

new_game.addEventListener('click', start_new);

close_modal.addEventListener('click', function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  start_new();
});

hold_score.addEventListener('click', function () {
  let total_score = get_score();
  let score = Number(total_score.textContent);
  score += Number(get_player().textContent);
  if (score >= 100) {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.querySelector('.winner').textContent = `Player ${
      curr_player + 1
    } Wins the Game 🎉`;
  }
  get_score().textContent = score;
  decrement_score();
  change_player();
});

roll_dice.addEventListener('click', function () {
  const num = Math.trunc(Math.random() * 6) + 1;
  display_dice(num);
  let tot_sc = Number(get_score().textContent);
  console.log(tot_sc);
  if (num != 1 && tot_sc < 100) {
    add_score(num);
  } else {
    decrement_score();
    change_player();
  }
});
