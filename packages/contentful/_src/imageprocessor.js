/**
 *	Class for fetching an image stored on Contentful servers, resizing them
 *	and storing them on the local running server.
 *
 *	@class ImageProcessor
 *	@static
 */
ImageProcessor = {

	/**
	 *	Meteor Fiber needed for making async calls
	 */
	Fiber: false,

	/**
	 *	Imagemagick module for resizing images
	 */
	Imagemagick: false,

	/**
	 *	Server side collection to store information about
	 *	processed image assets
	 */
	imageCollection: new Mongo.Collection(CFConfig.processedImageCollectionName),

	/**
	 *	Incoming cursor for existing Contentful assets
	 */
	contentfulAssets: false,

	/**
	 *	Function to iterate through each contentful asset
	 *
	 *	@method 	init
	 */
	init: function() {

		/**
		 *	Required meteor npm modules
		 */
		this.Fiber = Meteor.npmRequire('fibers');
		this.Imagemagick = Meteor.npmRequire('node-imagemagick');

		if(!Meteor.npmRequire) {
			console.log('Image processor init, meteor npm require not found.');
		}

		var self = this;

		this.Fiber(function() {
			this.contentfulAssets = Contentful.collections.assets.find({}).fetch();
			_.each(this.contentfulAssets, function(asset) {

				self.saveImagesFromAsset(asset, function(result) {
					console.log(result);
				});

			});
		}).run();
	},

	/**
	 *	Function to save image asset(s), calling a resize function and then writing to disk
	 *
	 *	@method 	saveImageFromAsset
	 *	@param  	{Object} asset - the Conteontful assset 
	 *	@param 		{Object} callback - the callback function on save
	 */
	saveImagesFromAsset: function(asset, callback) {

		var self 		= this,
			assetId 	= asset.sys.id,
			sourceUrl 	= asset.fields.file.url,
			destPath 	= CFConfig.imageProcessor.path,
			fs 			= Meteor.npmRequire('fs');

		this.readRemoteFileFromUrl(sourceUrl)
		.then(function(result) {

			self.resizeImagesFromAsset(result.data, function(res, error) {

				var filename = assetId + '-' + res.size.suffix + '.jpg';

				self.writeFile(res.data, CFConfig.imageProcessor.path, filename);
			});

			// /**
			//  *	Resize the fetched image
			//  */
			// self.Imagemagick.resize({
			// 	srcData: result.data,
			// 	width: 256
			// }, function(error, stdout, stderr) {

			// 	if(error || stderr) throw error;

			// 	self.writeFile(stdout, '/var/www/mattfinucane.com', Date.now() + '.jpg');
			// });


		}).fail(function(error) {

			console.log('Image asset save failed.')

		});
	},

	/**
	 *	Function to batch resize images
	 *
	 *	@method 	resizeImagesFromAsset
	 *	@param 		{Object} data - the source data for the image to be resized
	 *	@param 		{Object} callback - optional callback to be executed
	 */
	resizeImagesFromAsset: function(data, callback) {

		var self = this;

		_.each(CFConfig.imageProcessor.sizes, function(size) {
			self.Imagemagick.resize({
				srcData: data,
				width: size.dimension.width,
				height: size.dimension.height
			}, function(err, stdout, stderr) {

				if(typeof callback === 'function') {

					if(err || stderr) {
						callback(err);
					}
					else {
						callback({
							size: size,
							data: stdout
						}, null);
					}
				}
			});
		});
	},

	/**
	 *	Function to write out data to the filesystem
	 *
	 *	@method 	writeFile
	 *	@param   	{Object} data - the data to be written
	 *	@param 		{String} path - the filesystem path
	 *	@param 		{String} name - the filename
	 *	@return 	{Object} a promise resolved or rejected
	 */
	writeFile: function(data, path, name) {

		var deferred 	= Q.defer(),
			fs 			= Npm.require('fs');

		fs.writeFileSync(path + '/' + name, data, 'binary', function(error) {
			if(error) {
				deferred.reject({
					status: 'error',
					data: error
				});
			}
			else {
				end = Date.now();
				deferred.resolve({
					status: 'ok'
				});
			}
		});

		return deferred.promise;
	},

	/**
	 *	Function to read the contents of a remote resource
	 *
	 *	@method 	readRemoteFileFromUrl
	 *	@param 		{String} url - the url for the resource
	 *	@return  	{Object} - a resolved or rejected promise
	 */
	readRemoteFileFromUrl: function(url) {
		var deferred 	= Q.defer(),
			http 		= Npm.require('http'),
			url 		= 'http:' + url;
		/**
		 *	We need to use the nodejs http module,
		 *	since Meteor HTTP can only deal with 
		 *	String and Json data.
		 */
		var req = http.get(url, function(response) {

			/**
			 *	Buffer to store incoming stream of data
			 */ 
			//var buffer = new Buffer('', 'binary');
			var data = '';

			/**
			 *	Expecting a binary encoded response
			 */
			response.setEncoding('binary');

			/**
			 *	When data comes in, ammend the buffer
			 */
			response.on('data', function(chunk) {	
				//buffer = Buffer.concat([buffer, chunk]);
				data += chunk;
			});

			/**
			 *	If there was an error
			 */
			response.on('error', function(error) {

				console.log('image fetch error');

				deferred.reject({
					status: 'error',
					data: error
				});
			});

			/**
			 *	Download complete
			 */
			response.on('end', function() {
				deferred.resolve({
					status: 'ok',
					data: data
				});
			});
		});

		return deferred.promise;
	}
};
