/**
 *	Template - components_imageslider
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.components_imageslider.created = function() {

};

/**
 *	Template - components_imageslider
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.components_imageslider.rendered = function() {
	var sliderContainer = this.$('.sliderContainer').get(0);
	this.slider = Slider.setup(sliderContainer);
};

/**
 *	Template - components_imageslider
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.components_imageslider.destroyed = function() {
	
};

/**
 *	Template - components_imageslider
 *	Helpers
 */
Template.components_imageslider.helpers({

	/**
	 *	Function to return the slider width based on the number of slides
	 */
	sliderWidth: function() {
		return this.length * 100;
	}

});