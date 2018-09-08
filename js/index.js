window.onload = function() {

	let btnStart = document.getElementById('btn-start');
	let homeCharacter = document.getElementById('hero-character');
	let heroWrap = document.getElementById('hero-wrap');
	let canvasWrap = document.getElementById('canvas-wrap');

	let itemsToRemove = [btnStart, homeCharacter];
	
	
	let canvasTag = 'canvas';
	let canvasFloorTag = 'div';
	let canvasId = 'canvas';
	let canvasFloorId = 'canvas-floor';
	let canvasWidth = window.innerWidth;
	let canvasHeight = window.innerHeight * 0.85; //canvas-floor: * 0.15

	let canvasAttrs = {
		width: canvasWidth,
		height: canvasHeight,
		class: canvasId
	}
	let canvasFloorAttrs = {
		class: 'canvas-floor',
	}

	let removeHomeItems = (items) => {
		items.forEach(item => {
			item.remove();
		});
	}

	let makeTitleSmaller = (hero) => {
		hero.classList.add('small');
	}

	let createElem = (type, idName) => {
		let element = document.createElement(type);
		if (idName) element.id = idName;
		console.log(element);
		return element;
	}

	let DOMDisplay = (parent) => {
		parent.appendChild(createElem('canvas', 'canvas'));
		parent.appendChild(createElem('div', 'canvas-floor'));
	}

	let setAttrs = (elem, attrs) => {
		for (let key in attrs) {
			elem.setAttribute(key, attrs[key]);	
		}
	}

	/* NEW GAME */
	let createNewGame = () => {
		let canvasElem = document.getElementById(canvasId);
		let canvasFloorElem = document.getElementById(canvasFloorId);
		setAttrs(canvasElem, canvasAttrs);
		setAttrs(canvasFloorElem, canvasFloorAttrs);

		let game = new Game(canvasId);
		game.start();
	}
	
	btnStart.addEventListener('click', function(e){
		e.preventDefault();
		removeHomeItems(itemsToRemove);
		makeTitleSmaller(heroWrap);
		// Add canvas & canvas-floor to the HTML
		DOMDisplay(canvasWrap);
		createNewGame();
	});
}