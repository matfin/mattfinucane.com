'use strict';

describe('views_experience', function() { 

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

		it('should render the template with stacked jobs for mobile devices', function(done) {

			var jobs;

			/**
			 *	Spies
			 */
			spyOn(Helpers, 'deviceClass').and.returnValue({
				isMobile: true
			});

			/**
			 *	Run the function
			 */
			Blaze.render(Template.views_experience, testParent);
			jobs = testParent.getElementsByClassName('jobs');

			/**
			 *	Then add the tests
			 */
			expect(jobs.length).toEqual(1);

			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});

		it('should render the template with stacked jobs for tablet devices', function(done) {

			var jobs;

			/**
			 *	Spies
			 */
			spyOn(Helpers, 'deviceClass').and.returnValue({
				isTablet: true
			});

			/**
			 *	Run the function
			 */
			Blaze.render(Template.views_experience, testParent);
			jobs = testParent.getElementsByClassName('jobs');

			/**
			 *	Then add the tests
			 */
			expect(jobs.length).toEqual(1);

			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});

		it('should render the template with a slider for desktop based devices', function(done) {

			var slider_container;

			/**
			 *	Spies
			 */
			spyOn(Helpers, 'deviceClass').and.returnValue({
				isDesktop: true
			});

			/**
			 *	Run the function
			 */
			Blaze.render(Template.views_experience, testParent);
			slider_container = testParent.getElementsByClassName('slider__container');

			/**
			 *	Then add the tests
			 */
			expect(slider_container.length).toEqual(1);

			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});

		it('should render two jobs side and two slides in total given three jobs', function(done) {

			var slides, jobs;

			/**
			 *	Spies	
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 4,
				ready: function() {
					return true;
				}
			});

			spyOn(Helpers, 'deviceClass').and.returnValue({
				isDesktop: true
			});

			spyOn(Core.app.collections.entries, 'find').and.returnValue({
				fetch: function() {
					return [
						{
							fields: {}
						},
						{
							fields: {}
						},
						{
							fields: {}
						}
					];
				},
				count: function() {
					return 3;
				}
			}); 

			/**
			 *	Render the template
			 */
			Blaze.render(Template.views_experience, testParent);
			slides = testParent.getElementsByClassName('slider__container__slider__slide--experience');

			/**
			 *	Run the tests
			 */
			expect(slides.length).toEqual(2);

			jobs = slides[0].getElementsByClassName('job');
			expect(jobs.length).toEqual(2);

			jobs = slides[1].getElementsByClassName('job');
			expect(jobs.length).toEqual(1);

			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});

		it('should render three jobs side by side for HD devices in a slide with two slides being rendered in total', function(done) {

			var slides, jobs;

			/**
			 *	Spies	
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 5,
				ready: function() {
					return true;
				}
			});

			spyOn(Helpers, 'deviceClass').and.returnValue({
				isHD: true
			});

			spyOn(Core.app.collections.entries, 'find').and.returnValue({
				fetch: function() {
					return [
						{
							fields: {}
						},
						{
							fields: {}
						},
						{
							fields: {}
						},
						{
							fields: {}
						}
					];
				},
				count: function() {
					return 4;
				}
			}); 

			/**
			 *	Render the template
			 */
			Blaze.render(Template.views_experience, testParent);
			slides = testParent.getElementsByClassName('slider__container__slider__slide--experience');

			/**
			 *	Run the tests
			 */
			expect(slides.length).toEqual(2);

			jobs = slides[0].getElementsByClassName('job');
			expect(jobs.length).toEqual(3);

			jobs = slides[1].getElementsByClassName('job');
			expect(jobs.length).toEqual(1);

			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});

	});

});

describe('views_experience_stacked', function() {

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

		it('should render 4 jobs given 4 jobs from a collection', function(done) {

			var jobs;

			/** 
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 6,
				ready: function() {
					return true;
				}
			});

			spyOn(Core.app.collections.entries, 'find').and.returnValue({
				fetch: function() {
					return [
						{fields: {}},
						{fields: {}},
						{fields: {}},
						{fields: {}}
					]
				}
			});

			/**
			 *	Render the template
			 */
			Blaze.render(Template.views_experience_stacked, testParent);
			jobs = testParent.getElementsByClassName('job');

			/**
			 *	Then run the test
			 */
			expect(jobs.length).toEqual(4);

			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});

	});

});