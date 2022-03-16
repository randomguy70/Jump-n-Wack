const game = 
{
	level: 0,
	score: 0,
	lives: 1,
	
	playerConfig: {
		speedX: 100,
		speedY: 430,
		
		facingRight: true,
	},
	
	enemySpeed: {
		x: 80,
		y: 300
	},
	
	gravity: 1000,
	
};

export default game;