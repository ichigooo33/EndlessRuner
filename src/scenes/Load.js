class Load extends Phaser.Scene
{
    constructor()
    {
        super("loadScene");
    }

    preload()
    {
        //set load path
        this.load.path = "assets/";

        //load environment assets
        this.load.image("titleScreen_bg", "titleScreen_bg.png");
        
        this.load.image("scene1_bg_basecolor", "scene1_bg_basecolor.png");
        this.load.image("scene1_bg_background", "scene1_bg_background.png");
        this.load.image("scene1_bg_midground", "scene1_bg_midground.png");
        this.load.image("scene1_bg_foreground", "scene1_bg_foreground.png");
        this.load.image("scene1_bg_starmoon", "scene1_bg_starmoon.png");

        //load player assets
        this.load.atlas("player_atlas", "playerAtlas.png", "sprites.json");
    }

    create()
    {
        console.log("----- Enter Load Scene -----");
        this.scene.start("menuScene");
    }
}