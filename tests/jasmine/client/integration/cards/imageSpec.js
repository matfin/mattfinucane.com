'use strict';

describe('cards_image', function() {

	var testParent,
			images;

	describe('template', function() {

		beforeEach(function() {
	
			testParent = document.createElement('div');
			testParent.className = 'image__standalone';

			images = [
				{width: 800, density: {multiplier: 1, prefixed: ''}, device: 'desktop', filename: 'test-desktop.jpg'},
				{width: 1600, density: {multiplier: 2, prefixed: '@2x'}, device: 'desktop', filename: 'test-desktop@2x.jpg'},
				{width: 2400, density: {multiplier: 3, prefixed: '@3x'}, device: 'desktop', filename: 'test-desktop@3x.jpg'},
				{width: 400, density: {multiplier: 1, prefixed: ''}, device: 'tablet', filename: 'test-tablet.jpg'},
				{width: 800, density: {multiplier: 2, prefixed: '@2x'}, device: 'tablet', filename: 'test-tablet@2x.jpg'},
				{width: 1200, density: {multiplier: 3, prefixed: '@3x'}, device: 'tablet', filename: 'test-tablet@3x.jpg'},
				{width: 320, density: {multiplier: 1, prefixed: ''}, device: 'mobile', filename: 'test-mobile.jpg'},
				{width: 640, density: {multiplier: 2, prefixed: '@2x'}, device: 'mobile', filename: 'test-mobile@2x.jpg'},
				{width: 960, density: {multiplier: 3, prefixed: '@3x'}, device: 'mobile', filename: 'test-mobile@3x.jpg'}
			];
		});

		afterEach(function() {
			images = [];
			while(testParent.firstChild) {
				testParent.removeChild(testParent.firstChild);
			}
		});

		it('should render a desktop sized image.', function(done) {

			var image;

			/**
			 *	Spy to set the device parameters
			 */
			spyOn(Helpers, 'deviceClass').and.returnValue({
				isDesktop: true,
				pixelDensity: 1
			});

			/**
			 *	Render the template with the data
			 */
			Blaze.renderWithData(Template.cards_image, images, testParent);
			image = testParent.getElementsByTagName('img')[0];

			/**
			 *	Run the tests
			 */
			expect(image).toBeDefined();
			expect(image.getAttribute('src')).toContain('test-desktop.jpg');
			expect(image.width).toEqual(800);
			
			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});

		it('should render an @2x desktop sized image.', function(done) {

			var image;

			/**
			 *	Spy to set the device parameters
			 */
			spyOn(Helpers, 'deviceClass').and.returnValue({
				isDesktop: true,
				pixelDensity: 2
			});

			/**
			 *	Render the template with the data
			 */
			Blaze.renderWithData(Template.cards_image, images, testParent);
			image = testParent.getElementsByTagName('img')[0];

			/**
			 *	Run the tests
			 */
			expect(image).toBeDefined();
			expect(image.getAttribute('src')).toContain('test-desktop@2x.jpg');
			expect(image.width).toEqual(1600);
			
			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});

		it('should render an @3x desktop sized image.', function(done) {

			var image;

			/**
			 *	Spy to set the device parameters
			 */
			spyOn(Helpers, 'deviceClass').and.returnValue({
				isDesktop: true,
				pixelDensity: 3
			});

			/**
			 *	Render the template with the data
			 */
			Blaze.renderWithData(Template.cards_image, images, testParent);
			image = testParent.getElementsByTagName('img')[0];

			/**
			 *	Run the tests
			 */
			expect(image).toBeDefined();
			expect(image.getAttribute('src')).toContain('test-desktop@3x.jpg');
			expect(image.width).toEqual(2400);
			
			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});

		it('should render a tablet sized image.', function(done) {

			var image;

			/**
			 *	Spy to set the device parameters
			 */
			spyOn(Helpers, 'deviceClass').and.returnValue({
				isTablet: true,
				pixelDensity: 1
			});

			/**
			 *	Render the template with the data
			 */
			Blaze.renderWithData(Template.cards_image, images, testParent);
			image = testParent.getElementsByTagName('img')[0];

			/**
			 *	Run the tests
			 */
			expect(image).toBeDefined();
			expect(image.getAttribute('src')).toContain('test-tablet.jpg');
			expect(image.width).toEqual(400);
			
			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});

		it('should render an @2x tablet sized image.', function(done) {

			var image;

			/**
			 *	Spy to set the device parameters
			 */
			spyOn(Helpers, 'deviceClass').and.returnValue({
				isTablet: true,
				pixelDensity: 2
			});

			/**
			 *	Render the template with the data
			 */
			Blaze.renderWithData(Template.cards_image, images, testParent);
			image = testParent.getElementsByTagName('img')[0];

			/**
			 *	Run the tests
			 */
			expect(image).toBeDefined();
			expect(image.getAttribute('src')).toContain('test-tablet@2x.jpg');
			expect(image.width).toEqual(800);
			
			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});

		it('should render an @3x tablet sized image.', function(done) {

			var image;

			/**
			 *	Spy to set the device parameters
			 */
			spyOn(Helpers, 'deviceClass').and.returnValue({
				isTablet: true,
				pixelDensity: 3
			});

			/**
			 *	Render the template with the data
			 */
			Blaze.renderWithData(Template.cards_image, images, testParent);
			image = testParent.getElementsByTagName('img')[0];

			/**
			 *	Run the tests
			 */
			expect(image).toBeDefined();
			expect(image.getAttribute('src')).toContain('test-tablet@3x.jpg');
			expect(image.width).toEqual(1200);
			
			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});

		it('should render a mobile sized image.', function(done) {

			var image;

			/**
			 *	Spy to set the device parameters
			 */
			spyOn(Helpers, 'deviceClass').and.returnValue({
				isMobile: true,
				pixelDensity: 1
			});

			/**
			 *	Render the template with the data
			 */
			Blaze.renderWithData(Template.cards_image, images, testParent);
			image = testParent.getElementsByTagName('img')[0];

			/**
			 *	Run the tests
			 */
			expect(image).toBeDefined();
			expect(image.getAttribute('src')).toContain('test-mobile.jpg');
			expect(image.width).toEqual(320);
			
			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});

		it('should render an @2x mobile sized image.', function(done) {

			var image;

			/**
			 *	Spy to set the device parameters
			 */
			spyOn(Helpers, 'deviceClass').and.returnValue({
				isMobile: true,
				pixelDensity: 2
			});

			/**
			 *	Render the template with the data
			 */
			Blaze.renderWithData(Template.cards_image, images, testParent);
			image = testParent.getElementsByTagName('img')[0];

			/**
			 *	Run the tests
			 */
			expect(image).toBeDefined();
			expect(image.getAttribute('src')).toContain('test-mobile@2x.jpg');
			expect(image.width).toEqual(640);
			
			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});

		it('should render an @3x mobile sized image.', function(done) {

			var image;

			/**
			 *	Spy to set the device parameters
			 */
			spyOn(Helpers, 'deviceClass').and.returnValue({
				isMobile: true,
				pixelDensity: 3
			});

			/**
			 *	Render the template with the data
			 */
			Blaze.renderWithData(Template.cards_image, images, testParent);
			image = testParent.getElementsByTagName('img')[0];

			/**
			 *	Run the tests
			 */
			expect(image).toBeDefined();
			expect(image.getAttribute('src')).toContain('test-mobile@3x.jpg');
			expect(image.width).toEqual(960);
			
			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});
	});

	describe('helpers', function() {
		describe('imageAssets', function() {

			var images;

			beforeEach(function() {
				images = [
					{width: 800, density: {multiplier: 1, prefixed: ''}, device: 'desktop', filename: 'test-desktop.jpg'},
					{width: 1600, density: {multiplier: 2, prefixed: '@2x'}, device: 'desktop', filename: 'test-desktop@2x.jpg'},
					{width: 2400, density: {multiplier: 3, prefixed: '@3x'}, device: 'desktop', filename: 'test-desktop@3x.jpg'},
					{width: 400, density: {multiplier: 1, prefixed: ''}, device: 'tablet', filename: 'test-tablet.jpg'},
					{width: 800, density: {multiplier: 2, prefixed: '@2x'}, device: 'tablet', filename: 'test-tablet@2x.jpg'},
					{width: 1200, density: {multiplier: 3, prefixed: '@3x'}, device: 'tablet', filename: 'test-tablet@3x.jpg'},
					{width: 320, density: {multiplier: 1, prefixed: ''}, device: 'mobile', filename: 'test-mobile.jpg'},
					{width: 640, density: {multiplier: 2, prefixed: '@2x'}, device: 'mobile', filename: 'test-mobile@2x.jpg'},
					{width: 960, density: {multiplier: 3, prefixed: '@3x'}, device: 'mobile', filename: 'test-mobile@3x.jpg'}
				];
			});

			afterEach(function() {
				images = []
			});

			it('should return an image named test-mobile.jpg', function(done) {
				/**
				 *	Spies
				 */
				spyOn(Helpers, 'deviceClass').and.returnValue({
					isMobile: true,
					pixelDensity: 1
				});
				/**
				 *	Tests
				 */
				var image = Template.cards_image.__helpers[' imageAssets'].call(images);
				expect(image[0].filename).toEqual('test-mobile.jpg');
				/**
				 *	Finished
				 */
				done();
			});

			it('should return an image named test-mobile@2x.jpg', function(done) {
				/**
				 *	Spies
				 */
				spyOn(Helpers, 'deviceClass').and.returnValue({
					isMobile: true,
					pixelDensity: 2
				});
				/**
				 *	Tests
				 */
				var image = Template.cards_image.__helpers[' imageAssets'].call(images);
				expect(image[0].filename).toEqual('test-mobile@2x.jpg');
				/**
				 *	Finished
				 */
				done();
			});

			it('should return an image named test-mobile@3x.jpg', function(done) {
				/**
				 *	Spies
				 */
				spyOn(Helpers, 'deviceClass').and.returnValue({
					isMobile: true,
					pixelDensity: 3
				});
				/**
				 *	Tests
				 */
				var image = Template.cards_image.__helpers[' imageAssets'].call(images);
				expect(image[0].filename).toEqual('test-mobile@3x.jpg');
				/**
				 *	Finished
				 */
				done();
			});

			it('should return an image named test-tablet.jpg', function(done) {
				/**
				 *	Spies
				 */
				spyOn(Helpers, 'deviceClass').and.returnValue({
					isTablet: true,
					pixelDensity: 1
				});
				/**
				 *	Tests
				 */
				var image = Template.cards_image.__helpers[' imageAssets'].call(images);
				expect(image[0].filename).toEqual('test-tablet.jpg');
				/**
				 *	Finished
				 */
				done();
			});

			it('should return an image named test-tablet@2x.jpg', function(done) {
				/**
				 *	Spies
				 */
				spyOn(Helpers, 'deviceClass').and.returnValue({
					isTablet: true,
					pixelDensity: 2
				});
				/**
				 *	Tests
				 */
				var image = Template.cards_image.__helpers[' imageAssets'].call(images);
				expect(image[0].filename).toEqual('test-tablet@2x.jpg');
				/**
				 *	Finished
				 */
				done();
			});

			it('should return an image named test-tablet@3x.jpg', function(done) {
				/**
				 *	Spies
				 */
				spyOn(Helpers, 'deviceClass').and.returnValue({
					isTablet: true,
					pixelDensity: 3
				});
				/**
				 *	Tests
				 */
				var image = Template.cards_image.__helpers[' imageAssets'].call(images);
				expect(image[0].filename).toEqual('test-tablet@3x.jpg');
				/**
				 *	Finished
				 */
				done();
			});

			it('should return an image named test-desktop.jpg', function(done) {
				/**
				 *	Spies
				 */
				spyOn(Helpers, 'deviceClass').and.returnValue({
					isDesktop: true,
					pixelDensity: 1
				});
				/**
				 *	Tests
				 */
				var image = Template.cards_image.__helpers[' imageAssets'].call(images);
				expect(image[0].filename).toEqual('test-desktop.jpg');
				/**
				 *	Finished
				 */
				done();
			});

			it('should return an image named test-desktop@2x.jpg', function(done) {
				/**
				 *	Spies
				 */
				spyOn(Helpers, 'deviceClass').and.returnValue({
					isDesktop: true,
					pixelDensity: 2
				});
				/**
				 *	Tests
				 */
				var image = Template.cards_image.__helpers[' imageAssets'].call(images);
				expect(image[0].filename).toEqual('test-desktop@2x.jpg');
				/**
				 *	Finished
				 */
				done();
			});

			it('should return an image named test-desktop@3x.jpg', function(done) {
				/**
				 *	Spies
				 */
				spyOn(Helpers, 'deviceClass').and.returnValue({
					isDesktop: true,
					pixelDensity: 3
				});
				/**
				 *	Tests
				 */
				var image = Template.cards_image.__helpers[' imageAssets'].call(images);
				expect(image[0].filename).toEqual('test-desktop@3x.jpg');
				/**
				 *	Finished
				 */
				done();
			});
		});
	});
});