/**
 *	Template - views_experience_stacked
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_experience_stacked.created = function() {
	//this.subscribe('entries', 'Job');
};

/**
 *	Template - views_experience_stacked
 *	Callback function called automatically when the template has been created
 *
 *	@method rendered
 */
Template.views_experience_stacked.rendered = function() {
	
};

/**
 *	Template - views_experience_stacked
 *	Callback function called automatically when the template has been created
 *
 *	@method destroyed
 */
Template.views_experience_stacked.destroyed = function() {
	
};

/**
 *	Template - views_experience_stacked
 *	Helpers 
 */
Template.views_experience_stacked.helpers({

	jobs: function() {
 		return App.collections.entries.find({}, {sort: {'fields.startDate': -1}}).fetch();
	}

});