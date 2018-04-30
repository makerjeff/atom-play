// MAIN.JS

// --- handles ---
let main_container    = document.getElementById('main_container');
let game_container    = document.getElementById('game_container');
let join_container    = document.getElementById('join_container');

let start_button      = document.getElementById('start_button');
let join_button       = document.getElementById('join_button');

let canvas            = document.getElementById('game_canvas');
let context           = canvas.getContext('2d');





function init_game() {
  main_container.style.display = 'flex';
  game_container.style.display = 'none';
  join_container.style.dispay = 'none';

}


function update() {}



// --- callbacks ---
// TODO: rename this.
function start_game() {
  main_container.style.display = 'none';
  game_container.style.display = 'block';
  join_container.style.display = 'none';
}

// TODO: rename this.
function join_game() {
  main_container.style.display = 'none';
  game_container.style.display = 'none';
  join_container.style.display = 'block';

}

// --- events ---
window.addEventListener('load', (ev) => {
  console.log('Everything loaded, initializing.');

  init_game();
});

// --- click button
window.addEventListener('click', (ev) => {

  switch (ev.target.id) {
    case 'start_button':
      console.log('Start button clicked. ');
      start_game();
      break;
    case 'join_button':
      console.log('Join button clicked. ');
      join_game();
      break;
    case 'game_title':
      console.log('%cThis is an AMAZING game! ', "color: blue; font-size: 20px; text-shadow: 2px 2px 2px rgba(0,0,0,0.25)");
      break;
    default:
      console.log('Nothing recognized. ');
  }
});
