const config =
{
	width: 800,
	height: 400,
};

var player_config =
{
	width: 43,
	height: 47,
	starting_x: 43,
	starting_y: config.height - 35,
}

var ground_config = 
{
	width: 846,
	height: 87,
}

var ground1;
var ground2;

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
		this.ground1 = this.add.image(0, config.height-30, 'ground').setOrigin(0, 0);
		this.ground2 = this.add.image(ground_config.width, config.height-30, 'ground').setOrigin(0, 0);

		this.player = this.physics.add.sprite(player_config.starting_x, player_config.starting_y, 'running_soldier').setScale(1.5);
		this.player.setCollideWorldBounds(true);
		this.player.setBounce(0.2);
		this.player.body.setGravityY(300);
				
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
		moveGround(this.ground1, this.ground2);
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

function moveGround (ground1, ground2)
{
	ground1.x = ground1.x - 2;
	ground2.x = ground2.x - 2;
	
	if (ground1.x <= (0-ground_config.width))
	{
		ground1.x = ground_config.width;
	}
	else if (ground2.x <= (0-ground_config.width))
	{
		ground2.x = ground_config.width;
	}
}

export default GameScene;