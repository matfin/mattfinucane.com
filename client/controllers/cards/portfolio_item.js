'use strict';

/**
 *	Template - cards_portfolio_item
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_portfolio_item.created = function() {
	this.subscribe('entries', 'Skill');
	if(Helpers.checkNested(this, 'data', 'fields', 'screenshots')) {
		this.subscribe('images', this.data.fields.screenshots);
	}
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
	images: function() {
		return Core.templateHelpers.images.call(this, this.fields.screenshots);
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
