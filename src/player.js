var pathToPlayerSkins = '../src/assets/Main Characters/';

var numPlayerSkins = 4;
var playerSkins = 
[
	'Mask Dude', 'Ninja Frog', 'Pink Man', 'Virtual Guy'
];

var playerAnimKeys = 
{
	doubleJump: 'playerDoubleJumpAnim',
	fall: 'playerFallAnim',
	hit: 'playerHitAnim',
	idle: 'playerIdleAnim',
	jump: 'playerJumpAnim',
	run: 'playerRunAnim',
	wallJump: 'playerWallJumpAnim'
};

var playerAnimPaths = 
{
	doubleJump: 'Double Jump (32x32).png',
	fall: 'Fall (32x32).png',
	hit: 'Hit (32x32).png',
	idle: 'Idle (32x32).png',
	jump: 'Jump (32x32).png',
	run: 'Run (32x32).png',
	wallJump: 'Wall Jump (32x32).png'
};

var playerConfig =
{
	speedX: 100,
	speedY: 430,
	
	facingRight: true,
	
	skin: 0,
	path: pathToPlayerSkins + playerSkins[this.skin] + '/',
};