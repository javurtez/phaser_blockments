import { Audio, Font, Texture } from "../Managers/AssetManager";
import AudioManager from "../Managers/AudioManager";
import { SaveManager } from "../Managers/SaveManager";
import { TBUtils } from "../Trebert/TBUtils";
import BaseBitmapText from "../Trebert/Base/BaseBitmapText";
import BaseImage from "../Trebert/Base/BaseImage";
import BaseSlot from "../Trebert/Base/BaseSlot";
import BaseScene from "./BaseScene";
import { EventManager } from "../Managers/EventManager";
import { TBCloud } from "../Trebert/TBCloud";

export default class GameUI extends BaseScene {
    /**
     * Unique name of the scene.
     */
    public static Name = "GameUI";

    scoreText: BaseBitmapText;

    protected initGraphics(): void {
        var centerX = this.cameras.main.centerX;
        var centerY = this.cameras.main.centerY;

        var scoreBg = new BaseImage(this, centerX, 0, Texture.Block)
        scoreBg.setOrigin(.5, 0);
        scoreBg.setScale(120, 15)
        scoreBg.setTint(0x2F2F2F);

        this.scoreText = new BaseBitmapText(this, scoreBg.x, scoreBg.y + 20, { font: Font.kenney_pixel, size: 55, align: 1 });
        this.scoreText.setOrigin(.5);
        this.scoreText.setText("0");
    }
    protected initListeners(): void {
        super.initListeners();

        EventManager.UPDATE_UI.addListener((value) => {
            switch (value) {
                case "SCORE":
                    let score = TBCloud.getValue("SCORE");
                    this.scoreText.setText(score);
                    break;
            }
        }, this)
        EventManager.ON_BLUR.addListener(this.onBlur, this);
        EventManager.ON_FOCUS.addListener(this.onFocus, this);
    }

    onBlur(): void {
        console.log("BLUR");
    }
    onFocus(): void {
        console.log("FOCUS");
    }

    protected rescale(): void {
        super.rescale();
    }
    protected destroy(): void {
        super.destroy();

        EventManager.ON_BLUR.clear(this);
        EventManager.ON_FOCUS.clear(this);
    }
}
