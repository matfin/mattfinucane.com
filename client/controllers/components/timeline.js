/**
 *	Template - components_timeline
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.components_timeline.created = function() {
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

	/** 
	 *	Get the beginning and the end in terms of years
	 *	for each group of two projects sitting together
	 *	in the slider.
	 */
	yearGroups: function() {
		var years = _.map(this.jobs, function(job, index) {
			return {
				startDate: Helpers.formattedDate(job.fields.startDate, 'YYYY').string,
				endDate: 	(typeof job.fields.endDate !== 'undefined') ?
							Helpers.formattedDate(job.fields.endDate, 'YYYY').string :
							Helpers.formattedDate(new Date(), 'YYYY').string
			};
		}),
		groups = [],
		yearGroups = [],
		size = this.concurrentJobs;

		while(years.length > 0) {
			groups.push(years.splice(0, size));
		}

		_.each(groups, function(group, index) {
			yearGroups.push({
				highlighted: index === 0,
				to: _.first(group).endDate,
				from: _.last(group).startDate
			});
		});

		return yearGroups;
	}

});

/**
 *	Template - components_timeline
 *	Events
 */
Template.components_timeline.events = {

	'click button': function(e, template) {
		/**
		 *	Clicking on the button should store the 
		 *	result in a reactive session. This is the
		 *	only way for now to communicate events
		 *	between templates cleanly in Meteor.
		 */
		var button = $(e.currentTarget);
		Session.set('slideNumber', button.index());
	}

};