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
		// console.log(this);
		var points = [],
			start = this.start;

		_.each(this.events, function(item) {
			for(var i = 0; i < 4; i++) {
				var eventTimestamp = new Date(item.created_at);

				//console.log(eventTimestamp);
			}
		});
	},

	testData: function() {
		return {
			points: [
				{
					x: 0,
					y: 30
				},
				{
					x: 25,
					y: 30
				},
				{
					x: 50,
					y: 30
				},
				{
					x: 75,
					y: 30
				}
			]
		}
	}
});