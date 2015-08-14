/**
 *	Class containing dependencies for reactive functions
 *	@static
 */
Dependencies = {

	/**
	 *	Dependency to be changed when the viewport size changes
	 *
	 *	@property 	resized
	 *	@type 		{Object}
	 */
	resized: new Tracker.Dependency,
	

	/**
	 *	Dependency to be changed when the viewport is scrolled
	 *
	 *	@property 	scrolled
	 *	@type 		{Object}
	 */
	scrolled: new Tracker.Dependency,

	/**
	 *	Function to start listening for events to trigger reactivity
	 *
	 *	@method 	start 		
	 */
	start: function() {
		/**
		 *	Call changed on the scrolled dependency when the viewport scrolls
		 */
		window.addEventListener('scroll', _.throttle(function() {
			this.scrolled.changed();
		}.bind(this), 500));

		/**
		 *	Call changed on the resized dependency when the viewport scrolls
		 */
		window.addEventListener('resize', _.throttle(function() {
			this.resized.changed();
		}.bind(this), 250));
	}

};