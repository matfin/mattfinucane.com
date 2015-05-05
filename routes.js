/**
 *	Configure the loading template
 */
Router.configure({
	loadingTemplate: 'components_loading'
});

/**
 *	Router mapping - setting up the views and components
 */
Router.map(function() {

	/**
	 *	Landing page - client side routing
	 */
	this.route('portfolio', {
		path: '/',
		template: 'main',
		yieldTemplates: {
			'components_header': 	{to: 'header'},
			'views_work': 			{to: 'content'}
		}

	}, {where: 'client'});

	/**
	 *	CV - client side routing
	 */
	this.route('experience', {
		path: '/experience',
		template: 'main',
		yieldTemplates: {
			'components_header': 	{to: 'header'},
			'views_cv': 			{to: 'content'}
		}

	}, {where: 'client'});

	/**
	 *	CV - client side routing
	 */
	this.route('about', {
		path: '/about',
		template: 'main',
		data: function() {
			return {
				page: 'about'
			};
		},
		yieldTemplates: {
			'components_header': 	{to: 'header'},
			'views_content': 		{to: 'content'}
		}

	}, {where: 'client'});

});