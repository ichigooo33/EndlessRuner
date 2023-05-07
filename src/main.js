'use strict';

//reserve keyboard vars
let keyUP, keyLEFT, keyRIGHT;

//game config
let config = 
{
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    physics:{
        default: "arcade",
        arcade:{
            debug: true,
            gravity:{
                x: 0,
                y: 2000
            }
        }
    },
    scene: [Load, Menu, Play]
};

let game = new Phaser.Game(config);

//global variables
let tileSize = 64;

let highScore = 0;
let currentScroe = 0;

let currentScene = 0;

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;