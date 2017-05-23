if(window.mf_site == null) {
	window.mf_site = {};
}

window.mf_site.menu = {

	/**
	 *	This function acts on tap/click
	 *	on the header menu button and 
	 *	reveals the site navigation.
	 *
	 *	@function	toggleNavReveal
	 */
	toggleNavReveal: () => {
		let body 	= document.body,
			header	= document.querySelector('header'),
			nav 	= header.querySelector('nav');

		if(nav.classList.toggle('revealed')) {
			header.classList.add('nav-open');
			body.classList.add('prevent-scroll');
		}
		else {
			header.classList.remove('nav-open');
			body.classList.remove('prevent-scroll');
		}
	},

	/**
	 *	This function toggles the bottom 
	 *	shadow for element once the window
	 *	scroll goes beyond a certain point.
	 *
	 *	@function 	toggleShadow
	 *	@param 		{String} 	- selector string for the node to apply the shadow styling to.
	 */
	toggleShadow: (selector) => {
		let teaser 	= document.querySelector('.teaser:first-of-type, .video-teaser:first-of-type'),
			node 	= document.querySelector(selector),
			scroll	= document.body.scrollTop || document.documentElement.scrollTop,
			height 	= teaser.clientHeight;

		if(scroll >= height) {
			if(!node.classList.contains('shadowed')) {
				node.classList.add('shadowed');
			}
		}
		else {
			if(node.classList.contains('shadowed')) {
				node.classList.remove('shadowed');
			}
		}
	}

};

