class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    create()
    {
        console.log("----- Enter Play Scene -----");

        //add tile sprite
        this.scene1_bg = this.add.tileSprite(0, 0, 960, 540, "scene1_bg").setOrigin(0, 0);

        //make ground tiles group
        this.ground = this.add.group();
        
    }

    update()
    {
        //update tile sprite
        this.scene1_bg.tilePositionX += game.settings.playerSpeed;
    }
}