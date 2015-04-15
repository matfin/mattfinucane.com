Package.describe({
	name: 			'matfin:contentful',
	version: 		'0.0.1',
	summary: 		'Package to interact with the Contentful content delivery API.',
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
	api.use([
		'mongo',
		'http',
		'ejson',
		'aramk:q',
		'underscore',
		'matfin:helpers'
	], 'server');

	/**
	 *	Package source file(s)
	 *
	 *	Note: 	If you have downloaded this package from https://atmospherejs.com/
	 *			you will need to rename settings_sample.js to settings.js and 
	 *			plug your own configuration settings in there.
	 */
	api.addFiles([
		'_config/settings.js',
		'_src/contentful.js'
	], 'server');

	api.export('CFConfig');
	api.export('Contentful');

});