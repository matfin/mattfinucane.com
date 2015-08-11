'use strict';

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
	imageAssets: function() {

		/**
		 *	Making this function reactive
		 */
		Dependencies.resized.depend();

		var deviceClass = Helpers.deviceClass();

		/**
		 *	Setting up the filters
		 */
		var device = (function() {
			if(deviceClass.isMobile) {
				return 'mobile'
			}
			else if(deviceClass.isTablet) {
				return 'tablet';
			}
			else {
				return 'desktop';
			}
		})();

		/**
		 *	With the device class determined, pick out the image we need
		 */
		return this.filter(function(image) {
			return image.device === device && image.density.multiplier === Helpers.deviceClass().pixelDensity;
		});
	}

});