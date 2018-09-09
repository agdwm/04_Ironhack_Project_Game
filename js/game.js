function Game (canvasId) {
	this.canvas = document.getElementById(canvasId);
	this.ctx = this.canvas.getContext('2d');
	this.fps = 60;

	this.canvas.x = 0;

	this.reset();
}

Game.prototype.reset = function() {
	this.background = new Background(this);
	this.player = new Player(this);
	this.obstacle = new Obstacle(this);

	this.framesCounter = 0;
	this.obstaclesCounter = 0;
	this.limitOfObstacles = 8;
	this.obstacles = ['obstacle1', 'obstacle2', 'obstacle3'];
	this.obstaclesGenerated = [];
	this.obstaclesFinal = [];

	this.generateObstacle();
}

Game.prototype.start = function() {
	this.interval = setInterval(function() {

		this.clear();
		this.framesCounter++;

		if (this.framesCounter > 1000) {
			this.framesCounter = 0;
		}

		// if (this.framesCounter % 100 === 0) {
		// 	this.obstaclesCounter++;
		// 	if(this.obstaclesCounter <= this.limitOfObstacles){
		// 		this.generateObstacle();
		// 		this.drawObstacle();
		// 		this.moveObstacle();
		// 	}
		// }

		this.moveAll();
		this.draw();

	}.bind(this), 1000 / this.fps);
}

Game.prototype.clear = function () {
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.stop = function () {
	clearInterval(this.interval);
};

Game.prototype.generateObstacle = function () {
	for (var i = 0; i <= this.limitOfObstacles; i++){
		let index = Math.floor(Math.random() * (this.obstacles.length - 1 + 1) + 1);
		this.obstaclesGenerated.push(new Obstacle(this, index));
	}
	
	// this.obstaclesGenerated.push(new Obstacle(this, index));
	// console.log(this.obstaclesGenerated);
}

Game.prototype.draw = function () {
	this.background.draw();
	this.player.draw();
	this.obstaclesGenerated.forEach(function (obstacle, index) {
		obstacle.draw(index);
	});
}

Game.prototype.drawObstacle = function() {
	this.obstaclesGenerated.forEach(function(obstacle) {
		obstacle.draw();
	});
}

Game.prototype.moveObstacle = function() {
	this.obstaclesGenerated.forEach(function(obstacle) {
		obstacle.move();
	});
}

Game.prototype.moveAll = function () {
	this.background.move();
	this.player.move();

	this.obstaclesGenerated.forEach(function (obstacle) {
		obstacle.move();
	});
}