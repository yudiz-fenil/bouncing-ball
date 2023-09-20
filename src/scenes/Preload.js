
// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// bg
		this.add.image(960, 540, "bg");

		// progress
		const progress = this.add.text(960, 540, "", {});
		progress.setOrigin(0.5, 0.5);
		progress.visible = false;
		progress.text = "0%";
		progress.setStyle({ "align": "center", "fontSize": "100px", "fontStyle": "bold" });

		// outerBar
		const outerBar = this.add.image(960, 961, "outerBar");

		// innerBar
		const innerBar = this.add.image(741, 951, "innerBar");
		innerBar.setOrigin(0, 0.5);
		innerBar.visible = false;

		// character
		this.add.image(1032, 551, "character");

		// logoPrefab
		const logoPrefab = new LogoPrefab(this, 960, 447);
		this.add.existing(logoPrefab);

		// txt_progress
		const txt_progress = this.add.text(960, 950, "", {});
		txt_progress.setOrigin(0.5, 0.5);
		txt_progress.text = "0%";
		txt_progress.setStyle({ "align": "center", "color": "#000", "fontSize": "40px", "fontStyle": "bold" });

		// btn_play
		const btn_play = this.add.image(960, 950, "play-btn");
		btn_play.visible = false;

		// btn_text
		const btn_text = this.add.text(985, 947, "", {});
		btn_text.setOrigin(0.5, 0.5);
		btn_text.visible = false;
		btn_text.text = "PLAY";
		btn_text.setStyle({ "align": "center", "color": "#2f233A", "fontSize": "45px", "fontStyle": "bold" });

		// progress (components)
		new PreloadText(progress);

		this.outerBar = outerBar;
		this.innerBar = innerBar;
		this.txt_progress = txt_progress;
		this.btn_play = btn_play;
		this.btn_text = btn_text;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	outerBar;
	/** @type {Phaser.GameObjects.Image} */
	innerBar;
	/** @type {Phaser.GameObjects.Text} */
	txt_progress;
	/** @type {Phaser.GameObjects.Image} */
	btn_play;
	/** @type {Phaser.GameObjects.Text} */
	btn_text;

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();

		this.btn_play.setInteractive().on('pointerdown', () => {
			this.tweens.add({
				targets: [this.btn_play, this.btn_text],
				scaleX: 0.8,
				scaleY: 0.8,
				duration: 50,
				yoyo: true,
				onComplete: () => {
					this.btn_play.setScale(1);
					this.btn_text.setScale(1);
					this.scene.stop("Preload");
					this.scene.start("Level");
				}
			});
		})

		this.isGameLoaded1 = false;
		this.isGameLoaded2 = false;

		this.load.on(Phaser.Loader.Events.COMPLETE, (p) => {
			this.isGameLoaded1 = true;
		});

		this.innerBarWidth = this.innerBar.displayWidth;

		this.maskGraphics = this.make.graphics();
		this.maskGraphics.fillStyle(0xffffff);
		this.maskGraphics.fillRect(
			this.innerBar.x,
			this.innerBar.y - this.innerBar.displayHeight / 2,
			this.innerBar.displayWidth,
			this.innerBar.displayHeight
		);

		this.innerBar.setMask(this.maskGraphics.createGeometryMask());

		const loadingDuration = 3000;
		const intervalDuration = 30;
		const numIntervals = loadingDuration / intervalDuration;
		let currentInterval = 0;
		const progressIncrement = 1 / numIntervals;

		const updateProgressBar = () => {
			this.innerBar.setVisible(true);
			const currentProgress = currentInterval * progressIncrement;
			this.maskGraphics.clear();
			this.maskGraphics.fillStyle(0xffffff);
			this.maskGraphics.fillRect(
				this.innerBar.x,
				this.innerBar.y - this.innerBar.displayHeight / 2,
				this.innerBarWidth * currentProgress,
				this.innerBar.displayHeight
			);
			this.txt_progress.setText((currentProgress * 100).toFixed(0) + '%');
			currentInterval++;
			if (currentProgress >= 1) {
				clearInterval(progressInterval);
				this.isGameLoaded2 = true;
			}
		};

		const progressInterval = setInterval(updateProgressBar, intervalDuration);
	}

	update() {
		if (this.isGameLoaded1 && this.isGameLoaded2) {
			this.txt_progress.setVisible(false);
			this.innerBar.setVisible(false);
			this.outerBar.setVisible(false);
			this.btn_play.setVisible(true);
			this.btn_text.setVisible(true);
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
