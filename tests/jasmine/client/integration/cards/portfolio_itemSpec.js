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
			var links, description, skills;

			/**
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 22,
				ready: function() {
					return true;
				}
			});

			spyOn(Core.app.collections.entries, 'find').and.returnValue({
				fetch: function() {
					return [
						{
							fields: {
								title: 'Skill One'
							}
						},
						{
							fields: {
								title: 'Skill Two'
							}
						},
						{
							fields: {
								title: 'Skill Three'
							}
						}
					];
				}
			});

			/**
			 *	Render the content with data
			 */
			Blaze.renderWithData(Template.cards_portfolio_item, itemData, testParent);
			links = testParent.getElementsByClassName('item__content__link');
			description = testParent.getElementsByTagName('p');
			skills = testParent.getElementsByClassName('item__skills__list__item');

			/**
			 *	Run the tests
			 */
			expect(links[0].firstChild.wholeText.trim()).toEqual('Test Title');
			expect(links[0].getAttribute('href')).toEqual('http://test.tld');
			expect(links[1].getAttribute('href')).toEqual('http://github.com/test/project');
			expect(description[0].firstChild.wholeText.trim()).toEqual('A test description');
			expect(skills.length).toEqual(3);
			expect(skills[0].firstChild.wholeText.trim()).toEqual('Skill One');
			expect(skills[1].firstChild.wholeText.trim()).toEqual('Skill Two');
			expect(skills[2].firstChild.wholeText.trim()).toEqual('Skill Three');

			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});

		it('should not render the project title as a link when there is no production url', function(done) {

			var title;

			/**
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 2,
				ready: function() {
					return true;
				}
			});

			/**
			 *	Remove the production url from the dummy data
			 */
			delete itemData.fields.productionUrl;

			/**
			 *	Render the template
			 */
			Blaze.renderWithData(Template.cards_portfolio_item, itemData, testParent);
			title = testParent.getElementsByClassName('item__content__info__title')[0];

			/**
			 *	Then test to see if the first child is a text node (and not a link)
			 */
			expect(title.firstChild.wholeText.trim()).toEqual('Test Title');

			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});

		it('should not render the skills block title as a link when there is no github url', function(done) {

			var skillsTitle;

			/**
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 2,
				ready: function() {
					return true;
				}
			});

			/**
			 *	Remove the production url from the dummy data
			 */
			delete itemData.fields.githubUrl;

			/**
			 *	Render the template
			 */
			Blaze.renderWithData(Template.cards_portfolio_item, itemData, testParent);
			skillsTitle = testParent.getElementsByClassName('skills__title')[0];

			/**
			 *	Then test to see if the first child is a text node (and not a link)
			 */
			expect(skillsTitle.firstChild.wholeText.trim()).toEqual('Code / Skills');

			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});
	});

	describe('helpers', function() {
		describe('links', function() {
			it('should return a link if it is present in the entry', function(done) {
				/**
				 *	Dummy data
				 */
				var entry = {
					fields: {
						productionUrl: 'http://somewhere.tld'
					}
				};

				/**
				 *	Call the function and run the tests
				 */
				var link = Template.cards_portfolio_item.__helpers[' links'].call(entry);
				expect(link).toEqual({production_url: 'http://somewhere.tld'});

				/**
				 *	Done
				 */	
				done();
			});

			it('should return false if there is no link specified in the entry', function(done) {
				/**
				 *	Dummy data
				 */
				var entry = {
					fields: {
						screenshots: []
					}
				};

				/**
				 *	Call the function and run the tests
				 */
				var link = Template.cards_portfolio_item.__helpers[' links'].call(entry);
				expect(link).toEqual({production_url: false});

				/**
				 *	Done
				 */	
				done();
			});
		});
	});
});

describe('portfolio_skills', function() {
	describe('helpers', function() {
		describe('skills', function() {
			it('should call find on the entries collection with the correct parameters', function(done) {

				/**
				 *	Spies
				 */
				spyOn(Core.app.collections.entries, 'find').and.returnValue({
					fetch: function(selector) {}
				});

				/**
				 *	Dummy data
				 */
				var entry = {
					fields: {
						skills: [
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
						]
					}
				};

				/**
				 *	Run the function and then then test
				 */
				Template.portfolio_skills.__helpers[' skills'].call(entry);
				expect(Core.app.collections.entries.find).toHaveBeenCalledWith({'sys.id': {$in: ['dummy-1', 'dummy-2']}});

				/**
				 *	Done
				 */
				done();
			});

			it('should not call find on the entries collection and return an empty array when there are no skills', function(done) {

				/**
				 *	Spies
				 */
				spyOn(Core.app.collections.entries, 'find').and.returnValue({
					fetch: function(selector) {}
				});

				/**
				 *	Dummy data
				 */
				var entry = {
					fields: {}
				};

				/**
				 *	Run the function and then then test
				 */
				var result = Template.portfolio_skills.__helpers[' skills'].call(entry);
				expect(Core.app.collections.entries.find).not.toHaveBeenCalled();
				expect(result.length).toEqual(0);
				expect(result instanceof Array).toBe(true);

				/**
				 *	Done
				 */
				done();
			});
		});

		describe('links', function() {
			it('should return a github if it is present in the entry', function(done) {
				/**
				 *	Dummy data
				 */
				var entry = {
					fields: {
						githubUrl: 'http://github.com/user/project'
					}
				};

				/**
				 *	Call the function and run the tests
				 */
				var link = Template.portfolio_skills.__helpers[' links'].call(entry);
				expect(link).toEqual({github_url: 'http://github.com/user/project'});

				/**
				 *	Done
				 */	
				done();
			});

			it('should return false if there is no github link specified in the entry', function(done) {
				/**
				 *	Dummy data
				 */
				var entry = {
					fields: {
						screenshots: []
					}
				};

				/**
				 *	Call the function and run the tests
				 */
				var link = Template.portfolio_skills.__helpers[' links'].call(entry);
				expect(link).toEqual({github_url: false});

				/**
				 *	Done
				 */	
				done();
			});
		});		
	});
});