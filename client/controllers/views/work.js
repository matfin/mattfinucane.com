/**
 *	Template - views_work
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_work.created = function() {
	this.subscribe('portfolio_item');
};

/**
 *	Template - views_work
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.views_work.rendered = function() {
};

/**
 *	Template - views_work
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.views_work.destroyed = function() {
};

/**
 *	Template - views_work
 *	Helpers
 */
Template.views_work.helpers({

	portfolioItems: function() {
		return App.collections.cf_entries.find({contentTypeName: 'portfolio_item'}).fetch();
	}

});
