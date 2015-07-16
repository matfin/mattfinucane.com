/**
 *	Template - components_header
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.components_header.created = function() {
};

/**
 *	Template - components_header
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.components_header.rendered = function() {
	
};

/**
 *	Template - components_header
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.components_header.destroyed = function() {
	
};

/**
 *	Template - components_header
 *	Events
 */
Template.components_header.events = {

	/**
	 *	Listen for click and touch events depending on device to 
	 *	toggle the revealed state of the header nav for small devices.
	 */
	'touchstart .header__nav__touch': function(e, template) {
		template.$('button').toggleClass('header__nav__button--revealed');
		$('header').toggleClass('header--revealed');
	},

	'click .header__nav__click': function(e, template) {
		template.$('button').toggleClass('header__nav__button--revealed');
		$('header').toggleClass('header--revealed');
	},

	/**
	 *	Remove revealed class from header if user taps on a link
	 */
	'click .header__nav__list__item__link': function() {
		if($('header').hasClass('header--revealed')) {
			$('header').removeClass('header--revealed');
		}
	}

};