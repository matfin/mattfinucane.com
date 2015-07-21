/**
 *	Template - cards_content_item
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_content_item.created = function() {
	this.subscribe('cf_assets');
	this.subscribe('mf_images');
};

/**
 *	Template - cards_content_item
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.cards_content_item.rendered = function() {
};

/**
 *	Template - cards_content_item
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.cards_content_item.destroyed = function() {
	
};

/**
 *	Template - cards_content_item
 *	Helpers
 */
Template.cards_content_item.helpers({
	/**
	 *	Function to determine if a content item is grouped with nested items or if it
	 *	is standalone.
	 */
	isGrouped: function() {
		return _.isArray(this);
	}
});

/**
 *	Template - content_images
 *	Helpers
 */
Template.content_images.helpers({

	/**
	 *	Fetch the images for this content item
	 */
	images: function() {

		/**
		 *	Checking to see if associated images exist
		 */
		if(Helpers.checkNested(this, 'fields', 'images')) {
			/**
			 *	Preparing the query and returning grouped image assets.
			 */
			var imageIds = _.map(this.fields.images, function(image) {
					return image.sys.id;
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