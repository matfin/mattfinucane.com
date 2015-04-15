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
	 *	The server side Mongo Collections
	 */
	collections: {
		assets: 	new Mongo.Collection('cf_assets'),
		entries: 	new Mongo.Collection('cf_entries')
	},

	/**
	 *	Function to check the credentials of incoming payloads from Contentful.
	 *	
	 *	@method 	checkCFCredentials
	 *	@param 		{Object} request - incoming request payload
	 *	@return 	{Boolean}		 - true if credentials are valid 	
	 */
	checkCFCredentials: function(request) {
		return 	Helpers.checkNested(request, 'headers', 'authorization')
				&& request.headers.authorization === CFSettings.callbackAuthKey;
	},

	/**
	 *	Function to fetch the content type name for an entry given its 
	 *	content type id.
	 *
	 *	@method 	contentTypeName()
	 *	@param 		{Object} - entry
	 *	@return 	{String} - the content type name as a string
	 */
	contentTypeName: function(entry) {

		if(Helpers.checkNested(entry, 'sys', 'contentType', 'sys', 'id')) {

			var contentTypeId = entry.sys.contentType.sys.id,
				contentType = _.find(CFConfig.contentTypes, function(contentType) {
				return contentType.id === contentTypeId;
			});

			return (typeof contentType !== 'undefined') ? contentType.name:'nested';
		}

		return 'nested';
	},

	/** 
	 *	Function to make a HTTP call to the contentful endpoint,
	 *	passing in the request headers needed.
	 *
	 *	@method fetchAndPopulate
	 *	@return {Object} - a Q promise resolved or rejected
	 */
	fetchAndPopulate: function () {
		/**
		 *	Setup
 		 */
 		var deferred 	= Q.defer(),
 			self 		= this,
 			url 		= CFConfig.endpointUrl + '/spaces/' + CFConfig.spaceID + '/entries';

 		HTTP.call('GET', url, {
 			headers: {
 				'Authorization': 	CFConfig.authorisationHeader,
 				'Content-Type': 	CFConfig.contentTypeHeader
 			},
 			params: {
 				include: 1
 			}
 		}, function(error, result) {

 			/**
 			 *	Rejected promise with failure if there was an error
 			 */
 			if(error) {
 				deferred.reject({
 					status: 	'error',
 					message: 	'Could not connect to the endpoint',
 					data: 		error
 				});

 				console.log(url);
 			}
 			else {
 				/**
 				 *	Connection successful
 				 */
 				var data = EJSON.parse(result.content);

 				/**
 				 *	Functions that modidy Meteor mongo collections
 				 *	need to be wrapped inside a Fiber
 				 */
 				self.Fiber(function() {

 					/** 
 					 *	Clear out the old data on boot
 					 */
 					self.collections.assets.remove({});
 					self.collections.entries.remove({});

 					/**
 					 *	Loop through each entry
 					 */
 					_.each(data.items, function(entry) {

 						/**
 						 *	Attach the content type name to the entry
 						 */
 						entry.contentTypeName = self.contentTypeName(entry);

 						/**
 						 *	Then insert it to the collection
 						 */
 						self.collections.entries.insert(entry);

 					});

 					/**
 					 *	Publish the entries collection
 					 */
 					Meteor.publish('cf_entries', function() {
 						return self.collections.entries.find({});
 					});	

 					/**
 					 *	Loop through each asset
 					 */
 					_.each(data.includes.Asset, function(asset) {
 						/**
 						 *	Inserting the asset to the collection
 						 */
 						self.collections.assets.insert(asset);
 					});

 					/**
 					 *	Then publish the assets
 					 */
 					Meteor.publish('cf_assets', function() {
 						return Server.collections.assets.find({});
 					});

 					/**
 					 *	Resolved promise
 					 */
 					deferred.resolve({
 						status: 	'ok',
 						message: 	'Contentful assets and entries fetched and populated.',
 						data: 		result
 					});

 				}).run();
 			}
 		});
		
		/**
		 *	Then return the promise resolved or rejected
		 */
		return deferred.promise;
	}
};