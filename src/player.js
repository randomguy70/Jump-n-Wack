import {player as playerSprite}from './scenes/gameScene.js';

export const numPlayerSkins = 4;
export const playerSkins = 
[
	'Mask Dude', 'Ninja Frog', 'Pink Man', 'Virtual Guy'
];

const pathsToPlayers = 
[
	'../src/assets/Main Characters/Mask Dude/',
	'../src/assets/Main Characters/Ninja Frog/',
	'../src/assets/Main Characters/Pink Man/',
	'../src/assets/Main Characters/Virtual Guy/'
];

const playerSpriteSheetKeys = 
{
	doubleJump: 'playerDoubleJump',
	fall: 'playerFall',
	hit: 'playerHit',
	idle: 'playerIdle',
	jump: 'playerJump',
	run: 'playerRun',
	wallJump: 'playerWallJump'
};

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

export function loadPlayerSpriteSheets(scene)
{
	scene.load.spritesheet(playerSpriteSheetKeys.idle,
		playerConfig.path + playerSpriteSheetNames.idle, 
		{ frameWidth: playerConfig.frameWidth, frameHeight: playerConfig.frameHeight}
	);
   scene.load.spritesheet(playerSpriteSheetKeys.run, 
		playerConfig.path + playerSpriteSheetNames.run,
   	{ frameWidth: playerConfig.frameWidth, frameHeight: playerConfig.frameHeight }
   );
	scene.load.spritesheet(playerSpriteSheetKeys.jump,
		playerConfig.path + playerSpriteSheetNames.jump,
		{ frameWidth: playerConfig.frameWidth, frameHeight: playerConfig.frameHeight}
	);
	scene.load.spritesheet(playerSpriteSheetKeys.fall,
		playerConfig.path + playerSpriteSheetNames.fall,
		{ frameWidth: playerConfig.frameWidth, frameHeight: playerConfig.frameHeight}
	);
	scene.load.spritesheet(playerSpriteSheetKeys.hit,
		playerConfig.path + playerSpriteSheetNames.hit,
		{ frameWidth: playerConfig.frameWidth, frameHeight: playerConfig.frameHeight}
	);
};

export var playerIdle;  // phaser anim
export var playerRun;   // phaser anim
export var playerJump;  // phaser anim
export var playerFall;  // phaser anim

export const playerAnimKeys = 
{
	doubleJump: 'playerDoubleJumpAnim',
	fall: 'playerFallAnim',
	hit: 'playerHitAnim',
	idle: 'playerIdleAnim',
	jump: 'playerJumpAnim',
	run: 'playerRunAnim',
	wallJump: 'playerWallJumpAnim'
};

export const playerConfig =
{
	frameWidth: 32,
	frameHeight: 32,
	
	speedX: 100,
	speedY: 430,
	
	facingRight: true,
	
	skin: 1,
	path: pathsToPlayers[1],
};

export function createPlayerAnims(scene)
{
	playerIdle = scene.anims.create(
		{
		key: playerAnimKeys.idle,
		frames: scene.anims.generateFrameNumbers(playerSpriteSheetKeys.idle),
		frameRate: 20,
		repeat: -1,
	});
	playerRun = scene.anims.create(
		{
		key: playerAnimKeys.run,
		frames: scene.anims.generateFrameNumbers(playerSpriteSheetKeys.run),
		frameRate: 20,
		repeat: -1
	});
	playerJump = scene.anims.create(
		{
			key: playerAnimKeys.jump,
			frames: scene.anims.generateFrameNumbers(playerSpriteSheetKeys.jump),
			frameRate: 1,
			repeat: -1,
	});
	playerFall = scene.anims.create(
		{
			key: playerAnimKeys.fall,
			frames: scene.anims.generateFrameNumbers(playerSpriteSheetKeys.fall),
			frameRate: 1,
			repeat: -1,
		}
	);
}

export function handlePlayerKeypresses(cursors, player)
{
	playerSprite.body.setVelocityX(0);
		
	// Horizontal movement
		
	if (cursors.left.isDown)
	{
		if(playerConfig.facingRight === true)
		{
			playerSprite.flipX = true;
			playerConfig.facingRight = false;
		}
		if(playerSprite.body.onFloor() && playerSprite.anims.isPlaying && playerSprite.anims.currentAnim.key != playerAnimKeys.run)
		{
			playerSprite.anims.play(playerAnimKeys.run);
		}
		playerSprite.body.setVelocityX(-playerConfig.speedX);
	}
	else if (cursors.right.isDown)
	{
		if(playerConfig.facingRight === false)
		{
			// false because it isn't being flipped
			playerSprite.flipX = false;
			playerConfig.facingRight = true;
		}
		if(playerSprite.body.onFloor() && playerSprite.anims.isPlaying && playerSprite.anims.currentAnim.key != playerAnimKeys.run)
		{
			playerSprite.anims.play(playerAnimKeys.run);
		}
		playerSprite.body.setVelocityX(playerConfig.speedX);
	}
	
	// Vertical movement
	
	if (cursors.up.isDown && playerSprite.body.onFloor())
	{
		playerSprite.setVelocityY(-playerConfig.speedY);
		playerSprite.anims.play(playerAnimKeys.jump);
	}
	else if (playerSprite.body.velocity.y > 0 && playerSprite.anims.currentAnim.key != playerAnimKeys.fall && !playerSprite.body.onFloor())
	{
		playerSprite.anims.play(playerAnimKeys.fall);
	}
	
	else if(!cursors.up.isDown && !cursors.right.isDown && !cursors.left.isDown && playerSprite.anims.isPlaying && playerSprite.anims.currentAnim.key != playerAnimKeys.idle && playerSprite.body.onFloor())
	{
		playerSprite.anims.play(playerAnimKeys.idle);
	}
}

export function collectFruit(player, fruit, scene)
{
	
}