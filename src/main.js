import GameScene from './scenes/game.js'

var gameScene = new GameScene()

const config = {
	type: Phaser.WEBGL,
	width: 800,
	height: 600,
	backgroundColor: '#2d2d2d',

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