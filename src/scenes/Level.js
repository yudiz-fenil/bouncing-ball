
// You can write more code here
var gameOptions = {
	bounceHeight: 500,
	ballGravity: 1000,
	ballPower: 1800,
	ballPosition: 0.2,
	platformSpeed: 600,
	platformDistanceRange: [700, 900],
	platformHeightRange: [-100, 100],
	platformLengthRange: [250, 300],
	localStorageName: "bestballscore2"
}

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// container_blocks
		const container_blocks = this.add.container(0, 0);

		// background
		const background = this.add.tileSprite(0, 0, 4854, 1080, "background");
		background.setOrigin(0, 0);

		this.container_blocks = container_blocks;
		this.background = background;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Container} */
	container_blocks;
	/** @type {Phaser.GameObjects.TileSprite} */
	background;

	/* START-USER-CODE */

	// Write more your code here

	addBlocks = () => {
		let platformX = this.ball.x;
		for (let i = 0; i < 5; i++) {
			let platform = this.platformGroup.create(platformX, this.game.config.height / 4 * 3 + Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]), "block");
			platform.setSize(290, 90);
			platform.name = "platform";
			this.platformGroup.add(platform);
			platform.displayWidth = Phaser.Math.Between(gameOptions.platformLengthRange[0], gameOptions.platformLengthRange[1]);
			platformX += Phaser.Math.Between(gameOptions.platformDistanceRange[0], gameOptions.platformDistanceRange[1]);
		}
	}

	create() {

		this.editorCreate();
		this.isGameStart = false;
		this.score = 0;
		this.firstBounce = 0;

		this.platformGroup = this.physics.add.group();


		this.ball = this.physics.add.image(this.game.config.width * gameOptions.ballPosition, this.game.config.height / 4 * 3 - gameOptions.bounceHeight, "ball");
		this.ball.body.checkCollision.down = true;
		this.name = "ball";
		this.ball.body.checkCollision.up = false;
		this.ball.body.checkCollision.left = false;
		this.ball.body.checkCollision.right = false;
		this.ball.setGravityY(gameOptions.ballGravity);
		this.ball.body.setBounce(1);
		this.ball.setSize(80, 160)
		// this.ball.setVisible(false);

		this.addBlocks();
		this.fire = this.add.particles("fire");

		this.input.on("pointerdown", this.boost, this);

		this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
		this.scoreText = this.add.text(10, 10, "", {
			color: "#FFFFFF",
			fontSize: 48
		});
		this.updateScore(this.score);

		this.ballParticleEmitter = this.fire.createEmitter({
			x: this.ball.x,
			y: this.ball.y,
			speed: { min: -1000, max: 1000 },
			angle: { min: 0, max: 360 },
			scale: { start: 1, end: 0 },
			blendMode: "ADD",
			lifespan: 400,
			// tint: 0x55e8ef,
			tint: 0x1514ef,
			gravityY: 800,
			// frequency: 1,
		});
		for (let index = 1; index <= 20; index++) {
			this.ballParticleEmitter1 = this.fire.createEmitter({
				x: 100 * index,
				y: 1080,
				speed: { min: -1000, max: 1000 },
				angle: { min: 0, max: 360 },
				scale: { start: 1, end: 0 },
				blendMode: "MULTIPLY",
				lifespan: 400,
				tint: 0x1514ef,
				gravityY: -800,
				frequency: 70,
			});
		}
	}

	boost = () => {
		if (this.firstBounce != 0) {
			this.gameStart = true;
			this.ball.body.velocity.y = gameOptions.ballPower;
		}
	}

	getRightmostPlatform = (platform) => {
		let rightmostPlatform = 0;
		this.platformGroup.getChildren().forEach((platform) => {
			rightmostPlatform = Math.max(rightmostPlatform, platform.x);
		});
		platform.clearTint();
		return rightmostPlatform;
	}

	updateScore = (inc) => {
		this.score += inc;
		this.scoreText.text = "SCORE: " + this.score + "\nBEST: " + this.topScore;
	}
	showDust = (x, y) => {
		const particleEmitter = this.fire.createEmitter({
			x: x,
			y: y + 50,
			speed: { min: -1000, max: 1000 },
			angle: { min: 0, max: 360 },
			scale: { start: 0.6, end: 0 },
			blendMode: "ADD",
			lifespan: 300,
			// tint: 0x55e8ef,
			tint: 0x1514ef,
			gravityY: 800,
			frequency: 1,
		});

		setTimeout(() => {
			particleEmitter.remove();
		}, 300);
	}

	update() {
		this.ballParticleEmitter.setPosition(this.ball.x, this.ball.y);
		this.physics.world.collide(this.platformGroup, this.ball, (ball, platform) => {
			// this.showDust(ball.x, ball.y);
			platform.setTint(0XFF0000);
			this.tweens.add({
				targets: platform,
				y: platform.y + 10,
				duration: 200,
				ease: 'Bounce',
				yoyo: true,
			});
			if (this.firstBounce == 0) {
				this.firstBounce = this.ball.body.velocity.y;
			}
			else {
				this.ball.body.velocity.y = this.firstBounce;
				if (this.gameStart) {
					this.platformGroup.setVelocityX(-gameOptions.platformSpeed);
					this.ball.setAngularVelocity(360);
				}
			}
		}, null, this);
		if (this.gameStart) this.background.tilePositionX += 3;
		this.platformGroup.getChildren().forEach((platform) => {
			platform.setImmovable(true);
			if (platform.getBounds().right < 0) {
				this.updateScore(1);
				platform.x = this.getRightmostPlatform(platform) + Phaser.Math.Between(gameOptions.platformDistanceRange[0], gameOptions.platformDistanceRange[1]);
				platform.displayWidth = Phaser.Math.Between(gameOptions.platformLengthRange[0], gameOptions.platformLengthRange[1]);
			}
		});
		if (this.ball.y > this.game.config.height) {
			localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
			this.scene.restart("Level");
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
