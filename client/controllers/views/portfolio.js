/**
 *	Template - views_portfolio
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_portfolio.created = function() {
	this.subscribe('portfolio_item');
};

/**
 *	Template - views_portfolio
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.views_portfolio.rendered = function() {
};

/**
 *	Template - views_portfolio
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.views_portfolio.destroyed = function() {
};

/**
 *	Template - views_portfolio
 *	Helpers
 */
Template.views_portfolio.helpers({

	portfolioItems: function() {
		return App.collections.cf_entries.find({contentTypeName: 'portfolio_item'}, {sort: {'fields.dateCreated': -1}}).fetch();
	}

});