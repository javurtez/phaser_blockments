import { Colors } from "../Config/Colors";
import { Texture } from "../Managers/AssetManager";

export default class PlayerPrefab extends Phaser.GameObjects.Sprite {

    public currentColor: Colors = Colors.Red;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, Texture.Block.path);

        this.setOrigin(.5)
        this.setScale(25, 5);

        this.getColor();

        scene.physics.add.existing(this);

        scene.add.existing(this);
    }

    public getColor(): void {
        var random = Phaser.Math.Between(0, 100);

        if (random < 30) {
            this.currentColor = Colors.Red;
        }
        else if (random >= 30 && random <= 65) {
            this.currentColor = Colors.Green;
        }
        else {
            this.currentColor = Colors.Blue;
        }
        this.setTint(this.currentColor);
    }
}
