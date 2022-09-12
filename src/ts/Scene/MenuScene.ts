import AnimationManager from "../Managers/AnimationManager";
import { Audio, Font, Texture } from "../Managers/AssetManager";
import AudioManager from "../Managers/AudioManager";
import { TBAsset } from "../Trebert/TBAsset";
import { TBUtils } from "../Trebert/TBUtils";
import BaseBitmapText from "../Trebert/Base/BaseBitmapText";
import BaseSlot from "../Trebert/Base/BaseSlot";
import BaseScene from "./BaseScene";
import GameScene from "./GameScene";
import SceneManager from "../Managers/SceneManager";
import { Constants } from "../Trebert/TBConst";

export default class MenuScene extends BaseScene {
    /**
     * Unique name of the scene.
     */
    public static Name = "MainMenu";

    menuGroup: Phaser.GameObjects.Group;

    public init(): void {
        super.init();
    }
    public create(): void {
        super.create();

        AudioManager.Instance.playBGM(Audio.farty_mcsty);
    }

    protected initGraphics(): void {
        this.menuGroup = this.add.group();
        
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor(Constants.BackgroundHex);

        var centerX = this.cameras.main.centerX;
        var centerY = this.cameras.main.centerY;

        let playBtn = new BaseSlot(this, centerX, centerY, Texture.buttonStart);
        playBtn.setOrigin(0.5);
        playBtn.pointerUp = this.onPlay.bind(this);
        this.menuGroup.add(playBtn);
    }

    protected onPlay(): void {
        this.menuGroup.setVisible(false);

        let progressText = new BaseBitmapText(this, TBUtils.config.world.centerX, TBUtils.config.world.centerY, { font: Font.kenney_pixel, size: 40, align: 1 });
        progressText.setOrigin(0.5);
        TBAsset.loadAssets(this, false, true,
            () => {
                AnimationManager.init(this);
                SceneManager.Instance.transitionToScene(this, GameScene.Name);
            },
            (value: number) => {
                let percent = Phaser.Math.RoundTo(value * 100, 0).toString();
                progressText.setText(`LOADING...\n${percent}%`);
            });
    }

    protected rescale(): void {
        super.rescale();
    }
    protected destroy(): void {
        super.destroy();
    }
}
