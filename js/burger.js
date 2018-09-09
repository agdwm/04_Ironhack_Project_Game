function Burger (game) {
	this.game = game;

	//this.x = (Math.floor(Math.random() * this.game.canvas.width));
	this.x = 0;
	this.y = 0;

	this.speedX = 4;
	this.speedY = 2;

	this.img = new Image();
	this.img.src = 'images/burger.png';

	this.w = 50;
	this.h = 40;
}

Burger.prototype.draw = function() {
	this.game.ctx.drawImage(
		this.img,
		0,
		0,
		this.img.width,
		this.img.height,
		this.x,
		this.y,
		this.w,
		this.h
	);
}

Burger.prototype.move = function() {
	this.x += this.speedX;
	this.y += this.speedY;

	if (this.y + this.speedY > this.game.canvas.height - this.img.height || this.y + this.speedY < 0) {
		this.speedY *= -1;
	}
	if (this.x + this.speedX > this.game.canvas.width - this.img.width || this.x + this.speedX < 0) {
		this.speedX *= -1;
	}
}