import {gameData} from "./main.js";

export class ScoreBar
{
	constructor()
	{
		this.key = "scoreBarKey";
		this.url = "../src/assets/Other/scoreBar.png";
		this.sprite = null;
		this.x = null;
		this.y = null;
		this.sprite = null;
		console.log("constructed score bar");
	}
	
	load(scene)
	{
		scene.load.image(this.key, this.url);		
	}
	
	draw(scene)
	{
		this.x = gameData.cameraX;
		this.y = gameData.cameraY;
		this.sprite = scene.physics.add.sprite(this.x, this.y, this.key);
	}
	
}