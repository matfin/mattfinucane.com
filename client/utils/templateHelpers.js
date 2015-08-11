'use strict';

/**
 *	Class containing functions that can be called from any template
 *
 *	@class TemplateHelpers
 *	@static
 */

Core.templateHelpers = {
	/**
	 *	Function to calculate the number of items that will appear
	 *	in a slide element, dependent on the screen size
	 *
	 *	@method 	numberOfItemsInSlide
	 *	@return		{Number} - the number of items to show in a slide
	 */
	numberOfItemsInSlide: function() {
		/**
		 *	Making this a reactive function
		 */
		Dependencies.resized.depend();
		var deviceClass = Helpers.deviceClass();
		return (deviceClass.isHD) ? 3 : 2;
	},

	/**
	 *	Fetch related images for entries given device class parameters
	 *
	 *	@method images
	 *	@param {Object} selector - the selector needed to grab the image ids
	 *	@return {Array} - an array of images 
	 */
	images: function(selector) {
		var imageIds,
				imageAssets,
				grouped;
		/**
		 *	Checking to see if associated images exist
		 */
		if(Helpers.checkNested(selector)) {
			/**
			 *	Preparing the query and returning grouped image assets.
			 */
			imageIds = selector.map(function(item) {
				return item.sys.id;
			});

			imageAssets = Core.app.collections.images.find({asset_id: {$in: imageIds}}).fetch();
			grouped = Helpers.grouped(imageAssets, 'asset_id');

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
};