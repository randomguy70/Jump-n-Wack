import config from "../main.js";
import game from "../game.js";

let camera;
let cursors;
let controls;

let player;
let map;
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
		
		this.load.spritesheet('playerIdle',
		'../src/assets/Main Characters/Ninja Frog/Idle (32x32).png', 
		{ frameWidth: 32, frameHeight: 32}
		);
   	this.load.spritesheet('playerRun', 
			'../src/assets/Main Characters/Ninja Frog/Run (32x32).png',
      	{ frameWidth: 32, frameHeight: 32 }
   	);
		this.load.spritesheet('playerJump',
		'../src/assets/Main Characters/Ninja Frog/Jump (32x32).png',
		{ frameWidth: 32, frameHeight: 32}
		);
	}
	
	create ()
	{
		console.log('creating...');
		
		map = this.make.tilemap({ key: "map" });
		
		tileset = map.addTilesetImage("terrain", "tiles", 16, 16, 0, 0);
		
		belowPlayerLayer = map.createLayer("Below Player", tileset, 0, 0);
		worldLayer = map.createLayer("World", tileset, 0, 0);
		abovePlayerLayer = map.createLayer("Above Player", tileset, 0, 0);
		
		// initialise objects
		
		const spawnPoint = map.findObject("Spawns", obj => obj.name === "Player");
		player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'playerIdle', 0);
		
		// collisions
		
		worldLayer.setCollisionByProperty({ Collides: true });
		this.physics.add.collider(player, worldLayer);
		
		// physics (other)
		player.body.setCollideWorldBounds(true);
		player.body.setGravityY(game.gravity);
		
		// animations
		
		const playerIdle = this.anims.create(
			{
			key: 'playerIdleAnim',
			frames: this.anims.generateFrameNumbers('playerIdle'),
			frameRate: 20,
			repeat: -1,
		});
		const playerRun = this.anims.create(
			{
			key: 'playerRunAnim',
			frames: this.anims.generateFrameNumbers('playerRun'),
			frameRate: 20,
			repeat: -1
		});
		const playerJump = this.anims.create(
			{
				key: 'playerJumpAnim',
				frames: this.anims.generateFrameNumbers('playerJump'),
				frameRate: 5,
				repeat: -1,
			}
		)
		
		player.anims.play('playerIdleAnim');
		
		camera = this.cameras.main;
		cursors = this.input.keyboard.createCursorKeys();
		controls = new Phaser.Cameras.Controls.FixedKeyControl(
			{
			camera: camera,
			left: cursors.left,
			right: cursors.right,
			up: cursors.up,
			down: cursors.down,
		});
		
		camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
	}
	
	update (time, delta)
	{
		controls.update(delta);
		
		player.body.setVelocityX(0);
		
		// Horizontal movement
		
		if (cursors.left.isDown)
		{
			if(game.playerConfig.facingRight === true)
			{
				player.flipX = true;
				game.playerConfig.facingRight = false;
			}
			if(player.body.onFloor() && player.anims.isPlaying && player.anims.currentAnim.key != 'playerRunAnim')
			{
				player.anims.play('playerRunAnim');
			}
			player.body.setVelocityX(-config.playerSpeed.x);
		}
		else if (cursors.right.isDown)
		{
			if(game.playerConfig.facingRight === false)
			{
				// false because it isn't being flipped
				player.flipX = false;
				game.playerConfig.facingRight = true;
			}
			if(player.body.onFloor() && player.anims.isPlaying && player.anims.currentAnim.key != 'playerRunAnim')
			{
				player.anims.play('playerRunAnim');
			}
			player.body.setVelocityX(config.playerSpeed.x);
		}
		
		// Vertical movement
		
		if (cursors.up.isDown && player.body.onFloor())
		{
   		player.setVelocityY(-config.playerSpeed.y);
			player.anims.play('playerJumpAnim');
		}
		
		else if(!cursors.up.isDown && !cursors.right.isDown && !cursors.left.isDown && player.anims.isPlaying && player.anims.currentAnim.key != 'playerIdleAnim' && player.body.onFloor())
		{
			player.anims.play('playerIdleAnim');
		}
	}
}

export default GameScene;