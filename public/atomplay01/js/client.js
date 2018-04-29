// handles
  let room_select_div = document.getElementById('room_select_div');
  let room_select_form = document.getElementById('room_select_form');
  let room_select_input = document.getElementById('room_select_input');
  let ping_button = document.getElementById('ping_button');

  let debug_console_form = document.getElementById('debug_console_form');

  let result_div = document.getElementById('result_div');


  // globals
  let state = undefined;
  let room = '123abc';
  let socket = io.connect();

  // socket events
  socket.on('connect', () => {
    debug.log(`connected to server. : ${Date.now()}`, result_div);
  });
  socket.on('message', (message) => {
    debug.log(`from server: ${message} : ${Date.now()}`, result_div);
  });

  socket.on('room message', (message) => {
    debug.log(`from roomies: ${message} : ${Date.now()}`, result_div);
  });

  // --- helper functions ---
  // PING
  function pinger(message) {
    if (state === undefined) {
      debug.log(`attempting to send _ping : ${Date.now()}`, result_div);
      socket.emit('_ping', message );
    } else {
      debug.log(`Sending Ping to ROOMIES!`, result_div);
      socket.emit('message room', 'HEY ROOMIES!');
    }
  }

  // update the background based on state.
  function update_background(state) {
    let color = 'rgb(255,255,255)';

    // change the color
    switch (state) {

      case 'connected':
      color = 'rgb(0,255,200)';
      break;

      case 'disconnected':
      color = 'rgb(240,100,100)';
      break;

      default:
      color = 'rgb(255,255,255)';
    }

    // update the update_background
    document.body.style.backgroundColor = color;
  }

  //TODO: get-current-room

  // --- event listeners ---
  room_select_form.addEventListener('submit', (e) => {
    e.preventDefault();

    let input = room_select_form.children[0];

    if (input.value == '') {
      debug.log('input something!', result_div);
    } else {
      debug.log(`Sending to server: ${input.value} : ${Date.now()}`, result_div);
      socket.emit('room', input.value);
      input.value = '';
    }
  });

  debug_console_form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    // debug.log(`to room: ${ev.target.children[0].value}`, result_div);
    debug.log(`event: ${ev.target.children[0].value}, data: ${ev.target.children[1].value}`, result_div);

    socket.emit(ev.target.children[0].value, ev.target.children[1].value);

    for (let i = 0; i < ev.target.children.length; i++) {
      ev.target.children[i].value = ''; //reset
    }
  });

  // Pinger event.
  ping_button.addEventListener('click', (ev) => {
    pinger(`I PINGED you!`);
  });
