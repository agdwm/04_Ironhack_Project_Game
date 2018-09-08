window.onload = function() {
	let btnStart = document.getElementById('btn-start');
	let homeCharacter = document.getElementById('hero-character');
	let itemsToRemove = [btnStart, homeCharacter];
	let heroWrap = document.getElementById('hero-wrap');
	let canvasTag = 'canvas';
	let canvasId = 'canvas';
	let container = document.getElementById('container');
	

	let removeHomeItems = (items) => {
		items.forEach(item => {
			item.remove();
		});
	}

	let makeTitleSmaller = (hero) => {
		hero.classList.add('small');
	}

	let addHtmlItems = (canvas, canvasId) => {
		canvasElem = document.createElement(canvas);
		canvasElem.setAttribute('id', canvasId);
		container.appendChild(canvasElem);
	}
	
	btnStart.addEventListener('click', function(e){
		e.preventDefault();
		removeHomeItems(itemsToRemove);
		makeTitleSmaller(heroWrap);
		addHtmlItems(canvasTag, canvasId);
		/* NEW GAME */
		let game = new Game(canvasId);
		game.start();
	});

	
}