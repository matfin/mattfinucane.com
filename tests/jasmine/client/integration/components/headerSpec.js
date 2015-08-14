'use strict';

describe('components_header', function() {

	describe('template', function() {

		var wrapper;

		beforeEach(function() {
			/**
			 *	Parent for the rendered template
			 */
			wrapper = document.createElement('div');
			wrapper.className = 'wrapper';
			/**
			 *	Render the template
			 */
			Blaze.render(Template.components_header, wrapper);
		});

		it('should render the elements correctly', function(done) {
			
			/**
			 *	Setting up
			 */
			var nav, button, list_items, links;

			/**
			 *	Then run the tests
			 */
			nav = wrapper.getElementsByTagName('nav');
			expect(nav.length).toEqual(1);
			
			button = wrapper.getElementsByTagName('button');
			expect(button.length).toEqual(1);

			list_items = wrapper.getElementsByTagName('li');
			expect(list_items.length).toEqual(3);

			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});

	});

});