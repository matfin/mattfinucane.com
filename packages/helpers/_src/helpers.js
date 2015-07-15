/**
 *	Class for server and client side helper functions
 *	
 *	@class Helpers
 *	@static
 */
Helpers = {
	
	/**
	 *	Determine a touch based device using JS only
	 *	
	 *	@method isTouchDevice
	 *	@return {Boolean} - true if the device is touch capable or false
	 */
	isTouchDevice: function() {
		return ('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
	},

	/**
	 *	Function that calculates device screen size and capabilities
	 *
	 *	@method 	deviceClass()
	 *	@return 	{Object} - an object containing a list of boolean attributes
	 */
	deviceClass: function() {
		var viewportWidth 	= window.innerWidth,
			pixelDensity	= window.devicePixelRatio || 1;

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
	},

	/**
	 *	Function to return an object containing a formatted datestring and timestamp
	 *	
	 *	@method 	formattedDateObject
	 *	@param 		{Mixed} date - a date string formatted for example '2015-04-28' or a date object
	 *	@param 		{String} format - desired format for example 'YYYY MM DD'
	 *	@return  	{Object} - an object containing a formatted date string and timestamp
	 */	
	formattedDate: function(date, format) {

		var momentDate 	= moment(date),
			string 		= momentDate.format(format),
			timestamp 	= (typeof date === 'object') ? date.getTime() : new Date(date).getTime();

		return {
			string: string,
			timestamp: timestamp
		};
	},

	/**
	 *	Function to get a timestamp as a percentage of elapsed time from the beginning of its day
	 *	ie: 12:00 (noon) on a day would be 50% through that day.
	 *
	 *	@method 	percentageThroughDay
	 *	@param 		{Number} timestamp - timestamp for a given time
	 *	@retrn 		{Number} - the percentage of the time elapsed from midnight that day
	 */
	percentageThroughDay: function(timestamp) {
		var midnightTimestamp = new Date(moment(timestamp).startOf('day'));
			difference = timestamp - midnightTimestamp,
			percentage = (difference / 86400000) * 100;

		return percentage;
	},

	/**
	 *	Function to determine the division a value is in
	 *
	 *	@method 	inDivision
	 *	@param 		{Number} givenNumber - the number to check
	 *	@param 		{Number} rangeTo 	 - maximum range
	 *	@param   	{Number} numberOfDivisions - total number of spliced divisions
	 *	@return 	{Number} the number of the division the number was found in
	 */
	inDivision: function(givenNumber, rangeTo, numberOfDivisions) {

		var rangeStep = Math.floor(rangeTo / numberOfDivisions);

		for(var i = 1; i <= numberOfDivisions; i++) {
			if(givenNumber < (rangeStep * i)) {
				return i - 1;
			}
		}

		return 0;
	},

	/**
	 *	Function to get the index of a particular node within another node
	 *
	 *	@method		indexForNodeOfType
	 *	@param 		{Object} node - the DOM node being checked		
	 *	@return  	{Number} - the index of the dom node
	 */
	indexForNodeOfType: function(node) {
		var index = 0;
		if(typeof node !== 'object') {
			return index;
		}

		var nodeName = node.nodeName;
	
		while((node = node.previousSibling)) {
			if(node.nodeType === 1 && node.nodeName === nodeName) {
				index++;
			}
		}

		return index;
	},

	/**
	 *	Function to return bool if a number is in a range
	 *
	 *	@method 	isBetween
	 *	@param 		{Number} check
	 *	@param 		{Number} start
	 *	@param 		{Number} end
	 *	@return 	{Boolean} - true if value is in range or false
	 */
	isBetween: function(check, start, end) {
		return check >= start && check <= end;
	},

	/**
	 *	Function to turn a string of text into a lower case classname friendly string
	 *
	 *	@method 	asClassName
	 *	@param 		{String} sourceString - the source string
	 *	@return 	{String} - the classname friendly string
	 */
	asClassName: function(sourceString) {
		return sourceString.replace(/\s/g, '-').toLowerCase();
	}

};