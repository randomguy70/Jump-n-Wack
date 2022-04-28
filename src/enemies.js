import { player } from "./scenes/gameScene.js";
import { gameData } from "./main.js";

/*
NOTE:
	Indexing all of the dictionaries in this file works like this:
		dict[name: string][action: string]
	This is so that I can write more modular code and loop through all of the sprite sheet keys, animations, etc...without re-typing separate functions for each different enemy.
	Since not all actions are common to all enemies, I have to check if the dict[name][action] is undefined. If so, then skip to dealing with the next action.
*/

const baseUrl = "../src/assets/Enemies/";

const enemyNames =
[
	"AngryPig", "Bunny",
]

const enemyActions = 
[
	"Idle", "Walk", "Run", "Hit", "Jump", "Fall", // will add more. this is just the testing phase
]

const enemySpeeds =
{
	"AngryPig": 50,
	"Bunny": 60,
}

const enemyRanges = 
{
	"AngryPig":
	{
		x: 100,
		y: 90
	},
	"Bunny":
	{
		x: 100,
		y: 40
	}
}

const enemyDimensions = 
{
	"AngryPig":
	{
		"Width": 36,
		"Height": 30
	},
	"Bunny":
	{
		"Width": 34,
		"Height": 44
	}
}

const enemySpriteSheetPaths = 
{
	"AngryPig": 
	{
		"Idle": baseUrl + "AngryPig/" + "Idle (36x30).png",
		"Walk": baseUrl + "AngryPig/" + "Walk (36x30).png",
		"Run": baseUrl + "AngryPig/" + "Run (36x30).png",
		"Hit": baseUrl + "AngryPig/" + "Hit 1 (36x30).png",
	},
	"Bunny":
	{
		"Idle": baseUrl + "Bunny/" + "Idle (34x44).png",
		"Run": baseUrl + "Bunny/" + "Run (34x44).png",
		"Hit": baseUrl + "Bunny/" + "Idle (34x44).png",
		"Jump": baseUrl + "Bunny/" + "Jump.png",
		"Fall": baseUrl + "Bunny/" + "Idle (34x44).png"
	},
}

const enemySpriteSheetKeys = 
{
	"AngryPig": 
	{
		"Idle": "pigIdleSpriteSheetKey",
		"Walk": "pigWalkSpriteSheetKey",
		"Run": "pigRunSpriteSheetKey",
		"Hit": "pigHitSpriteSheetKey",
	},
	"Bunny":
	{
		"Idle": "bunnyIdleSpriteSheetKey",
		"Run": "bunnyRunSpriteSheetKey",
		"Hit": "bunnyHitSpriteSheetKey",
		"Jump": "bunnyJumpSpriteSheetKey",
		"Fall": "bunnyFallSpriteSheetKey",
	},
}

export const enemyAnimKeys = 
{
	"AngryPig": 
	{
		"Idle": "pigIdleAnimKey",
		"Walk": "pigWalkAnimKey",
		"Run": "pigRunAnimKey",
		"Hit": "pigHitAnimKey",
	},
	"Bunny":
	{
		"Idle": "bunnyIdleAnimKey",
		"Run": "bunnyRunAnimKey",
		"Hit": "bunnyHitAnimKey",
		"Jump": "bunnyJumpAnimKey",
		"Fall": "bunnyFallAnimKey",
	},
}

export function spawnEnemiesFromLayer(spawnLayer, enemyGroup)
{
	spawnLayer.objects.forEach(object => {
		if(object.type === "Enemy")
		{
			let obj = enemyGroup.create(object.x, object.y, object.name);
			obj.body.width = obj.width;
			obj.body.height = obj.height;
			obj.name = object.name;
			obj.body.collideWorldBounds = true;
			obj.body.allowGravity = true;
			obj.body.immovable = false;
			obj.body.gravity = { x: 0, y: gameData.gravity };
			
			// different enemies are different sizes...
			if(obj.name === "Bunny") {
				obj.y -= 22;
				obj.body.y -= 22;
				obj.body.height = enemyDimensions["Bunny"]["Height"];
			}
			if(obj.name === "AngryPig") {
				obj.y -= 15;
				obj.body.y -= 15;
				obj.body.height = enemyDimensions["AngryPig"]["Height"];
			}
		}
	})
}

export function loadEnemySpriteSheets(scene)
{
	for(var i = 0; i < enemyNames.length; i++)
	{
		let name = enemySpriteSheetPaths[enemyNames[i]];
		if(typeof(name) === "undefined") { continue }
		
		for(var ii = 0; ii < enemyActions.length; ii++)
		{
			let action = enemyActions[ii];
			if(typeof(name[action]) === "undefined") { continue }
			
			scene.load.spritesheet(enemySpriteSheetKeys[enemyNames[i]][action],
				enemySpriteSheetPaths[enemyNames[i]][action], 
				{ frameWidth: enemyDimensions[enemyNames[i]]["Width"], frameHeight: enemyDimensions[enemyNames[i]]["Height"] }
			);
		}
	}
}

export function loadEnemyAnims(scene)
{
	for(var i = 0; i < enemyNames.length; i++)
	{
		let name = enemyNames[i];
		if(typeof(enemyAnimKeys[name]) === "undefined") { continue; }
		
		for(var ii = 0; ii < enemyActions.length; ii++)
		{
			let action = enemyActions[ii];
			if(typeof(enemyAnimKeys[name][action]) === "undefined") { continue }
			
			scene.anims.create(
			{
				key: enemyAnimKeys[name][action],
				frames: scene.anims.generateFrameNumbers(enemySpriteSheetKeys[name][action]),
				frameRate: 20,
				repeat: -1,
			});
		}
	}
	
	console.log("loaded enemy animations");
}

export function startAllEnemiesIdle(enemyGroup)
{
	console.log("enemy group", enemyGroup);
	
	enemyGroup.children.entries.forEach(enemy => {
		enemy.anims.play(enemyAnimKeys[enemy.name]["Idle"]);
	})
	
	console.log("started all enemies with idle animation");
}

export function updateEnemies(enemyGroup)
{
	// this is for random decisions
	// let seedBase = Math.random() * 1000000000000000;
	// let seed = 0;
	
	enemyGroup.children.entries.forEach(enemy => {
		if(enemy.name === "AngryPig")
		{
			// seed = (seedBase & (0xff << 0));
			
			// the pig doesn't notice unless the player is within 100 pixels on the same plane. Then, he turns red and charges...
			if(spriteIsWithinDistance(enemy, player.sprite, enemyRanges["AngryPig"].x, enemyRanges["AngryPig"].y))
			{
				if(enemy.anims.currentAnim.key != enemyAnimKeys["AngryPig"]["Run"])
				{
					enemy.anims.play(enemyAnimKeys["AngryPig"]["Run"]);
				}
				
				// sprite is built to face left
				
				if(enemy.x < player.sprite.x)
				{
					enemy.body.flipX = true;
					// enemy.body.velocityX = 60;
				}
				else
				{
					enemy.body.flipX = false;
					// enemy.body.velocityX = -60;
				}
			}
			else
			{
				if(enemy.anims.currentAnim.key != enemyAnimKeys["AngryPig"]["Idle"])
				{
					enemy.anims.play(enemyAnimKeys["AngryPig"]["Idle"]);
				}
			}
		}
		else if(enemy.name === "Bunny")
		{
			
		}
	})
	
}

function spriteIsWithinDistance(sprite1, sprite2, xDistance, yDistance)
{
	if(Math.abs(sprite1.x - sprite2.x) > xDistance)
	{
		return 0;
	}
	else if(Math.abs(sprite1.y - sprite2.y) > yDistance)
	{
		return 0;
	}
	else
	{
		return 1;
	}
}