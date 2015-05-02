/**
 *	Class for fetching data from the GitHub api and storing
 *	it inside a server side Meteor collection.
 *
 *	@class GitHub
 *	@static
 */
GitHub = {

	/**
	 *	Fiber needed for making calls to a collection
	 */
	Fiber: Npm.require('fibers'),

	/**
	 *	Server side Mongo Collections
	 */
	collections: {
		entries: 	new Mongo.Collection('gh_entries')
	},

	/**
	 *	Function to connect to the GitHub api and fetch data
	 *
	 *	@method 	fetchAndPopulate
	 *	@param 		{String} activity - Represents the user activity according to the GitHub api
	 *									Example: '/events' to get all user events	
	 */
	fetchAndPopulate: function(activity) {
		/**
		 *	Setup
		 */
		var deferred 	= Q.defer(),
			self 		= this,
			url 		= GHConfig.endpoint + '/users/' + GHConfig.username + '/' + activity;
		
		HTTP.call('GET', url, {
			headers: {
				'User-Agent': 'com.mattfinucane.meteorjs',
				'Content-Type': 'application/json',
				'Authorization': 'token ' + GHConfig.apiToken
			}
		}, function(error, result) {

			if(error) {
				deferred.reject({
					status: 'error',
					message: 'Endpoint connection error',
					data: error
				});
			}
			else {
				/**
				 *	Now we have the data we can add it to the 
				 *	Meteor mongo collection.
				 */
				var items = EJSON.parse(result.content);

				/**
				 *	A fiber is needed when updating collections
				 */
				self.Fiber(function() {

					/**
					 *	Clear out old collections
					 */
					self.collections.entries.remove({});

					/**
					 *	Parse each item, preparting it for the collection
					 */
					_.each(items, function(item) {

						/**
						 *	Set the given activity to the item
						 *	so we can use this tag later, then
						 *	we can insert it.
						 */
						item.activityTag = activity;
						self.collections.entries.insert(item);

					});

					/**
					 *	Resolve the promise
					 */
					deferred.resolve({
						status: 'ok',
						message: 'GitGub activity type ' + activity + ' added ok.',
						data: {
							count: items.length
						}
					});

				}).run();
			}
		});

		return deferred.promise;
	}
};
