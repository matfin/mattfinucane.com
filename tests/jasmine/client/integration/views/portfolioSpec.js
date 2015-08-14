'use strict';

describe('views_portfolio', function() {

	var testParent;

	beforeEach(function() {
		testParent = document.createElement('div');
		testParent.className = 'container';
	});	

	afterEach(function() {
		while(testParent.firstChild) {
			testParent.removeChild(testParent.firstChild);
		}
	});

	describe('template', function() {
		it('should render at least three wrapper divs with a classname of wrapper--content', function(done) {			
			
			var portfolio_items;
			/**
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 10,
				ready: function() {
					return true;
				}
			});

			spyOn(Core.app.collections.entries, 'find').and.returnValue({
				fetch: function() {
					return [
						{
							fields: {
								screenshots: [
									{
										sys: {
											id: 'dummy-12'
										}
									}
								]
							}
						}, 
						{
							fields: {
								screenshots: [
									{
										sys: {
											id: 'dummy-13'
										}
									}
								]
							}
						}, 
						{
							fields: {
								screenshots: [
									{
										sys: {
											id: 'dummy-14'
										}
									}
								]
							}
						}
					];
				}
			});	

			/**
			 *	Run the function and then the tests
		 	 */	
		 	Blaze.render(Template.views_portfolio, testParent);
		 	portfolio_items = testParent.getElementsByClassName('wrapper--content');

		 	expect(portfolio_items.length).toEqual(3);

			/**
			 *	Finished
			 */
			setTimeout(done, 50);
		});
	});

});