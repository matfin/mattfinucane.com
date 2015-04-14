/**
 *	Class for fetching data from the Contentful content delivery API
 *	
 *	@class contentful
 *	@static
 */
Contentful = {

	/**
	 *	Fiber needed for making async calls
	 */
	Fiber: Npm.require('fibers'),

	/**
	 *	Function to check the credentials of incoming payloads from Contentful
	 *	
	 *	@method 	checkCFCredentials
	 *	@param 		{Object} request - incoming request payload
	 *	@return 	{Boolean}		 - true if credentials are valid 	
	 */
	checkCFCredentials: function(request) {
		return 
	}


};