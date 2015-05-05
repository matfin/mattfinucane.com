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

	offset: function(pos, offset) {
		return Math.round(pos - (offset / 2));
	},

	points: function() {

		/**
		 *	Setting up points with their default positioning
		 */
		var points 	= [
				{x: 0, y: 30, gh_events: []},
				{x: 25, y: 30, gh_events: []},
				{x: 50, y: 30, gh_events: []},
				{x: 75, y: 30, gh_events: []},
				{x: 100, y: 30, gh_events: []}
			],
			start  	= this.start,
			end 	= this.end,
			events 	= this.events;

		/**
		 *	Assigning events to points - each point representing
		 *	one quarter of a day.
		 */
		_.each(events, function(gh_event) {
			var hour = new Date(gh_event.created_at).getHours(),
				division = Helpers.inDivision(hour, 24, points.length - 1);

			points[division].gh_events.push(gh_event);
			points[division].y -= (6);
		});

		/**
		 *	Mark those points with more data
		 */
		_.each(points, function(point, index) {
			point.hasEntries = (point.gh_events.length > 0),
			point.atIndex = index
		});

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
	'click g rect': function(e, template) {
		var rect 				= e.currentTarget,
			selectedIndex 		= Helpers.indexForNodeOfType(rect),
			allEventCards 		= document.getElementsByClassName('gh_eventCard'),
			templateEventCards 	= template.firstNode.getElementsByClassName('gh_eventCard'),
			eventCard 			= 	_.find(templateEventCards, function(card) {
									return card.getAttribute('data-index') == selectedIndex;
								});

		/**
		 *	We need to hide any other event cards showing
		 */
		_.each(allEventCards, function(card) {
			card.className = 'gh_eventCard';
		});

		console.log(e.offsetX, e.offsetY);

		if(typeof eventCard !== 'undefined') {
			eventCard.style.top 	= (e.offsetY - 18) + 'px';
			eventCard.style.left 	= (e.offsetX + 20) + 'px';
			eventCard.className 	= 'gh_eventCard revealed';
		}
	}
}