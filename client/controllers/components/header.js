/**
 *	Template - components_header
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.components_header.created = function() {
};

/**
 *	Template - components_header
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.components_header.rendered = function() {
	
};

/**
 *	Template - components_header
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.components_header.destroyed = function() {
	
};

/**
 *	Template - components_header
 *	Helpers
 */
Template.components_header.helpers({


	/**
	 *	Restrict the display of the github timelime to specific device classes
	 */
	showGithubTimeline: function() {
		/**
		 *	This is a reactive function
		 */
		Dependencies.resized.depend();
		var deviceClass = Helpers.deviceClass();
		return deviceClass.isDesktop || deviceClass.isLaptop;
	},

	/**
	 *	Control the display of navigation by device
	 */
	navigationType: function() {
		/**
		 *	This is a reactive function
		 */
		Dependencies.resized.depend();
		var deviceClass = Helpers.deviceClass();
		return {
			showClickNav: deviceClass.isDesktop || deviceClass.isLaptop,
			showTouchNav: deviceClass.isTablet || deviceClass.isMobile
		};
	}

});