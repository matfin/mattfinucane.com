Package.describe({
	name: 			'matfin:helpers',
	version: 		'0.0.1',
	summary: 		'Collection of useful functions',
	documentation: 	'README.md'
});

Package.onUse(function(api) {
	/**
	 *	Minimum version of Meteor required
	 */
	api.versionsFrom('1.1.0.2');

	/**
	 *	Dependencies
	 */
	api.use('underscore', ['client', 'server']);

	/**
	 *	Package source files
	 */
	api.addFiles([
		'_src/helpers.js'
	], 'server');

	api.export('Helpers');

});