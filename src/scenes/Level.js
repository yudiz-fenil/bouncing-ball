
// You can write more code here
var gameOptions = {
	bounceHeight: 500,
	ballGravity: 1000,
	ballPower: 1800,
	ballPosition: 0.2,
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

		// background
		const background = this.add.tileSprite(0, 0, 1920, 1080, "background");
		background.setOrigin(0, 0);

		// container_blocks
		const container_blocks = this.add.container(0, 0);

		// container_header
		const container_header = this.add.container(0, 0);

		// score_box
		const score_box = this.add.image(201, 108, "score_box");
		container_header.add(score_box);

		// btn_pause
		const btn_pause = this.add.image(1846, 66, "btn_pause");
		container_header.add(btn_pause);

		// txt_message
		const txt_message = this.add.text(960, 123, "", {});
		txt_message.setOrigin(0.5, 0.5);
		txt_message.alpha = 0.5;
		txt_message.alphaTopLeft = 0.5;
		txt_message.alphaTopRight = 0.5;
		txt_message.alphaBottomLeft = 0.5;
		txt_message.alphaBottomRight = 0.5;
		txt_message.setStyle({ "fontSize": "150px", "stroke": "#2f233A", "strokeThickness": 5, "shadow.offsetX": 2, "shadow.offsetY": 2, "shadow.blur": 5, "shadow.stroke": true });
		container_header.add(txt_message);

		// container_character
		const container_character = this.add.container(0, 0);

		this.background = background;
		this.container_blocks = container_blocks;
		this.container_header = container_header;
		this.score_box = score_box;
		this.btn_pause = btn_pause;
		this.txt_message = txt_message;
		this.container_character = container_character;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	background;
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
	/** @type {Phaser.GameObjects.Container} */
	container_character;

	/* START-USER-CODE */

	// Write more your code here
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
			let platform = this.platformGroup.create(platformX, this.game.config.height / 4 * 3 + Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]), "block");
			platform.setSize(290, 90);
			platform.name = "platform";
			this.platformGroup.add(platform);
			this.container_blocks.add(platform);
			platform.displayWidth = Phaser.Math.Between(gameOptions.platformLengthRange[0], gameOptions.platformLengthRange[1]);
			platformX += Phaser.Math.Between(gameOptions.platformDistanceRange[0], gameOptions.platformDistanceRange[1]);
		}
	}
	fallSnowParticles = () => {
		// const particles1 = this.add.particles('snow1');
		// const particles2 = this.add.particles('snow2');
		// const particles3 = this.add.particles('snow3');

		// const deathZone = new Phaser.Geom.Rectangle(0, 1080, 1920, 10);

		// const emitter1 = particles1.createEmitter({
		// 	x: { min: 0, max: 1920 },
		// 	y: -5,
		// 	lifespan: 2000,  // Adjusted based on new dimensions and speed
		// 	speedY: { min: 80, max: 160 },
		// 	scale: { start: 0.5, end: 0.2 },
		// 	quantity: 0.05,
		// 	blendMode: 'NORMAL',
		// 	deathZone: { type: 'onEnter', source: deathZone }
		// });

		// const emitter2 = particles2.createEmitter({
		// 	x: { min: 0, max: 1920 },
		// 	y: -5,
		// 	lifespan: 2000,  // Adjusted based on new dimensions and speed
		// 	speedY: { min: 50, max: 100 },
		// 	scale: { start: 0.5, end: 0.1 },
		// 	quantity: 0.05,
		// 	blendMode: 'NORMAL',
		// 	deathZone: { type: 'onEnter', source: deathZone }
		// });

		// const emitter3 = particles3.createEmitter({
		// 	x: { min: 0, max: 1920 },
		// 	y: -5,
		// 	lifespan: 2000,  // Adjusted based on new dimensions and speed
		// 	speedY: { min: 40, max: 80 },
		// 	scale: { start: 0.5, end: 0.15 },
		// 	quantity: 0.05,
		// 	blendMode: 'NORMAL',
		// 	deathZone: { type: 'onEnter', source: deathZone }
		// });
		const duration = 15 * 1000,
			animationEnd = Date.now() + duration;
		let skew = 1;
		function randomInRange(min, max) {
			return Math.random() * (max - min) + min;
		}
		(function frame() {
			const timeLeft = animationEnd - Date.now(),
				ticks = Math.max(200, 500 * (timeLeft / duration));
			skew = Math.max(0.8, skew - 0.001);
			confetti({
				particleCount: 3,
				startVelocity: -5,
				ticks: ticks,
				origin: {
					x: Math.random(),
					// since particles fall down, skew start toward the top
					y: Math.random() * skew - 0.2,
				},
				// colors: ["#ffffff"],
				shapes: ["image"],
				shapeOptions: {
					image: [
						{
							src: "assets/images/snow/snow1.png",
						},
						{
							src: "assets/images/snow/snow2.png",
						},
						{
							src: "assets/images/snow/snow3.png",
						},
					],
				},
				gravity: randomInRange(0.4, 0.6),
				scalar: 2,
				// drift: randomInRange(-0.4, 0.4),
			});
			requestAnimationFrame(frame);
			if (timeLeft > 0) {
			}
		})();
	}
	fallBlockParticles = (block) => {
		const pos = [
			{ x: block.x + 89, y: block.y + 98 },
			{ x: block.x - 78, y: block.y + 125 },
			{ x: block.x - 27, y: block.y + 136 },
			{ x: block.x + 25, y: block.y + 125 },
			{ x: block.x + 52, y: block.y + 87 },
		]
		for (let i = 0; i < pos.length; i++) {
			// const particle = this.physics.add.image(pos[i].x, pos[i].y, "particle" + (i + 1));
			// particle.setGravityY(1000);
			// this.container_blocks.add(particle);
			// this.aPlatformParticles.forEach(particle => {
			// 	const emitter = particle.createEmitter({
			// 		x: pos[i].x,
			// 		y: pos[i].y,
			// 		speed: { min: 50, max: 100 },
			// 		rotate: { min: 0, max: 360 },
			// 		gravityY: 1500,
			// 		lifespan: 5000,
			// 		quantity: 1,
			// 	})
			// 	setTimeout(() => {
			// 		emitter.remove();
			// 	}, 500);
			// })
		}
	}
	showMessage = (msg) => {
		this.txt_message.setText(msg);
		this.txt_message.setScale(0, 0);
		this.txt_message.setVisible(true);
		this.tweens.add({
			targets: this.txt_message,
			scaleX: 1,
			scaleY: 1,
			duration: 800,
			ease: 'Power3',
			onComplete: () => {
				this.txt_message.setScale(0, 0);
				this.txt_message.setVisible(false);
			}
		})
	}
	gamePlayPause = () => {
		if (this.isGamePause) {
			// To Play Again
			this.btn_pause.disableInteractive();
			let second = 3;
			this.showMessage(second == 0 ? "GO!" : second);
			const timer = setInterval(() => {
				second--;
				if (second < 0) {
					clearInterval(timer);
					this.physics.resume();
					this.btn_pause.setInteractive();
					this.isGamePause = false;
					this.platformGroup.setVelocityX(-gameOptions.platformSpeed);
					return;
				}
				this.showMessage(second == 0 ? "GO!" : second);
			}, 1000);
			this.btn_pause.setTexture("btn_pause");
		} else {
			// To Pause
			this.isGamePause = true;
			this.btn_pause.setTexture("btn_play");
			this.physics.pause();
		}
	}
	create() {

		this.editorCreate();
		// this.fallSnowParticles();
		this.isGameStart = false;
		this.score = 0;
		this.firstBounce = 0;
		this.aPlatformParticles = [
			this.add.particles("particle1"),
			this.add.particles("particle2"),
			this.add.particles("particle3"),
			this.add.particles("particle4"),
			this.add.particles("particle5"),
		];
		this.platformGroup = this.physics.add.group();
		this.isGamePause = false;
		this.showMessage("Let's GO!");
		this.btn_pause.setInteractive().on("pointerdown", () => {
			this.btnAnimation(this.btn_pause, this.gamePlayPause);
		});

		this.addBlocks();

		this.ball = this.physics.add.image(this.game.config.width * gameOptions.ballPosition, this.game.config.height / 4 * 3 - gameOptions.bounceHeight, "ball");
		this.ball.body.checkCollision.down = true;
		this.name = "ball";
		this.ball.body.checkCollision.up = false;
		this.ball.body.checkCollision.left = false;
		this.ball.body.checkCollision.right = false;
		this.ball.setGravityY(gameOptions.ballGravity);
		this.ball.body.setBounce(1);
		this.ball.setSize(80, 160)
		this.ball.setOrigin(0.5, 1)
		this.container_character.add(this.ball);
		// this.ball.setVisible(false);

		this.fire = this.add.particles("fire");

		this.input.on("pointerdown", (p, g) => {
			if (!g.length) {
				this.boost();
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

		// this.ballParticleEmitter = this.fire.createEmitter({
		// 	x: this.ball.x,
		// 	y: this.ball.y,
		// 	speed: { min: -1000, max: 1000 },
		// 	angle: { min: 0, max: 360 },
		// 	scale: { start: 1, end: 0 },
		// 	blendMode: "ADD",
		// 	lifespan: 400,
		// 	// tint: 0x55e8ef,
		// 	tint: 0x1514ef,
		// 	gravityY: 800,
		// 	// frequency: 1,
		// });
		// for (let index = 1; index <= 20; index++) {
		// 	this.ballParticleEmitter1 = this.fire.createEmitter({
		// 		x: 100 * index,
		// 		y: 1080,
		// 		speed: { min: -1000, max: 1000 },
		// 		angle: { min: 0, max: 360 },
		// 		scale: { start: 1, end: 0 },
		// 		blendMode: "MULTIPLY",
		// 		lifespan: 400,
		// 		tint: 0x1514ef,
		// 		gravityY: -800,
		// 		frequency: 70,
		// 	});
		// }
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
		if (this.ball.body.velocity.y < 0) {
			this.ball.setTexture("ball-up");
		} else {
			this.ball.setTexture("ball");
		}
		this.physics.world.collide(this.platformGroup, this.ball, (ball, platform) => {
			// this.showDust(ball.x, ball.y);
			// platform.setTint(0XFF0000);
			ball.setScale(1.2, 0.8);
			this.tweens.add({
				targets: ball,
				scaleX: 1,
				scaleY: 1,
				duration: 200,
				// repeat: 1,
				// ease: 'Power3',
				// yoyo: true,
			})
			this.fallBlockParticles(platform);
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
				if (this.isGameStart) {
					this.platformGroup.setVelocityX(-gameOptions.platformSpeed);
				}
			}
		}, null, this);
		if (this.isGameStart && !this.isGamePause) {
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
