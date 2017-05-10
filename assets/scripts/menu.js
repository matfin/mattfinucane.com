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