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

	this.img.framesW = 2;
	this.img.framesH = 5;
	this.img.frameIndexW = 0;
	this.img.frameIndexH = 0;

	this.dx = 0;
	this.dy =

	this.ARROW_CODES = {
		37: 'left',
		38: 'top',
		39: 'right'
	}

	this.keys = this.trackKeys();
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

Player.prototype.move = function () {
	this.moveX();
	this.moveY();
}

Player.prototype.moveX = function () {
	if (this.keys.left) {
		this.img.src = this.imgLeft;
	} else if (this.keys.right) {
		this.img.src = this.imgRight;
	} else {
		this.img.src = this.imgFront;
	}
	this.animateImg();
}

Player.prototype.moveY = function () {

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