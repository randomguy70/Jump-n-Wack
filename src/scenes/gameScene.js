import { spawnFruitsFromLayer, loadFruitSpriteSheets, createFruitAnims, collectFruit} from '../fruits.js';
import {config, gameData} from '../main.js';
import {Player} from '../player.js';
import {HealthBar} from '../healthBar.js';
import {spawnEnemiesFromLayer, loadEnemySpriteSheets, loadEnemyAnims, updateEnemies, handleEnemyCollision} from '../enemies.js';

export var camera;           // phaser object
export var cursors;          // phaser object
export var controls;         // phaser object
export var graphics;

export var map;              // tilemap
export var tileset;          // tileset image

export var mapOffsetX;       // number
export var mapOffsetY;       // number

export var belowPlayerLayer; // phaser map layer
export var worldLayer;       // phaser map layer
export var objectLayer;      // phaser map layer
export var spawnLayer;       // phaser map layer

export var fruits;           // group
export var enemies = [];     // sprite array

export var player = new Player(this);
var healthBar = new HealthBar();

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
		this.load.tilemapTiledJSON(gameData.mapKeys[gameData.map], "../src/assets/tilemaps/map1.json");
		
		console.log('loading sprite sheets');
		
		player.loadSpriteSheets(this);
		loadFruitSpriteSheets(this);
		healthBar.load(this);
		loadEnemySpriteSheets(this);
	}
	
	create ()
	{
		console.log('creating...');
		console.log("loading animations");
		
		graphics = this.add.graphics();
		
		player.createAnims(this);
		createFruitAnims(this);
		loadEnemyAnims(this);
		
		// tilemap stuff
		console.log("loading map and layers");
		
		map = this.make.tilemap({ key: gameData.mapKeys[gameData.map] });
		tileset = map.addTilesetImage("terrain", "tiles", 16, 16, 0, 0);
		
		// add the background color to the map (different from canvas background)		
		drawBackground(this);
		
		belowPlayerLayer = map.createLayer("Below Player", tileset, 0, 0);
		worldLayer = map.createLayer("World", tileset, 0, 0);
		objectLayer = map.getObjectLayer('Objects');
		spawnLayer = map.getObjectLayer("Spawns");
		
		fruits = this.physics.add.staticGroup();
		spawnFruitsFromLayer(objectLayer, fruits);
		
		worldLayer.setCollisionByProperty({ Collides: true });
		
		const spawnPoint = map.findObject("Spawns", obj => obj.name === "Player");
		const playerSprite = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'playerIdle', 0);
		player.initSprite(playerSprite, gameData.gravity);
		this.physics.add.overlap(player.sprite, fruits, collectFruit, null, this);
		this.physics.add.collider(player.sprite, worldLayer);
		console.log("player: ", player);
		
		spawnEnemiesFromLayer(this, spawnLayer, worldLayer, enemies, player.sprite);
		
		initialiseSystem(this, camera, cursors, controls);
		
		healthBar.draw(this);
	}
	
	update (time, delta)
	{
		controls.update(delta);
		player.handleKeypresses(cursors);
		updateEnemies(enemies);
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
		}
	);
	
	// if scrolling is necessary...
	if(map.widthInPixels > config.width || map.heightInPixels > config.height)
	{
		console.log("setting up scrolling system.");
		
		gameData.cameraX = 0;
		gameData.cameraY = 0;
		gameData.cameraWidth = config.width;
		gameData.cameraHeight = config.height;
		
		camera.setBounds(gameData.cameraX, gameData.cameraY, gameData.cameraWidth, gameData.cameraHeight);
		camera.startFollow(player);	
	}
	
	// if the whole tilemap fits onscreen, center camera on map
	else
	{
		console.log("setting up centered view.");
		
		gameData.cameraX = -(config.width / 2 - map.widthInPixels / 2);
		gameData.cameraY = -(config.height / 2 - map.heightInPixels / 2);
		gameData.cameraWidth = config.width;
		gameData.cameraHeight = config.height;
		
		camera.setBounds(gameData.cameraX, gameData.cameraY, gameData.cameraWidth, gameData.cameraHeight);
	}
}

function drawBackground(scene)
{
	scene.add.rectangle(0, 0, map.widthInPixels, map.heightInPixels, 0x87ceeb).setOrigin(0, 0);
}