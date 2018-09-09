function Obstacle (game, type){
	this.game = game;
	this.img = new Image();

	this.x = this.game.canvas.width;

	this.type = type;
	this.dx = 2;

	this.img.frameIndex = 0;

	this.switchObstacle();
}

Obstacle.prototype.draw = function() {

	this.game.ctx.drawImage(
		this.img,
		this.img.frameIndex * Math.floor(this.img.width),
		this.img.frameIndex * Math.floor(this.img.height),
		this.img.width,
		this.img.height,
		this.x,
		this.y,
		this.w,
		this.h
	);	
}

Obstacle.prototype.switchObstacle = function() {
	switch (this.type) {
		case 1:
			this.img.src = 'images/obstacle1.png';
			this.w = 196;
			this.h = 250;
			this.y = this.game.canvas.height - (this.h);
			break;
		case 2:
			this.img.src = 'images/obstacle2.png';
			this.w = 190;
			this.h = 365;
			this.y = this.game.canvas.height - (this.h);
			break;
		case 3:
			this.img.src = 'images/obstacle3.png';
			this.w = 150;
			this.h = 150;
			this.y = this.game.canvas.height - (this.h);
			break;	
	}
}

Obstacle.prototype.move = function () {
	this.x -= this.dx;
};