const toggleNavReveal = () => {

	console.log('Tapped the nav reveal?');

	let body 	= document.body,
		nav 	= document.querySelector('nav');

	if(nav.classList.toggle('revealed')) {
		body.classList.add('prevent-scroll');
	}
	else {
		body.classList.remove('prevent-scroll');
	}
};