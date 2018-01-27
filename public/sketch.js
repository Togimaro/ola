var socket;

function preload() {
  mySound = loadSound('assets/ola.mp3');
}

function setup() {
  createCanvas(400, 400);
  background(0);
  rectMode(CENTER);
  smooth(4);
  noStroke();

  mySound.setLoop(true);
  //mySound.play();

  socket = io.connect('http://localhost:5000');
  //socket = io.connect('http://159.89.250.37:5000');
  socket.on('connect', connected);
}

var inputs = [];

var inputNum = 0;

function draw() {
  background(0);
  

  for(var code = 0; code < 255; code++) {
    if (keyIsDown(code) && !inputs[code]) {
      prepare();
      console.log(keyboardMap[code]);
      inputs[code] = true;
      //mySound.play();
    } else if (!keyIsDown(code) && inputs[code]) {
      ola();
      
      inputs[code] = false;
    }
  }

  var i = 0;
  for(var id in inputs)
    drawKey(50 + 60 * i++, 50, keyboardMap[id], inputs[id]);
}

function connected() {
  socket.emit('setPlayer', { numPlayer: 4 });

  socket.on('prepare', receive);
  socket.on('ola', receive);
}

function prepare() {
  console.log("send prepare" );
  socket.emit('prepare', { playerId: 0 });
}

function ola() {
  console.log("send OLA" );
  socket.emit('ola', { playerId: 0 });
}

function receive(data) {
  console.log("Got: " + data);
}

function drawKey(x, y, char, pressed) {
  push();
  translate(x, y);
  fill(204, 204, 153);
  rect(0, 0, 55, 55, 15);
  if(pressed) {
    fill(224, 224, 169);
    rect(0, -1, 48, 48, 15);
  } else {
    fill(255, 255, 204);
    rect(0, -3, 45, 45, 15);
  }
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(char, 3, pressed ? -1 : -3, 100, 45);
  pop();
}