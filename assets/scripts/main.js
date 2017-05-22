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

const throttle = (fn, limit) => {
	let waiting = false;
	
	limit = limit | 200;

	return () => {
		if(!waiting) {
			fn.call();
			waiting = true;
			setTimeout(() => {
				waiting = false;
			}, limit);
		}
	};
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

	window.addEventListener('scroll', throttle(toggleShadow.bind(null, '.wrapper:first-of-type'), 50));

	/** 
	 *	Start Disqus if we are on a blog post 
	 */
	let body 			= document.querySelector('body');
	if(body.hasAttribute('data-post-identifier')) {
		loadDisqus();
	}

	/**
	 *	Set the video source given device parameters
	 */
	let videos;
	if((videos = document.querySelectorAll('video')) != null) {
		Array.prototype.forEach.call(videos, (video) => {
			setVideo(video);
		});
	}

	/**
	 *	Call animations only if they have not already been run.
	 */
	if(localStorage.getItem('animations-complete') == null) {
		animateLetters('header h1')
		.then(animateFadeIn.bind(null, 'nav'))
		.then(animateFadeIn.bind(null, '.teaser:first-of-type'))
		.then(setAnimationsComplete);
	}
	else {
		Promise.all([
			animateLetters('header h1', 20),
			animateFadeIn('nav'),
			animateFadeIn('.teaser:first-of-type')
		]);
	}
};