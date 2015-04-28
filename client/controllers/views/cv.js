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
	this.slider = Slider.setup(sliderContainer, {concurrentSlides: 2});
	console.log(this.slider);
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

	jobs: function() {
		return App.collections.cf_entries.find({contentTypeName: 'job'}, {sort: {'fields.startDate': -1}}).fetch();
	},

	/**
	 *	Grab the number of slides and multiply the total by 50 to get a percentage. 
	 *	This matches up to setting two slides side by side, giving them each a total
	 *	width of 50%.
	 */
	sliderWidth: function() {
		return App.collections.cf_entries.find({contentTypeName: 'job'}).count() * 50;
	}

});