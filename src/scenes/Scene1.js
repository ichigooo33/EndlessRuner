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
        this.backgroundSpeed = [1, 3, 5, 7];

        this.player_acceleration = 1500;
        this.player_maxSpeedX = 500;
        this.player_maxSpeedY = 2000;
        this.player_drag = 800;

        this.physics.world.gravity.y = gravityForce;

        this.updateSpeed = false;

        //create backgroundGroup & tile sprite
        this.add.image(0, 0, "scene1_bg_basecolor").setOrigin(0, 0);
        this.add.image(0, 0, "scene1_bg_starmoon").setOrigin(0, 0);

        this.backgroundGroup = this.add.group();
        this.bg_background = this.add.tileSprite(0, 0, 960, 540, "scene1_bg_background").setOrigin(0, 0);
        this.bg_midground = this.add.tileSprite(0, 0, 960, 540, "scene1_bg_midground").setOrigin(0, 0);
        this.bg_foreground = this.add.tileSprite(0, 0, 960, 540, "scene1_bg_foreground").setOrigin(0, 0);

        this.bg_turotial = this.add.image(0, 0, "scene1_bg_tutorial").setOrigin(0, 0);

        //create pipe & blend color
        this.pipe_base = this.add.tileSprite(0, 0, 960, 540, "scene1_pipe_base").setOrigin(0, 0);
        
        const pipe_colorHex = 0x5E5CB0;
        const pipe_maxAlpha = 0.8;
        const pipe_minAlpha = 0;

        const pipe_blendColor_up = this.add.graphics();
        pipe_blendColor_up.fillGradientStyle(pipe_colorHex, pipe_colorHex, pipe_colorHex, pipe_colorHex, pipe_maxAlpha, pipe_maxAlpha, pipe_minAlpha, pipe_minAlpha); //color & alpha
        pipe_blendColor_up.fillRect(0, 70, 960, 200);
        pipe_blendColor_up.setBlendMode(Phaser.BlendModes.MULTIPLY);

        const pipe_blendColor_down = this.add.graphics();
        pipe_blendColor_down.fillGradientStyle(pipe_colorHex, pipe_colorHex, pipe_colorHex, pipe_colorHex, pipe_minAlpha, pipe_minAlpha, pipe_maxAlpha, pipe_maxAlpha); //color & alpha
        pipe_blendColor_down.fillRect(0, 270, 960, 200);
        pipe_blendColor_down.setBlendMode(Phaser.BlendModes.MULTIPLY);
        
        //add tile sprites into backgroundGroup
        this.backgroundGroup.add(this.bg_background);
        this.backgroundGroup.add(this.bg_midground);
        this.backgroundGroup.add(this.bg_foreground);
        this.backgroundGroup.add(this.pipe_base);

        //add gameOver text
        let gameOverTextConfig = {
            fontFamily: "Monospace",
            fontSize: "24px",
            color: "#ffffff",
            align: "center",
            padding: {
                top: 5,
                bottom: 5,
            }
        }
        this.gameOverText_1 = this.add.text(game.config.width / 2, game.config.height / 3, "GAME OVER", gameOverTextConfig).setOrigin(0.5);
        this.gameOverText_2 = this.add.text(game.config.width / 2, game.config.height / 3 + tileSize, "Press (R) to Restart or ← for Menu", gameOverTextConfig).setOrigin(0.5);
        this.gameOverText_1.alpha = 1;
        this.gameOverText_2.alpha = 1;

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

        //create vfx animation
        this.anims.create({
            key: "vfx_up",
            frames: this.anims.generateFrameNames("vfx_atlas", {
                prefix: 'vfx_up',
                start: 1,
                end: 6,
                suffix: ''
            }),
            frameRate: 12,
            repeat: 0
        });

        this.anims.create({
            key: "vfx_down",
            frames: this.anims.generateFrameNames("vfx_atlas", {
                prefix: 'vfx_down',
                start: 1,
                end: 6,
                suffix: ''
            }),
            frameRate: 12,
            repeat: 0
        });

        //create bgm
        this.bgm = this.sound.add("bgm");
        this.bgm.setLoop(true);
        this.bgm.play();

        //set up player fish
        this.fish = this.physics.add.sprite(game.config.width / 6, game.config.height / 2, "player_atlas", "player1");
        this.fish.body.setSize(80, 40);
        this.fish.setCollideWorldBounds(true);
        this.fish.setMaxVelocity(this.player_maxSpeedX, this.player_maxSpeedY);

        //set up enemies
        this.spikeBallGroup = this.add.group();

        //create groundTile group
        this.groundGroup = this.add.group();
        for(let i = -5 * tileSize; i < game.config.width + 5 * tileSize; i += tileSize)
        {
            let tile = this.physics.add.sprite(i, 20, "scene1_groundTile").setOrigin(0);
            tile.body.setSize(64, 40);
            tile.body.immovable = true;
            tile.body.allowGravity = false;
            this.groundGroup.add(tile);
        }
        for(let i = -5 * tileSize; i < game.config.width + 5 * tileSize; i += tileSize)
        {
            let tile = this.physics.add.sprite(i, 460, "scene1_groundTile").setOrigin(0);
            tile.body.setSize(64, 40);
            tile.body.immovable = true;
            tile.body.allowGravity = false;
            this.groundGroup.add(tile);
        }

        //add physics collider
        this.physics.add.collider(this.fish, this.groundGroup);
        this.physics.add.collider(this.fish, this.spikeBallGroup);
        this.physics.add.collider(this.spikeBallGroup, this.groundGroup);
        this.physics.add.collider(this.spikeBallGroup, this.spikeBallGroup);

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

        //create time events
        this.speedUpEvent = this.time.addEvent({ delay: 2000, callback: this.sceneVelocityUp, callbackScope: this, repeat: 50 });                   //speed up every 2 seconds, 100 seconds to reach maxSpeed
        this.speedChangeEvent = this.time.addEvent({ delay: 2000, callback: this.updateSpeedChangeStatus, callbackScope: this, repeat: -1 });       //set this.speedChange to false, used to update spikeBall speed
        this.spikeBallEventUp = this.time.addEvent({ delay: 5000, callback: this.addSpikeBallUp, callbackScope: this, repeat: -1 });                //generate more spikeBalls on the top half
        this.spikeBallEventDown = this.time.addEvent({ delay: 8000, callback: this.addSpikeBallDown, callbackScope: this, repeat: -1 });            //generate more spikeBalls on the botton half
        this.currentScoreUpdateEvent = this.time.addEvent({ delay: 1000, callback: this.updateCurrentScore, callbackScope: this, repeat: -1 });          //update current score every second
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keyG))
        {
            console.log(`Current Score: ${currentScroe}`);
        }

        //update if not gameOver
        if(!this.gameOver)
        {
            this.backgroundScroll();
            this.tutorialScroll();
            this.playerMove();
            this.playerSwim();
            this.destroyEnemies();
            this.updateSpikeBallSpeed();
        }
        else
        {
            //remove all events
            this.speedUpEvent.remove(false);
            this.speedChangeEvent.remove(false);
            this.spikeBallEventUp.remove(false);
            this.spikeBallEventDown.remove(false);
            this.currentScoreUpdateEvent.remove(false);
        }
    }

    playerMove()
    {
        if(Phaser.Input.Keyboard.JustDown(keyUP) && this.physics.world.gravity.y > 0)
        {
            this.physics.world.gravity.y = -gravityForce;
            this.fish.body.setAccelerationY(-fishAcceleration);

            //play vfx_up animation & sfx_up sound
            let tempVFX = this.add.sprite(this.fish.x, this.fish.y, "vfx_up").setOrigin(0.5, 0.5);
            tempVFX.anims.play("vfx_up");
            this.sound.play("sfx_up");
            tempVFX.on("animationcomplete", () => {tempVFX.destroy();});
        }
        
        if(Phaser.Input.Keyboard.JustDown(keyDOWN) && this.physics.world.gravity.y < 0)
        {
            this.physics.world.gravity.y = gravityForce;
            this.fish.body.setAccelerationY(fishAcceleration);
            
            //play vfx_down animation & sfx_down sound
            let tempVFX = this.add.sprite(this.fish.x, this.fish.y, "vfx_down").setOrigin(0.5, 0.5);
            tempVFX.anims.play("vfx_down");
            this.sound.play("sfx_down");
            tempVFX.on("animationcomplete", () => {tempVFX.destroy();});
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

    backgroundScroll()
    {
        //update tile sprite with parallax scrolling
        for(let i = 0; i < this.backgroundGroup.getLength(); i++)
        {
            this.backgroundGroup.getChildren()[i].tilePositionX += this.backgroundSpeed[i] * sceneVelocity;
        }
    }

    tutorialScroll()
    {
        if(this.bg_turotial.x > -game.config.width)
        {
            this.bg_turotial.x -= 7 * sceneVelocity;
        }
        else
        {
            this.bg_turotial.destroy();
        }
    }

    addSpikeBallUp()
    {
        let tempSpikeBall = new SpikeBall(this, game.config.width + tileSize, 90 + Math.random() * 100, "spikeBall").setScale(0.5);
        tempSpikeBall.body.setSize(64, 64);
        tempSpikeBall.body.setDragY(500);
        tempSpikeBall.setVelocityX(-sceneVelocity * 200);
        this.spikeBallGroup.add(tempSpikeBall);
    }

    addSpikeBallDown()
    {
        let tempSpikeBall = new SpikeBall(this, game.config.width + tileSize, 190 + Math.random() * 270, "spikeBall").setScale(0.5);
        tempSpikeBall.body.setSize(64, 64);
        tempSpikeBall.body.setDragY(500);
        tempSpikeBall.setVelocityX(-sceneVelocity * 200);
        this.spikeBallGroup.add(tempSpikeBall);
    }

    updateSpeedChangeStatus()
    {
        this.updateSpeed = true;
    }

    updateSpikeBallSpeed()
    {
        if(this.updateSpeed)
        {
            for(let i = 0; i < this.spikeBallGroup.getLength(); i++)
            {
                this.spikeBallGroup.getChildren()[i].setVelocityX(-sceneVelocity * 200);
            }
            this.updateSpeed = false;
            //console.log(`Spike Speed Updated to: ${-sceneVelocity * 200}`);
        }
    }

    destroyEnemies()
    {
        //check if destory spikeball
        if(this.spikeBallGroup.getLength() > 0)
        {
            for(let i = 0; i < this.spikeBallGroup.getLength(); i++)
            {
                let temp = this.spikeBallGroup.getChildren()[i];
                if(temp.x < 0 - tileSize)
                {
                    this.spikeBallGroup.remove(temp);
                    temp.destroy;                               //why destory rather than destory()?
                }
            }
        }
    }

    sceneVelocityUp()
    {
        sceneVelocity += 0.1;
        //console.log(`sceneVelocity: ${sceneVelocity}`);

        if(sceneVelocity < 4)
        {
            if(sceneVelocity % 1 >= 0.99 || sceneVelocity % 1 <= 0.01)
            {
                this.spikeBallEventDown.remove(false);
                this.spikeBallEventDown = this.time.addEvent({ delay: 8000 / sceneVelocity, callback: this.addSpikeBallDown, callbackScope: this, repeat: -1 });
                //console.log("Down +");

                this.spikeBallEventUp.remove(false);
                this.spikeBallEventUp = this.time.addEvent({ delay: 5000 / sceneVelocity, callback: this.addSpikeBallUp, callbackScope: this, repeat: -1 });
                //console.log("Up +");
            }
        }
    }

    updateCurrentScore()
    {
        currentScroe += sceneVelocity * 10;
    }
}