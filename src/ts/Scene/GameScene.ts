import Constants from "../../Constants";
import Utilities from "../../Utilities";
import AudioManager from "../Managers/AudioManager";
import BlockGroupPrefab from "../Prefab/BlockGroupPrefab";
import PlayerPrefab from "../Prefab/PlayerPrefab";
import GameOverPanel from "../UI/GameOverPanel";
import ScorePanel from "../UI/ScorePanel";

export default class GameScene extends Phaser.Scene {
    /**
     * Unique name of the scene.
     */
    public static Name = "MainGame";

    scorePanel: ScorePanel;
    gameOverPanel: GameOverPanel;

    player: PlayerPrefab;
    blockGroup: BlockGroupPrefab;

    score: number = 0;
    blockSpeed: number = 4;

    gameOver: boolean = false;

    public create(): void {
        Utilities.LogSceneMethodEntry("MainGame", "create");

        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor(Constants.BackgroundHex);

        var centerX = this.cameras.main.centerX;
        var centerY = this.cameras.main.centerY;

        this.player = new PlayerPrefab(this, 100, centerY);

        this.blockGroup = new BlockGroupPrefab(this, centerX + 100, centerY, this.player);

        this.scorePanel = new ScorePanel(this, centerX, 20);
        this.gameOverPanel = new GameOverPanel(this, centerX, centerY);

        this.input.on('pointerdown', () => {
            if (this.gameOver) return;
            this.PlayerMove();
        }, this);
        
        AudioManager.Instance.PauseBGM("menuBGM");
        AudioManager.Instance.PlayBGM("gameBGM");
    }

    update(): void {
        this.blockGroup.update(this.blockSpeed);
    }

    private PlayerMove(): void {
        if (this.tweens.isTweening(this.player)) return;
        this.tweens.add({
            targets: this.player,
            duration: 80,
            ease: "Linear",
            x: this.player.x + 120,
            yoyo: true,
            onComplete: () => {
                if (this.score % 10 == 0) {
                    this.player.GetColor();
                }
            }
        });
    }
    public SetScore(): void {
        this.score++;
        this.blockSpeed += .2;
        this.scorePanel.SetScore(this.score);
    }
    public GameOver(): void {
        this.player.setActive(false);
        this.player.setVisible(false);

        this.blockSpeed = 0;
        this.gameOver = true;

        this.gameOverPanel.Open();

        var highScore = parseInt(localStorage.getItem(Constants.ScoreSaveKey)) || 0;
        var isHighScore = false;
        if (highScore < this.score) {
            highScore = this.score;
            localStorage.setItem(Constants.ScoreSaveKey, highScore.toString());
            isHighScore = true;
        }
        this.gameOverPanel.SetScore(this.score, highScore, isHighScore);
    }
    public Retry(): void {
        this.player.setActive(true);
        this.player.setVisible(true);

        this.blockSpeed = 4;
        this.score = 0;
        this.scorePanel.SetScore(this.score);

        this.gameOverPanel.Close();

        this.time.delayedCall(100, () => {
            this.gameOver = false;
        });
    }
}