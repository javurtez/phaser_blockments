import SceneManager from "../Managers/SceneManager";
import { TBAsset } from "../Trebert/TBAsset";
import BaseScene from "./BaseScene";
import MenuScene from "./MenuScene";

export default class Preloader extends BaseScene {
    /**
     * Unique name of the scene.
     */
    public static Name = "Preloader";

    public preload(): void {
        TBAsset.loadAssets(this, true, false, this.nextScene);
    }

    private nextScene() {
        SceneManager.Instance.transitionToScene(this, MenuScene.Name);
    }

    protected rescale(): void {
        super.rescale();
    }
    protected destroy(): void {
        super.destroy();
    }
}
