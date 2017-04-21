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

	describe('helpers', function() {

		describe('groupedContentItems', function() {

			it('it should return the correct combination of content items', function(done) {
				
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
				 *	Dummy data
				 */
				var data = {
					page: 'test'
				};

				/**
				 *	Call the helper function and run the tests
				 */
				var result = Template.views_content.__helpers[' groupedContentItems'].call(data);

				expect(result.length).toEqual(3);
				expect(result[0] instanceof Array).toBe(true);
				expect(result[0].length).toEqual(2);
				expect(result[1] instanceof Object).toBe(true);
				expect(result[2] instanceof Object).toBe(true);

				/**
				 *	Finished
				 */
				done();
			});

		});

	});

});