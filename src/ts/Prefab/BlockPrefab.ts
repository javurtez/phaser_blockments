import { Colors } from "../Config/Colors";
import { Texture } from "../Managers/AssetManager";

export default class BlockPrefab extends Phaser.GameObjects.Sprite {

    private nextBlock: BlockPrefab;
    currentColor: Colors = Colors.Red;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, Texture.Block.path);

        this.setOrigin(.5).setScale(28, 7);

        scene.physics.add.existing(this);

        this.GetColor();
    }

    public SetNextBlock(block: BlockPrefab): void {
        this.nextBlock = block;
    }

    public UpdatePosition(): void {
        this.y = this.nextBlock.y - 45;
    }

    private GetColor(): void {
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
