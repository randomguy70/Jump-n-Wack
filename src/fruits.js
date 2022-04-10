import gameData from '../src/main.js';

const fruitFrameWidth = 32;
const fruitFrameHeight = 32;

const fruitSpriteSheetKeys = 
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

const fruitSpriteSheetPaths = 
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
	strawberry: 'strawberryIdleAnim'
};

var appleIdle = null;
var bananaIdle = null;
var cherryIdle = null;
var kiwiIdle = null;
var melonIdle = null;
var orangeIdle = null;
var pineappleIdle = null;
var strawberryIdle = null;

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
	console.log("apple animation", appleIdle);
	bananaIdle = scene.anims.create(
		{
		key: fruitAnimKeys.apple,
		frames: scene.anims.generateFrameNumbers(fruitSpriteSheetKeys.banana),
		frameRate: 20,
		repeat: -1,
	});
	cherryIdle = scene.anims.create(
		{
		key: fruitAnimKeys.apple,
		frames: scene.anims.generateFrameNumbers(fruitSpriteSheetKeys.cherry),
		frameRate: 20,
		repeat: -1,
	});
	kiwiIdle = scene.anims.create(
		{
		key: fruitAnimKeys.apple,
		frames: scene.anims.generateFrameNumbers(fruitSpriteSheetKeys.kiwi),
		frameRate: 20,
		repeat: -1,
	});
	melonIdle = scene.anims.create(
		{
		key: fruitAnimKeys.melon,
		frames: scene.anims.generateFrameNumbers(fruitSpriteSheetKeys.melon),
		frameRate: 20,
		repeat: -1,
	});
	orangeIdle = scene.anims.create(
		{
		key: fruitAnimKeys.apple,
		frames: scene.anims.generateFrameNumbers(fruitSpriteSheetKeys.orange),
		frameRate: 20,
		repeat: -1,
	});
	pineappleIdle = scene.anims.create(
		{
		key: fruitAnimKeys.apple,
		frames: scene.anims.generateFrameNumbers(fruitSpriteSheetKeys.pineapple),
		frameRate: 20,
		repeat: -1,
	});
	strawberryIdle = scene.anims.create(
		{
		key: fruitAnimKeys.apple,
		frames: scene.anims.generateFrameNumbers(fruitSpriteSheetKeys.strawberry),
		frameRate: 20,
		repeat: -1,
	});
}

function collectFruit(fruit)
{
	// destroy the fruit somehow
	gameData.score += gameData.fruitScoreValue;
}