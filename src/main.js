/*
    Name: Wang Liao
    Game Title: Gravity Neon
    Approximate Hours: 30 hours

    Creative Tilt Part 1:
        When I started working on this project, I found changing world gravity to control the player can be interesting compared to change player's own gravity or add vertical force.
        Therefore, in my game, player can only control the fish by changing world gravity, which would also influence the spike ball.
        Regarding programming techniques, I spent a lot of time doing experiments with new APIs to achieve the effects I want.
        For example, I used blendModes/parallax scrolling for the background, and different timeEvent to control other gameObjects.
    
    Creative Tilt Part 2:
        The sound effect and background music are all royalty-free. I planed to make my own when I started, but this project took longer than I expected.
        Although I didn't have the chance to make sound assets, I put a lot of effort on art this time. All sprites, animation, background were done by myself.
        I'm not very familiar with pixel art, but I'm pretty pround that fish swimming animation was better than I thought.
        Like I mentioned in the previous part, I thought combining player's action (changing world gravity) with enemy's action (move with the player) was interesting to me.
        It created more interactions between player and enemy, which is often lacked in this genre according to my experience.

    Reference: 
        Parallax Scrolling: https://www.youtube.com/watch?v=7UlNsN0RyEE by "ourcade"
        Blend Modes: https://labs.phaser.io/edit.html?src=src/display/blend%20modes/graphics%20blend%20mode.js
        Music: https://pixabay.com/users/daddy_s_music-22836301/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=10711by by Daddy_s_Music from Pixabay 
*/

'use strict';

//reserve keyboard vars
let keyUP, keyDOWN, keyR, keyG, keyT;

//game config
let config = 
{
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    physics:{
        default: "arcade",
        arcade:{
            debug: false,
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

let gravityForce = 800;
let fishAcceleration = 300;

let highScore = 0;

let sceneIndex = 0;