Meteor.startup(function() {
	if(Meteor.isClient) {
		/**
		 *	Set up the client side Mongo collections
		 */
		App = {
			collections: {
				entries: new Mongo.Collection('entries'),
				assets: new Mongo.Collection('assets'),
				images: new Mongo.Collection('images'),
				contentTypes: new Mongo.Collection('contentTypes')
			}	
		};

		Meteor.subscribe('assets');
	  Meteor.subscribe('entries');
    Meteor.subscribe('images');
    Meteor.subscribe('contentTypes');

		/**
		 *	Kick off the Depencencies for reactivity
		 */
		Dependencies.start();
	}
	if(Meteor.isServer) {
		
		MeteorContentful.start().fetch('contentTypes').fetch('entries').fetch('assets');    
    
    ImageProcessor.observe();
    MeteorContentful.listen();

  	Meteor.publish('assets', function() {
  		return Collections.assets.find({});
  	});
  	Meteor.publish('entries', function(){
  		return Collections.entries.find({});
  	});
    Meteor.publish('images', function(){
      return Collections.images.find({});
    });
    Meteor.publish('contentTypes', function(){
      return Collections.contentTypes.find({});
    });				
	}
});