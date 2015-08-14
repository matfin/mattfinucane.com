'use strict';

describe('views_portfolio', function() {

	describe('template', function() {
		it('should render at least one wrapper div with a class wrapper--content', function(done) {			
			setTimeout(function() {
				expect(document.getElementsByClassName('wrapper--content').length).toBeGreaterThan(0);
				done();
			}, 50);
		});
	});

});