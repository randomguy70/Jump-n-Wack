import {config, gameData} from "./main.js";

export class InfoBar
{
	constructor(scene)
	{
		this.width = 250;
		this.height = 50;
		this.x = gameData.cameraX + gameData.cameraWidth - this.width;
		this.y = gameData.cameraY;
		this.color = 0x696969;
		this.opacity = .7;
		
		scene.add.rectangle(this.x, this.y, this.width, this.height, this.color, this.opacity).setOrigin(0, 0);
	}
	
}