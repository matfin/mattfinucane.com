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

	if(this.$('.slider__indicator__item', '.slider__indicator').length > 0) {
		this.$('.slider__indicator__item', '.slider__indicator').get(0).className = 'slider__indicator__item slider__indicator__item--highlighted';
	}
	
	var sliderContainer = this.$('.slider__container').get(0);
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

/**
 *	Template - components_imageslider
 *	Events 
 */
Template.components_imageslider.events = {

	'slidecomplete .slider__container': function(e, template) {

		var currentSlide = e.originalEvent.data.currentSlide;

		if(template.$('.slider__indicator__item', '.slider__indicator').length > 0) {
			var currentSlide = e.originalEvent.data.currentSlide;
			template.$('.slider__indicator__item', '.slider__indicator').removeClass('slider__indicator__item--highlighted');
			template.$('.slider__indicator__item', '.slider__indicator').get(currentSlide).className = 'slider__indicator__item slider__indicator__item--highlighted';
		}

		if(template.slider.currentSlide === 0) {
			template.$('.arrow-left').addClass('slider__paddle--hidden');
		}
		else {
			template.$('.arrow-left').removeClass('slider__paddle--hidden');
		}

		if(template.slider.currentSlide === (template.slider.slides.length - 1)) {
			template.$('.arrow-right').addClass('slider__paddle--hidden');
		}
		else {
			template.$('.arrow-right').removeClass('slider__paddle--hidden');
		}
	},
	'click .slider__paddle': function(e, template) {
		var direction = $(e.currentTarget).data('direction');	
		template.slider.go(direction);
	},
};