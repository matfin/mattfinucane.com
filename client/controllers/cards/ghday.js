/**
 *	Template - cards_ghday
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_ghday.created = function() {
	
};

/**
 *	Template - cards_ghday
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.cards_ghday.rendered = function() {
	
};

/**
 *	Template - cards_ghday
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.cards_ghday.destroyed = function() {
	
};

/**
 *	Template - cards_ghday
 *	Helpers
 */
Template.cards_ghday.helpers({

	points: function() {

		console.log(this.events);

		var points 	= [
				{x: 0, y: 40},
				{x: 33, y: 40},
				{x: 66, y: 40},
				{x: 100, y: 40}
			],
			start  	= this.start,
			end 	= this.end,
			events 	= this.events;

		_.each(events, function(gh_event) {

			var hour = new Date(gh_event.created_at).getHours(),
				division = Helpers.inDivision(hour, 24, points.length);

			points[division].y -= (7.5);

		});

		return points;
	}
});