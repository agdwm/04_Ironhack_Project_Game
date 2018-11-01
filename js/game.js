function Game(canvasId) {
	this.canvas = document.getElementById(canvasId);
	this.ctx = this.canvas.getContext('2d');
	this.fps = 60;
	this.startTime = new Date().getTime();
	this.canvas.x = 0;
	this.btnRestart = document.getElementById('btn-restart');
	this.infoWrap = document.getElementById("infoWrap");
	
	this.reset();
}

Game.prototype.reset = function () {
	this.background = new Background(this);
	this.player = new Player(this);
	this.obstacle = new Obstacle(this);
	this.jail = new Jail(this);

	this.status = null;
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
	
	this.interval = setInterval(() => {
		this.clear();
		
		this.framesCounter++;

		if (this.framesCounter > 1000) {
			this.framesCounter = 0;
		}

		if (this.framesCounter % 350 === 0) {
			this.counterObstacles++;
			if (this.counterObstacles <= this.limitOfObstacles) {
				this.generateObstacle();
			}
		}

		if (this.framesCounter % 400 === 0) {
			if (this.counterBurgers < this.limitOfBurgers) {
				this.generateBurgers();
				this.counterBurgers++;
			}
		}

		this.isBurgerCollisionPlayer();

		this.moveAll();
		this.drawAll();
		this.clearObstacles();

	}, 1000 / this.fps);

	this.btnRestart.addEventListener('click', function(e) {
		e.preventDefault();
		this.restart();
	}.bind(this));
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

Game.prototype.restart = function() {
	this.stop();
	
	setTimeout(function () {
		location.reload();
	}, 500);

}

Game.prototype.gameOver = function () {
	this.stop();
	if(this.status === null) {
		this.status = 'lost';
		this.infoWrap.classList.add('active');
		document.getElementById('infoMessageLost').classList.add("active");
		lost.play();
	}
};

Game.prototype.gameWin = function () {
	this.stop();
	if (this.status === null) {
		this.status = 'win';
		this.infoWrap.classList.add('active');
		document.getElementById('infoMessageWin').classList.add("active");
	}
};

Game.prototype.clearObstacles = function() {
	this.obstaclesGenerated = this.obstaclesGenerated.filter(function(obstacle){
		return obstacle.x + obstacle.w >= 0;
	})
}

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

Game.prototype.isPlayerCollisionJail = function () {
	if (this.player.x + this.player.w > this.jail.x && this.jail.x + this.jail.w > this.player.x && 
		this.player.y + this.player.h > this.jail.y && this.jail.y + this.jail.h > this.player.y) {
			return true;
	}
};

Game.prototype.moveAll = function () {

	if (new Date().getTime() - this.startTime < 60000) {
		this.background.move();
		this.obstaclesGenerated.forEach(function(obstacle) {
			obstacle.move();
		});
	} else {
		if (this.jail.x > this.canvas.width - 440) {
			this.background.move();
			this.obstaclesGenerated.forEach(function(obstacle) {
				obstacle.move();
			});
			this.jail.move();
		} else {
			if (this.isPlayerCollisionJail()) {
				if (this.jail.x + this.jail.w < this.canvas.width) {
					this.jail.animateImg();
					win.play();
					setTimeout(function () {
						this.gameWin();
					}.bind(this), 1000);
				}
			} 
		}
	}

	this.player.move();

	this.burgers.forEach(function (burger) {
		burger.move();
	});
}

Game.prototype.drawAll = function () {
	
	this.background.draw();
	
	this.obstaclesGenerated.forEach(function (obstacle) {
		obstacle.draw();
	});

	if (new Date().getTime() - this.startTime >= 60000) {
		this.jail.draw();
	}

	this.burgers.forEach(function (burger) {
		burger.draw();
	});

	this.player.draw();
}


