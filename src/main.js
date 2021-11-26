import GameScene from './scenes/game.js'

var gameScene = new GameScene()

const config = {
	type: Phaser.AUTO,
	pixelArt: false,
	roundPixels: false,
	width: 800,
	height: 400,
	// backgroundColor: 0x1c0098,
	
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0, x: 0 },
			debug: false
		}
	},
	
	scenes: [ gameScene ]
};

var game = new Phaser.Game(config);
console.log('initialised game');

game.scene.add('gameScene', gameScene);

game.scene.start('gameScene');