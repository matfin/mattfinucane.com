/**
 *	Class storing configuration for the Contentful content delivery API
 *
 *	@class CFConfig
 *	@static
 */
CFConfig = {
	
	/**
	 *	Contentful endpoint URL
	 *	
	 *	@property	endpointUrl
	 *	@type		{String}
	 */
	endpointUrl: 'http://cdn.contentful.com',

	/**
	 *	Authorisation header
	 *	
	 *	@property	authorisationHeader
	 *	@type		{String}
	 */
	authorisationHeader: 'Bearer <Your auth id>',

	/**
	 *	Content type header
	 *	
	 *	@property	contentTypeHeader
	 *	@type 		{String}
	 */
	contentTypeHeader: 'application/vnd.contentful.delivery.v1+json',

	/**
	 *	Space ID
	 *	
	 *	@property	spaceID
	 *	@type 		{String}
	 */
	spaceID: '<your space ID>',

	/**
	 *	Collection name for processed Contentful Images
	 *
	 *	@property 	processedImageCollectionName
	 *	@type 		{String}
	 */
	processedImageCollectionName: 'ac_images',

	/**
	 *	Callback authorisation key, for when Contentful post data to us
	 *	on update to an entry
	 *
	 *	@property	callbackAuthKey
	 *	@type 		{String}
	 */
	callbackAuthKey: '<Optional callback auth key>',

	/**
	 *	Array of content type objects with their name and associated ID
	 *	
	 *	@property	contentTypes
	 *	@type 		{Array}
	 */
	contentTypes: [
		{
			'name': '<content type name>',
			'id': 	'<content type id>'
		}
	],

	/**
	 *	Image settings and sizes for transforming image assets
	 *
	 *	@property 	imageProcessor
	 *	@type 		{Array}
	 */
	imageProcessor: {
		path: '<local destination filesystem path>',
		baseUrl: 'http://media.somewhere.tld/path/to/images',
		quality: 0.9,
		sizes: [
			{
				'suffix': 'desktop-retina',
				'dimension': {
					'width': '1440',
					'height': '1080'
				}
			},
			{
				'suffix': 'desktop',
				'dimension': {
					'width': '720',
					'height': '540'
				}
			},
			{
				'suffix': 'laptop',
				'dimension': {
					'width': '480',
					'height': '540'
				}
			}
		]
	}
}