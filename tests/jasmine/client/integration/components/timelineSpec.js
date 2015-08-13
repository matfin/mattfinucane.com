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
			setTimeout(done, 50);
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
			setTimeout(done, 50);
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
			setTimeout(done, 50);
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
			setTimeout(done, 50);
		});
	});

	describe('helpers', function() {

		describe('yearGroups', function() {

			it('should call depend the resized dependency', function(done) {
				/**
				 *	Spies	
				 */	
				spyOn(Dependencies.resized, 'depend').and.returnValue({});

				/**
				 *	Call the function, run the test and then finish
				 */
				var result = Template.components_timeline.__helpers[' yearGroups'].call({});
				expect(Dependencies.resized.depend).toHaveBeenCalled();
				expect(result).toBeUndefined();
				done();
			});

			it('should return immediately if there is no job data for the template', function(done) {
				/**
				 *	Run the function, test and then finish
				 */	
				var result = Template.components_timeline.__helpers[' yearGroups'].call({});
				expect(result).toBeUndefined();
				done();
			});

			it('should return immediately if there are less jobs than the configured concurrent amount to display', function(done) {
				/**
				 *	Dummy data
				 */
				var data = {
					concurrentJobs: 10,
					jobs: [{},{},{},{},{}]
				};

				/**
				 *	Run the function, test and then finish
				 */
				var result = Template.components_timeline.__helpers[' yearGroups'].call(data);
				expect(result).toBeUndefined();
				done();
			});

			it('should return the correct year groups given a selection of jobs with start and end dates', function(done) {
				/**
				 *	Dummy data
				 */
				var data = {
					concurrentJobs: 2,
					jobs: [
						{
							fields: {
								startDate: '2014-12-01',
								endDate: '2015-06-01'
							}
						},
						{
							fields: {
								startDate: '2012-06-01',
								endDate: '2014-11-31'
							}
						},
						{
							fields: {
								startDate: '2011-07-01',
								endDate: '2012-05-31'
							}
						},
						{
							fields: {
								startDate: '2009-01-01',
								endDate: '2011-06-30'
							}
						}
					]
				};

				/**
				 *	Call the function and run the tests
				 */			
				var result = Template.components_timeline.__helpers[' yearGroups'].call(data);

				expect(result[0].from).toEqual('2012');
				expect(result[0].to).toEqual('2015');
				expect(result[0].highlighted).toBe(true);

				expect(result[1].from).toEqual('2009');
				expect(result[1].to).toEqual('2012');
				expect(result[1].highlighted).toBe(false);

				expect(result.length).toEqual(2);

				/**
				 *	Finish
				 */
				done();
			});

		});

	});

});