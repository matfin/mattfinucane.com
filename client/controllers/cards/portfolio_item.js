'use strict';

/**
 *	Template - cards_portfolio_item
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_portfolio_item.created = function() {
	this.subscribe('entries', 'Skill');
	this.subscribe('images', this.data.fields.screenshots);
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
	 *	Fetch any links for the portfolio item
	 */
	links: function() {
		return {
			production_url: (typeof this.fields.productionUrl !== 'undefined') ? this.fields.productionUrl : false
		}
	}
});

/**
 *	Template - portfolio_images
 *	Helpers
 */
Template.portfolio_images.helpers({
	/**
	 *	Fetching the detailed entries for related images
	 */
	images: function() {
		var imageIds,
				imageAssets,
				deviceClass,
				includeProductionUrl,
				grouped;
		/**
		 *	Checking to see if associated images exist
		 */
		if(Helpers.checkNested(this, 'fields', 'screenshots')) {
			/**
			 *	Preparing the query and returning grouped image assets.
			 */
			imageIds = this.fields.screenshots.map(function(screenshot) {
				return screenshot.sys.id;
			});

			imageAssets = Core.app.collections.images.find({asset_id: {$in: imageIds}}).fetch();

			grouped = _.groupBy(imageAssets, function(imageAsset) {
				return imageAsset.asset_id;
			});

			deviceClass = Helpers.deviceClass(),
			includeProductionUrl = (deviceClass.isTablet || deviceClass.isMobile);

			grouped = _.toArray(grouped);

			return {
				useSlider: grouped.length > 1,
				includeProductionUrl: includeProductionUrl,
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

/**
 *	Template - portfolio_skills
 *	Helpers
 */
Template.portfolio_skills.helpers({
	/**
	 *	Fetching the skills for a portfolio item
 	 */
	skills: function() {
		var skillIds = [],
				query;

		/**
		 *	If this entry has any associated sub entries
		 */
		if(Helpers.checkNested(this, 'fields', 'skills')) {
			skillIds = this.fields.skills.map(function(skill) {
				return skill.sys.id;
			});
			query = {
				'sys.id': {$in: skillIds}
			};
			return Core.app.collections.entries.find(query).fetch();
		}

		/**
		 *	Or we return an empty array
		 */
		return [];
	},

	/**
	 *	Fetch any links for the portfolio item
	 */
	links: function() {
		return {
			github_url: (typeof this.fields.githubUrl !== 'undefined') ? this.fields.githubUrl : false
		}
	}
});
