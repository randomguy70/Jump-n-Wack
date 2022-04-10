import { fruitAnimKeys, loadFruitSpriteSheets, createFruitAnims} from '../fruits.js';
import {config, gameData} from '../main.js';
import {playerAnimKeys} from '../player.js';
import {loadPlayerSpriteSheets, createPlayerAnims, handlePlayerKeypresses} from '../player.js';

export var camera;           // phaser object
export var cursors;          // phaser object
export var controls;         // phaser object

export var player;           // phaser sprite

export var map;              // tilemap
export var tileset;          // tileset image

export var mapOffsetX;       // number
export var mapOffsetY;       // number

export var belowPlayerLayer; // phaser map layer
export var worldLayer;       // phaser map layer
export var appleLayer;       // phaser map layer

export var apples;           // static group

class GameScene extends Phaser.Scene
{
	constructor ()
	{
		console.log('Constructed gameScene');
		super({key: 'gameScene'});
	}
	
	preload ()
	{
		console.log('preloading...');
		console.log('loading tilemap');
		
		this.load.image("tiles", '../src/assets/tilesets/Terrain.png');
		this.load.tilemapTiledJSON("map", "../src/assets/tilemaps/map1.json");
		
		console.log('loading sprite sheets');
		
		loadPlayerSpriteSheets(this);
		loadFruitSpriteSheets(this);
	}
	
	create ()
	{
		console.log('creating...');
		
		console.log("loading animations");
		
		createPlayerAnims(this);
		createFruitAnims(this);
		
		// tilemap stuff
		
		console.log("loading map and layers");
		
		map = this.make.tilemap({ key: "map" });
		tileset = map.addTilesetImage("terrain", "tiles", 16, 16, 0, 0);
		
		// add the background color to the map (different from canvas background)
		console.log('map width ' + map.widthInPixels + ' map height ' + map.heightInPixels);
		this.add.rectangle(0, 0, map.widthInPixels, map.heightInPixels, 0x87ceeb).setOrigin(0, 0);
		
		belowPlayerLayer = map.createLayer("Below Player", tileset, 0, 0);
		worldLayer = map.createLayer("World", tileset, 0, 0);
		
		appleLayer = map.getObjectLayer('Apples');
		console.log(appleLayer);
		
		apples = this.physics.add.staticGroup();
		
		appleLayer.objects.forEach(object => {
			let obj = apples.create(object.x, object.y, "Apple");
      	obj.body.width = object.width;
      	obj.body.height = object.height;
		})
		apples.playAnimation(fruitAnimKeys.apple);
		
		// apples = map.createFromObjects("Apples", { name: 'Apple' });
		
		// initialise objects
		const spawnPoint = map.findObject("Spawns", obj => obj.name === "Player");
		player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'playerIdle', 0);
		
		// collisions
		
		worldLayer.setCollisionByProperty({ Collides: true });
		this.physics.add.collider(player, worldLayer);
		
		// obstaclesLayer.setCollisionByProperty({Kills: true});
		// this.physics.add.collider(player, obstaclesLayer);
		
		// physics (other)
		
		player.body.setCollideWorldBounds(true);
		player.body.setGravityY(gameData.gravity);
		player.anims.play(playerAnimKeys.idle);
		
		initialiseSystem(this, camera, cursors, controls);
	}
	
	update (time, delta)
	{
		controls.update(delta);
		handlePlayerKeypresses(cursors, player);
	}
}

function initialiseSystem(scene)
{
	camera = scene.cameras.main;
	cursors = scene.input.keyboard.createCursorKeys();
	controls = new Phaser.Cameras.Controls.FixedKeyControl(
		{
		camera: camera,
		left: cursors.left,
		right: cursors.right,
		up: cursors.up,
		down: cursors.down,
		});
	
	// if scrolling is necessary...
	if(map.widthInPixels > config.width || map.heightInPixels > config.height)
	{
		camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		camera.startFollow(player);
	}
	
	// if no scrolling, center camera on map
	else
	{
		var cameraX = -(config.width / 2 - map.widthInPixels / 2);
		var cameraY = -(config.height / 2 - map.heightInPixels / 2);
		camera.setBounds(cameraX, cameraY, config.width, config.height);
	}
}

export default GameScene;