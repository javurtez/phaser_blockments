import Constants from "../../Constants";
import BasePanel from "./BasePanel";

export default class ScorePanel extends BasePanel {

    scoreTxt: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.scoreTxt = scene.add.text(0, 3, "0").setOrigin(.5).setFontSize(44).setColor(Constants.FontColor).setFontFamily("kenney_pixel");
        var scoreBg = scene.add.image(0, 0, "block").setOrigin(.5).setScale(120, 15).setTint(0x2F2F2F);

        this.add([scoreBg, this.scoreTxt]);

        scene.add.existing(this);
    }

    public SetScore(score: number): void {
        this.scoreTxt.setText(score.toString());
    }
}