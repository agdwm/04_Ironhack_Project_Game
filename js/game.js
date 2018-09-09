function Game(canvasId) {
	this.canvas = document.getElementById(canvasId);
	this.ctx = this.canvas.getContext('2d');
	this.fps = 60;

	this.canvas.x = 0;

	this.reset();
}

Game.prototype.reset = function () {
	this.background = new Background(this);
	this.player = new Player(this);
	this.obstacle = new Obstacle(this);

	this.framesCounter = 0;

	// Obstacles
	this.obstacles = ['1', '2', '3']; //types of obstacles
	this.obstaclesGenerated = [];
	this.counterObstacles = 0;
	this.limitOfObstacles = 15;
	// Burgers
	this.burgers = [];
	this.limitOfBurgers = 8;
	this.counterBurgers = 0;
}

Game.prototype.start = function () {
	this.interval = setInterval(function () {

		this.clear();
		this.framesCounter++;

		if (this.framesCounter > 1000) {
			this.framesCounter = 0;
		}

		if (this.framesCounter % 300 === 0) {
			this.counterObstacles++;
			if (this.counterObstacles <= this.limitOfObstacles) {
				this.generateObstacle();
			}
		}

		if (this.framesCounter % 300 === 0) {
			if (this.counterBurgers < this.limitOfBurgers) {
				this.generateBurgers();
				this.counterBurgers++;
			}
		}

		//this.isBurgerCollisionPlayer();

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

Game.prototype.gameOver = function () {
	this.stop();

	setTimeout(function () {
		location.reload();
	}, 3000);
};

Game.prototype.generateObstacle = function () {
	let index = Math.floor(Math.random() * (this.obstacles.length - 1 + 1) + 1);
	this.obstaclesGenerated.push(new Obstacle(this, index));
}

Game.prototype.generateBurgers = function () {
	this.burgers.push(new Burger(this));
}

Game.prototype.isBurgerCollisionPlayer = function () {

	this.burgers.forEach(function (burger, index) {
		if (this.player.x + this.player.w > burger.x && burger.x + burger.w > this.player.x &&
			this.player.y + this.player.h > burger.y && burger.y + burger.h > this.player.y) {
				this.burgers.splice(index, 1);
				this.player.grow();
				return true;
		}
	}.bind(this));
};


Game.prototype.draw = function () {
	this.background.draw();
	this.player.draw();
	this.obstaclesGenerated.forEach(function (obstacle) {
		obstacle.draw();
	});
	this.burgers.forEach(function (burger) {
		burger.draw();
	});
}

Game.prototype.moveAll = function () {
	this.background.move();
	this.player.move();

	this.obstaclesGenerated.forEach(function (obstacle) {
		obstacle.move();
	});
	this.burgers.forEach(function (burger) {
		burger.move();
	});
}