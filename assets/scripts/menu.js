const toggleNavReveal = () => {
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
};

const toggleShadow = (selector) => {
	let teaser 	= document.querySelector('.teaser:first-of-type'),
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
};

