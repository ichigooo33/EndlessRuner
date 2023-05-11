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
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //load credit image
        this.credit = this.add.image(0, 0, "titleScreen_credit").setOrigin(0, 0);
        this.credit.alpha = 0;
    }

    update()
    {
        if(this.credit.alpha == 0)
        {
            if(Phaser.Input.Keyboard.JustDown(keyUP))
            {
                //initialize game settings
                game.settings = {
                    playerSpeed: 5
                };
    
                //snapshot from the example
                let textureManager = this.textures;
                // take snapshot of the entire game viewport
                // https://newdocs.phaser.io/docs/3.55.2/Phaser.Renderer.WebGL.WebGLRenderer#snapshot
                // .snapshot(callback, type, encoderOptions)
                // the image is automatically passed to the callback
                this.game.renderer.snapshot((snapshotImage) => {
                    // make sure an existing texture w/ that key doesn't already exist
                    if(textureManager.exists('titlesnapshot')) {
                        textureManager.remove('titlesnapshot');
                    }
                    // take the snapshot img returned from callback and add to texture manager
                    textureManager.addImage('titlesnapshot', snapshotImage);
                });
    
                this.scene.start("scene1");
            }

            if(Phaser.Input.Keyboard.JustDown(keyDOWN))
            {
                this.credit.alpha = 1;
            }
        }
        else
        {
            if(Phaser.Input.Keyboard.JustDown(keyDOWN))
            {
                this.credit.alpha = 0;
            }
        }
    }
}