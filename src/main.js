import GameScene from './scenes/game.js'

var gameScene = new GameScene()

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	pixelArt: true,
	backgroundColor: '#87ceeb',
	
	scale: {
		parent: 'game-container',
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0, x: 0 },
			debug: false
		}
	},
	
	scenes: [ gameScene ],
	
	assets: '../assets/',
	
	level: 0,
	lives: 1,
	score: 0,
	speed: 40,
};

const game = new Phaser.Game(config);
console.log('initialised game');

game.scale.pageAlignHorizontally = true;
game.scale.pageAlignVertically = true;
game.scale.refresh();

game.scene.add('gameScene', gameScene);
game.scene.start('gameScene');

export default config;