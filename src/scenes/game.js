import config from "../main.js";

var cursors;
var controls;

class GameScene extends Phaser.Scene
{
	constructor ()
	{
		console.log('constructed gameScene');
		super({key: 'gameScene'});
	}
	
	preload ()
	{
		console.log('preloading...');
		
		this.load.image("tiles", '../src/assets/tilesets/Terrain.png');
		this.load.tilemapTiledJSON("map", "../src/assets/tilemaps/map1.json");
		
	}
	
	create ()
	{
		console.log('creating...');
		
		const map = this.make.tilemap({ key: "map" });
		
		const tileset = map.addTilesetImage("tileset", "tiles");
		
		// Parameters: layer name (or index) from Tiled, tileset, x, y
		const worldLayer = map.createLayer("World", tileset, 0, 0);
		
		// var cursors = this.input.keyboard.createCursorKeys();
		
		// var controlConfig = {
			// camera: this.cameras.main,
			// left: cursors.left,
			// right: cursors.right,
			// up: cursors.up,
			// down: cursors.down,
			// speed: 0.5
    	// };
		 
		//  controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
	}

	update (time, delta)
	{
		// controls.update(delta);
	}
}

export default GameScene;