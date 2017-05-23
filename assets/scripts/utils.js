if(window.mf_site == null) {
	window.mf_site = {};
}

window.mf_site.utils = {

	/**
	 *	This function gets the device screen 
	 *	parameters.
	 *	
	 *	@function 	deviceParameters
	 *	@return		{Object}	- device screen dimensions and pixel ratio
	 */
	deviceParameters: () => {
		let width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);

		let height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);

		let pixel_ratio = Math.ceil(window.devicePixelRatio || 1);

		return {
			width: width,
			height: height,
			pixel_ratio: pixel_ratio
		};
	},

	/**
	 *	This function determines the best event
	 *	for listening for taps or clicks on an 
	 *	item, then executes a callback on that event.
	 *	
	 *	@function	primeTapEvent
	 *	@param 		{String}	- the selector for the DOM node
	 *	@param 		{Function} 	- the callback function to execute
	 */
	primeTapEvent: (selector, fn) => {
		const items = document.querySelectorAll(selector);
		Array.prototype.forEach.call(items, (item) => {
			if('onpointerdown' in window) {
				item.addEventListener('pointerdown', fn);
			}
			else if('ontouchstart' in window) {
				item.addEventListener('touchstart', fn);
			}
			else {
				item.addEventListener('click', fn);
			}
		});
	},

	/**
	 *	This is a throttle function which wraps
	 *	around another function and limits the
	 *	rate at which it can be executed.
	 *
	 *	@function 	throttle
	 *	@param 		{Function}	- the function to execute
	 *	@param 		{Number}	- the rate at which the function is called at
	 */
	throttle: (fn, limit = 200) => {
		let waiting = false;
		
		return () => {
			if(!waiting) {
				fn.call();
				waiting = true;
				setTimeout(() => {
					waiting = false;
				}, limit);
			}
		};
	}

};