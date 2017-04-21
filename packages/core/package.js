'use strict';

Package.describe({
	name: 			'com.mattfinucane:core',
	version: 		'0.1.0',
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
		'_src/helpers.js',
		'_src/core.js'
	], 'client');

	api.export('Helpers');
	api.export('Core');
});

Package.onTest(function(api) {
	/**
	 *	Minimum version of Meteor required
	 */
	api.versionsFrom('1.1.0.2');

	api.use([
		'sanjo:jasmine@0.16.3',
		'com.mattfinucane:core'
	]);

	api.addFiles([
		'tests/jasmine/client/unit/helpersSpec.js'
	]);

});