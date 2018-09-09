window.onload = function() {

	let btnStart = document.getElementById('btn-start');
	let homeCharacter = document.getElementById('hero-character');
	let heroWrap = document.getElementById('hero-wrap');
	let canvasWrap = document.getElementById('canvas-wrap');
	let body = this.document.getElementById('body');

	let itemsToRemove = [btnStart, homeCharacter];
	
	let canvasId = 'canvas';
	let canvasFloorId = 'canvas-floor';
	let embedId = 'music';
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

	let emdedAttrs = {
		src: 'sounds/on-the-road-again-willie-nelson.mp3',
		autostart: 'true',
		loop: 'true',
		width: '2',
		height: '0'
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

	let DOMDisplay = (parent, type, id) => {
		parent.appendChild(createElem(type, id));
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
		let embedElem = document.getElementById(embedId);
		setAttrs(canvasElem, canvasAttrs);
		setAttrs(canvasFloorElem, canvasFloorAttrs);
		// setAttrs(embedElem, emdedAttrs);
		let game = new Game(canvasId);
		game.start();
	}
	
	btnStart.addEventListener('click', function(e){
		e.preventDefault();
		removeHomeItems(itemsToRemove);
		makeTitleSmaller(heroWrap);

		DOMDisplay(canvasWrap, 'canvas', 'canvas');
		DOMDisplay(canvasWrap, 'div', 'canvas-floor');
		// DOMDisplay(container, 'embed', 'music');
		createNewGame();
	});
}