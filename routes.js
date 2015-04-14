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
	this.route('work', {
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
	this.route('cv', {
		path: '/cv',
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
		yieldTemplates: {
			'components_header': 	{to: 'header'},
			'views_about': 			{to: 'content'}
		}

	}, {where: 'client'});

});