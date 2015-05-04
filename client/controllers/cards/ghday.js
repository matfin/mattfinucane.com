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

		var points 	= [
				{x: -1, y: 30, gh_events: []},
				{x: 25, y: 30, gh_events: []},
				{x: 50, y: 30, gh_events: []},
				{x: 75, y: 30, gh_events: []},
				{x: 100, y: 30, gh_events: []}
			],
			start  	= this.start,
			end 	= this.end,
			events 	= this.events;

		_.each(events, function(gh_event) {

			var hour = new Date(gh_event.created_at).getHours(),
				division = Helpers.inDivision(hour, 24, points.length - 1);

			points[division].gh_events.push(gh_event);
			points[division].y -= (6);

		});

		console.log(points);

		return {
			asCollection: points,
			asString: _.map(points, function(point) {
				return point.x + ',' + point.y + ' ';
			})
		};
	}
});

/**
 *	Template - cards_ghday
 *	Events
 */
Template.cards_ghday.events = {
	'mouseover circle': function(e, template) {
		console.log(e);
	}
}