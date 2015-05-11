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
	 *	Getting device parameters so we can load the correct template
	 */
	deviceClass: function() {
		/**
		 *	Making this function reactive
		 */
		Dependencies.resized.depend();
		var deviceClass = Helpers.deviceClass();
		return {
			isClick: deviceClass.isDesktop || deviceClass.isLaptop,
			isTouch: deviceClass.isTablet || deviceClass.isMobile
		};
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
				}),
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
	}
});

/**
 *	Template - portfolio_links
 *	Helpers
 */
Template.portfolio_links.helpers({
	/**
	 *	Function returning whether links for the product or GitHub codebase exists
	 */
	linksExist: function() {

		var githubUrlExists 	= !_.isNull(this.fields.githubUrl) && !_.isUndefined(this.fields.githubUrl),
			productionUrlExists	= !_.isNull(this.fields.productionUrl) && !_.isUndefined(this.fields.productionUrl),
			hasUrls 			= (githubUrlExists || productionUrlExists);

		return {
			githubUrl: 				githubUrlExists,
			productionUrl: 			productionUrlExists,
			some: 			 		hasUrls
		};
	}
});
