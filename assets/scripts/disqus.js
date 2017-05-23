if(window.mf_site == null) {
	window.mf_site = {};
}

window.mf_site.disqus = {

	/**
	 *	This function fetches the metadata
	 *	for a blog post and sets the needed
	 *	global variables for the Disqus widget.
	 *
	 *	@function 	disqus_config
	 */
	disqus_config: () => {
		let body 		= document.querySelector('body'),
			unique_id	= body.getAttribute('data-post-identifier');

		this.page.url 			= window.location.href;
		this.page.identifier 	= unique_id;
	},

	/**
	 *	This function loads the embed script
	 *	for the Disqus commenting widget.
	 *	
	 *	@function 	loadDisqus
	 */
	loadDisqus: () => {
		let s = document.createElement('script');
		s.src = 'https://mattfinucane.disqus.com/embed.js';
		s.setAttribute('data-timestamp', new Date());
		(document.head || document.body).appendChild(s);
	}
};

