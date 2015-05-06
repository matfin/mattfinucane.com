/**
 *	Template - cards_content_item
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_content_item.created = function() {
	this.subscribe('cf_assets');
	this.subscribe('mf_images');
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
	 *	Fetch the images for this content item
	 */
	images: function() {
		//console.log(this);
		return {
			useSlider: false,
			collection: []
		};
	}

});