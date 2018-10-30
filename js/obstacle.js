function Obstacle (game, type){
	this.game = game;
	this.img = new Image();

	this.x = this.game.canvas.width;

	this.type = type;
	this.dx = 4;

	this.switchObstacle();
}

Obstacle.prototype.draw = function() {

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

Obstacle.prototype.switchObstacle = function() {
	switch (this.type) {
		case 1:
			this.img.src = 'images/obstacle1.png';
			this.w = 200;
			this.h = 260;
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
			this.w = 250;
			this.h = 250;
			this.y = this.game.canvas.height - (this.h);
			break;	
	}
}

Obstacle.prototype.move = function () {
	this.x -= this.dx;
};