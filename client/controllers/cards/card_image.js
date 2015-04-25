/**
 *	Template - cards_image
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_image.created = function() {
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

		/**
		 *	Making this function reactive
		 */
		Dependencies.resized.depend();

		var deviceClass = Helpers.deviceClass();

		/**
		 *	Setting up the filters
		 */
		var device = function() {

			var deviceString = '';

			if(deviceClass.isMobile) {
				deviceString = 'mobile';
			}
			else if(deviceClass.isTablet) {
				deviceString = 'tablet';
			}
			else {
				deviceString = 'desktop';
			}

			if(deviceClass.isRetina) {
				deviceString =+ '@2x';
			}

			return deviceString;
		};

		/**
		 *	With the device class determined, pick out the image we need
		 */
		var imageAsset = _.find(this, function(item) {
			return item.size.suffix === device();
		});

		return imageAsset;
	}

});