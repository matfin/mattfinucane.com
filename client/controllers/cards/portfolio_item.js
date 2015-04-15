/**
 *	Template - cards_portfolio_item
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_portfolio_item.created = function() {
	this.subscribe('skill');
	this.subscribe('image');
};

/**
 *	Template - cards_portfolio_item
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.cards_portfolio_item.rendered = function() {
};

/**
 *	Template - cards_portfolio_item
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.cards_portfolio_item.destroyed = function() {
};

/**
 *	Template - cards_portfolio_item
 *	Helpers
 */
Template.cards_portfolio_item.helpers({

	skills: function() {

		/**
		 *	If this entry has any associated sub entried
		 */
		if(Helpers.checkNested(this, 'fields', 'skills')) {

			/**
			 *	Grab the skill ids we need to build a query
			 *	to fetch associated skill entries
			 */
			var skillIds = [];
			_.each(this.fields.skills, function(skill) {
				skillIds.push(skill.sys.id);
			});

			/**
			 *	Build and then execute the query
			 */
			var query = {
				'sys.id': {$in: skillIds}
			},
			skills = App.collections.cf_entries.find(query).fetch();

			console.log(skills);

			return skills;
		}

		/**
		 *	Or we return an empty array
		 */
		return [];
	}

});
