class SoundManager {
	constructor(oScene) {
		this.btnTap = oScene.sound.add("click");
		this.jump = oScene.sound.add("jump");
	}
	playSound = (key, loop = false) => {
		key.play();
		key.loop = loop
	}
	stopSound = (key, loop = false) => {
		key.stop();
		key.loop = loop;
	}
}