function Player(game) {
	this.game = game;

	this.img = new Image();
	
	this.imgFront = 'images/cartmanFront.png';
	this.imgLeft = 'images/cartmanLeft.png';
	this.imgRight = 'images/cartmanRight.png';
	
	this.img.src = this.imgRight;

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

	this.dx = 4;

	this.vy = 1;
	this.isJumping = false;
	this.maxLives = 5;


	this.ARROW_CODES = {
		37: 'left',
		38: 'top',
		39: 'right'
	}

	this.GRAVITY = 0.7;
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
		if (!this.isJumping) {
			this.img.frameIndexW += 1;
			if (this.img.frameIndexW > 1) this.img.frameIndexW = 0;
		}
	}
};

Player.prototype.move = function () {
	this.animateImg();
	this.moveX();
	this.moveY();
}

Player.prototype.handleHorCollision = function() {
	let currentObstacleX = this.game.obstaclesGenerated[this.currentObstacle].x;
	let currentObstacleW = this.game.obstaclesGenerated[this.currentObstacle].w;

	if (this.x + this.w > currentObstacleX && this.x + this.w < currentObstacleX + currentObstacleW) {//collision lEFT
		this.x = currentObstacleX - this.w;
	} else if(this.x < currentObstacleX + currentObstacleW && this.x > currentObstacleX ) { //collision RIGHT
		this.x = currentObstacleX + currentObstacleW;
	}
}

Player.prototype.moveX = function () {
	if (this.x + this.w < this.game.canvas.x){
		this.game.gameOver();
	} else {
		if (this.keys.left) { //IZQUIERDA
			this.img.src = this.imgLeft;
			if (this.x < this.game.canvas.x) { //OUT
				this.x += 0;
				if (this.isObstacle()) {
					this.handleHorCollision();
				}
			} else { //INSIDE
				this.x += this.dx * -1.8;
				if (this.isObstacle()) {
					this.handleHorCollision();
				}
			}
		} else { //DERECHA
			this.img.src = this.imgRight;
			if (this.x + this.w > this.game.canvas.width) { //OUT
				if (this.isObstacle()) {
					this.handleHorCollision();
				} else {
					this.x += 0;
				}
			} else { //INSIDE
				if (this.keys.right) { 
					if (this.isObstacle()) {
						this.handleHorCollision();
					} else {
						this.x += this.dx;
					}
				} else {
					if (this.isObstacle()) {
						this.handleHorCollision();
					}
				}
			}
		}
	}
}

Player.prototype.isObstacle = function () {
	return this.game.obstaclesGenerated.some(function (obstacle, index) {
		// (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
		if (this.x + this.w > obstacle.x && obstacle.x + obstacle.w > this.x &&
			this.y + this.h > obstacle.y && obstacle.y + obstacle.h > this.y) {
			this.currentObstacle = index;
			return true
		}
	}.bind(this));
}

Player.prototype.isOnTheFloor = function() {
	if (this.y >= this.y0) {
		return true;
	}
	return false;
}

Player.prototype.moveY = function () {
	if (this.isOnTheFloor()) {		
		this.vy = 1;
		this.y = this.y0;
		this.isJumping = false;
	} else {		
		this.vy += this.GRAVITY;
		this.y += this.vy;
	}

	if (this.keys.top && !this.isJumping) {
		this.y -= 70;
		this.vy -= 25;
		this.isJumping = true;
	}

	if (this.isObstacle() && !this.isOnTheFloor()) {
		let currentObstacleX = this.game.obstaclesGenerated[this.currentObstacle].x;
		let currentObstacleW = this.game.obstaclesGenerated[this.currentObstacle].w;
		let currentObstacleY = this.game.obstaclesGenerated[this.currentObstacle].y;
		let currentObstacleH = this.game.obstaclesGenerated[this.currentObstacle].h;
		
		if (this.y + this.h > currentObstacleY && this.y + this.h < currentObstacleY + currentObstacleH && 
			this.x + this.w > currentObstacleX && this.x < currentObstacleX + currentObstacleW) { //Collision SUP
			this.vy = 0;
			this.isJumping = false;
			this.y = currentObstacleY - this.h;
		} 
	}
}

Player.prototype.grow = function () {
	this.weight++;

	if (this.weight < this.maxLives) {
		this.img.frameIndexH = this.weight;
		grow.pause();
		grow.play();
	} else {
		grow.pause();
		grow.play();
		
		setTimeout(function () {
			this.game.gameOver();
		}.bind(this), 500);
	}
}