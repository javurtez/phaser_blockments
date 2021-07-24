import GameScene from "../Scene/GameScene";
import BasePanel from "./BasePanel";

export default class GameOverPanel extends BasePanel {

    scoreTxt: Phaser.GameObjects.Text;
    highScoreTxt: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.highScoreTxt = scene.add.text(-85, -30, "0").setOrigin(0, .5).setFontSize(31).setColor("#000000").setFontFamily("kenney_pixel");
        this.scoreTxt = scene.add.text(-85, -80, "0").setOrigin(0, .5).setFontSize(31).setColor("#000000").setFontFamily("kenney_pixel");
        var scoreBg = scene.add.image(0, 0, "panel").setOrigin(.5).setScale(1.5);

        var retryButton = scene.add.image(0, 100, "button").setOrigin(.5).setScale(1);
        retryButton.setInteractive().on("pointerdown", () => {
            (scene as GameScene).Retry();
        });
        var retryText = scene.add.text(retryButton.x, retryButton.y, "Retry").setFontSize(33).setOrigin(.5).setColor("#000000").setFontFamily("kenney_pixel");

        this.add([scoreBg, retryButton, retryText, this.scoreTxt, this.highScoreTxt]);

        super.Close();

        scene.add.existing(this);
    }

    public SetScore(score: number, highScore: number, isHighScore: boolean): void {
        this.scoreTxt.setText("Score: \t" + score.toString());

        this.highScoreTxt.setText("High Score: \t" + highScore.toString());
        this.highScoreTxt.setColor(isHighScore ? "#D42323" : "#000000")
    }
}