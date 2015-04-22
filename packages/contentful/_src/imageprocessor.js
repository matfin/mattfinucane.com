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

			/**
			 *	Get a reference to each contentful asset
			 */
			this.contentfulAssets = Contentful.collections.assets.find({}).fetch();
			/**
			 *	Then loop through each row in the cursor, processing and resizing images 
			 *	for each
			 */
			_.each(this.contentfulAssets, function(asset) {

				/**
				 *	Save the resized image, then update the collection
				 */
				self.saveImagesFromAsset(asset, function(result) {
					self.updateImagesCollection(result);
				});
			});
			/**
			 *	Then publish the image collection
			 */
			Meteor.publish(CFConfig.processedImageCollectionName, function() {
				return self.imageCollection.find({});
			});

		}).run();
	},

	/**
	 *	Function to update the collection with image data
	 *
	 *	@method 	updateImagesCollection
	 *	@param 		{Object} imageData - the image data
	 */
	updateImagesCollection: function(imageData) {

		var self = this;

		/**
		 *	Collection updates need to be run within a Fiber
		 */
		this.Fiber(function() {

			self.imageCollection.update(
				{
					assetId: imageData.assetId,
					'size.suffix': imageData.size.suffix
				},
				{
					size: imageData.size,
					url: CFConfig.imageProcessor.baseUrl + '/' + imageData.filename,
					assetId: imageData.assetId
				},
				{
					upsert: true
				}
			);
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

			/**
			 *	Call the resize function, which will execute a callback
			 */
			self.resizeImagesFromAsset(result.data, function(res, error) {

				/**
				 *	Grab the filename and write the file
				 */
				var path 	 = CFConfig.imageProcessor.path, 
					filename = assetId + '-' + res.size.suffix + '.jpg';

				/**
				 *	Write the file and then execute the optional callback on success
				 */
				fs.writeFile(path + '/' + filename, res.data, {encoding: 'binary'}, function() {

					if(error) {
						console.log('Could not write file');
					}
					else {
						if(typeof callback === 'function') {
							callback({
								size: res.size,
								filename: filename,
								assetId: assetId
							});
						}
					}

				});
			});

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
				height: size.dimension.height,
				quality: CFConfig.imageProcessor.quality,
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
