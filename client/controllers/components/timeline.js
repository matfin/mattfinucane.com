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

		_.each(groups, function(group) {

			console.log(group);

			yearGroups.push({
				to: _.first(group).endDate,
				from: _.last(group).startDate
			});
		});

		return yearGroups;
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