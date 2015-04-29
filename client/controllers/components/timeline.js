/**
 *	Template - components_timeline
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.components_timeline.created = function() {
	this.subscribe('job');

	console.log(this)
};

/**
 *	Template - components_timeline
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.components_timeline.rendered = function() {
};

/**
 *	Template - components_timeline
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.components_timeline.destroyed = function() {
};

/**
 *	Template - components_timeline
 *	Helpers
 */
Template.components_timeline.helpers({

	years: function() {
		var jobs = App.collections.cf_entries.find({contentTypeName: 'job'}, {sort: {'fields.startDate': -1}}).fetch(),
			years = _.map(jobs, function(job) {
				return {
					startDate: Helpers.formattedDate(job.fields.startDate, 'YYYY'),
					endDate: 	(typeof job.fields.endDate !== 'undefined') ?
								Helpers.formattedDate(job.fields.endDate, 'YYYY') :
								Helpers.formattedDate(new Date(), 'YYYY')
				};
			});
		
		console.log(years);
		//return years;
	},

});

/** 
 *	Template components_timeline
 *	Events
 */
Template.components_timeline.events = {

	'slidecomplete .sliderContainer': function(e, template) {
		// console.log(e);
		console.log('slide complete');
	}

};