var MENU = 0;
var LOBBY = 1;
var ROOM = 2;

var currentScene = MENU;

var nbOfPlayers;
var playersArray;

var StrokeWeight = 4
var CanvasSize = [800, 600]
var CanvasOffset = [50, 50]

var socket;

var olaSound;