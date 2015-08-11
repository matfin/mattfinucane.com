'use strict';

Package.describe({
	name: 			'com.mattfinucane:core',
	version: 		'0.0.1',
	summary: 		'Core and helper functions used across this app.'
});

Package.onUse(function(api) {
	/**
	 *	Minimum version of Meteor required
	 */
	api.versionsFrom('1.1.0.2');

	/**
	 *	Package source files
	 */
	api.addFiles([
		'_src/helpers.js'
	], ['client' ,'server']);

	api.addFiles('_src/core.js', 'client');

	api.export('Helpers');
	api.export('Core');

});