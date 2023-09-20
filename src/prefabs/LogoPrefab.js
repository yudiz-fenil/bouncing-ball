
// You can write more code here

/* START OF COMPILED CODE */

class LogoPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// logo
		const logo = scene.add.image(0, 0, "logo");
		this.add(logo);

		// ball
		const ball = scene.add.image(76, 13, "character");
		this.add(ball);

		this.ball = ball;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.scene = scene;
		this.targetPositionIndex = 0;
		this.isJumping = false;
		this.time = 1000;
		this.positions = [
			{ x: -224, y: -8 },
			{ x: -111, y: -80 },

			{ x: -76, y: 14 },
			{ x: 21, y: -90 },

			{ x: 69, y: 16 },
			{ x: 159, y: -80 },

			{ x: 242, y: 3 },
			{ x: -10, y: -232 },
		];

		// this.scene.time.addEvent({
		// 	delay: this.time,
		// 	callback: this.jumpToNextPosition,
		// 	callbackScope: this,
		// 	loop: true,

		// });

		// const timeline = this.scene.tweens.timeline({
		// 	targets: this.ball,
		// 	tweens: this.positions.map(pos => ({
		// 		x: pos.x,
		// 		y: pos.y,
		// 		duration: 500,
		// 		// ease: 'Power1'
		// 	})),
		// 	repeat: -1,
		// 	yoyo: true
		// });

		// this.scene.tweens.add({
		// 	targets: this.ball,
		// 	y: this.ball.y - 100,
		// 	duration: 1000,
		// 	repeat: -1,
		// 	yoyo: true,
		// })

		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	ball;

	/* START-USER-CODE */

	// Write your code here.
	// jumpToNextPosition() {
	// 	// if (this.isJumping) {
	// 	// 	return;
	// 	// }

	// 	this.isJumping = true;

	// 	let nextPositionIndex = (this.targetPositionIndex + 1) % this.positions.length;
	// 	let target = this.positions[nextPositionIndex];

	// 	this.scene.tweens.add({
	// 		targets: this.ball,
	// 		x: target.x,
	// 		y: target.y,
	// 		duration: this.time,
	// 		ease: 'Circ',
	// 		// yoyo: true,
	// 		onComplete: function () {
	// 			this.isJumping = false;
	// 		}
	// 	});

	// 	this.targetPositionIndex = nextPositionIndex;
	// }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
