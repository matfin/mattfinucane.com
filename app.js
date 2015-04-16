Meteor.startup(function() {
	if(Meteor.isClient) {
		/**
		 *	Set up the client side Mongo collections
		 */
		App = {
			collections: {
				cf_entries: new Mongo.Collection('cf_entries'),
				cf_assets: new Mongo.Collection('cf_assets')
			}	
		};

		/**
		 *	Kick off the Depencencies for reactivity
		 */
		Dependencies.start();
	}
	if(Meteor.isServer) {
		Contentful.fetchAndPopulate().then(function(result) {
			/**
			 *	Once content is fetched and stored in the 
			 *	server side collections, we can publish it 
			 *	in here. We loop through each configured 
			 *	content type and publish a collection 
			 *	using its name
			 */
			_.each(CFConfig.contentTypes, function(contentType) {
				
				console.log('Publishing: ', contentType.name);
				Contentful.collections[contentType.name] = new Mongo.Collection(contentType.name);
				/**
				 *	Give the name of the collection the same name as 
				 *	the content type name and also use it as a filter
				 *	parameter.
				 */
				Meteor.publish(contentType.name, function() {
					return Contentful.collections.entries.find({'contentTypeName': contentType.name});
				});
			});

			ImageProcessor.init();

			/**
			 *	Then we listen for incoming changes from Contentful,
			 *	which will automatically update client side collections.
			 */
			Contentful.listenForContentChanges();

		}).fail(function(error) {
			console.log(error.message);
		});
	}
});