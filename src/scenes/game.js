var player;
var cursors;

class GameScene extends Phaser.Scene
{
	constructor ()
	{
		super({key: 'gameScene'});
		console.log('constructed gameScene');
	}
	
	preload ()
	{
		console.log('preloaded');
		this.load.spritesheet('running_soldier', 
		'./src/assets/running_soldier.png', { frameWidth: 43, frameHeight: 47 }
		);
	}
	
	create ()
	{
		player = this.physics.add.sprite(10, 10, 'running_soldier');
		player.setCollideWorldBounds(true);
	}
}

export default GameScene;