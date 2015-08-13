'use strict';

/**
 *	Template - views_content
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_content.created = function() {
	this.subscribe('entries', 'Content Item');
};

/**
 *	Template - views_content
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.views_content.rendered = function() {
};

/**
 *	Template - views_content
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.views_content.destroyed = function() {
};

/**
 *	Template - views_content
 *	Helpers 
 */
Template.views_content.helpers({

	groupedContentItems: function() {
		var ungrouped_content_items = Core.app.collections.entries.find({'fields.page': this.page}, {sort: {'fields.order': 1}}).fetch(),
				content_item_groups = [],
				content_items = [];

		content_item_groups.push(content_items);

		ungrouped_content_items.forEach(function(content_item, index) {
			if(content_item.fields.isStandalone) {
				content_item_groups.push(content_item);
				return;
			}
			else {
				if(content_items.length === 2) {
					content_items = [];
					content_item_groups.push(content_items);
				}
				content_items.push(content_item);
			}
		});

		return content_item_groups;
	}

});