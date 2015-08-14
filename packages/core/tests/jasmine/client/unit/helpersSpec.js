'use strict';

describe('Helpers', function() {

	describe('checkNested', function() {
		it('should return true or false depending on whether a nested item was found', function(done) {

			/**
			 *	Dummy data
			 */
			var data = {
				item: {
					test: {
						exists: {
							this: {
								will: {
									not: 1
								}
							}
						}
					}
				}
			};

			expect(Helpers.checkNested(data, 'nonexistant')).toBe(false);
			expect(Helpers.checkNested(data, 'item', 'test', 'exists')).toBe(true);
			expect(Helpers.checkNested(data, 'item', 'test', 'nonexistant')).toBe(false);
			expect(Helpers.checkNested(data, 'item', 'test', 'exists', 'this')).toBe(true);

			/**
			 *	Finished
			 */
			done();
		});
	});

	describe('grouped', function() {

		it('should created nested arrays grouped by a selector', function(done) {

			/**
			 *	Dummy data
			 */
			var items = [
				{id: 1, asset_id: 'abc'},
				{id: 1, asset_id: 'def'},
				{id: 1, asset_id: 'def'},
				{id: 1, asset_id: 'def'},
				{id: 1, asset_id: 'abc'},
				{id: 1, asset_id: 'xyz'},
				{id: 1, asset_id: 'xyz'},
				{id: 1, asset_id: 'ghi'},
				{id: 1, asset_id: 'jkl'},
				{id: 1, asset_id: 'abc'},
			];

			/**
			 *	Run the function and then the tests
			 */
			var grouped = Helpers.grouped(items, 'asset_id');

			expect(grouped.length).toEqual(5);
			expect(grouped[0].length).toEqual(3);
			expect(grouped[1].length).toEqual(3);
			expect(grouped[2].length).toEqual(2);
			expect(grouped[3].length).toEqual(1);
			expect(grouped[4].length).toEqual(1);

			/**
			 *	Done
			 */
			done();
		});
	});

	describe('asClassName', function() {

		it('should return the correct class name given a string', function(done) {

			expect(Helpers.asClassName('A Content Item In Here')).toEqual('a-content-item-in-here');
			expect(Helpers.asClassName('portfolio goes in here')).toEqual('portfolio-goes-in-here');
			expect(Helpers.asClassName('test-item-one')).toEqual('test-item-one');
			expect(Helpers.asClassName('123 @ 993 helpme')).toEqual('123-@-933-helpme');
			/**
			 *	Finished
			 */
			done();
		});

	});

});