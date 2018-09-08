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

	this.setListeners();
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

Player.prototype.setListeners = function () {

}

Player.prototype.animateImg = function () {
	// It changes the frame.  The larger the module, the slower the character moves
	if (this.game.framesCounter % 1 === 0) {
		this.img.frameIndexW += 1;

		// If it is the last frame, returns to the first
		if (this.img.frameIndexW > 1) this.img.frameIndexW = 0;
	}
	//steps.play();
};