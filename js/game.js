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
	this.humorist = new Humorist(this);

	this.framesCounter = 0;

	// Obstacles
	this.obstacles = ['1', '2', '3']; //types of obstacles
	this.obstaclesGenerated = [];
	this.counterObstacles = 0;
	this.limitOfObstacles = 10;
	// Burgers
	this.burgers = [];
	this.limitOfBurgers = 5;
	this.counterBurgers = 0;
	// Score
	this.counterScore = 0;
	this.scoreItems = document.getElementsByClassName("icon-cartman");
}

Game.prototype.start = function () {
	const startTime = new Date().getTime();
	
	this.interval = setInterval(() => {
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
				//this.generateBurgers();
				this.counterBurgers++;
			}
		}

		//this.isBurgerCollisionObstacle();
		this.isBurgerCollisionPlayer();
		//this.isPlayerCollisionHumorist();

		this.moveAll();
		this.draw();

		//when humorist appearing, the obstacles and the background dont't move
		if (new Date().getTime() - startTime > 60000) {
			this.humorist.draw();
		} else {
			this.background.move();
			this.obstaclesGenerated.forEach(function(obstacle) {
				obstacle.move();
			});
		}
		
	}, 1000 / this.fps);
}

Game.prototype.clear = function () {
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.stop = function () {
	clearInterval(this.interval);
};

Game.prototype.changeScore = function () {
	this.scoreItems[this.counterScore].classList.add('hidden');
	this.counterScore++;
}

Game.prototype.gameOver = function () {
	this.stop();
	lost.play();
	setTimeout(function () {
		location.reload();
	}, 3000);
};

Game.prototype.gameWin = function () {
	this.stop();
	win.play();
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
				this.changeScore();
				this.player.grow();
				return true;
		}
	}.bind(this));
};

Game.prototype.isBurgerCollisionObstacle = function () {
	this.burgers.forEach(function (burger) {
		this.obstaclesGenerated.some(function (obstacle) {
			if (obstacle.x + obstacle.w >= burger.x && burger.x + burger.w >= obstacle.x &&
				obstacle.y + obstacle.h >= burger.y && burger.y + burger.h >= obstacle.y) {
					burger.changeDirection(true, true);
					console.log('COLLISION');
				}
		}.bind(this));
	}.bind(this));
};

Game.prototype.isPlayerCollisionHumorist = function () {
	if (this.player.x + this.player.w > this.humorist.x && this.humorist.x + this.humorist.w > this.player.x &&
		this.player.y + this.player.h > this.humorist.y && this.humorist.y + this.humorist.h > this.player.y) {
			this.humorist.animateImg();
			this.gameWin();
			return true;
	}
};

Game.prototype.draw = function () {
	this.background.draw();
	this.player.draw();

	this.obstaclesGenerated.forEach(function (obstacle) {
		obstacle.draw();
	});
	// this.burgers.forEach(function (burger) {
	// 	burger.draw();
	// });
	//this.humorist.draw();
}

Game.prototype.moveAll = function () {
	//this.background.move();
	this.player.move();

	// this.obstaclesGenerated.forEach(function(obstacle) {
	// 	obstacle.move();
	// });

	// this.burgers.forEach(function (burger) {
	// 	burger.move();
	// });

	//this.humorist.move();
}