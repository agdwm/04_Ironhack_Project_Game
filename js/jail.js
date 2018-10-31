function Jail(game) {
	this.game = game;

	this.img = new Image();
	this.img.src = 'images/jail.png';

	this.w = 350; //width of each frame
	this.h = 410; //height of each frame
	this.x = this.game.canvas.width;
	this.y = this.game.canvas.height - this.h ;

	this.vx = 4;

 	this.img.framesW = 2; 
 	this.img.frameIndex = 0;
	this.img.frameIndexW = 0;
}

Jail.prototype.draw = function () {
	this.game.ctx.drawImage(
		this.img,
		this.img.frameIndexW * Math.floor(this.img.width / this.img.framesW),
		this.img.frameIndex * Math.floor(this.img.height),
		Math.floor(this.img.width / this.img.framesW),
		this.img.height,
		this.x,
		this.y,
		this.w,
		this.h
	);
}

Jail.prototype.animateImg = function(){
	this.img.frameIndexW = 1;
}

Jail.prototype.move = function () {
	this.x -= this.vx;
};