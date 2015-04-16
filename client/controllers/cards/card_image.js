/**
 *	Template - cards_image
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_image.created = function() {
	this.subscribe('cf_assets');
};

/**
 *	Template - cards_image
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.cards_image.rendered = function() {
};

/**
 *	Template - cards_image
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.cards_image.destroyed = function() {
};

/**
 *	Template - cards_image
 *	Helpers
 */
Template.cards_image.helpers({

	/**
	 *	Reactive function to load the image asset path given 
	 *	screen size and pixel density
	 */
	imageAsset: function() {

		var deviceClass = Helpers.deviceClass();

		/**
		 *	Setting up the filters
		 */
		var device = function() {
			if(deviceClass.isMobile) {
				return 'mobile';
			}
			else if(deviceClass.isTablet) {
				return 'tablet';
			}
			else {
				return 'desktop';
			}
		};

		/** 
		 *	Filter the incoming images to fetch the one we need
		 *	and add the asset id to the filter.
		 */
		var assetIds = [];
		_.filter(this, function(item) {
			if(		item.fields.device === device() 
					&& item.fields.isRetina === Helpers.deviceClass().isRetina) {
				assetIds.push(item.fields.imageAsset.sys.id);
			}
		});

		/**
		 *	Generating the query
		 */
		var query = {
			'sys.id': {$in: assetIds}
		}
		image = App.collections.cf_assets.findOne(query);

		console.log(image);

		return image;
	}

});