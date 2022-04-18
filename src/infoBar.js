import {config} from "./main.js";

export class InfoBar
{
	constructor(scene)
	{
		this.width = 300;
		this.height = 175;
		this.x = config.width - this.width;
		this.y = this.height;
		this.color = 0xaaaaaa;
		
		scene.add.rectangle(this.x, this.y, this.width, this.height, this.color, .5).setOrigin(0, 0);
	}
	
}