var StrokeWeight = 4
var CanvasSize = [800, 600]
var CanvasOffset = [50, 50]

function setup() {
  var canvas = createCanvas(CanvasSize[0], CanvasSize[1])
  canvas.position(CanvasOffset[0], CanvasOffset[1])
  createMenu();
}

function createMenu() {
  // Outer border of screen
  strokeWeight(StrokeWeight)
  rect(StrokeWeight/2, StrokeWeight/2, CanvasSize[0] - StrokeWeight, CanvasSize[1] - StrokeWeight)

  // Title text
  var menuTitle = createImg('assets/img/title.png')
  menuTitle.size(CanvasSize[0], 250);
  menuTitle.position(CanvasOffset[0], CanvasOffset[1])

  createPlayersInput()
}

function createPlayersInput() {
  var inputSize = [200, 80]

  // Div: global div
  var inputDiv = createDiv("");

  inputDiv.position(CanvasOffset[0], CanvasOffset[1] + 400)
  inputDiv.size(CanvasSize[0], inputSize[1])
  inputDiv.style("text-align: center;")

  // Button: left arrow
  var leftArrowBtn = createImg("assets/img/leftArrow.png")
  leftArrowBtn.style("display: inline-block;")
  inputDiv.child(leftArrowBtn);

  // Input: number of players
  var nbOfPlayers = createInput(0, "number")
  nbOfPlayers.input(onInputChange)

  nbOfPlayers.size(inputSize[0], inputSize[1])
  nbOfPlayers.style("display: inline-block;")
  nbOfPlayers.style("position: relative;")
  nbOfPlayers.style("bottom: 25px;")
  nbOfPlayers.style("font-size: 36px;")
  nbOfPlayers.style("font-family: Risque;")
  nbOfPlayers.style("text-align: center;")

  inputDiv.child(nbOfPlayers)

  // Button: right arrow
  var rightArrowBtn = createImg("assets/img/rightArrow.png")
  rightArrowBtn.style("display: inline-block;")
  inputDiv.child(rightArrowBtn)

  // Buttons effects
  leftArrowBtn.mousePressed(() => changeInputValue(nbOfPlayers, -1))
  rightArrowBtn.mousePressed(() => changeInputValue(nbOfPlayers, 1))
}

function onInputChange() {
  if (+this.value()) 
    console.log("You are " + this.value() + " players.");
  else {
    console.log("not a number")
    this.value(0);
  }
}

function changeInputValue(input, n) {
  if (input.value() != 0 || n >= 0) {
    input.value(+input.value() + n);
  }
}