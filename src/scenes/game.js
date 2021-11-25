var player;
var cursors;

class GameScene extends Phaser.Scene
{
	constructor ()
	{
		console.log('constructed gameScene');
		super({key: 'gameScene'});
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
		console.log('created');
		
		player = this.physics.add.sprite(10, 10, 'running_soldier').setScale(1.5);
		player.setCollideWorldBounds(true);
		player.setBounce(0.2);
		
		this.anims.create({
			key: 'move',
			frames: this.anims.generateFrameNumbers('running_soldier', { start: 0, end: 6 }),
			frameRate: 10,
			repeat: -1
	  });
	  
	  cursors = this.input.keyboard.createCursorKeys();
	}
	
	update ()
	{
		player.anims.play('move', true);
	}
}

export default GameScene;