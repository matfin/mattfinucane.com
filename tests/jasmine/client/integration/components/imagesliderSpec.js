'use strict';

describe('components_imageslider', function() {

	describe('template', function() {

		var testParent, images;

		beforeEach(function() {
			/**
			 *	Parent for the rendered template
			 */
			testParent = document.createElement('div');
			testParent.className = 'item__content__images';
			/**
			 *	Dummy data
			 */
			images = [
				[{filename: "image.jpg"}],
				[{filename: "image-two.jpg"}],
				[{filename: "image-three.jpg"}]
			];
		});

		afterEach(function() {
			while(testParent.firstChild) {
				testParent.removeChild(testParent.firstChild);
			}
		});

		it('should render an equal number of slides to the number of images provided', function(done) {

			/**
			 *	Setting up
			 */
			var slides;

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
			
			var paddles;

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

			var paddles;

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

		it('should render the slider indicator with the correct number of items for touch based devices', function(done) {

			/**
			 *	Spies
			 */
			spyOn(Helpers, 'isTouchDevice').and.returnValue(true);

			var indicator, indicator_items;

			/**
			 *	Render the template
			 */
			Blaze.renderWithData(Template.components_imageslider, images, testParent);
			indicator = testParent.getElementsByClassName('slider__indicator');
			indicator_items = testParent.getElementsByClassName('slider__indicator__item');
			expect(indicator.length).toEqual(1);
			expect(indicator_items.length).toEqual(3);

			/**
			 *	Finished
			 */
			setTimeout(done, 100);
		});

		it('should render the slider with the correct width percentage', function(done) {

			var slider;

			/**
			 *	Render the content and run the tests
			 */
			Blaze.renderWithData(Template.components_imageslider, images, testParent);
			slider = testParent.getElementsByClassName('slider__container__slider')[0];
			expect(slider.style.width).toEqual('300%');

			/**
			 *	Finished
			 */
			setTimeout(done, 100);
		});

	});
});