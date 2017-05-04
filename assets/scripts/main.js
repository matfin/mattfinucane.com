const primeTapEvent = (selector, fn) => {
	const items = document.querySelectorAll(selector);
	items.forEach((item) => {
		if('onpointerdown' in window) {
			item.addEventListener('pointerdown', fn);
		}
		else if('ontouchstart' in window) {
			item.addEventListener('touchstart', fn);
		}
		else {
			item.addEventListener('click', fn);	
		}
	});
};

onload = () => {
	primeTapEvent('header button', toggleNavReveal);
};