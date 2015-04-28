/**
 *	Template - cards_job
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_job.created = function() {
	this.subscribe('mf_images');
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
		if(Helpers.checkNested(this, 'fields', 'projectLogos')) {

			/**
			 *	Getting the asset ids
			 */
			var imageIds = _.map(this.fields.projectLogos, function(projectLogo) {
				return projectLogo.sys.id;
			}),
			imageAssets = App.collections.mf_images.find({assetId: {$in: imageIds}}).fetch();
			
			return imageAssets;
		}
		else {
			return [];
		}
	}

});
