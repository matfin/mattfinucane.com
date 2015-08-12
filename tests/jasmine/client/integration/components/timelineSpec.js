'use strict';

describe('components_timeline', function() {
	
	var testParent,
			timelineData;

	describe('template', function() {

		beforeEach(function() {
			testParent = document.createElement('div');
			testParent.className = 'slider__container';

			timelineData = {
				concurrentJobs: 2,
				jobs: [
					{
						fields: {
							endDate: '2015-12-31',
							startDate: '2013-04-26'
						}
					},
					{
						fields: {
							endDate: '2013-04-25',
							startDate: '2010-02-10'
						}
					},
					{
						fields: {
							endDate: '2010-02-09',
							startDate: '2009-01-03'
						}
					},
					{
						fields: {
							endDate: '2008-12-20',
							startDate: '2006-12-15'
						}
					}
				]
			};
		});

		afterEach(function() {
			while(testParent.firstChild) {
				testParent.removeChild(testParent.firstChild);
			}
			timelineData = {};
		});

		it('should render the timeline buttons correctly given a collection of jobs', function(done) {

			/**
			 *	Setting up
			 */
			var buttons;

			/**
			 *	Render the template with the data and run the tests
			 */
			Blaze.renderWithData(Template.components_timeline, timelineData, testParent);

			buttons = testParent.getElementsByClassName('timeline__year');

			expect(buttons.length).toEqual(2);
			expect(buttons[0].firstChild.wholeText).toContain('2015');
			expect(buttons[0].firstChild.wholeText).toContain('2010');
			expect(buttons[1].firstChild.wholeText).toContain('2010');
			expect(buttons[1].firstChild.wholeText).toContain('2006');
			
			/**
			 *	Finished
			 */	
			setTimeout(done, 200);
		});

		it('should render 4 buttons given the number of concurrent jobs to display is set to 1', function(done) {

			var buttons;

			timelineData.concurrentJobs = 1;

			/**
			 *	Render the template with the data and run the tests
			 */
			Blaze.renderWithData(Template.components_timeline, timelineData, testParent);

			buttons = testParent.getElementsByClassName('timeline__year');

			expect(buttons.length).toEqual(4);

			/**
			 *	Finished
			 */	
			setTimeout(done, 200);
		});

		it('should render 2 buttons given the number of concurrent jobs to display is set to 3', function(done) {

			var buttons;

			timelineData.concurrentJobs = 3;

			/**
			 *	Render the template with the data and run the tests
			 */
			Blaze.renderWithData(Template.components_timeline, timelineData, testParent);

			buttons = testParent.getElementsByClassName('timeline__year');

			expect(buttons.length).toEqual(2);

			/**
			 *	Finished
			 */	
			setTimeout(done, 200);
		});

		it('should not render the timeline if the number of concurrent jobs to display is equal to or greater than the number of jobs present', function(done) {

			var buttons;

			timelineData.concurrentJobs = 5;

			/**
			 *	Render the template with the data and run the tests
			 */
			Blaze.renderWithData(Template.components_timeline, timelineData, testParent);

			buttons = testParent.getElementsByClassName('timeline__year');

			expect(buttons.length).toEqual(0);

			/**
			 *	Finished
			 */	
			setTimeout(done, 200);
		});

	});

});