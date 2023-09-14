
// You can write more code here

/* START OF COMPILED CODE */

class BlockPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// block
		const block = scene.add.image(0, 0, "block");
		this.add(block);

		// particle1
		const particle1 = scene.add.image(89, 98, "particle1");
		this.add(particle1);

		// particle2
		const particle2 = scene.add.image(-78, 125, "particle2");
		this.add(particle2);

		// particle3
		const particle3 = scene.add.image(-27, 136, "particle3");
		this.add(particle3);

		// particle4
		const particle4 = scene.add.image(25, 125, "particle4");
		this.add(particle4);

		// particle5
		const particle5 = scene.add.image(52, 87, "particle5");
		this.add(particle5);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
