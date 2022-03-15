import config from "../main.js";

 let player;
 let cursors;
 let controls;
 let camera;
 
 let tileset;
 let belowPlayerLayer;
 let worldLayer;
 let abovePlayerLayer;

class GameScene extends Phaser.Scene
{
	constructor ()
	{
		console.log('constructed gameScene');
		super({key: 'gameScene'});
	}
	
	preload ()
	{
		console.log('preloading...');
		
		this.load.image("tiles", '../src/assets/tilesets/Terrain.png');
		this.load.tilemapTiledJSON("map", "../src/assets/tilemaps/map1.json");
		
		this.load.spritesheet('playerIdle', '../src/assets/Main Characters/Ninja Frog/Idle (32x32).png', 
		{ frameWidth: 32, frameHeight: 32}
		);
   	this.load.spritesheet('playerRun', 
			'../src/assets/Main Characters/Ninja Frog/Run (32x32).png',
      	{ frameWidth: 32, frameHeight: 32 }
   	);
		
	}
	
	create ()
	{
		console.log('creating...');
		
		const map = this.make.tilemap({ key: "map" });
		
		tileset = map.addTilesetImage("terrain", "tiles", 16, 16, 0, 0);
		
		belowPlayerLayer = map.createLayer("Below Player", tileset, 0, 0);
		worldLayer = map.createLayer("World", tileset, 0, 0);
		abovePlayerLayer = map.createLayer("Above Player", tileset, 0, 0);
		
		// initialise object
		
		const spawnPoint = map.findObject("Spawns", obj => obj.name === "Player");
		player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'playerIdle', 0);
		
		// collisions
		
		worldLayer.setCollisionByProperty({ collides: true });
		this.physics.add.collider(player, worldLayer);
		
		// Phaser supports multiple cameras, but you can access the default camera like this:
		
		camera = this.cameras.main;

		// Set up the arrows to control the camera
		
		cursors = this.input.keyboard.createCursorKeys();
		controls = new Phaser.Cameras.Controls.FixedKeyControl({
			camera: camera,
			left: cursors.left,
			right: cursors.right,
			up: cursors.up,
			down: cursors.down,
			speed: 0.5,
		});
		
		camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
	}
	
	update (time, delta)
	{
		controls.update(delta);
		
		player.body.setVelocity(0);
		
		// Horizontal movement
		if (cursors.left.isDown) {
		  player.body.setVelocityX(-100);
		} else if (cursors.right.isDown) {
		  player.body.setVelocityX(100);
		}
		
		// Vertical movement
		if (cursors.up.isDown) {
		  player.body.setVelocityY(-100);
		} else if (cursors.down.isDown) {
		  player.body.setVelocityY(100);
		}
		
		// Normalize and scale the velocity so that player can't move faster along a diagonal
		player.body.velocity.normalize().scale(config.speed);
	}
}

export default GameScene;