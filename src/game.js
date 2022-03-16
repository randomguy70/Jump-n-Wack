const game = 
{
	level: 0,
	score: 0,
	
	playerConfig: {
		lives: 1,
		
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