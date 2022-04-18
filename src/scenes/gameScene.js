import { fruitAnimKeys, loadFruitSpriteSheets, createFruitAnims, collectFruit} from '../fruits.js';
import {config, gameData} from '../main.js';
import {Player} from '../player.js';
import {InfoBar} from '../infoBar.js';

export var camera;           // phaser object
export var cursors;          // phaser object
export var controls;         // phaser object

export var map;              // tilemap
export var tileset;          // tileset image

export var mapOffsetX;       // number
export var mapOffsetY;       // number

export var belowPlayerLayer; // phaser map layer
export var worldLayer;       // phaser map layer
export var objectLayer       // phaser map layer

var player = new Player(this);
var infoBar;
export var fruits;           // static group

export class GameScene extends Phaser.Scene
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
		
		player.loadSpriteSheets(this);
		loadFruitSpriteSheets(this);
	}
	
	create ()
	{
		console.log('creating...');
		
		console.log("loading animations");
		
		player.createAnims(this);
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
		
		objectLayer = map.getObjectLayer('Objects');
		console.log(objectLayer);
		
		fruits = this.physics.add.staticGroup();
		
		objectLayer.objects.forEach(object => {
			if(object.type === "Apple")
			{
				let obj = fruits.create(object.x + 8, object.y - 8, "Apple");
      		obj.body.width = object.width;
      		obj.body.height = object.height;
				obj.anims.play(fruitAnimKeys.apple);
			}
		});
		
		worldLayer.setCollisionByProperty({ Collides: true });
		// obstaclesLayer.setCollisionByProperty({Kills: true});
		
		const spawnPoint = map.findObject("Spawns", obj => obj.name === "Player");
		const playerSprite = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'playerIdle', 0);
		player.initSprite(playerSprite, gameData.gravity);
		this.physics.add.overlap(player.sprite, fruits, collectFruit, null, this);
		this.physics.add.collider(player.sprite, worldLayer);
		
		initialiseSystem(this, camera, cursors, controls);
		
		infoBar = new InfoBar(this);
	}
	
	update (time, delta)
	{
		controls.update(delta);
		player.handleKeypresses(cursors);
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