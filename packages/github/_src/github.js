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
		commits: 	new Mongo.Collection('gh_commits');
	}
	
};
