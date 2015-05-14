/**
 *	Class containing functions that can be called from any template
 *
 *	@class TemplateHelpers
 *	@static
 */

TemplateHelpers = {
	/**
	 *	Function that hides the display of the nav menu
	 *	for mobile devices
	 *
	 *	@method 	toggleNavMenuDisplay
	 */
	hideNavMenu: function() {

		var button 	= $('button', 'header'),
			wrapper = $('.top');

		if(button.hasClass('revealed')) {
			Meteor.setTimeout(function() {
				wrapper.removeClass('revealed');
				button.removeClass('revealed');
			}, 200);
		}
	},

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
		return (deviceClass.isDesktop || deviceClass.isLaptop) ? 2:1;
	}
}