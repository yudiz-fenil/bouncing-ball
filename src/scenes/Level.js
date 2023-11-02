
// You can write more code here
var gameOptions = {
	bounceHeight: 500,
	ballGravity: 1200,
	ballPower: 1800,
	ballPosition: 0.25,
	platformSpeed: 600,
	platformDistanceRange: [700, 900],
	platformHeightRange: [-100, 100],
	platformLengthRange: [300, 396],
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

		// container_particles
		const container_particles = this.add.container(0, 0);

		// container_blocks
		const container_blocks = this.add.container(0, 0);

		// container_header
		const container_header = this.add.container(0, 0);

		// score_box
		const score_box = this.add.image(201, 108, "score_box");
		container_header.add(score_box);

		// btn_pause
		const btn_pause = this.add.image(1846, 66, "btn_base");
		container_header.add(btn_pause);

		// txt_message
		const txt_message = this.add.text(960, 123, "", {});
		txt_message.scaleX = 0;
		txt_message.scaleY = 0;
		txt_message.setOrigin(0.5, 0.5);
		txt_message.alpha = 0.7;
		txt_message.alphaTopLeft = 0.7;
		txt_message.alphaTopRight = 0.7;
		txt_message.alphaBottomLeft = 0.7;
		txt_message.alphaBottomRight = 0.7;
		txt_message.text = "Tap to Play!";
		txt_message.setStyle({ "fontSize": "150px", "stroke": "#2f233A", "strokeThickness": 5, "shadow.offsetX": 2, "shadow.offsetY": 2, "shadow.blur": 5, "shadow.stroke": true });
		container_header.add(txt_message);

		// btn_icon
		const btn_icon = this.add.image(1846, 66, "pause_icon");
		container_header.add(btn_icon);

		// container_character
		const container_character = this.add.container(0, 0);

		this.container_particles = container_particles;
		this.container_blocks = container_blocks;
		this.container_header = container_header;
		this.score_box = score_box;
		this.btn_pause = btn_pause;
		this.txt_message = txt_message;
		this.btn_icon = btn_icon;
		this.container_character = container_character;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Container} */
	container_particles;
	/** @type {Phaser.GameObjects.Container} */
	container_blocks;
	/** @type {Phaser.GameObjects.Container} */
	container_header;
	/** @type {Phaser.GameObjects.Image} */
	score_box;
	/** @type {Phaser.GameObjects.Image} */
	btn_pause;
	/** @type {Phaser.GameObjects.Text} */
	txt_message;
	/** @type {Phaser.GameObjects.Image} */
	btn_icon;
	/** @type {Phaser.GameObjects.Container} */
	container_character;

	/* START-USER-CODE */

	// Write more your code here
	pointerOver = (scale) => {
		this.input.setDefaultCursor('pointer');
		this.tweens.add({
			targets: [this.btn_pause, this.btn_icon],
			scaleX: scale + 0.05,
			scaleY: scale + 0.05,
			duration: 50
		})
	}
	pointerOut = (scale) => {
		this.input.setDefaultCursor('default');
		this.tweens.add({
			targets: [this.btn_pause, this.btn_icon],
			scaleX: scale,
			scaleY: scale,
			duration: 50,
			onComplete: () => {
				this.btn_pause.setScale(scale);
				this.btn_icon.setScale(scale);
			}
		})
	}
	btnAnimation = (texture, callback) => {
		const scale = texture.scale;
		this.tweens.add({
			targets: texture,
			scaleX: scale - 0.2,
			scaleY: scale - 0.2,
			duration: 50,
			yoyo: true,
			onComplete: () => {
				texture.setScale(scale);
				if (callback) callback();
			}
		});
	}
	addBlocks = () => {
		let platformX = this.game.config.width * gameOptions.ballPosition;
		for (let i = 0; i < 5; i++) {
			let platform = this.platformGroup.create(platformX, this.game.config.height / 4 * 3.2 + Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]), "block");
			platform.setSize(platform.width, 90);
			platform.name = "platform";
			this.platformGroup.add(platform);
			this.container_blocks.add(platform);
			platform.displayWidth = Phaser.Math.Between(gameOptions.platformLengthRange[0], gameOptions.platformLengthRange[1]);
			platformX += Phaser.Math.Between(gameOptions.platformDistanceRange[0], gameOptions.platformDistanceRange[1]);
		}
	}
	fallSnowParticles = () => {
		const particles1 = this.add.particles('snow1');
		const particles2 = this.add.particles('snow2');
		const particles3 = this.add.particles('snow3');
		const deathZone = new Phaser.Geom.Rectangle(0, this.cameras.main.height, this.cameras.main.width, 10);
		const emitter1 = particles1.createEmitter({
			x: { min: 0, max: this.cameras.main.width * 2 },
			y: { min: 0, max: this.cameras.main.height / 2 },
			lifespan: 20000,
			speedX: { min: -300, max: -200 },
			speedY: { min: 80, max: 160 },
			scale: { start: 0.5, end: 0.2 },
			quantity: 0.05,
			blendMode: 'NORMAL',
			frequency: 50,
			deathZone: { type: 'onEnter', source: deathZone },
		});
		const emitter2 = particles2.createEmitter({
			x: { min: 0, max: this.cameras.main.width * 2 },
			y: { min: 0, max: this.cameras.main.height / 2 },
			lifespan: 20000,
			speedX: { min: -300, max: -200 },
			speedY: { min: 50, max: 100 },
			scale: { start: 0.5, end: 0.1 },
			quantity: 0.05,
			frequency: 200,
			blendMode: 'NORMAL',
			deathZone: { type: 'onEnter', source: deathZone }
		});
		const emitter3 = particles3.createEmitter({
			x: { min: 0, max: this.cameras.main.width * 2 },
			y: { min: 0, max: this.cameras.main.height / 2 },
			lifespan: 20000,
			speedX: { min: -300, max: -200 },
			speedY: { min: 40, max: 80 },
			scale: { start: 0.5, end: 0.15 },
			quantity: 0.05,
			frequency: 500,
			blendMode: 'NORMAL',
			deathZone: { type: 'onEnter', source: deathZone }
		});
	}
	fallBlockParticles = (xPos, yPos) => {
		this.aPlatformParticles.forEach((particle, i) => {
			const emitter = particle.createEmitter({
				x: xPos + 80 + (-50 * i),
				y: yPos + 80 + (-(Math.random() * 25) * i),
				speedX: this.isGameStart ? this.nCurrentSpeed : 0,
				gravityY: 2000,
				lifespan: 2000,
				quantity: 1,
				frequency: 500,
			})
			setTimeout(() => {
				emitter.remove();
			}, 400);
		})
	}
	showMessage = (msg) => {
		this.txt_message.setText(msg);
		this.txt_message.setScale(0, 0);
		this.txt_message.setVisible(true);
		this.tweens.add({
			targets: this.txt_message,
			scaleX: 1,
			scaleY: 1,
			duration: 900,
			ease: 'Power3',
			onComplete: () => {
				this.txt_message.setScale(0, 0);
				this.txt_message.setVisible(false);
			}
		})
	}
	iconAnimation = (key, callback) => {
		this.tweens.add({
			targets: this.btn_icon,
			scaleY: -1,
			duration: 200,
			yoyo: true,
			ease: 'Power2',
			onYoyo: () => {
				this.btn_icon.setTexture(key);
			},
			onComplete: () => {
				if (callback) callback();
			}
		})
	}
	gamePlayPause = () => {
		if (this.isGamePause) {
			// To Play Again
			let second = 3;
			this.showMessage(second);
			const timer = setInterval(() => {
				second--;
				if (second < 0) {
					clearInterval(timer);
					this.physics.resume();
					this.isGamePause = false;
					this.btn_pause.setInteractive();
					if (this.isGameStart) this.platformGroup.setVelocityX(this.nCurrentSpeed);
					return;
				}
				this.showMessage(second == 0 ? "JUMP!" : second);
			}, 1000);
			this.iconAnimation("pause_icon", null);
		} else {
			// To Pause
			this.isGamePause = true;
			const callback = () => this.btn_pause.setInteractive();
			this.iconAnimation("play_icon", callback);
			this.physics.pause();
		}
	}
	mobileResponsive = () => {
		this.btn_icon.setPosition(this.cameras.main.width - 103, 103);
		this.btn_pause.setPosition(this.cameras.main.width - 103, 103);
		this.btn_pause.setScale(1.5);
		this.btn_icon.setScale(1.5);
		this.txt_message.setPosition(this.cameras.main.centerX, 300);
	}
	create() {
		this.oSoundManager = new SoundManager(this);
		if (window.innerWidth < 1050) {
			this.background = this.add.tileSprite(0, 0, 1080, 1920, "bg-mobile");
			this.background.setOrigin(0, 0);
		} else {
			this.background = this.add.tileSprite(0, 0, 1920, 1080, "background");
			this.background.setOrigin(0, 0);

		}
		this.editorCreate();
		if (window.innerWidth < 1050) {
			this.mobileResponsive();
		}
		this.input.setDefaultCursor('default');
		this.aPlatformParticles = [
			this.add.particles("particle1"),
			this.add.particles("particle4"),
			this.add.particles("particle3"),
			this.add.particles("particle2"),
			this.add.particles("particle5"),
		];
		this.aPlatformParticles.forEach((particle) => {
			this.container_particles.add(particle);
		})
		this.fallSnowParticles();
		this.isGameStart = false;
		this.score = 0;
		this.nCurrentSpeed = -600;
		this.firstBounce = 0;
		this.platformGroup = this.physics.add.group();
		this.isGamePause = false;
		this.isDown = false;

		this.btn_pause.setInteractive();
		if (window.innerWidth >= 1050) {
			this.btn_pause.on('pointerover', () => this.pointerOver(1));
			this.btn_pause.on('pointerout', () => this.pointerOut(1));
		}
		this.tweens.add({
			targets: this.txt_message,
			scaleX: 1,
			scaleY: 1,
			duration: 900,
			ease: 'Power3',
		});
		this.btn_pause.on("pointerdown", () => {
			this.input.setDefaultCursor('pointer');
			this.btn_pause.disableInteractive();
			this.oSoundManager.playSound(this.oSoundManager.btnTap, false);
			this.btnAnimation(this.btn_pause, this.gamePlayPause);
		});

		this.addBlocks();

		this.ball = this.physics.add.sprite(this.game.config.width * gameOptions.ballPosition, this.game.config.height / 4 * 3 - gameOptions.bounceHeight, "ball");
		this.ball.name = "ball";
		this.ball.body.checkCollision.down = true;
		this.ball.body.checkCollision.up = false;
		this.ball.body.checkCollision.left = false;
		this.ball.body.checkCollision.right = false;
		this.ball.setGravityY(gameOptions.ballGravity);
		this.ball.body.setBounce(0.9);
		this.ball.setSize(150, 160)
		this.ball.setOffset(60, 45)
		this.ball.setOrigin(0.5, 1)
		this.container_character.add(this.ball);
		this.input.on("pointerdown", (p, g) => {
			// if (!g.length && this.ball.y <= 700) {
			if (!g.length) {
				if (!this.isGameStart) {
					this.boost();
				} else {
					if (window.innerWidth < 1050) {
						if (this.ball.y <= 1300) {
							this.boost();
						}
					} else {
						if (this.ball.y <= 700) {
							this.boost();
						}
					}
				}
			}
			if (this.isGameStart) {
				this.txt_message.setScale(0)
			}
		}, this);

		this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
		this.scoreText = this.add.text(this.score_box.x, this.score_box.y, "", {
			color: "#2f233A",
			fontSize: 60,
			align: "center",
			fontFamily: "Courier",
		});
		this.scoreText.setOrigin(0.5, 0.5)
		this.container_header.add(this.scoreText);
		this.updateScore(this.score);
	}
	boost = () => {
		if (this.firstBounce != 0) {
			this.isGameStart = true;
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
	updateScore = (n) => {
		this.score += n;
		this.scoreText.text = "SCORE: " + this.score + "\nBEST: " + this.topScore;
	}
	playAnimation = () => {
		if (this.isDown) {
			this.isDown = false;
			this.ball.anims.play("down");
		}
	}
	update() {
		if (!this.isGamePause) {
			if (this.ball.body.velocity.y < 0) {
				this.isDown = true;
				this.ball.setTexture("ball-up");
			} else {
				this.playAnimation();
			}
		}
		this.physics.world.collide(this.platformGroup, this.ball, (ball, platform) => {
			ball.setScale(1.2, 0.8);
			this.tweens.add({
				targets: ball,
				scaleX: 1,
				scaleY: 1,
				duration: 200,
			})
			this.fallBlockParticles(platform.x, platform.y);
			this.oSoundManager.playSound(this.oSoundManager.jump, false);
			this.tweens.add({
				targets: platform,
				y: platform.y + 10,
				duration: 200,
				yoyo: true,
			});
			if (this.firstBounce == 0) {
				this.firstBounce = this.ball.body.velocity.y;
			}
			else {
				this.ball.body.velocity.y = this.firstBounce;
				if (this.isGameStart) {
					this.nCurrentSpeed -= 2;
				}
			}
		}, null, this);
		if (this.isGameStart && !this.isGamePause) {
			this.platformGroup.setVelocityX(this.nCurrentSpeed);
			this.background.tilePositionX += 3;
		}
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
