var socket;

function setup() {
  createCanvas(400, 400);
  background(0);

  socket = io.connect('http://localhost:5000');
  //socket = io.connect('http://159.89.250.37:5000');

  socket.on('prepare', receive);
  socket.on('ola', receive);
}

var inputs = [];

function draw() {
  for(var code = 10; code < 200; code++) {
    if (keyIsDown(code) && !inputs[code]) {
      prepare();
      inputs[code] = true;
    } else if (!keyIsDown(code) && inputs[code]) {
      ola();
      inputs[code] = false;
    }
  }
}

function prepare() {
  console.log("send prepare" );
  socket.emit('prepare');
}

function ola() {
  console.log("send OLA" );
  socket.emit('ola');
}

function receive(data) {
  console.log("Got: " + data);
}