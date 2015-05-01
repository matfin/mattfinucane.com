/**
 *	Template - components_github
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.components_github.created = function() {
	this.subscribe('gh_entries');
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

	dayGroups: function() {

		var entries = App.collections.gh_entries.find({},{sort: {'created_at': -1}}).fetch();
			days = [];

		for(var i = 6; i >= 0; i--) {
			var end 	= new Date().getTime() - (i * 86400000),
				start	= new Date().getTime() - ((i + 1) * 86400000);
				events 	= _.filter(entries, function(entry) {
					var entry_timestamp = new Date(entry.created_at).getTime();
					return entry_timestamp <= end && entry_timestamp >= start;
				});

			days.push({
				end: end,
				start: start,
				events: events
			});
		}
		
		return days;
	}

});
