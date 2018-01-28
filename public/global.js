function preload () {
  olaSound = loadSound('assets/ola.mp3');
  risqueFont = loadFont('assets/fonts/Risque-regular.ttf');
}

function setup() {
  var canvas = createCanvas(CanvasSize[0], CanvasSize[1])
  canvas.position(CanvasOffset[0], CanvasOffset[1])

  goToScene(MENU, true);
}

function draw() {
  if (currentScene === LOBBY)
    lobbyDraw(nbOfPlayers);

  else if (currentScene === ROOM) {
    roomDraw();
  }
}

function goToScene(scene, ...params) {
  if (params[0] == false) {
    return false;
  }
  else {
    currentScene = scene;
    removeElements();

    switch(currentScene) {
      case MENU:
        menuSetup();
        break;

      case LOBBY:
        nbOfPlayers = params[0]
        lobbySetup(nbOfPlayers);
        break;

      case ROOM:
        playersArray = params[0]
        roomSetup(playersArray);
        break;
    }
  }
}