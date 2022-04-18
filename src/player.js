export const playerSkins = 
[
	'Mask Dude', 'Ninja Frog', 'Pink Man', 'Virtual Guy'
];
const PLAYER_WIDTH = 32;
const PLAYER_HEIGHT = 32;

export const basePathToPlayer = "../src/assets/Main Characters/";

const playerSpriteSheetNames = 
{
	doubleJump: 'Double Jump (32x32).png',
	fall: 'Fall (32x32).png',
	hit: 'Hit (32x32).png',
	idle: 'Idle (32x32).png',
	jump: 'Jump (32x32).png',
	run: 'Run (32x32).png',
	wallJump: 'Wall Jump (32x32).png'
};

const playerSpriteSheetKeys = 
[
	{
		doubleJump: playerSkins[0] + "playerDoubleJumpSpriteSheet",
		fall: playerSkins[0] + "playerFallSpriteSheet",
		hit: playerSkins[0] + "playerHitSpriteSheet",
		idle: playerSkins[0] + "playerIdleSpriteSheet",
		jump: playerSkins[0] + "playerJumpSpriteSheet",
		run: playerSkins[0] + "playerRunSpriteSheet",
		wallJump: playerSkins[0] + "playerWallJumpSpriteSheet",
	},
	{
		doubleJump: playerSkins[1] + "playerDoubleJumpSpriteSheet",
		fall: playerSkins[1] + "playerFallSpriteSheet",
		hit: playerSkins[1] + "playerHitSpriteSheet",
		idle: playerSkins[1] + "playerIdleSpriteSheet",
		jump: playerSkins[1] + "playerJumpSpriteSheet",
		run: playerSkins[1] + "playerRunSpriteSheet",
		wallJump: playerSkins[1] + "playerWallJumpSpriteSheet",
	},
	{
		doubleJump: playerSkins[2] + "playerDoubleJumpSpriteSheet",
		fall: playerSkins[2] + "playerFallSpriteSheet",
		hit: playerSkins[2] + "playerHitSpriteSheet",
		idle: playerSkins[2] + "playerIdleSpriteSheet",
		jump: playerSkins[2] + "playerJumpSpriteSheet",
		run: playerSkins[2] + "playerRunSpriteSheet",
		wallJump: playerSkins[2] + "playerWallJumpSpriteSheet",
	},
	{
		doubleJump: playerSkins[3] + "playerDoubleJumpSpriteSheet",
		fall: playerSkins[3] + "playerFallSpriteSheet",
		hit: playerSkins[3] + "playerHitSpriteSheet",
		idle: playerSkins[3] + "playerIdleSpriteSheet",
		jump: playerSkins[3] + "playerJumpSpriteSheet",
		run: playerSkins[3] + "playerRunSpriteSheet",
		wallJump: playerSkins[3] + "playerWallJumpSpriteSheet",
	}
]

const playerAnimKeys = 
[
	{
		doubleJump: playerSkins[0] + "playerDoubleJumpAnim",
		fall: playerSkins[0] + "playerFallAnim",
		hit: playerSkins[0] + "playerHitAnim",
		idle: playerSkins[0] + "playerIdleAnim",
		jump: playerSkins[0] + "playerJumpAnim",
		run: playerSkins[0] + "playerRunAnim",
		wallJump: playerSkins[0] + "playerWallJumpAnim",
	},
	{
		doubleJump: playerSkins[1] + "playerDoubleJumpAnim",
		fall: playerSkins[1] + "playerFallAnim",
		hit: playerSkins[1] + "playerHitAnim",
		idle: playerSkins[1] + "playerIdleAnim",
		jump: playerSkins[1] + "playerJumpAnim",
		run: playerSkins[1] + "playerRunAnim",
		wallJump: playerSkins[1] + "playerWallJumpAnim",
	},
	{
		doubleJump: playerSkins[2] + "playerDoubleJumpAnim",
		fall: playerSkins[2] + "playerFallAnim",
		hit: playerSkins[2] + "playerHitAnim",
		idle: playerSkins[2] + "playerIdleAnim",
		jump: playerSkins[2] + "playerJumpAnim",
		run: playerSkins[2] + "playerRunAnim",
		wallJump: playerSkins[2] + "playerWallJumpAnim",
	},
	{
		doubleJump: playerSkins[3] + "playerDoubleJumpAnim",
		fall: playerSkins[3] + "playerFallAnim",
		hit: playerSkins[3] + "playerHitAnim",
		idle: playerSkins[3] + "playerIdleAnim",
		jump: playerSkins[3] + "playerJumpAnim",
		run: playerSkins[3] + "playerRunAnim",
		wallJump: playerSkins[3] + "playerWallJumpAnim",
	}
]

export class Player 
{
	constructor(scene)
	{
		this.scene = scene;
		this.basePath = "../src/assets/Main Characters/";
		
		this.skin = 1;
		this.lives = 1;
		this.score = 0;
		this.speedX = 100;
		this.speedY = 430;
		this.width = 32;
		this.height = 32;
		console.log("player initialised: " + this);
	}
	
	initSprite(sprite, gravityY)
	{
		this.sprite = sprite;
		this.sprite.anims.play(playerAnimKeys[this.skin].idle);
		this.sprite.body.setCollideWorldBounds(true);
		this.sprite.body.setGravityY(gravityY);
	}
	
	loadSpriteSheets(scene)
	{
		for(var i = 0; i < playerSpriteSheetKeys.length; i++)
		{
			let path = basePathToPlayer + playerSkins[i] + "/";
			
			scene.load.spritesheet(playerSpriteSheetKeys[i].idle,
				basePathToPlayer + playerSkins[i] + "/" + playerSpriteSheetNames.idle, 
				{ frameWidth: PLAYER_WIDTH, frameHeight: PLAYER_HEIGHT }
			);
			scene.load.spritesheet(playerSpriteSheetKeys[i].run, 
				basePathToPlayer + playerSkins[i] + "/" + playerSpriteSheetNames.run,
				{ frameWidth: PLAYER_WIDTH, frameHeight: PLAYER_HEIGHT }
			);
			scene.load.spritesheet(playerSpriteSheetKeys[i].jump,
				basePathToPlayer + playerSkins[i] + "/" + playerSpriteSheetNames.jump,
				{ frameWidth: PLAYER_WIDTH, frameHeight: PLAYER_HEIGHT }
			);
			scene.load.spritesheet(playerSpriteSheetKeys[i].fall,
				basePathToPlayer + playerSkins[i] + "/" + playerSpriteSheetNames.fall,
				{ frameWidth: PLAYER_WIDTH, frameHeight: PLAYER_HEIGHT }
			);
			scene.load.spritesheet(playerSpriteSheetKeys[i].hit,
				basePathToPlayer + playerSkins[i] + "/" + playerSpriteSheetNames.hit,
				{ frameWidth: PLAYER_WIDTH, frameHeight: PLAYER_HEIGHT }
			);
		}
	};
	
	createAnims(scene)
	{
		for(var i = 0; i < playerAnimKeys.length; i++)
		{
			scene.anims.create(
				{
				key: playerAnimKeys[i].idle,
				frames: scene.anims.generateFrameNumbers(playerSpriteSheetKeys[i].idle),
				frameRate: 20,
				repeat: -1,
			});
			scene.anims.create(
				{
				key: playerAnimKeys[i].run,
				frames: scene.anims.generateFrameNumbers(playerSpriteSheetKeys[i].run),
				frameRate: 20,
				repeat: -1
			});
			scene.anims.create(
				{
					key: playerAnimKeys[i].jump,
					frames: scene.anims.generateFrameNumbers(playerSpriteSheetKeys[i].jump),
					frameRate: 1,
					repeat: -1,
			});
			scene.anims.create(
				{
					key: playerAnimKeys[i].fall,
					frames: scene.anims.generateFrameNumbers(playerSpriteSheetKeys[i].fall),
					frameRate: 1,
					repeat: -1,
				}
			);
		}
	}
	
	skinNames = 
	[
		"Mask Dude",
		"Ninja Frog",
		"Pink Man",
		"Virtual Guy",
	]
	
	handleKeypresses(cursors)
	{
		this.sprite.body.setVelocityX(0);
		
		// Horizontal movement
		
		if (cursors.left.isDown)
		{
			if(this.sprite.flipX === false)
			{
				this.sprite.flipX = true;
			}
			if(this.sprite.body.onFloor() && this.sprite.anims.isPlaying && this.sprite.anims.currentAnim.key != playerAnimKeys[this.skin].run)
			{
				this.sprite.anims.play(playerAnimKeys[this.skin].run);
			}
			this.sprite.body.setVelocityX(-this.speedX);
		}
		
		else if (cursors.right.isDown)
		{
			if(this.sprite.flipX === true)
			{
				this.sprite.flipX = false;
			}
			if(this.sprite.body.onFloor() && this.sprite.anims.isPlaying && this.sprite.anims.currentAnim.key != playerAnimKeys[this.skin].run)
			{
				this.sprite.anims.play(playerAnimKeys[this.skin].run);
			}
			this.sprite.body.setVelocityX(this.speedX);
		}
		
		// Vertical movement
		
		if (cursors.up.isDown && this.sprite.body.onFloor())
		{
			this.sprite.setVelocityY(-this.speedY);
			this.sprite.anims.play(playerAnimKeys[this.skin].jump);
		}
		else if (this.sprite.body.velocity.y > 0 && this.sprite.anims.currentAnim.key != playerAnimKeys[this.skin].fall && !this.sprite.body.onFloor())
		{
			this.sprite.anims.play(playerAnimKeys[this.skin].fall);
		}
		
		else if(!cursors.up.isDown && !cursors.right.isDown && !cursors.left.isDown && this.sprite.anims.isPlaying && this.sprite.anims.currentAnim.key != playerAnimKeys[this.skin].idle && this.sprite.body.onFloor())
		{
			this.sprite.anims.play(playerAnimKeys[this.skin].idle);
		}
	}
	
	idle()
	{
		this.sprite.anims.play(playerAnimKeys[this.skin].idle);
	}
	jump()
	{
		this.sprite.anims.play(playerAnimKeys[this.skin].jump);
	}
}