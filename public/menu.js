function menuSetup() {
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
  var nbOfPlayersInput = createInput("1", "number")
  nbOfPlayersInput.input(onInputChange)

  nbOfPlayersInput.size(inputSize[0], inputSize[1])
  nbOfPlayersInput.style("display: inline-block;")
  nbOfPlayersInput.style("position: relative;")
  nbOfPlayersInput.style("bottom: 25px;")
  nbOfPlayersInput.style("font-size: 36px;")
  nbOfPlayersInput.style("font-family: 'Risque', sans-serif;")
  nbOfPlayersInput.style("text-align: center;")

  inputDiv.child(nbOfPlayersInput)

  // Button: right arrow
  var rightArrowBtn = createImg("assets/img/rightArrow.png")
  rightArrowBtn.style("display: inline-block;")
  inputDiv.child(rightArrowBtn)

  // Button: submit
  var submitButton = createButton("Submit");
  submitButton.style("font-size: 36px;")
  submitButton.style("display: block;")
  submitButton.style("margin-right: auto;")
  submitButton.style("margin-left: auto;")
  submitButton.style("font-family: 'Risque', sans-serif;")
  inputDiv.child(submitButton)


  // Buttons effects
  leftArrowBtn.mousePressed(() => changeInputValue(nbOfPlayersInput, -1))
  rightArrowBtn.mousePressed(() => changeInputValue(nbOfPlayersInput, 1))
  submitButton.mousePressed(() => goToScene(LOBBY, nbOfPlayersInput.value()))
}

function onInputChange() {
  if (+this.value())
    console.log("You are " + this.value() + " players.");
  else {
    this.value(0);
  }

  if (+this.value() < 0)
    this.value(0);
  else if (+this.value() > 12) 
    this.value(12);

  nbOfPlayers = +this.value()
}

function changeInputValue(input, n) {
  if ((input.value() != 1 || n >= 0) &&  (input.value() != 12 || n <= 0)) {
    input.value(+input.value() + n);
  }
}