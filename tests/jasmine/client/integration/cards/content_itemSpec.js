'use strict';

describe('cards_content_item', function() {

	var testParent;

	describe('template', function() {

		beforeEach(function() {
			testParent = document.createElement('div');
			testParent.className = 'wrapper wrapper--content';
		});

		afterEach(function() {
			while(testParent.firstChild) {
				testParent.removeChild(testParent.firstChild);
			}
		});

		it('should render two content item info panes side by side given a grouped content item', function(done) {

			var contentItemPanes,

			/** 
			 *	Setting up
			 */
			contentItemData = [
				{
					fields: {
						content: 'First',
						images: null,
						isStandalone: false,
						order: 1,
						page: 'page',
						title: 'first test'
					}
				},
				{
					fields: {
						content: 'Second test content',
						images: null,
						isStandalone: false,
						order: 2,
						page: 'page',
						title: 'second test'
					}
				}
			];

			/**
			 *	Render the template with the data
			 */
			Blaze.renderWithData(Template.cards_content_item, contentItemData, testParent);
			contentItemPanes = testParent.getElementsByClassName('item__content__info');

			/**
			 *	Then run the tests
			 */
			expect(contentItemPanes.length).toEqual(2);

			/**
			 *	Finished
			 */
			setTimeout(done, 200);
		});

		it('should render only one content item info pane if the content item is standalone', function(done) {

			var contentItemPanes,

			/**
			 *	Dummy data
			 */
			contentItemData = {
				fields: {
					content: 'Third test content',
					images: null,
					isStandalone: true,
					order: 3,
					page: 'page',
					title: 'third test'
				}
			};

			/**
			 *	Render the template with the data
			 */
			Blaze.renderWithData(Template.cards_content_item, contentItemData, testParent);
			contentItemPanes = testParent.getElementsByClassName('item__content__info');

			/**
			 *	Then run the tests
			 */
			expect(contentItemPanes.length).toEqual(1);

			/**
			 *	Finished
			 */
			setTimeout(done, 200);
		});
	});

});