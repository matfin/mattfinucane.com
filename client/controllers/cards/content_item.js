'use strict';

/**
 *	Template - cards_content_item
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_content_item.created = function() {
	if(Helpers.checkNested(this, 'data', 'fields', 'images') && this.data.fields.images !== null) {
		this.subscribe('images', this.data.fields.images);
	}
};

/**
 *	Template - cards_content_item
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.cards_content_item.rendered = function() {
};

/**
 *	Template - cards_content_item
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.cards_content_item.destroyed = function() {
};

/**
 *	Template - cards_content_item
 *	Helpers
 */
Template.cards_content_item.helpers({
	/**
	 *	Function to determine if a content item is grouped with nested items or if it
	 *	is standalone.
	 */
	isGrouped: function() {
		return this instanceof Array;
	}
});

/**
 *	Template - content_images
 *	Helpers
 */
Template.content_images.helpers({

	/**
	 *	Fetch the images for this content item
	 */
	images: function() {
		return Core.templateHelpers.images.call(this, this.fields.images);
	}
});