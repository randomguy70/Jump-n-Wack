const config =
{
	type: Phaser.AUTO,
	pixelArt: false,
	roundPixels: false,
	width: 800,
	height: 400,
	backgroundColor: 0x000000,
};

var player_config =
{
	width: 43,
	height: 47,
	starting_x: 43,
	starting_y: config.height - 10,
}

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
		
		this.load.image('background', './src/assets/background.jpg');
		this.load.image('ground', './src/assets/ground.png');
		this.load.spritesheet('running_soldier', 
		'./src/assets/running_soldier.png', { frameWidth: 43, frameHeight: 47 }
		);
	}
	
	create ()
	{
		console.log('created');
		this.add.image(0, 0, 'background').setOrigin(0, 0);
		this.add.image(0, config.height-100, 'ground').setOrigin(0, 0);
		
		this.player = this.physics.add.sprite(player_config.starting_x, player_config.starting_y, 'running_soldier').setScale(1.5);
		this.player.setCollideWorldBounds(true);
		this.player.setBounce(0.2);
		
		this.anims.create({
			key: 'move',
			frames: this.anims.generateFrameNumbers('running_soldier', { start: 0, end: 6 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'jump',
			frames: this.anims.generateFrameNumbers('running_soldier', { start: 1, end: 1}),
			frameRate: 10
		})
	  
	  cursors = this.input.keyboard.createCursorKeys();
	}
	
	update ()
	{
		updatePlayer(this.player);
	}
}

function updatePlayer (player)
{
	if (cursors.up.isDown)
	{
		player.anims.play('jump', true);
	}
	else
	{
		player.anims.play('move', true);
	}
}

export default GameScene;