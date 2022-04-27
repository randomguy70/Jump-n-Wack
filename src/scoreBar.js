import {gameData} from "./main.js";
import {player} from "./scenes/gameScene.js";

export class ScoreBar
{
	constructor()
	{
		this.key = "scoreBarKey";
		this.url = "../src/assets/Other/scoreBar.png";
		this.sprite = null;
		this.x = null;
		this.y = null;
		this.healthCount = 4;
		console.log("constructed score bar");
	}
	
	load(scene)
	{
		this.image = scene.load.image(this.key, this.url);		
		console.log("score bar image", this.image);
	}
	
	draw(scene)
	{
		this.sprite = scene.physics.add.sprite(0, 0, this.key).setOrigin(0);
		this.sprite.x = gameData.cameraX + 30;
		this.sprite.y = gameData.cameraY + 30;
		this.sprite.body.allowGravity = false;
		
		var healthBlockWidth = 25;
		var healthBlockHeight = 17;
		var healthBlockColor = 0xff0000;
		var healthBlockSpacing = 6;
		var x = this.sprite.x + 39;
		var y = this.sprite.y + 7;
		
		for(var i = 0; i < 4 && i < this.healthCount; i++)
		{
			scene.add.rectangle(x, y, healthBlockWidth, healthBlockHeight, healthBlockColor).setOrigin(0);
			x += healthBlockWidth + healthBlockSpacing;
		}
		
	}
	
	update(scene)
	{
		this.health = player.lives;
		this.sprite.x = gameData.cameraX + 30;
		this.sprite.y = gameData.cameraY + 30;
		
		this.draw(scene);
	}
	
}