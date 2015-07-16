/**
 *	Class containing functions that can be called from any template
 *
 *	@class TemplateHelpers
 *	@static
 */

TemplateHelpers = {
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