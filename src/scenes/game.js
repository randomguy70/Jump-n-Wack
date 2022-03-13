import config from "../main.js";

var cursors;
var controls;

class GameScene extends Phaser.Scene
{
	constructor ()
	{
		console.log('constructed gameScene');
		super({key: 'gameScene'});
	}
	
	preload ()
	{
		console.log('preloaded');
		
		this.load.image('tiles', '../src/assets/tilemaps/Terrain.png');
		this.load.tilemapTiledJSON('map', '../src/assets/tilemaps/maps/map1.json');
		
		// this.load.image('background', './src/assets/background.jpg');
		/*
		this.load.spritesheet('running_soldier', './src/assets/running_soldier.png', { frameWidth: 10, frameHeight: 47 }
		);
		*/
	}
	
	create ()
	{
		console.log('created');
		var map = this.make.tilemap({ key: 'map' });
		
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		
		var cursors = this.input.keyboard.createCursorKeys();
		
		var controlConfig = {
			camera: this.cameras.main,
			left: cursors.left,
			right: cursors.right,
			up: cursors.up,
			down: cursors.down,
			speed: 0.5
    	};
		 
		 controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
	}

	update (time, delta)
	{
		controls.update(delta);
	}
}

export default GameScene;