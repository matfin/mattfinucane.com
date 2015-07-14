/**
 *	Template - views_experience_stacked
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_experience_stacked.created = function() {
	this.subscribe('job');
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

		console.log('Fetching jovs')

 		return App.collections.cf_entries.find({contentTypeName: 'job'}, {sort: {'fields.startDate': -1}}).fetch();
	}

});