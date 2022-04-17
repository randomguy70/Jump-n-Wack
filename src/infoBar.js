import gameData from "./main.js";

function initialiseInfoBar()
{
	var infoBar = document.getElementById("info-bar");
	var canvas = document.getElementsByTagName("canvas");
	var gameContainer = document.getElementById("game-container");
	gameContainer.style.width = 800;
	gameContainer.style.height = 600;
	console.log("resized game container");
}

initialiseInfoBar();
/*
function initialiseScoreElement()
{
	var canvas = document.getElementById("game-container");
	var scoreElement = document.getElementById("score")
	
	canvas.textContent = "0";
	console.log(canvas.style.width);
}

*/