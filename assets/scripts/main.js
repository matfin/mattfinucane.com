if(window.mf_site == null) {
	window.mf_site = {};
}

onload = () => {

	const 	animations 	= mf_site.animations,
			ie 			= mf_site.ie,
			menu		= mf_site.menu,
			video 		= mf_site.video,
			disqus 		= mf_site.disqus,
			utils 		= mf_site.utils;

	/**
	 *	Monitor tap/click on header button
	 */
	utils.primeTapEvent('header button', menu.toggleNavReveal);

	/**
	 *	Detect IE11 then run fixes
	 */
	if(ie.isIE()) {
		ie.setClass();
		ie.ieSvgFix();
	}

	window.addEventListener('scroll', utils.throttle(menu.toggleShadow.bind(null, '.wrapper:first-of-type'), 50));

	/** 
	 *	Start Disqus if we are on a blog post 
	 */
	let body = document.querySelector('body');
	if(body.hasAttribute('data-post-identifier')) {
		disqus.loadDisqus();
	}

	/**
	 *	Set the video source given device parameters
	 */
	let videos;
	if((videos = document.querySelectorAll('video')) != null) {
		Array.prototype.forEach.call(videos, video.setVideo);
	}

	/**
	 *	Card animation into view
	 */
	animations.animateVisibleCardTransforms('.animated-card');
	window.addEventListener('scroll', utils.throttle(animations.animateVisibleCardTransforms.bind(null, '.animated-card'), 200));

	/**
	 *	Skip animations if promises 
	 *	not supported. Polyfill will
	 *	come soon for this.
	 */
	if(!window.Promise) {
		return;
	}

	/**
	 *	Call intro animation only if it has not already been run.
	 */
	if(localStorage.getItem('intro-complete') == null) {
		animations.animateLetters('header h1')
		.then(animations.animateFadeIn.bind(null, 'nav'))
		.then(animations.animateFadeIn.bind(null, '.teaser:first-of-type'))
		.then(animations.setAnimationsComplete)
		.catch(console.log);
	}
	else {
		Promise.all([
			animations.animateLetters('header h1', 20),
			animations.animateFadeIn('nav'),
			animations.animateFadeIn('.teaser:first-of-type')
		])
		.catch(console.log);
	}

};