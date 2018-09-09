function Background(game) {
	this.game = game;
	this.img = new Image();
	this.img.src = 'images/background.png';

	this.w = 3200;
	this.h = 600;
	this.x = 0;
	this.y = this.game.canvas.height - this.h;

	this.dx = 3;
}

Background.prototype.draw = function () {
	// two backgrounds: one after the other
	this.game.ctx.drawImage(this.img, this.x, this.y, this.game.canvas.width, this.h);
	this.game.ctx.drawImage(this.img, this.x + this.game.canvas.width, this.y, this.game.canvas.width, this.h);
}


Background.prototype.move = function () {
	this.x -= this.dx;

	if (this.x < -this.game.canvas.width) this.x = 0;
};