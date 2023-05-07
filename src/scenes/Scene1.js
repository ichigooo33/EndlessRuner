class Scene1 extends Phaser.Scene
{
    constructor()
    {
        super("scene1");
    }

    create()
    {
        console.log("----- Enter Scene 1 -----");

        //change sceneIndex
        sceneIndex = 1;

        //backgroundSpeed settings
        this.backgroundSpeed = [1, 3, 5];

        //create backgroundGroup & tile sprite
        this.add.image(0, 0, "scene1_bg_basecolor").setOrigin(0, 0);
        this.add.image(0, 0, "scene1_bg_starmoon").setOrigin(0, 0);

        this.backgroundGroup = this.add.group();
        this.bg_background = this.add.tileSprite(0, 0, 960, 540, "scene1_bg_background").setOrigin(0, 0);
        this.bg_midground = this.add.tileSprite(0, 0, 960, 540, "scene1_bg_midground").setOrigin(0, 0);
        this.bg_foreground = this.add.tileSprite(0, 0, 960, 540, "scene1_bg_foreground").setOrigin(0, 0);
        
        //add tile sprites into backgroundGroup
        this.backgroundGroup.add(this.bg_background);
        this.backgroundGroup.add(this.bg_midground);
        this.backgroundGroup.add(this.bg_foreground);

        //make ground tiles group
        this.ground = this.add.group();
    }

    update()
    {
        //update tile sprite with parallax scrolling
        for(let i = 0; i < this.backgroundGroup.getChildren().length; i++)
        {
            this.backgroundGroup.getChildren()[i].tilePositionX += this.backgroundSpeed[i];
        }
    }
}