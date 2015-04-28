/**
 *	Template - views_cv
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_cv.created = function() {
	this.subscribe('job');
};

/**
 *	Template - views_cv
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.views_cv.rendered = function() {
};

/**
 *	Template - views_cv
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.views_cv.destroyed = function() {
};

/**
 *	Template - views_cv
 *	Helpers 
 */
Template.views_cv.helpers({

	jobs: function() {
		return App.collections.cf_entries.find({contentTypeName: 'job'}, {sort: {'fields.startDate': -1}}).fetch();
	}

});