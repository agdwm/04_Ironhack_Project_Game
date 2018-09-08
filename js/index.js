window.onload = function() {
	let btnStart = document.getElementById("btn-start");
	let homeCharacter = document.getElementById("hero-character");
	let items = [btnStart, homeCharacter];
	let heroWrap = document.getElementById("hero-wrap");

	function removeHomeItems (itemsToRemove){
		itemsToRemove.forEach(item => {
			item.remove();
		});
	}

	function makeTitleSmaller(title) {
		title.classList.add('small');
	}

	btnStart.addEventListener('click', function(e){
		e.preventDefault();
		removeHomeItems(items);
		makeTitleSmaller(heroWrap);
	});
}