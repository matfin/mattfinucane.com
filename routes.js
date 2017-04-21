/**
 *	Configure the loading template
 */
Router.configure({
	loadingTemplate: 'components_loading'
});

/**
 *	If the nav is showing, hide it
 */
Router.onBeforeAction(function() {
	this.next();
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
			'views_portfolio': 		{to: 'content'}
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
			'views_experience': 	{to: 'content'}
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