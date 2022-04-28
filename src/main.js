import {GameScene} from './scenes/gameScene.js'

var gameScene = new GameScene()

export const config = {	
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	pixelArt: true,
	backgroundColor: '#000',
	scale: {
		parent: 'game-container',
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 50, x: 0 },
			debug: true
		}
	},
	dom: {
		createContainer: true
	},
	audio: {
		disableWebAudio: true
	},
	
	scenes: [ gameScene ],
};

const game = new Phaser.Game(config);
console.log('initialised game');

game.scale.pageAlignHorizontally = true;
game.scale.pageAlignVertically = true;
game.scale.refresh();

game.scene.add('gameScene', gameScene);
game.scene.start('gameScene');

export const gameData = 
{
	map: 0,
	mapKeys:
	[
		"map1Key",
		"map2Key",
		"map3Key",
		"map4Key",
		"map5Key",
		"map6Key",
		"map7Key",
		"map8Key",
		"map9Key",
		"map10Key",
		"map11Key",
		"map12Key",
		"map13Key",
		"map14Key",
	],
	score: 0,
	lives: 1,
	skin: 1,
	gravity: 1000,
	cameraX: null,
	cameraY: null,
	cameraWidth: null,
	cameraHeight: null,
};

export default config;