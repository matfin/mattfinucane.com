/**
 *	Template - cards_portfolio_item
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_portfolio_item.created = function() {
	this.subscribe('skill');
	this.subscribe('cf_assets');
	this.subscribe('mf_images');
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
		if(Helpers.checkNested(this, 'fields', 'screenshots')) {
			/**
			 *	Preparing the query and returning grouped image assets.
			 */
			var imageIds = _.map(this.fields.screenshots, function(screenshot) {
					return screenshot.sys.id;
				});
				imageAssets = App.collections.mf_images.find({assetId: {$in: imageIds}}).fetch(),
				grouped = _.groupBy(imageAssets, function(imageAsset) {
					return imageAsset.assetId;
				});

				grouped = _.toArray(grouped);

			return {
				useSlider: grouped.length > 1,
				collection: grouped
			};
		}

		/**
		 *	Or we return an empty array
		 */
		return {
			useSlider: false,
			collection: []
		};
	}

});
