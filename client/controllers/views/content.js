/**
 *	Template - views_content
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_content.created = function() {
	this.subscribe('content');
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

	contentItems: function() {
		return App.collections.entries.find({'fields.page': this.page}, {sort: {'fields.order': 1}}).fetch();
	},

	groupedContentItems: function() {
		var ungrouped_content_items = App.collections.entries.find({'fields.page': this.page}, {sort: {'fields.order': 1}}).fetch(),
				content_item_groups = [],
				content_items = [];

		content_item_groups.push(content_items);

		[].forEach.call(ungrouped_content_items, function(content_item, index) {
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