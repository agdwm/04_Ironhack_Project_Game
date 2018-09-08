window.onload = function() {

	let btnStart = document.getElementById('btn-start');
	let homeCharacter = document.getElementById('hero-character');
	let heroWrap = document.getElementById('hero-wrap');
	let container = document.getElementById('container');

	let itemsToRemove = [btnStart, homeCharacter];

	let canvasId = 'canvas';
	let canvasWidth = window.innerWidth;
	let canvasHeight = window.innerHeight;
	let canvasAttrs = {
		width: canvasWidth,
		height: canvasHeight,
		id: canvasId,
		class: canvasId
	}

	let removeHomeItems = (items) => {
		items.forEach(item => {
			item.remove();
		});
	}

	let makeTitleSmaller = (hero) => {
		hero.classList.add('small');
	}

	let addHtmlElem = (canvasIdentifier) => {
		let canvasElem = document.createElement(canvasIdentifier);
		container.appendChild(canvasElem);
	}

	let setAttrs = (elem, attrs) => {
		for (let key in attrs) {
			elem[0].setAttribute(key, attrs[key]);	
		}
	}

	/* NEW GAME */
	let createNewGame = () => {
		let canvasTag = document.getElementsByTagName(canvasId);
		setAttrs(canvasTag, canvasAttrs);
		let game = new Game(canvasId);
		game.start();
	}
	
	btnStart.addEventListener('click', function(e){
		e.preventDefault();
		removeHomeItems(itemsToRemove);
		makeTitleSmaller(heroWrap);
		addHtmlElem(canvasId);
		createNewGame();
	});
}