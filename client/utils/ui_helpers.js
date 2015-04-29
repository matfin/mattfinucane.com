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