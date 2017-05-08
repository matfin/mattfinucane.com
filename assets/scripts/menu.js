const toggleNavReveal = () => {
	let body 	= document.body,
		header	= document.querySelector('header'),
		nav 	= document.querySelector('nav');

	if(nav.classList.toggle('revealed')) {
		header.classList.add('revealed');
		body.classList.add('prevent-scroll');
	}
	else {
		header.classList.remove('revealed');
		body.classList.remove('prevent-scroll');
	}
};