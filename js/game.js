function Game(canvasId) {
	this.canvas = document.getElementById(canvasId);
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
	this.ctx = this.canvas.getContext('2d');
	this.fps = 60;
}

Game.prototype.reset = function(){

}

Game.prototype.start = function(){

}