var playersPositions;

function roomSetup(playersArray) {
  fill (255)
  rect(CanvasSize[0]/2, CanvasSize[1]/2, CanvasSize[0], CanvasSize[1])
  fill(0)
  text(`hello to the ${playersArray.length} players`, CanvasSize[0]/2, 50)  

  possiblePositions = playersArray.map((key, index) => index);

  playersPositions = playersArray.map((key, index) => {
    var pos = possiblePositions[Math.floor(random(0, possiblePositions.length))];  
    possiblePositions.splice(possiblePositions.indexOf(pos), 1);

    var col = color(random(0, 255), random(0, 255), random(0, 255));
    var darkerCol = color(red(col) - 30, green(col) - 30, blue(col) - 30);

    return {
      'id': index,
      'key': key,
      'pos': pos,
      'color': col,
      'dark': darkerCol
    }
  });

  //olaSound.setLoop(true);
  //olaSound.play();

  socket = io.connect('http://localhost:5000');
  //socket = io.connect('http://159.89.250.37:5000');
  socket.on('connect', connected);
}

function roomDraw() {
  playersPositions.map(player => {
    fill(player.color)
    ellipse(100 + player.pos * 40, 200, 30, 30)
  });

  // todo: check all keys being pressed and change color depending on this

  /*if (keyIsDown(code) && !inputs[code]) {
    prepare();
    console.log(keyboardMap[code]);
    inputs[code] = true;
    //olaSound.play();
  } else if (!keyIsDown(code) && inputs[code]) {
    ola();
    
    inputs[code] = false;
  }*/
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