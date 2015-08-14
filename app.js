'use strict';

Meteor.startup(function() {

	if(Meteor.isClient) {

		/**
		 *	Set up the client side Mongo collections
		 */
		Core.app = {
			collections: {
				entries: new Mongo.Collection('entries'),
				images: new Mongo.Collection('images'),
			}
		};

		/**
		 *	Kick off the Depencencies for reactivity
		 */
		Dependencies.start();
	}
	if(Meteor.isServer) {

		if(Meteor.settings && Meteor.settings.app && Meteor.settings.app.contentful) {
			console.log('Booting server with Contentful enabled.');
			MeteorContentful.start().fetch('contentTypes').fetch('entries').fetch('assets');    
    	ImageProcessor.observe();
    	MeteorContentful.listen();
		}
		else {
			console.log('Booting server with Contentful disabled.');
		}			
	}
});