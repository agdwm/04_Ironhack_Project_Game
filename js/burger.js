function Burger (game) {
	this.game = game;

	this.x = (Math.floor(Math.random() * this.game.canvas.width));
	//this.x = 0;
	this.y = 0;

	//this.speedXArr = [1, -1];
	//this.speedXRandom = Math.floor(Math.random() * this.speedXArr.length);
	//this.speedX = this.speedX * this.speedXArr[this.speedXRandom]; //-5 o 5

	this.speedX = 5;
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
	if (this.y + this.speedY > this.game.canvas.height - this.h || this.y + this.speedY < 0 ) {
		this.speedY = -this.speedY;
	}

	if (this.x + this.speedX > this.game.canvas.width - this.w || this.x + this.speedX < 0 ) {
		this.speedX = -this.speedX;
	}

	this.x += this.speedX;
	this.y += this.speedY;
}