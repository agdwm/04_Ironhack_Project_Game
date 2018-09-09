function Player(game) {
	this.game = game;

	this.imgFront = 'images/cartmanFront.png';
	this.imgLeft = 'images/cartmanLeft.png';
	this.imgRight = 'images/cartmanRight.png';

	this.img = new Image();
	this.img.src = this.imgFront;

	this.w = 195;
	this.h = 150;
	this.x = 20;
	this.y0 = this.game.canvas.height - (this.h - 5); //5px borders image
	this.y = this.y0;
	this.weight = 0;

	this.img.framesW = 2;
	this.img.framesH = 5;
	this.img.frameIndexW = 0;
	this.img.frameIndexH = 0;

	this.dx = 1;
	this.dxStop = 0;
	this.dxStart = 5;

	this.vy = 1;
	this.isJumping = false;
	this.maxLives = 4;


	this.ARROW_CODES = {
		37: 'left',
		38: 'top',
		39: 'right'
	}

	this.GRAVITY = 0.5;
	this.keys = this.trackKeys();

	this.currentObstacle = null;
}


Player.prototype.trackKeys = function () {
	let pressedKeys = {};

	let handler = (e) => {
		if (this.ARROW_CODES.hasOwnProperty(e.keyCode)) {
			let downPressed;
			if (e.type === 'keydown') {
				downPressed = true;
			} else {
				downPressed = false;
			}
			pressedKeys[this.ARROW_CODES[e.keyCode]] = downPressed;
			e.preventDefault();
		}
	}

	document.addEventListener('keydown', handler);
	document.addEventListener('keyup', handler);

	return pressedKeys;
}

Player.prototype.draw = function () {
	//context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
	this.game.ctx.drawImage(
		this.img,
		this.img.frameIndexW * Math.floor(this.img.width / this.img.framesW),
		this.img.frameIndexH * Math.floor(this.img.height / this.img.framesH),
		Math.floor(this.img.width / this.img.framesW),
		Math.floor(this.img.height / this.img.framesH),
		this.x,
		this.y,
		this.w,
		this.h
	);
}

Player.prototype.animateImg = function () {
	// It changes the frame.  The larger the module, the slower the character moves
	if (this.game.framesCounter % 5 === 0) {
		if (this.keys.left || this.keys.right) {
			this.img.frameIndexW += 1;
			if (this.img.frameIndexW > 1) this.img.frameIndexW = 0;
		} else {
			this.img.frameIndexW = 0;
		}
	}
};

Player.prototype.animateDeath = function () {
	this.img.src = this.imgFront;
	this.img.frameIndexH = 0;
	this.img.frameIndexW = 1;
	lost.play();
	

}

Player.prototype.move = function () {
	//check if collision when the character is not moving
	if (this.isObstacle()) {
		this.x += this.dxStart * -1;
	}
	this.moveX();
	this.moveY();
}

Player.prototype.moveX = function () {

	if (this.keys.right) {
		this.img.src = this.imgRight;

		if (!this.isJumping) {
			this.animateImg();
		}

		if (this.x + this.w < this.game.canvas.width) { //INSIDE OF CANVAS
			if (this.isObstacle()) {
				let currentObstacleX = this.game.obstaclesGenerated[this.currentObstacle].x;
				let currentObstacleW = this.game.obstaclesGenerated[this.currentObstacle].w;

				if (this.x + this.w >= currentObstacleX && currentObstacleX + currentObstacleW > this.x) { //collision obstacle left OK!! :)
					this.x += this.dxStart * -1;
				} else if (this.x <= currentObstacleX + currentObstacleW && this.x + this.w > currentObstacleX && currentObstacleW) {
					this.x += this.dxStart;
				}
			} else {
				this.x += this.dxStart;
			}
		} else {
			this.x += 0;
		}
	} else if (this.keys.left) {
		this.img.src = this.imgLeft;

		if (!this.isJumping) this.animateImg();

		if (this.x <= this.game.canvas.x) { //OUT OF CANVAS
			this.x += 0;
		} else {
			if (this.isObstacle()) {
				let currentObstacleX = this.game.obstaclesGenerated[this.currentObstacle].x;
				let currentObstacleW = this.game.obstaclesGenerated[this.currentObstacle].w;

				if (this.x + this.w >= currentObstacleX && currentObstacleX + currentObstacleW > this.x) { //collision obstacle left OK!! :)
					this.x = this.game.obstaclesGenerated[this.currentObstacle].x + this.game.obstaclesGenerated[this.currentObstacle].w;
				}
				if (this.x <= currentObstacleX + currentObstacleW && this.x + this.w > currentObstacleX) {
					this.x += this.dxStart;
				}
			} else {
				this.x += this.dxStart * -1;
			}
		}
	}
}

Player.prototype.isObstacle = function () {
	return this.game.obstaclesGenerated.some(function (obstacle, index) {
		if (this.x + this.w > obstacle.x && obstacle.x + obstacle.w > this.x &&
			this.y + this.h > obstacle.y && obstacle.y + obstacle.h > this.y && this.vy > 0) {
			this.currentObstacle = index;
			return true
		}

	}.bind(this));
}

Player.prototype.moveY = function () {

	// solo salta cuando el personaje está en el suelo
	if (this.y >= this.y0) { //SUELO
		this.vy = 1;
		this.y = this.y0;
		this.isJumping = false;
	} else {
		this.vy += this.GRAVITY;
		this.y += this.vy;
	}

	if (this.keys.top && !this.isJumping) {
		this.y -= 70;
		this.vy -= 20;
		this.isJumping = true;
	}

	if (this.isObstacle() && !(this.y >= this.y0)) {
		let currentObstacleX = this.game.obstaclesGenerated[this.currentObstacle].x;
		let currentObstacleW = this.game.obstaclesGenerated[this.currentObstacle].w;
		let currentObstacleY = this.game.obstaclesGenerated[this.currentObstacle].y;

		if (this.y + this.h >= currentObstacleY && this.x + this.w > currentObstacleX && currentObstacleX + currentObstacleW > this.x) {
			this.vy = 0;
			this.isJumping = false;
			this.y = currentObstacleY - this.h;
			lastObstacleY = currentObstacleY;
			this.isJumping = false;
		}
	}
}

Player.prototype.grow = function () {
	this.weight++;

	if (this.weight <= this.maxLives) {
		this.img.frameIndexH = this.weight;
		grow.pause();
		grow.play();
	} else {
		console.log('WEIGHT', this.weight);
		this.animateDeath();

		setTimeout(function () {
			this.game.gameOver();
		}.bind(this), 1000);
	}
}