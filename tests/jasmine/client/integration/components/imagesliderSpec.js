'use strict';

describe('components_imageslider', function() {

	describe('template', function() {

		var testParent;

		beforeEach(function() {
			/**
			 *	Parent for the rendered template
			 */
			testParent = document.createElement('div');
			testParent.className = 'item__content__images';
		});

		afterEach(function() {
			while(testParent.firstChild) {
				testParent.removeChild(testParent.firstChild);
			}
		});

		it('should render an equal number of slides to the number of images provided', function(done) {

			/**
			 *	Setting up and providing dummy data
			 */
			var images = [
				[{filename: "image.jpg"}],
				[{filename: "image-two.jpg"}],
				[{filename: "image-three.jpg"}]
			],
			slides;

			/**
			 *	Render the template
			 */
			Blaze.renderWithData(Template.components_imageslider, images, testParent);

			/**
			 *	Run the tests
			 */
			slides = testParent.getElementsByClassName('slide');
			expect(slides.length).toEqual(3);

			/**
			 *	Finished
			 */
			setTimeout(done, 100);
		});

		it('should render the slider paddles', function(done) {
			/**
			 *	Setting up and providing dummy data
			 */
			var images = [
				[{filename: "image.jpg"}],
				[{filename: "image-two.jpg"}],
				[{filename: "image-three.jpg"}]
			],
			paddles;

			/**
			 *	Render the template
			 */
			Blaze.renderWithData(Template.components_imageslider, images, testParent);

			/**
			 *	Run the tests
			 */
			paddles = testParent.getElementsByClassName('slider__paddle');
			expect(paddles.length).toEqual(2);

			/**
			 *	Finished
			 */
			setTimeout(done, 100);
		});

		it('should not render the slider paddles for touch based devices', function(done) {
			
			/**
			 *	Spies
			 */
			spyOn(Helpers, 'isTouchDevice').and.returnValue(true);

			/**
			 *	Setting up and providing dummy data
			 */
			var images = [
				[{filename: "image.jpg"}],
				[{filename: "image-two.jpg"}],
				[{filename: "image-three.jpg"}]
			],
			paddles;

			/**
			 *	Render the template
			 */
			Blaze.renderWithData(Template.components_imageslider, images, testParent);
			paddles = testParent.getElementsByClassName('slider__paddle');
			expect(paddles.length).toEqual(0)

			/**
			 *	Finished
			 */
			setTimeout(done, 100);
		});
	});
});