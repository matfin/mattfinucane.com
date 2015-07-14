/**
 *	Template - views_experience_slider
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_experience_slider.created = function() {
	this.subscribe('job');
};

/**
 *	Template - views_experience_slider
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.views_experience_slider.rendered = function() {

	var sliderContainer = document.getElementsByClassName('slider__container').item(0),
		self = this;

	this.slider = Slider.setup(sliderContainer);


	/** 
	 *	Autorun this tracker to listen for changes to the
	 *	slideNumber Session variable, so we can update 
	 *	the slider position here. 
	 */
	this.sliderEvent = Tracker.autorun(function() {
		var slide = Session.get('slideNumber');
		if(slide !== undefined) {
			self.slider.goToSlide(slide);
		}
	});

	/**
	 *	Grab the number of slides and multiply the total by 50 to get a percentage. 
	 *	This matches up to setting two slides side by side, giving them each a total
	 *	width of 50%.
	 */
	this.resizeEvent = Tracker.autorun(function() {

		Dependencies.resized.depend();

		var numberOfSlides  = TemplateHelpers.numberOfItemsInSlide(),
			numberOfJobs 	= App.collections.cf_entries.find({contentTypeName: 'job'}).count(),
			sliderWidth 	= Math.round(numberOfJobs / numberOfSlides) * 100;

		$('.slider').css({
			width: sliderWidth + '%'
		});
	});
};

/**
 *	Template - views_experience_slider
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.views_experience_slider.destroyed = function() {
	Session.set('slideNumber', undefined);
};

/**
 *	Template - views_experience_slider
 *	Helpers 
 */
Template.views_experience_slider.helpers({

	/**
	 *	Fetch jobs, sorted by their start date in descending order. In this case,
	 *	we want two jobs per slide, so we will group them into items of two.
	 */
	groupedJobs: function() {

		var self = this,
			jobs = App.collections.cf_entries.find({contentTypeName: 'job'}, {sort: {'fields.startDate': -1}}).fetch(),
			asGrouped = function() {
				var grouped = [],
					size = TemplateHelpers.numberOfItemsInSlide();
				while(jobs.length > 0) {
					grouped.push(jobs.splice(0, size));
				}
				return grouped;
			};
		return asGrouped();
	},

	/**
	 *	Number of concurrent jobs showing - used for the timeline
	 */
	timelineData: function() {
		var self = this;
		return {
			concurrentJobs: TemplateHelpers.numberOfItemsInSlide(),
			jobs: App.collections.cf_entries.find({contentTypeName: 'job'}, {sort: {'fields.startDate': -1}}).fetch()
		};
	}
});

/** 
 *	Template views_experience_slider
 *	Events
 */
Template.views_experience_slider.events = {

	'slidecomplete .slider__container': function(e, template) {

		if($('button', '.timeline').length > 0) {
			var currentSlide = e.originalEvent.data.currentSlide;
			$('button', '.timeline').removeClass('timeline__year--highlighted');
			$('button', '.timeline').get(currentSlide).className = 'timeline__year timeline__year--highlighted';
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
	}

};