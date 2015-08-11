'use strict';

/**
 *	Template - cards_job
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_job.created = function() {
	this.subscribe('images', this.data.fields.projectLogos);
};

/**
 *	Template - cards_job
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.cards_job.rendered = function() {
};

/**
 *	Template - cards_job
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.cards_job.destroyed = function() {
};

/**
 *	Template - cards_job
 *	Helpers
 */
Template.cards_job.helpers({

	/**
	 *	Fetching the assetIds for images
	 */
	images: function() {
		var imageIds,
				imageAssets,
				deviceClass;
		
		if(Helpers.checkNested(this, 'fields', 'projectLogos')) {
			imageIds = this.fields.projectLogos.map(function(projectLogo) {
				return projectLogo.sys.id;
			});
			return Core.app.collections.images.find({asset_id: {$in: imageIds}}).fetch();
		}
		else {
			return [];
		}
	}

});
