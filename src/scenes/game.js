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
		
	}
}

export default GameScene;