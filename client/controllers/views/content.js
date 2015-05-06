/**
 *	Template - views_content
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_content.created = function() {
	this.subscribe('content_item');
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
		return App.collections.cf_entries.find({contentTypeName: 'content_item', 'fields.page': this.page}, {sort: {'fields.order': -1}}).fetch();
	}

});