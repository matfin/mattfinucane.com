Package.describe({
	name: 			'matfin:github',
	version: 		'0.0.1',
	summary: 		'Package used to fetch user data from the GitHub api.',
	documentation: 	'README.md'
});

Package.onUse(function(api) {

	/**
	 *	Meteor version required
	 */
	api.versionsFrom('1.1.0.2');

	/**
	 *	Dependencies
	 */
	api.use([
		'mongo',
		'ejson',
		'underscore',
		'http',
		'aramk:q',
		'meteorhacks:npm'
	], 'server');

	/**
	 *	Source code and settings files
	 *
	 *	Note: 	You will need to rename settings_sample.js to settings.js
	 *			and plug in your details, such as your OAuth key
	 */
	api.addFiles([
		'_config/settings.js',
		'_src/github.js'
	], 'server');

	api.export('GHConfig');
	api.export('GitHub');

});