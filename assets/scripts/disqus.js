const disqus_config = () => {
	let body 		= document.querySelector('body'),
		unique_id	= body.getAttribute('data-post-identifier');

	this.page.url 			= window.location.href;
	this.page.identifier 	= unique_id;
};

const loadDisqus = () => {
	let s = document.createElement('script');
	s.src = 'https://mattfinucane.disqus.com/embed.js';
	s.setAttribute('data-timestamp', new Date());
	(document.head || document.body).appendChild(s);
};

