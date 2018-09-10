function Humorist(game) {
	this.game = game;

	this.img = new Image();
	this.img.src = 'images/humorists.png';

	this.w = 288; //width of each frame
	this.h = 300; //height of each frame
	//this.x = 5500;
	this.x = 500;
	this.y = this.game.canvas.height - this.h ;

	this.dX = 3;

	this.img.framesW = 2;
	this.img.frameIndex = 0;
	this.img.frameIndexW = 0;
}

Humorist.prototype.draw = function () {
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

Humorist.prototype.animateImg = function(){
	this.img.frameIndexW = 1;
}

Humorist.prototype.move = function () {
	//this.x -= this.dx;
};