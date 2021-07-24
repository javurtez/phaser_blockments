import Constants from "../../Constants";
import Utilities from "../../Utilities";
import AudioManager from "../Managers/AudioManager";
import GameScene from "./GameScene";

export default class MenuScene extends Phaser.Scene {
    /**
     * Unique name of the scene.
     */
    public static Name = "MainMenu";

    public create(): void {
        Utilities.LogSceneMethodEntry("MainMenu", "create");

        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor(Constants.BackgroundHex);

        var centerX = this.cameras.main.centerX;
        var centerY = this.cameras.main.centerY;

        this.add.image(centerX, centerY, "buttonStart").setInteractive().setOrigin(.5).
            on("pointerdown", this.OnStart, this);

        AudioManager.Instance.PlayBGM("menuBGM");
    }

    private OnStart(): void {
        this.scene.start(GameScene.Name);
    }
}