// game properties object
import game from "../game.js";
import config from '../main.js';
// player data
import {numPlayerSkins, playerSkins, pathsToPlayers, playerSpriteSheetKeys, playerSpriteSheetNames, playerAnimKeys, playerConfig} from '../player.js';
// player functions
import {loadPlayerSpriteSheets, createPlayerAnims, handlePlayerKeypresses} from '../player.js';
// animations
import {playerIdle, playerRun, playerJump, playerFall} from '../player.js';

export var camera;           // phaser object
export var cursors;          // phaser object
export var controls;         // phaser object

export var player;           // phaser object

export var map;              // phaser object
export var tileset;          // phaser object

export var mapOffsetX;       // number
export var mapOffsetY;       // number

export var belowPlayerLayer; // phaser map layer object
export var worldLayer;       // phaser map layer object
export var fruitLayer;       // phaser map layer object

export var coins;            // layer -> static group


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
		
		console.log('loading player sprite sheets');
		loadPlayerSpriteSheets(this);
	}
	
	create ()
	{
		console.log('creating...');
		
		// tilemap stuff
		
		map = this.make.tilemap({ key: "map" });
		
		tileset = map.addTilesetImage("terrain", "tiles", 16, 16, 0, 0);
		
		belowPlayerLayer = map.createLayer("Below Player", tileset, 0, 0);
		worldLayer = map.createLayer("World", tileset, 0, 0);
		fruitLayer = map.getObjectLayer('Fruits')['objects'];
		
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
		player.body.setGravityY(game.gravity);
		
		// animations
		
		createPlayerAnims(this);
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