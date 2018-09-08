function Game (canvasId) {
	this.canvas = document.getElementById(canvasId);
	this.ctx = this.canvas.getContext('2d');
	this.fps = 60;
}

Game.prototype.reset = function() {

}

Game.prototype.start = function() {

}