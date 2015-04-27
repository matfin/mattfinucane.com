/**
 *	Class for server and client side helper functions
 *	
 *	@class Helpers
 *	@static
 */
Helpers = {
	
	/**
	 *	Function that calculates device screen size and capabilities
	 *
	 *	@method 	deviceClass()
	 *	@return 	{Object} - an object containing a list of boolean attributes
	 */
	deviceClass: function() {
		var viewportWidth 	= window.innerWidth,
			pixelDensity	= window.devicePixelRatio;

		return {
			isDesktop:  	viewportWidth >= 1280,
			isLaptop: 		viewportWidth > 1024 && viewportWidth < 1280,
			isTablet: 		viewportWidth <= 1024 && viewportWidth > 640,
			isMobile: 		viewportWidth <= 640,
			pixelDensity: 	Math.round(pixelDensity)
		};
	},

	/**
	 *	Function to check deply nested objects to see if they 
	 *	exist.
	 *
	 *	@method 	checkNested()
	 *	@param		{Object} - 	the main object containing nested items
	 *	@param		{String} - 	optional string parameters referencing the nested objects
	 *	@return		{Boolean} - true if the nested objects exist, or false if any one of
	 *							them is undefined
	 *
	 */
	checkNested: function(obj) {
		var args = Array.prototype.slice.call(arguments),
			obj = args.shift();

		for(var i = 0; i < args.length; i++) {
			if(!obj || !obj.hasOwnProperty(args[i])) {
				return false;
			}
			obj = obj[args[i]];
		}
		return true;
	},

	/**
	 *	Function to remap incoming fields and reduce to a single nested
	 *	object key pair
	 *
	 *	@method 	flattenObjects()
	 *	@param 		{Object} - 	an array of objects containing fields 
	 *							with deeply nested key value pairs ie:
	 *							{date: {'en-IE': '2015-05-01'}}
	 *
	 *	@param 		{String} - 	A selector to dig the nested value out.
	 *	
	 *	@return 	{Object} - 	Less deeply nested fields ie:
	 *							{date: '2015-05-01'} 
	 */
	flattenObjects: function(fields, selector) {
		
		var filtered = {};
		_.each(fields, function(field, key) {
			/**
			 *	Discard null or undefined values
			 */
			if(field[selector] !== null) {
				filtered[key] = field[selector];
			}
		});
		return filtered;
	}
};