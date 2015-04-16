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

	/**
	 *	Fetching the skills for a portfolio item
 	 */
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

			return skills;
		}

		/**
		 *	Or we return an empty array
		 */
		return [];
	},

	/**
	 *	Fetching the detailed entries for related images
	 */
	images: function() {
		/**
		 *	Checking to see if associated images exist
		 */
		if(Helpers.checkNested(this, 'fields', 'images')) {

			/**
			 *	Preparing the query
			 */
			var imageIds = [];
			_.each(this.fields.images, function(image) {
				imageIds.push(image.sys.id);
			});

			var query = {
				'sys.id': {$in: imageIds}
			},
			images = App.collections.cf_entries.find(query).fetch();

			return images;
		}

		/**
		 *	Or we return an empty array
		 */
		return [];
	}

});
