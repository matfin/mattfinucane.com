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

const setIsScrolling = (scrolling) => {
	let header = document.querySelector('header'),
		scroll = document.body.scrollTop,
		height = header.clientHeight;

	if(scrolling && (scroll > height)) {
		header.classList.add('is-scrolling');
	}
	else {
		header.classList.remove('is-scrolling');
	}
};

const scrollEnd = (e, cb) => {
	let body	= document.body,
		wrapper	= document.querySelector('.wrapper'),
		header	= document.querySelector('header'),
		height 	= header.clientHeight,
		scroll 	= body.scrollTop;
	
	wrapper.classList.remove('scroll-active');
	header.classList.remove('scroll-active');

	if(scroll > height) {
		wrapper.classList.add('scroll-active');
		header.classList.add('scroll-active');
	}

	cb();
};