class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    create()
    {
        console.log("----- Enter Menu Scene -----");

        //create title screen image
        this.add.sprite(game.config.width / 2, game.config.height / 2, "titleScreen_bg");

        //define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT))
        {
            //initialize game settings
            game.settings = {
                playerSpeed: 5
            };
            this.scene.start("scene1");
        }
    }
}