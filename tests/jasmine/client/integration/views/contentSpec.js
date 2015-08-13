'use strict';

describe('views_content', function() {

	var testParent;

	describe('template', function() {

		beforeEach(function() {
			testParent = document.createElement('div');
			testParent.className = 'container';
		});

		afterEach(function() {
			while(testParent.firstChild) {
				testParent.removeChild(testParent.firstChild);
			}
		});

		it('should render the correct number of wrappers given a combination of standalone and grouped content items', function(done) {

			var contentWrappers,
					contentItems;

			/**
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 3,
				ready: function() {
					return true;
				}
			});

			spyOn(Core.app.collections.entries, 'find').and.returnValue({
				fetch: function() {
					return [
						{
							fields: {
								isStandalone: true,
								title: 'Some Content',
								images: [],
								order: 1
							}
						},
						{
							fields: {
								isStandalone: false,
								title: 'Some More Content',
								images: [],
								order: 2
							}
						},
						{
							fields: {
								isStandalone: false,
								title: 'Even More Content',
								images: [],
								order: 3
							}
						},
						{
							fields: {
								isStandalone: true,
								title: 'More Test Content',
								images: [],
								order: 4
							}
						}
					]
				}
			});

			/** 
			 *	Render the template
			 */
			Blaze.render(Template.views_content, testParent);
			contentWrappers = testParent.getElementsByClassName('wrapper--content');
			contentItems = testParent.getElementsByClassName('item__content__info');

			/**
			 *	Run the tests
			 */
			expect(contentWrappers.length).toEqual(3);
			expect(contentItems.length).toEqual(4);			

			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		})

	});

});