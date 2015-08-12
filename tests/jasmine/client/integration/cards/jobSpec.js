'use strict';

describe('cards_job', function() {

	var testParent,
			jobData;

	describe('template', function() {

		beforeEach(function() {
			testParent = document.createElement('div');
			testParent.className = 'jobs';

			jobData = {
				fields: {
					organisation: 'Test Organisation',
					role: 'Developer',
					location: 'Somewhere',
					startDate: '2013-08-15',
					endDate: '2014-01-15',
					description: 'A description of this job'
				}
			};
		});

		afterEach(function() {
			jobData = [];
			while(testParent.firstChild) {
				testParent.removeChild(testParent.firstChild);
			}
		});

		it('should render the job correctly given a fixed start and end date', function(done) {
			/**
			 *	Setting up the node references for testing later
			 */
			var title, role_location, dates, description;

			/**
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 1,
				ready: function() {
					return true;
				}
			});

			/**
			 *	Render the template with the data and set up node selectors
			 */
			Blaze.renderWithData(Template.cards_job, jobData, testParent);
			title = testParent.getElementsByClassName('job__title')[0];
			role_location = testParent.getElementsByClassName('job__role_location')[0];
			dates = testParent.getElementsByClassName('job__dates__time');
			description = testParent.getElementsByTagName('p')[0];

			/**
			 *	Then run the tests
			 */
			expect(title.firstChild.wholeText.trim()).toEqual('Test Organisation');
			expect(role_location.firstChild.wholeText).toContain('Developer, Somewhere');
			expect(dates[0].firstChild.wholeText.trim()).toContain('Aug 2013');
			expect(dates[1].firstChild.wholeText.trim()).toEqual('Jan 2014');
			expect(description.firstChild.wholeText.trim()).toEqual('A description of this job');

			/**
			 *	Finished
			 */
			setTimeout(done, 200);
		});

		it('should show "Present" as the job end date in the absence of an end date', function(done) {
			/**
			 *	Setting up the node references for testing later
			 */
			var dates;

			/**
			 *	Removing this from the job data to trigger the appearance of 'Present'
			 */
			delete jobData.fields.endDate;

			/**
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 1,
				ready: function() {
					return true;
				}
			});

			/**
			 *	Render the template with the data and set up node selectors
			 */
			Blaze.renderWithData(Template.cards_job, jobData, testParent);
			dates = testParent.getElementsByClassName('job__dates__time');

			/**
			 *	Then run the tests
			 */
			expect(dates[0].firstChild.wholeText.trim()).toContain('Aug 2013');
			expect(dates[1].firstChild.wholeText.trim()).toEqual('Present');

			/**
			 *	Finished
			 */
			setTimeout(done, 200);
		});

		it('should render the correct number of images', function(done) {

			/**
			 *	Setting up
			 */
			var images;

			jobData.fields.projectLogos = [
				{
					sys: {
						id: 'abcde'
					}
				},
				{
					sys: {
						id: 'fghij'
					}
				}
			];

			/**
			 *	Spies - spying on the collections find 
			 *	function and returning dummy data
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 1,
				ready: function() {
					return true;
				}
			});

			spyOn(Core.app.collections.images, 'find').and.callFake(function(selector) {
				return {
					fetch: function() {
						return [
							{width: 800, density: {multiplier: 1, prefixed: ''}, device: 'desktop', filename: 'abcde-desktop.jpg'},
							{width: 1600, density: {multiplier: 2, prefixed: '@2x'}, device: 'desktop', filename: 'abcde-desktop@2x.jpg'},
							{width: 2400, density: {multiplier: 3, prefixed: '@3x'}, device: 'desktop', filename: 'abcde-desktop@3x.jpg'},
							{width: 400, density: {multiplier: 1, prefixed: ''}, device: 'tablet', filename: 'abcde-tablet.jpg'},
							{width: 800, density: {multiplier: 2, prefixed: '@2x'}, device: 'tablet', filename: 'abcde-tablet@2x.jpg'},
							{width: 1200, density: {multiplier: 3, prefixed: '@3x'}, device: 'tablet', filename: 'abcde-tablet@3x.jpg'},
							{width: 320, density: {multiplier: 1, prefixed: ''}, device: 'mobile', filename: 'abcde-mobile.jpg'},
							{width: 640, density: {multiplier: 2, prefixed: '@2x'}, device: 'mobile', filename: 'abcde-mobile@2x.jpg'},
							{width: 960, density: {multiplier: 3, prefixed: '@3x'}, device: 'mobile', filename: 'abcde-mobile@3x.jpg'},

							{width: 800, density: {multiplier: 1, prefixed: ''}, device: 'desktop', filename: 'fghij-desktop.jpg'},
							{width: 1600, density: {multiplier: 2, prefixed: '@2x'}, device: 'desktop', filename: 'fghij-desktop@2x.jpg'},
							{width: 2400, density: {multiplier: 3, prefixed: '@3x'}, device: 'desktop', filename: 'fghij-desktop@3x.jpg'},
							{width: 400, density: {multiplier: 1, prefixed: ''}, device: 'tablet', filename: 'fghij-tablet.jpg'},
							{width: 800, density: {multiplier: 2, prefixed: '@2x'}, device: 'tablet', filename: 'fghij-tablet@2x.jpg'},
							{width: 1200, density: {multiplier: 3, prefixed: '@3x'}, device: 'tablet', filename: 'fghij-tablet@3x.jpg'},
							{width: 320, density: {multiplier: 1, prefixed: ''}, device: 'mobile', filename: 'fghij-mobile.jpg'},
							{width: 640, density: {multiplier: 2, prefixed: '@2x'}, device: 'mobile', filename: 'fghij-mobile@2x.jpg'},
							{width: 960, density: {multiplier: 3, prefixed: '@3x'}, device: 'mobile', filename: 'fghij-mobile@3x.jpg'}
						]
					}
				};
			});

			/**
			 *	Run the function
			 */
			Blaze.renderWithData(Template.cards_job, jobData, testParent);
			images = testParent.getElementsByTagName('img');

			/**
			 *	Running the tests
			 */
			expect(images.length).toEqual(2);
			expect(images[0].getAttribute('src')).toContain('abcde');
			expect(images[1].getAttribute('src')).toContain('fghij');

			/**
			 *	Finished
			 */
			setTimeout(done, 200);
		});
	});
});