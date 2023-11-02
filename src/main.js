
window.addEventListener('load', function () {
	if (window.innerWidth < 1050) {
		var game = new Phaser.Game({
			width: 1080,
			height: 1920,
			type: Phaser.AUTO,
			transparent: true,
			scale: {
				mode: Phaser.Scale.FIT,
				autoCenter: Phaser.Scale.CENTER_BOTH,
				orientation: Phaser.Scale.Orientation.PORTRAIT
			},
			audio: {
				disableWebAudio: false
			},
			dom: {
				createContainer: true
			},
			physics: {
				default: 'arcade',
				arcade: {
					gravity: { y: 0 },
					debug: false
				}
			}
		});
	} else {
		var game = new Phaser.Game({
			width: 1920,
			height: 1080,
			type: Phaser.AUTO,
			transparent: true,
			scale: {
				mode: Phaser.Scale.FIT,
				autoCenter: Phaser.Scale.CENTER_BOTH,
			},
			audio: {
				disableWebAudio: false
			},
			dom: {
				createContainer: true
			},
			physics: {
				default: 'arcade',
				arcade: {
					gravity: { y: 0 },
					debug: false
				}
			}
		});
	}

	game.scene.add("Preload", Preload);
	game.scene.add("Level", Level);
	game.scene.add("Boot", Boot, true);
});

class Boot extends Phaser.Scene {

	preload() {

		this.load.pack("pack", "assets/preload-asset-pack.json");

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Preload"));
	}
}