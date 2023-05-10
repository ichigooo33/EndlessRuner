/*
    Reference: 
        https://www.youtube.com/watch?v=7UlNsN0RyEE by "ourcade"
        https://labs.phaser.io/edit.html?src=src/display/blend%20modes/graphics%20blend%20mode.js
*/

'use strict';

//reserve keyboard vars
let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyR, keyG;

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
                y: 0
            }
        }
    },
    scene: [Load, Menu, Scene1]
};

let game = new Phaser.Game(config);

//global variables
let tileSize = 64;

let gravityForce = 1500;

let highScore = 0;
let currentScroe = 0;

let sceneIndex = 0;

let sceneVelocity = 300;