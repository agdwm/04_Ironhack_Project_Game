function Burger (game) {
	this.game = game;

	this.x = (Math.floor(Math.random() * this.game.canvas.width));
	//this.x = 0;
	this.y = 0;

	//this.speedXArr = [1, -1];
	//this.speedXRandom = Math.floor(Math.random() * this.speedXArr.length);
	//this.speedX = this.speedX * this.speedXArr[this.speedXRandom]; //-5 o 5

	this.speedX = 5;
	this.speedY = 5;

	this.img = new Image();
	this.img.src = 'images/burger.png';

	this.w = 50;
	this.h = 40;

	this.currentObstacle = null;
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

Burger.prototype.isObstacle = function () {
	return this.game.obstaclesGenerated.some(function (obstacle, index) {
		// (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
		if (this.x + this.w > obstacle.x && obstacle.x + obstacle.w > this.x &&
			this.y + this.h > obstacle.y && obstacle.y + obstacle.h > this.y) {
			this.currentObstacle = index;
			return true
		}
	}.bind(this));
}

Burger.prototype.handleCollision = function() {
	let currentObstacleX = this.game.obstaclesGenerated[this.currentObstacle].x;
	let currentObstacleW = this.game.obstaclesGenerated[this.currentObstacle].w;
	let currentObstacleY = this.game.obstaclesGenerated[this.currentObstacle].y;
	let currentObstacleH = this.game.obstaclesGenerated[this.currentObstacle].h;

	
	if (this.y + this.h + this.speedY > currentObstacleY  && 
		this.y + this.speedY < currentObstacleY &&
		this.y + this.h + this.speedY < currentObstacleY + currentObstacleH) { //collision TOP
		console.log('TOP')
		this.y = currentObstacleY - this.h;
		this.speedY *= -1;
	} else if (this.x + this.speedX + this.w > currentObstacleX && 
		this.y + this.speedY > currentObstacleY &&
		this.x + this.speedX + this.w < currentObstacleX + currentObstacleW) { //collision lEFT
		console.log('LEFT')
		this.x = currentObstacleX - this.w;
		this.speedX = -this.speedX;
	} else if (this.x + this.speedX < currentObstacleX + currentObstacleW && 
		this.y + this.speedY > currentObstacleY &&
		this.x + this.speedX > currentObstacleX) { //collision RIGHT
		console.log('RIGHT')
		this.x = currentObstacleX + currentObstacleW;
		this.speedX = -this.speedX;
	} 
}

Burger.prototype.isOutOfCanvasWidth = function() {
	if (this.x + this.speedX > this.game.canvas.width - this.w) {
		this.x = this.game.canvas.width - this.w;
		return true;
	} else if (this.x + this.speedX < 0) {
		this.x = 0;
		return true;
	}
	return false;
}

Burger.prototype.isOutOfCanvasHeight = function() {
	if (this.y + this.speedY > this.game.canvas.height - this.h || this.y + this.speedY < 0) {
		return true;
	}
	return false;
}

Burger.prototype.move = function() {

	this.x += this.speedX;
	this.y += this.speedY;

	if (this.isObstacle()) {
		this.handleCollision();

		if (this.isOutOfCanvasHeight()) {
			this.speedY *= -1;
		}
		if (this.isOutOfCanvasWidth()) {
			this.speedX *= -1;
		}
	} else {
		if (this.isOutOfCanvasHeight()) {
			this.speedY *= -1;
		}
		if (this.isOutOfCanvasWidth()) {
			this.speedX *= -1;
		}
	}
}