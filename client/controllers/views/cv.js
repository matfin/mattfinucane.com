/**
 *	Template - views_cv
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_cv.created = function() {
	this.subscribe('job');
};

/**
 *	Template - views_cv
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.views_cv.rendered = function() {
	var sliderContainer = document.getElementsByClassName('sliderContainer').item();
	this.slider = Slider.setup(sliderContainer);
};

/**
 *	Template - views_cv
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.views_cv.destroyed = function() {
};

/**
 *	Template - views_cv
 *	Helpers 
 */
Template.views_cv.helpers({

	/**
	 *	Fetch jobs, sorted by their start date in descending order. In this case,
	 *	we want two jobs per slide, so we will group them into items of two.
	 */
	groupedJobs: function() {
		var jobs = App.collections.cf_entries.find({contentTypeName: 'job'}, {sort: {'fields.startDate': -1}}).fetch(),
			asGrouped = function() {
				var grouped = [],
					size = 2;
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
		return {
			concurrentJobs: 2,
			jobs: App.collections.cf_entries.find({contentTypeName: 'job'}, {sort: {'fields.startDate': -1}}).fetch()
		};
	},

	/**
	 *	Grab the number of slides and multiply the total by 50 to get a percentage. 
	 *	This matches up to setting two slides side by side, giving them each a total
	 *	width of 50%.
	 */
	sliderWidth: function() {
		return Math.round(App.collections.cf_entries.find({contentTypeName: 'job'}).count() / 2) * 100;
	}

});

/** 
 *	Template views_cv
 *	Events
 */
Template.views_cv.events = {

	'slidecomplete .sliderContainer': function(e, template) {
		var currentSlide = e.originalEvent.data.currentSlide;
		$('button', '.timeline').removeClass('highlighted');
		$('button', '.timeline').get(currentSlide).className = 'highlighted';

		if(template.slider.currentSlide === 0) {
			template.$('.icon-arrow-left').addClass('hidden');
		}
		else {
			template.$('.icon-arrow-left').removeClass('hidden');
		}

		if(template.slider.currentSlide === (template.slider.slides.length - 1)) {
			template.$('.icon-arrow-right').addClass('hidden');
		}
		else {
			template.$('.icon-arrow-right').removeClass('hidden');
		}
	},
	'click .paddle': function(e, template) {
		var direction = $(e.currentTarget).data('direction');	
		template.slider.go(direction);
	}

};