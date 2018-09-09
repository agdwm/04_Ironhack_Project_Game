function Sound (src){

	this.sound = document.createElement('audio');
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function () {
		this.sound.play();
	}
	this.pause = function () {
		this.sound.pause();
	}
}

var grow = new Sound('./sounds/grow.mp3');
var win = new Sound('./sounds/won.mp3');
var lost = new Sound('./sounds/lost.mp3');
