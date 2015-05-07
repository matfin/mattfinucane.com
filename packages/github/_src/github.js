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
		commits: 	new Mongo.Collection('gh_commits')
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
					 *	Parse each item, preparing it for the collection
					 */
					_.each(items, function(item) {

						/**
						 *	Grab the commits for the entry item
						 */
						var commits = self.mapFromPull(item);

						/**
						 *	Loop through them, upserting data
						 */
						_.each(commits, function(commit) {

							self.collections.commits.update(
								{
									id: commit.id
								},
								commit,
								{
									upsert: true
								}
							);
						});		
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
	 *	Function to map a Github collection entry from fetched events
	 *
	 *	@method		mapFromPull
	 *	@param 		{Array} entryItem - an array containing github entries
	 *	@return 	{Array} - remapped commits from the entry item
	 */
	mapFromPull: function(entryItem) {

		return _.map(entryItem.payload.commits, function(commit) {
			return {
				author: 		commit.author,
				message: 		commit.message,
				id: 			commit.sha,
				url: 			'https://github.com/' + entryItem.repo.name + '/commit/' + commit.sha,
				created_at:  	entryItem.created_at,
				created_at_ts: 	new Date(entryItem.created_at).getTime()
			};
		});

	},

	/**
	 *	Function to map an incoming Gitgub push event 
	 *
	 *	@method 	mapFromPush
	 *	@param 		{Array} pushItem - the pushed data from the webhook
	 *	@return 	{Array} - remapped commits from the pushed data
	 */
	mapFromPush: function(pushItem) {

		return _.map(pushItem.commits, function(commit) {
			return {
				author: 		commit.author,
				message: 		commit.message,
				id: 			commit.id,
				url: 			commit.url,
				created_at: 	commit.timestamp,
				created_at_ts: 	new Date(commit.timestamp).getTime()
			}
		});

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
				 *	Trigger the fetch and populate function to get
				 *	the latest GitHub events. This needs to be run 
				 *	inside a Fiber.
				 */
				self.Fiber(function() {

					/**
					 *	Grab the mapped commits
					 */
					var commits = self.mapFromPush(req.body);

					_.each(commits, function(commit) {

						/**
						 *	Loop through them, upserting data
						 */
						_.each(commits, function(commit) {

							self.collections.commits.update(
								{
									id: commit.id
								},
								commit,
								{
									upsert: true
								}
							);
						});	
					});

				}).run();
				
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
