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

		var button 	= $('button', 'header.touch'),
			wrapper = $('.top');

		if(button.hasClass('revealed')) {
			wrapper.removeClass('revealed');
			button.removeClass('revealed');
		}
	}
}