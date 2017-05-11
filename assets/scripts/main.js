const primeTapEvent = (selector, fn) => {
	const items = document.querySelectorAll(selector);
	Array.prototype.forEach.call(items, (item) => {
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
	/**
	 *	Monitor tap/click on header button
	 */
	primeTapEvent('header button', toggleNavReveal);

	/**
	 *	Detect IE11 then run SVG replacement fix
	 */
	if(isIE()) {
		setClass();
		ieSvgFix();
	}

	/**
	 *	Unblur the text after 2s 
	 *	if typekit takes too long
	 */
	setTimeout(() => {
		let doc_root = document.querySelector('html');
		if(!doc_root.classList.contains('wf-active')) {
			doc_root.classList.add('wf-inactive');
		}
	}, 2000);
};