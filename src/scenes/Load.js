class Load extends Phaser.Scene
{
    constructor()
    {
        super("loadScene");
    }

    preload()
    {
        //loading bar
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, game.config.height - 20, game.config.width * value, 10);      // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        //set load path
        this.load.path = "assets/";

        //load environment assets
        this.load.image("titleScreen_bg", "titleScreen_bg.png");
        this.load.image("titleScreen_credit", "titleScreen_credit.png");
        
        this.load.image("scene1_groundTile", "groundTile.png");
        
        this.load.image("scene1_bg_basecolor", "scene1_bg_basecolor.png");
        this.load.image("scene1_bg_background", "scene1_bg_background.png");
        this.load.image("scene1_bg_midground", "scene1_bg_midground.png");
        this.load.image("scene1_bg_foreground", "scene1_bg_foreground.png");
        this.load.image("scene1_bg_starmoon", "scene1_bg_starmoon.png");
        this.load.image("scene1_bg_tutorial", "scene1_bg_tutorial.png");
        this.load.image("scene1_pipe_base", "scene1_pipe_base.png");
        this.load.image("scene1_result", "scene1_result.png");

        this.load.audio("bgm", "bgm.mp3");
        this.load.audio("sfx_up", "sfx_up.wav");
        this.load.audio("sfx_down", "sfx_down.wav");
        this.load.audio("sfx_hurt", "sfx_hurt.wav");

        //load player assets
        this.load.atlas("player_atlas", "player_atlas.png", "sprites.json");

        //load player vfx assets
        this.load.atlas("vfx_atlas", "vfx_atlas.png", "vfx_sprites.json");

        //load enemies
        this.load.image("spikeBall", "spikeball.png");
    }

    create()
    {
        console.log("----- Enter Load Scene -----");
        this.scene.start("menuScene");
    }
}