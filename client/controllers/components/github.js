/**
 *	Template - components_github
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.components_github.created = function() {
};

/**
 *	Template - components_github
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.components_github.rendered = function() {
	
};

/**
 *	Template - components_github
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.components_github.destroyed = function() {
	
};

/**
 *	Template - components_github
 *	Helpers
 */
Template.components_github.helpers({

	days: function() {

		var days = []

		for(var i = 4; i >= 0; i--) {

			days.push({
				start: 	parseInt(moment().startOf('day').subtract(i, 'day').format('x')),
				end: 	parseInt(moment().endOf('day').subtract(i, 'day').format('x'))
			});

		}
		return days;
	}
});
