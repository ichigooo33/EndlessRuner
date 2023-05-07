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

        //load all assets
        this.load.image("titleScreen_bg", "titleScreen_bg.png");
        this.load.image("scene1_bg", "scene1_bg.png");
    }

    create()
    {
        console.log("----- Enter Load Scene -----");
        this.scene.start("menuScene");
    }
}