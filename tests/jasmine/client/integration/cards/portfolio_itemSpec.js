'use strict';

describe('cards_portfolio_item', function() {

	var testParent,
			itemData;

	describe('template', function() {

		beforeEach(function() {
			/**
			 *	Dummy data for the portfolio item
			 */
			itemData = {
				fields: {
					dateCreated: '2015-08-15',
					description: 'A test description',
					githubUrl: 'http://github.com/test/project',
					productionUrl: 'http://test.tld',
					screenshots: [
						{
							fields: {
								description: 'portfolio',
								title: 'Test Title'
							},
							sys: {
								id: 'abcd123'
							}
						},
						{
							fields: {
								description: 'portfolio',
								title: 'Test Title'
							},
							sys: {
								id: 'efgh456'
							}
						}
					],
					skills: [
						{
							fields: {
								title: 'Skill One'
							},
							sys: {
								id: 'ij78'
							}
						},
						{
							fields: {
								title: 'Skill Two'
							},
							sys: {
								id: 'kl910'
							}
						},
						{
							fields: {
								title: 'Skill Three'
							},
							sys: {
								id: 'mn11'
							}
						}
					],
					title: 'Test Title',
					urlTitle: '/test.tld'
				}
			};

			testParent = document.createElement('div');
			testParent.className = 'wrapper wrapper--content';
		});

		afterEach(function() {
			while(testParent.firstChild) {
				testParent.removeChild(testParent.firstChild);
			}
		});

		it('should render the correct content', function(done) {

			/**
			 *	Setting up nodes to test
			 */
			var title, production_link, description, skills;

			/**
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 2,
				ready: function() {
					return true;
				}
			});

			spyOn(Core.app.collections.entries, 'find').and.returnValue({
				fetch: function() {
					return [
						{title: 'Skill One'},
						{title: 'Skill Two'},
						{title: 'Skill Three'}
					];
				}
			});

			/**
			 *	Render the content with data
			 */
			Blaze.renderWithData(Template.cards_portfolio_item, itemData, testParent);

			/**
			 *	Run the tests
			 */

			/**
			 *	Finished
			 */
			setTimeout(done, 200);
		});

	});

});