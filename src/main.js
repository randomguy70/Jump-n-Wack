import GameScene from './scenes/game.js'

var gameScene = new GameScene()

const config = {
	type: Phaser.WEBGL,
	// parent: 'phaser-canvas', I'll figure out why this isn't working later
	pixelArt: true,
	width: 800,
	height: 400,
	backgroundColor: 0x0000ff,

	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 5, x: 0 },
			debug: false
		}
	},

	scenes: [ gameScene ]
};

var game = new Phaser.Game(config);
console.log('initialised game');

game.scene.add('gameScene', gameScene);

game.scene.start('gameScene');

export default config;