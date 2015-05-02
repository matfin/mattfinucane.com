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
		console.log(this);
	},

	testData: function() {
		return {
			points: [
				{
					x: 10,
					y: 40
				},
				{
					x: 20,
					y: 20
				}
			]
		}
	}
});