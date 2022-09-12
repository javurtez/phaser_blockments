import { Colors } from "../Config/Colors";
import { Audio } from "../Managers/AssetManager";
import AudioManager from "../Managers/AudioManager";
import GameScene from "../Scene/GameScene";
import BlockPrefab from "./BlockPrefab";
import PlayerPrefab from "./PlayerPrefab";

export default class BlockGroupPrefab extends Phaser.GameObjects.Container {

    blockArray: BlockPrefab[] = [];

    constructor(scene: GameScene, x: number, y: number, player: any) {
        super(scene, x, y);

        for (var i = 0; i < 16; i++) {
            const block = new BlockPrefab(scene, 0, -300 + (i * 45));

            this.add(block);
            this.blockArray.push(block);
        }
        for (var i = 0; i < this.blockArray.length; i++) {
            if (!this.blockArray[i]) continue;
            if (i + 1 < this.blockArray.length) {
                this.blockArray[i].SetNextBlock(this.blockArray[i + 1]);
            }
            else if (i == this.blockArray.length - 1) {
                this.blockArray[i].SetNextBlock(this.blockArray[0]);
            }
        }

        this.scene.physics.add.overlap(player, this.blockArray, (play, crate) => {
            var playerPrefab = (play as PlayerPrefab);
            var blockPrefab = (crate as BlockPrefab);

            if (!playerPrefab.active) return;

            if (playerPrefab) {
                playerPrefab.active = false;

                AudioManager.Instance.playSFX(Audio.break, .2);
                if (Colors[playerPrefab.currentColor] === Colors[blockPrefab.currentColor]) {
                    scene.setScore();
                    crate.active = false;
                    scene.tweens.add({
                        targets: crate,
                        duration: 200,
                        x: crate.body.x + 200
                    })
                }
                else {
                    scene.gameOver();
                }
                scene.time.delayedCall(200, () => {
                    playerPrefab.active = true;
                });
            }
        });

        scene.add.existing(this);
    }

    public update(speed: number): void {
        this.blockArray.forEach((block) => {
            block.y += speed;

            if (block.y >= 350) {
                block.UpdatePosition();
                block.x = 0;
                block.active = true;
            }
        });
    }
}
