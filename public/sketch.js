
function lobbySetup(nbOfPlayers) { 
  smooth(4);

  strokeWeight(StrokeWeight)
  fill(255)
  rect(0, 0, CanvasSize[0] - StrokeWeight, CanvasSize[1] - StrokeWeight)

        
  noStroke()

  textAlign(CENTER, TOP)
  textFont(risqueFont)
  textSize(36);
  fill('#EFB55A');
  text("Everyone, get a key and hold it !", CanvasSize[0]/2, 50)



  //olaSound.setLoop(true);
  //olaSound.play();

  socket = io.connect('http://localhost:5000');
  //socket = io.connect('http://159.89.250.37:5000');
  socket.on('connect', connected);
}

var inputs = [];
var inputNum = 0;

function lobbyDraw (nbOfPlayers) {
  // Grid for the players
  stroke(0)
  
  var cellWidth = 200;
  var cellHeight = 100;

  rectMode(CORNER);
  
  for (var X = 0; X < 3; X++) {
    for (var Y = 0; Y < 4; Y ++) {
      var pid = (X*4 + Y) + 1;
      if (pid <= nbOfPlayers) {
        drawPlayerRect(Y* cellWidth, 150 + X * cellHeight, cellWidth, cellHeight, pid)
      }
    }
  }

  rectMode(CENTER);
  noStroke()

  for (var code = 0; code < 255; code++) {
    /*
    if (keyIsDown(code) && !inputs[code]) {
      prepare();
      console.log(keyboardMap[code]);
      inputs[code] = true;
      //olaSound.play();
    } else if (!keyIsDown(code) && inputs[code]) {
      ola();
      
      inputs[code] = false;
    }*/

    if (keyIsDown(code) && !inputs[code])
      inputs[code] = true;
    
    else if (!keyIsDown(code))
      inputs[code] = false;

  }

  var i = 0;
  var j = 0;
  var count = 0;
  
  var titi = inputs.filter((cur, id) => {
    if(cur) {
      drawKey((j++)* cellWidth + cellWidth / 2, 150 + i * cellHeight + cellHeight / 2, keyboardMap[id]);
    }

    if (j === 4) {
      j = 0; 
      i++;
    }

    if (i === 3) {
      i = 0;
    }

    return cur;
  })

  if (+titi.length === +nbOfPlayers) {
    console.log(goToScene(ROOM, nbOfPlayers));
  }
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
  /*if (pressed) {
    fill(224, 224, 169);
    rect(0, -1, 48, 48, 15);
  } else {*/
    fill(255, 255, 204);
    rect(0, -3, 45, 45, 15);
  //}
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  text(char, 3, pressed ? -1 : -3);
  pop();
}

function drawPlayerRect (x, y, width, height, playerId) {
  push();
  translate(x, y);

  strokeWeight(StrokeWeight)
  fill(255)
  rect(0, 0, width, height);

  fill(0);
  strokeWeight(0)
  textSize(32);
  textAlign(CENTER, TOP);
  text('Player ' + playerId, width/2, 0);
  pop();
}