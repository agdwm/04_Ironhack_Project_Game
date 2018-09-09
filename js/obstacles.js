function Obstacle (game){
	this.game = game;
	this.img = new Image();

	this.x = this.game.canvas.width;
	this.y = this.game.canvas.height - (this.h);

	this.dx = 2;
}

Obstacle.prototype.draw = function(obstacleType) {
	this.switchObstacle(obstacleType);

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

Obstacle.prototype.switchObstacle = function(obstacleType) {
	switch (obstacleType) {
		case 'obstacle1':
			this.img.src = 'images/obstacle1.png';
			this.w = 196;
			this.h = 250;
			break;
		case 'obstacle2':
			this.img.src = 'images/obstacle2.png';
			this.w = 190;
			this.h = 365;
			break;
		case 'obstacle3':
			this.img.src = 'images/obstacle3.png';
			this.w = 150;
			this.h = 150;
			break;	
	}
}

Obstacle.prototype.move = function () {
	this.x -= this.dx;
};