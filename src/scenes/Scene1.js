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

        //variables & settings
        this.backgroundSpeed = [1, 3, 5];

        this.player_acceleration = 1500;
        this.player_maxSpeedX = 500;
        this.player_maxSpeedY = 2000;
        this.player_drag = 800;

        this.physics.world.gravity.y = gravityForce;

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

        //create fish animation
        this.anims.create({
            key: "swim",
            frames: this.anims.generateFrameNames("player_atlas", {
                prefix: 'player',
                start: 1,
                end: 13,
                suffix: ''
            }),
            frameRate: 8,
            repeat: -1
        });

        //set up player fish
        this.fish = this.physics.add.sprite(game.config.width / 5, game.config.height / 2, "player_atlas", "player1");
        this.fish.body.setSize(80, 45);
        this.fish.setCollideWorldBounds(true);
        this.fish.setMaxVelocity(this.player_maxSpeedX, this.player_maxSpeedY);

        //make ground tiles group
        this.ground = this.add.group();

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);

        // set up Phaser-provided cursor key input
        // this.cursors = this.input.keyboard.createCursorKeys();

        //store gameOVer status
        this.gameOver = false;
    }

    update()
    {
        //update tile sprite with parallax scrolling
        for(let i = 0; i < this.backgroundGroup.getChildren().length; i++)
        {
            this.backgroundGroup.getChildren()[i].tilePositionX += this.backgroundSpeed[i];
        }

        //update if not gameOver
        if(!this.gameOver)
        {
            this.playerMove();
            this.playerSwim();
        }
    }

    playerMove()
    {
        if(Phaser.Input.Keyboard.JustDown(keyUP) && this.physics.world.gravity.y > 0)
        {
            this.physics.world.gravity.y = -gravityForce;
        }
        
        if(Phaser.Input.Keyboard.JustDown(keyDOWN) && this.physics.world.gravity.y < 0)
        {
            this.physics.world.gravity.y = gravityForce;
        }

        // if(this.cursors.left.isDown)
        // {
        //     this.fish.body.setAccelerationX(-this.player_acceleration);
        // }
        // else if(this.cursors.right.isDown)
        // {
        //     this.fish.body.setAccelerationX(this.player_acceleration);
        // }
        // else
        // {
        //     this.fish.body.setAccelerationX(0);
        //     this.fish.body.setDragX(this.player_drag);
        // }
    }

    playerSwim()
    {
        this.fish.play("swim", true);
    }
}