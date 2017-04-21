/**
 *	Helper to return a nicely formatted date using moment.js
 *	
 *	@method formattedDate
 *	@param {String}	The date string, which should be in the format "YYYY-MM-DD" ie: "2013-04-26".
 *	@param {String} The formatting for the date to be displayed.
 *	@return {String} The formatted date
 */
UI.registerHelper('formattedDate', function(dateString, dateFormat) {
	
	/**
	 *	If parameters are absent assume 'Present'
	 */
	if(typeof dateString === 'undefined') {
		return 'Present';
	}
	return Helpers.formattedDate(dateString, dateFormat).string;
});

/**
 *	Helper to return a timestamp given a date in the format 'YYYY-MM-DD'
 *	
 *	@method formattedDate
 *	@param {String}	The date string, which should be in the format "YYYY-MM-DD" ie: "2013-04-26".
 *	@return {Number} The timestamp
 */
UI.registerHelper('timestamp', function(dateString) {
	return Helpers.formattedDate(dateString).timestamp;
});

/**
 *	Helper to determine if a variable exists and is not empty
 *
 *	@method variableExists
 *	@param 	{Mixed} variable - variable to check
 *	@return {Bool} - true if the variable exists and has a value or false
 */
UI.registerHelper('variableExists', function(variable) {
	return typeof variable !== 'undefined' && variable.length > 0;
});

/**
 *	Function to turn a string of text into a lower case classname friendly string
 *
 *	@method 	asClassName
 *	@param 		{String} sourceString - the source string
 *	@return 	{String} - the classname friendly string
 */
UI.registerHelper('asClassName', function(sourceString) {
	return Helpers.asClassName(sourceString);
});

/**
 *	Function to call the deviceClass inside a template
 *
 *	@method 	deviceClass
 *	@return 	{Object} - object containing parameters for the device capabilities
 */
UI.registerHelper('deviceClass', function() {
	/**
	 *	This needs to be reactive to when the window size changes
 	 */
	Dependencies.resized.depend();

	return Helpers.deviceClass();
});

/**
 *	Function to grab the base url for media from Meteors public settings
 *	
 *	@method baseMediaUrl
 *	@return {String} - the base url from public settings
 */
UI.registerHelper('baseMediaUrl', function() {
	if(Helpers.checkNested(Meteor, 'settings', 'public', 'mediaUrl')) {
		return Meteor.settings.public.mediaUrl;
	}
	else {
		throw new Meteor.Error(500, 'Could not get the base media url in settings.');
	}
});

/**
 *	Function to determine if the device has touch capabilities
 *
 *	@method		isTouchDevice
 *	@return 	{Boolean} true if the device is touch or false
 */
UI.registerHelper('isTouchDevice', function() {
	return Helpers.isTouchDevice();
});