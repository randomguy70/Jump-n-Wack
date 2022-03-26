import GameScene from './scenes/gameScene.js'

var gameScene = new GameScene()

export const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	pixelArt: true,
	// backgroundColor: '#87ceeb', // sky blue
	backgroundColor: '#000',
	
	scale: {
		parent: 'game-container',
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 50, x: 0 },
			debug: false
		}
	},
	
	scenes: [ gameScene ],
	
	assets: '../assets/',
	
	level: 0,
	lives: 1,
	score: 0,
	
	enemySpeed: {
		x: 80,
		y: 300
	}
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
	level: 0,
	score: 0,
	lives: 1,
	skin: 1,
	
	fruitScoreValue: 5,
	
	gravity: 1000,
};

export default config;