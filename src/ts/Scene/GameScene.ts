import { Audio } from "../Managers/AssetManager";
import AudioManager from "../Managers/AudioManager";
import { EventManager } from "../Managers/EventManager";
import BaseScene from "./BaseScene";
import GameUI from "./GameUI";
import { Constants } from "../Trebert/TBConst";
import BlockGroupPrefab from "../Prefab/BlockGroupPrefab";
import PlayerPrefab from "../Prefab/PlayerPrefab";
import { TBCloud } from "../Trebert/TBCloud";
import GameOverScene from "./GameOverScene";
import { CLOUD, SaveManager } from "../Managers/SaveManager";

export default class GameScene extends BaseScene {
    /**
     * Unique name of the scene.
     */
    public static Name = "MainGame";

    player: PlayerPrefab;
    blockGroup: BlockGroupPrefab;
    blockSpeed: number = 4;
    isGameOver: boolean;

    public init(): void {
        super.init();
    }
    public create(): void {
        super.create();

        AudioManager.Instance.playBGM(Audio.street_chaos);
        this.scene.launch(GameUI.Name);
    }
    update(time: number, delta: number): void {
        this.blockGroup.update(this.blockSpeed * delta);
    }

    protected initProperty(): void {
        this.blockSpeed = Phaser.Math.GetSpeed(600, 3.5);
        this.isGameOver = false;

        TBCloud.setValue("SCORE", 0);
    }
    protected initGraphics(): void {
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor(Constants.BackgroundHex);

        var centerX = this.cameras.main.centerX;
        var centerY = this.cameras.main.centerY;

        this.player = new PlayerPrefab(this, 100, centerY);

        this.blockGroup = new BlockGroupPrefab(this, centerX + 100, centerY, this.player);
    }
    protected initListeners(): void {
        super.initListeners();

        this.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this.isGameOver) return;
            this.playerMove();
        }, this);
    }

    private playerMove(): void {
        if (this.tweens.isTweening(this.player)) return;
        this.tweens.add({
            targets: this.player,
            duration: 80,
            ease: "Linear",
            x: this.player.x + 120,
            yoyo: true,
            onComplete: () => {
                let score = TBCloud.getValue("SCORE");
                if (score % 10 == 0) {
                    this.player.getColor();
                }
            }
        });
    }
    public setScore(): void {
        TBCloud.modifyValue("SCORE", 1);
        let score = TBCloud.getValue("SCORE");
        if (score % 2 == 0 && this.blockSpeed < 0.37) {
            this.blockSpeed += .01;
        }

        EventManager.UPDATE_UI.emit("SCORE");
    }
    public gameOver(): void {
        this.player.setActive(false);
        this.player.setVisible(false);

        this.blockSpeed = 0;
        this.isGameOver = true;

        this.time.delayedCall(100, () => {
            var localHighScore = TBCloud.getValue(CLOUD.HIGHSCORE);
            let currentScore = TBCloud.getValue("SCORE");
            if (localHighScore < currentScore) {
                localHighScore = currentScore;
                TBCloud.setValue(CLOUD.HIGHSCORE, localHighScore);
                SaveManager.Instance.saveData();
            }

            this.scene.stop(GameUI.Name);
            this.scene.launch(GameOverScene.Name);
        });
    }

    protected rescale(): void {
        super.rescale();
    }
    protected destroy(): void {
        this.scene.stop(GameUI.Name);

        super.destroy();

        EventManager.ON_PAUSE.clear();
        EventManager.ON_UNPAUSE.clear();

        EventManager.CHANGE_LANGUAGE.clear();
    }
}
