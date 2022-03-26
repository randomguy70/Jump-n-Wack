import gameData from '../src/main.js';

export const fruitFrameWidth = 32;
export const fruitFrameHeight = 32;

export const fruitSpriteSheetKeys = 
{
	apple: 'appleSpriteSheet',
	banana: 'bananaSpriteSheet',
	cherry: 'cherrySpriteSheet',
	kiwi: 'kiwiSpriteSheet',
	melon: 'melonSpriteSheet',
	orange: 'orangeSpriteSheet',
	pineapple: 'pineappleSpriteSheet',
	strawberry: 'strawberrySpriteSheet'
};

export const fruitSpriteSheetPaths = 
{
	apple: '../src/assets/Items/Fruits/Apple.png',
	banana: '../src/assets/Items/Fruits/Bananas.png',
	cherry: '../src/assets/Items/Fruits/Cherries.png',
	kiwi: '../src/assets/Items/Fruits/Kiwi.png',
	melon: '../src/assets/Items/Fruits/Melon.png',
	orange: '../src/assets/Items/Fruits/Orange.png',
	pineapple: '../src/assets/Items/Fruits/Pineapple.png',
	strawberry: '../src/assets/Items/Fruits/Strawberry.png'
};

export const fruitAnimKeys = 
{
	apple: 'appleIdleAnim',
	banana: 'bananaIdleAnim',
	cherry: 'cherryIdleAnim',
	kiwi: 'kiwiSpriteSheet',
	melon: 'melonIdleAnim',
	orange: 'orangeIdleAnim',
	pineapple: 'pineappleIdleAnim',
	strawberry: 'strawberrIdleAnimt'
};

export function loadFruitSpriteSheets(scene)
{
	scene.load.spritesheet(fruitSpriteSheetKeys.apple, fruitSpriteSheetPaths.apple, {frameWidth: fruitFrameWidth, frameHeight: fruitFrameHeight});
   scene.load.spritesheet(fruitSpriteSheetKeys.banana, fruitSpriteSheetPaths.banana, {frameWidth: fruitFrameWidth, frameHeight: fruitFrameHeight});
	scene.load.spritesheet(fruitSpriteSheetKeys.cherry, fruitSpriteSheetPaths.cherry, {frameWidth: fruitFrameWidth, frameHeight: fruitFrameHeight});
	scene.load.spritesheet(fruitSpriteSheetKeys.kiwi, fruitSpriteSheetPaths.kiwi, {frameWidth: fruitFrameWidth, frameHeight: fruitFrameHeight});
	scene.load.spritesheet(fruitSpriteSheetKeys.melon, fruitSpriteSheetPaths.melon, {frameWidth: fruitFrameWidth, frameHeight: fruitFrameHeight});
	scene.load.spritesheet(fruitSpriteSheetKeys.orange, fruitSpriteSheetPaths.orange, {frameWidth: fruitFrameWidth, frameHeight: fruitFrameHeight});
	scene.load.spritesheet(fruitSpriteSheetKeys.pineapple, fruitSpriteSheetPaths.pineapple, {frameWidth: fruitFrameWidth, frameHeight: fruitFrameHeight});
	scene.load.spritesheet(fruitSpriteSheetKeys.strawberry, fruitSpriteSheetPaths.strawberry, {frameWidth: fruitFrameWidth, frameHeight: fruitFrameHeight});
};

export function createFruitAnims(scene)
{
	appleIdle = scene.anims.create(
		{
		key: fruitAnimKeys.apple,
		frames: scene.anims.generateFrameNumbers(fruitSpriteSheetKeys.apple),
		frameRate: 20,
		repeat: -1,
	});
	bananaIdle = scene.anims.create(
		{
		key: fruitAnimKeys.apple,
		frames: scene.anims.generateFrameNumbers(fruitSpriteSheetKeys.apple),
		frameRate: 20,
		repeat: -1,
	});
	cherryIdle = scene.anims.create(
		{
		key: fruitAnimKeys.apple,
		frames: scene.anims.generateFrameNumbers(fruitSpriteSheetKeys.apple),
		frameRate: 20,
		repeat: -1,
	});
	kiwiIdle = scene.anims.create(
		{
		key: fruitAnimKeys.apple,
		frames: scene.anims.generateFrameNumbers(fruitSpriteSheetKeys.apple),
		frameRate: 20,
		repeat: -1,
	});
	melonIdle = scene.anims.create(
		{
		key: fruitAnimKeys.apple,
		frames: scene.anims.generateFrameNumbers(fruitSpriteSheetKeys.apple),
		frameRate: 20,
		repeat: -1,
	});
	orangeIdle = scene.anims.create(
		{
		key: fruitAnimKeys.apple,
		frames: scene.anims.generateFrameNumbers(fruitSpriteSheetKeys.apple),
		frameRate: 20,
		repeat: -1,
	});
	pineappleIdle = scene.anims.create(
		{
		key: fruitAnimKeys.apple,
		frames: scene.anims.generateFrameNumbers(fruitSpriteSheetKeys.apple),
		frameRate: 20,
		repeat: -1,
	});
	strawberryIdle = scene.anims.create(
		{
		key: fruitAnimKeys.apple,
		frames: scene.anims.generateFrameNumbers(fruitSpriteSheetKeys.apple),
		frameRate: 20,
		repeat: -1,
	});
}

export function collectFruit(fruit)
{
	// destroy the fruit somehow
	gameData.score += gameData.fruitScoreValue;
}