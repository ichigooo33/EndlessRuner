//SpikeBall prefab
class SpikeBall extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture);
        scene.add.existing(this);           //add to existing scene
        scene.physics.add.existing(this);   //add to physics system
        this.setVelocityX(-scene.sceneVelocity);
    }
}