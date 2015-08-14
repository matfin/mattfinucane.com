'use strict';

describe('templateHelpers', function() {

	describe('numberOfItemsInSlide', function() {

		it('should call depend on the resized dependency when run', function(done) {
			/**
			 *	Spies
			 */
			spyOn(Dependencies.resized, 'depend').and.returnValue({});
			spyOn(Helpers, 'deviceClass').and.returnValue({
				isHD: true
			});
			/**
			 *	Call the function and run the tests
			 */
			Core.templateHelpers.numberOfItemsInSlide();
			expect(Dependencies.resized.depend).toHaveBeenCalled();
			/**
			 *	Done
			 */
			done();
		});

		it('should return a value of 2 when the deviceClass isDesktop', function(done) {
			/**
			 *	Spies
			 */
			spyOn(Dependencies.resized, 'depend').and.returnValue({});
			spyOn(Helpers, 'deviceClass').and.returnValue({
				isDesktop: true
			});
			/**
			 *	Call the function and run the tests
			 */
			expect(Core.templateHelpers.numberOfItemsInSlide()).toEqual(2);
			/**
			 *	Done
			 */
			done();
		});

		it('should return a value of 3 when the deviceClass isHD', function(done) {
			/**
			 *	Spies
			 */
			spyOn(Dependencies.resized, 'depend').and.returnValue({});
			spyOn(Helpers, 'deviceClass').and.returnValue({
				isHD: true
			});

			/**
			 *	Call the function and run the tests
			 */
			expect(Core.templateHelpers.numberOfItemsInSlide()).toEqual(3);
			/**
			 *	Done
			 */
			done();
		});
	});

	describe('images', function() {

		it('should call find on the images collection with the correct parameters given data, and then return the correct values', function(done) {

			/**
			 *	Spies
			 */
			spyOn(Core.app.collections.images, 'find').and.returnValue({
				fetch: function() {
					return [
						{asset_id: 'dummy-1'},
						{asset_id: 'dummy-1'},
						{asset_id: 'dummy-1'},
						{asset_id: 'dummy-1'},
						{asset_id: 'dummy-1'},
						{asset_id: 'dummy-1'},
						{asset_id: 'dummy-1'},
						{asset_id: 'dummy-1'},
						{asset_id: 'dummy-1'},
						{asset_id: 'dummy-2'},
						{asset_id: 'dummy-2'},
						{asset_id: 'dummy-2'},
						{asset_id: 'dummy-2'},
						{asset_id: 'dummy-2'},
						{asset_id: 'dummy-2'},
						{asset_id: 'dummy-2'},
						{asset_id: 'dummy-2'},
						{asset_id: 'dummy-2'}
					];
				}
			});

			/**
			 *	Dummy data
			 */ 
			var selector = [
				{
					sys: {
						id: 'dummy-1'
					}
				},
				{
					sys: {
						id: 'dummy-2'
					}
				}
			];

			/**
			 *	Call the function and run the tests
			 */
			var result = Core.templateHelpers.images(selector);

			expect(Core.app.collections.images.find).toHaveBeenCalledWith({asset_id: {$in: ['dummy-1', 'dummy-2']}});
			expect(result.collection.length).toEqual(2);
			expect(result.useSlider).toBe(true);

			/**
			 *	Finished
			 */
			done();
		});

		it('should return an empty collection of images and useSlider should be false if the selector was not set', function(done) {

			/**
			 *	Spies
			 */
			spyOn(Core.app.collections.images, 'find').and.returnValue({
				fetch: function() {
					return;
				}
			});

			/**
			 *	Call the function and run the tests
			 */
			var result = Core.templateHelpers.images(null);

			expect(result.collection.length).toEqual(0);
			expect(result.useSlider).toBe(false);

			/**
			 *	Finished
			 */
			done();
		});

	});

});