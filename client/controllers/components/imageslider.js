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

	if(this.$('.item', '.sliderIndicator').length > 0) {
		this.$('.item', '.sliderIndicator').get(0).className = 'item highlighted';
	}
	
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
	},

	/**
	 *	Show slider paddles for desktop and laptop 
	 */
	showPaddles: function() {
		/**
		 *	Making this function reactive
		 */
		Dependencies.resized.depend();
		var deviceClass = Helpers.deviceClass();
		return deviceClass.isDesktop || deviceClass.isLaptop;
	},

	showIndicator: function() {
		/**
		 *	Making this function reactive
		 */
		Dependencies.resized.depend();
		var deviceClass = Helpers.deviceClass();
		return deviceClass.isTablet || deviceClass.isMobile;
	}

});

/**
 *	Template - components_imageslider
 *	Events 
 */
Template.components_imageslider.events = {

	'slidecomplete .sliderContainer': function(e, template) {
		
		var currentSlide = e.originalEvent.data.currentSlide;

		if(template.$('.item', '.sliderIndicator').length > 0) {
			var currentSlide = e.originalEvent.data.currentSlide;
			template.$('.item', '.sliderIndicator').removeClass('highlighted');
			template.$('.item', '.sliderIndicator').get(currentSlide).className = 'item highlighted';
		}

		if(template.slider.currentSlide === 0) {
			template.$('.arrow-left').addClass('hidden');
		}
		else {
			template.$('.arrow-left').removeClass('hidden');
		}

		if(template.slider.currentSlide === (template.slider.slides.length - 1)) {
			template.$('.arrow-right').addClass('hidden');
		}
		else {
			template.$('.arrow-right').removeClass('hidden');
		}
	},
	'click .paddle': function(e, template) {
		var direction = $(e.currentTarget).data('direction');	
		template.slider.go(direction);
	},
};