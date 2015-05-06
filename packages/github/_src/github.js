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
	 *	Node Crypto module for checking SHA1 HMAC Digest
	 */
	Crypto: Npm.require('crypto'),

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
					 *	Parse each item, preparting it for the collection
					 */
					_.each(items, function(item) {

						/**
						 *	Set the given activity to the item
						 *	so we can use this tag later, then
						 *	we can insert it.
						 */
						item.activityTag = activity;

						/**
						 *	Call an upsert to the collection, updating an item
						 *	if it exists or inserting it if it doesn't
						 */
						self.collections.entries.update(
							{
								id: item.id
							},
							item,
							{
								upsert: true
							}
						);

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
	},

	/**
	 *	Function to listen for incoming changes from GitHub,
	 *	using their hook functionality.
	 *	GitHub will send us a push request when a push event
	 *	occurs. We will then use this to trigger an update 
	 *	to fetch the freshest content.
	 *
	 *	@method		listenForContentChanges
	 */
	listenForContentChanges: function() {

		if(!Meteor.npmRequire) {
			return;
		}

		console.log('Github: Listen for content changes.');

		/**
		 *	NPM modules needed
		 */
		var connect 	= Meteor.npmRequire('connect'),
			bodyParser	= Meteor.npmRequire('body-parser'),
			self 		= this;

		WebApp.connectHandlers
		.use(bodyParser.json({type: 'application/json'}))
		.use('/hooks/github', function(req, res, next) {

			
			if(!self.checkGHCredentials(req)) {
				self.makeResponse(res, {
					statusCode: 403,
					contentType: 'application/json',
					data: {
						status: 'forbidden',
						message: 'Stand in front of a mirror and say \'Candyman\' five times, then come back to me'
					}
				});
			}
			else {
				/**
				 *	Handle the push request from the body
				 */
				self.handlePushRequest(req).then(function() {
					
					/**
					 *	Trigger the fetch and populate function to get
					 *	the latest GitHub events.
					 */
					GitHub.fetchAndPopulate('events').then(function() {
						console.log('Github: event fetch triggered');
					});

					/**
					 *	Then make the response to the Github webhook
					 */
					self.makeResponse(res, {
						statusCode: 200,
						contentType: 'application/json',
						data: {
							status: 'ok',
							message: 'All good'
						}
					});

				}).fail(function() {

					self.makeResponse(res, {
						statusCode: 500,
						contentType: 'application/json',
						data: {
							status: 'error',
							message: 'General malaise happened here.'
						}
					});

				});
			}
		});
	},

	/**
	 *	Function to check the incoming request header and 
	 *	see if it is a valid payload from Github
	 *
	 *	@method 	checkGHCredentials
	 *	@param 		{Object} request - the request 
	 *	@return 	{Boolean} - true if the headers authentication is valid
	 */
	checkGHCredentials: function(request) {
		/**
		 *	Grabbing what we need to decrypt the signature
		 */
		var headers 	= request.headers,
			body 		= request.body,
			algorithm	= 'sha1',
			secret 		= GHConfig.secret,
			ghSignature = (function() {
				if(Helpers.checkNested(headers, 'x-hub-signature')) {
					return headers['x-hub-signature'];
				}
				else {
					return false;
				}
			})(),
			hmac 		= this.Crypto.createHmac(algorithm, secret); 

		/**
		 *	This will allow us to get the sha1 signature 
		 */
		hmac.update(JSON.stringify(body));

		var calculatedSignature = 'sha1=' + hmac.digest('hex');
		
		/**
		 *	Return true if they match
		 */
		return headers['x-hub-signature'] === calculatedSignature;
	},

	/**
	 *	Function to write a response message to a request
	 *	
	 *	@method 	makeResponse
	 *	@param		{Object} res 			- a http response object
	 *	@param 		{Object} responseData	- response data to return to the client
	 *	@return 	undefined - returns nothing
	 */
	makeResponse: function(res, responseData) {

		res.writeHead(responseData.statusCode, responseData.contentType);
		if(responseData.contentType === 'application/json') {
			res.end(JSON.stringify(responseData.data));
		}
		else {
			res.end(responseData.data);
		}
	}
};
