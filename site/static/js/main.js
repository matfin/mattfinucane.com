'use strict';

if (window.mf_site == null) {
	window.mf_site = {};
}

window.mf_site.animations = {

	/**
  *	This function will loop through a DOM node, fetching
  *	all text and element nodes and populating the split
  *	text content attached to them.
  *	
  *	@function 	getLetters
  *	@param		{HTMLElement} 	- the parent node that contains the text
  *	@param		{Array}			- an array of pre-existing items (passed in with recursion)
  *	@return		{Array}			- array of objects containing a reference to the node and an array of split text characters from textContent.
  */
	getLetters: function getLetters(node) {
		var letters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


		/**
   *	This function filters out valid 
   *	nodes given the following:
   *	- is an element node (1)
   *	- is a text node
   *	- text content contains actual text
   */
		var is_valid_child = function is_valid_child(child) {
			return (child.nodeType === 1 || child.nodeType === 3) && child.textContent.trim().length > 0;
		};

		/**
   *	Get a list of child nodes converted
   *	to an array and filter them  down to 
   *	the ones we are interested in with 
   *	the above filter function.
   */
		var child_nodes = Array.prototype.slice.call(node.childNodes),
		    filtered_nodes = child_nodes.filter(is_valid_child);

		/**
   *	Then go through each filtered child node
   *	and if it's a text node, split out the 
   *	text content to an array and assign to 
   *	an object that also contains a reference
   *	to the node containing the text.
   *
   *	If the child node is a html element, then 
   *	recursively call this function again.
   */
		Array.prototype.forEach.call(filtered_nodes, function (filtered_node) {
			if (filtered_node.nodeType === 3) {
				letters.push({
					append_to: node,
					letters: filtered_node.textContent.trim().split('')
				});
			} else {
				mf_site.animations.getLetters(filtered_node, letters);
			}
		});

		/**
   *	Return a list of the letters that have been split
   *	out and associated with their parent html nodes.
   */
		return letters;
	},

	/**
  *	This function takes a node and clears out all its
  *	text nodes but leaves the html nodes in place.
  *
  *	@function 	clearText
  *	@param 		{HTMLElement} - the node to clear the text from
  *	@return 	{HTMLElement} - the node with the text cleared
  */
	clearText: function clearText(node) {
		var child_nodes = Array.prototype.slice.call(node.childNodes),
		    filtered_nodes = child_nodes.filter(function (child) {
			return child.nodeType === 3;
		});

		Array.prototype.forEach.call(filtered_nodes, function (filtered_node) {
			node.removeChild(filtered_node);
		});

		return node;
	},

	/**
  *	This function will animate the letters in place
  *	for a html element. It will go through each letter
  *	in turn, wrapping it in a span and adding a class 
  *	name so we can reference this in CSS and start
  *	the transtion.
  *
  *	@function 	animateLetters
  *	@param		{String} 	- the DOM selector string
  *	@param		{Number}	- the delay between starting the animation on the next number
  *	@return 	{Promise} 	- a resolved promise when the animation is finished
  */
	animateLetters: function animateLetters(selector) {
		var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 75;


		return new Promise(function (resolve, reject) {

			/**
    *	Here, we do the following:
    *	- grab a reference to the parent node
    *	- grab all the children of that node and the letters inside each child
    *	- set the index and timeouts to 0, which we will accumulate later
    *	- call a map and reduce function to get the total letter count
    *  - set the runcount, which we use to determine when all letters have been processed
    */
			var node = document.querySelector(selector),
			    letters = mf_site.animations.getLetters(node),
			    index = 0,
			    timeout = 0,
			    haschild = false,
			    lettercount = letters.map(function (item) {
				return item.letters.length;
			}).reduce(function (a, b) {
				return a + b;
			}),
			    runcount = 0;

			/**
    *	Go through each item in the collection of letters.
    */
			Array.prototype.forEach.call(letters, function (item) {

				/**
     *	Go through each letter and create a span 
     *	element for each of them with required attributes.
     */
				var elements = item.letters.map(function (letter) {
					var span = document.createElement('span');
					span.textContent = letter;
					span.classList.add('letter');
					return span;
				});

				/**
     *	Make the parent node visible and 
     *	clear out child text nodes.
     */
				node.style.opacity = 1.0;
				mf_site.animations.clearText(item.append_to);

				/**
     *	Controlling where the child nodes are placed is 
     *	important to ensure they are inserted in the 
     *	correct places.
     */
				haschild = item.append_to.hasChildNodes();

				/**
     *	Now we start to go through each generated span element.
     */
				Array.prototype.forEach.call(elements, function (element) {
					/**
      *	If there is already a child element when inserting the 
      *	span, we want this to go in before and not after.
      *	
      *	If there is no child element, when we can insert in turn.
      */
					if (haschild) {
						item.append_to.insertBefore(element, item.append_to.lastChild);
					} else {
						item.append_to.appendChild(element);
					}

					/**
      *	We need to animate the letters in sequentially,
      *	so we set the timeout as follows to take care 
      *	of this by adding the class 'revealed' in turn.
      */
					timeout = ++index * delay;

					setTimeout(function () {
						element.classList.add('revealed');
						/**
       *	Then we resolve the promise when we are finished.
       */
						if (++runcount === lettercount) {
							resolve();
						}
					}, timeout);
				});
			});
		});
	},

	/**
  *	This function animates the fade in for an 
  *	element by attaching a class. When the CSS
  *	transition has completed, a resolved Promise
  *	is returned to facilitate chaining.
  *
  *	@function	animateFadeIn
  *	@param		{String} 	- the string for the element selector
  *	@return 	{Promise}	- a resolved promise when the transition has completed
  */
	animateFadeIn: function animateFadeIn(selector) {

		return new Promise(function (resolve, reject) {

			var node = document.querySelector(selector);

			if (!node) {
				reject({
					missing: selector
				});
			} else {
				if (window.getComputedStyle(node).getPropertyValue('opacity') === '0') {
					node.classList.add('faded-in');
					node.addEventListener('transitionend', resolve);
				} else {
					resolve();
				}
			}
		});
	},

	/**
  *	This function sets a property in localStorage
  *	so we don't repeat the same intro animation 
  *	repeatedly on navigation.
  *
  *	@function	setAnimationsComplete
  */
	setAnimationsComplete: function setAnimationsComplete() {
		localStorage.setItem('intro-complete', true);
	},

	/**
  *	This is a filter function to select the 
  *	cards we want to animate on the basis that
  *	they have not been animated yet (no class)
  *	and that they are in view.
  *
  *	@function	filterCards
  *	@param		{HTMLElement} 	- the node for the card
  *	@return 	{Boolean}		- true if the `is-animated` class has not been applied and the card is in view
  */
	filterCards: function filterCards(node) {
		var top = node.getBoundingClientRect().top,
		    height = window.innerHeight,
		    applied = node.classList.contains('is-animated');

		return top <= height && !applied;
	},

	/**
  *	This function is called on load and on throttled scroll.
  *	It fetches all cards, filters them, then applies animations
  *	using a timeOut in a staggered manner to animate the cards
  *	in sequentially as they come into view.
  *
  *	@function	animateVisibleCards
  *	@param 		{String} 	- the selector to get the DOM nodes 
  */
	animateVisibleCardTransforms: function animateVisibleCardTransforms(selector) {

		/**
   *	Grab and filter the card nodes so we choose
   *	the ones that are in view and have not yet 
   *	been animated. 
   *	We also set an index for the timeout function.
   */
		var nodes = document.querySelectorAll(selector),
		    items = Array.prototype.slice.call(nodes),
		    cards = items.filter(mf_site.animations.filterCards),
		    index = 0,
		    speed = Math.ceil(500 / cards.length);

		/**
   *	Go through each filtered card and add 
   *	the class to start the CSS animation.
   *	Each card should animate 75ms after the 
   *	previous card has started.
   */
		Array.prototype.forEach.call(cards, function (card) {
			setTimeout(function () {
				card.classList.add('is-animated');
			}, ++index * speed);
		});
	}
};

if (window.mf_site == null) {
	window.mf_site = {};
}

window.mf_site.ie = {

	/**
  *	Function to determine IE
  *	
  *	@function	isIE
  *	@return		{Boolean} 	- true if IE
  */
	isIE: function isIE() {
		return 'ActiveXObject' in window;
	},

	/**
  *	This function loops through all SVG 
  *	nodes in the current document and 
  *	calls another replace function.
  *	
  *	@function 	ieSvgFix
  */
	ieSvgFix: function ieSvgFix() {
		var svgs = document.querySelectorAll('svg');

		Array.prototype.forEach.call(svgs, mf_site.ie.replaceSVG);
	},

	/**
  *	This function refactors and SVG node
  *	and replaces the more modern embed code
  *	with a simpler image embed, loading a 
  *	single SVG file instead of a sprite.
  *
  *	@function 	replaceSVG
  *	@param		{HTMLElement} - the SVG node
  */
	replaceSVG: function replaceSVG(svg) {
		var src = '/svg/' + svg.getAttribute('data-svg') + '.svg',
		    img = document.createElement('img'),
		    parent = svg.parentNode;

		var attrs = {
			src: src,
			width: svg.getAttribute('width'),
			height: svg.getAttribute('height')
		};

		for (var key in attrs) {
			if (attrs.hasOwnProperty(key)) {
				img[key] = attrs[key];
			}
		}

		parent.removeChild(svg);
		parent.appendChild(img);
	},

	/**
  *	This function appends a class
  *	to the document root if the 
  *	browser is IE. This is to add
  *	some CSS style fixes.
  */
	setClass: function setClass() {
		var doc_root = document.querySelector('html');
		doc_root.classList.add('is-ie');
	}
};
if (window.mf_site == null) {
	window.mf_site = {};
}

onload = function onload() {

	var animations = mf_site.animations,
	    ie = mf_site.ie,
	    menu = mf_site.menu,
	    video = mf_site.video,
	    utils = mf_site.utils,
	    intercom = mf_site.intercom;

	/**
  *	Monitor tap/click on header button
  */
	utils.primeTapEvent('header button', menu.toggleNavReveal);

	/**
  *	Detect IE11 then run fixes
  */
	if (ie.isIE()) {
		ie.setClass();
		ie.ieSvgFix();
	}

	window.addEventListener('scroll', utils.throttle(menu.toggleShadow.bind(null, '.wrapper:first-of-type'), 50));

	/**
  *	Set the video source given device parameters
  */
	var videos = void 0;
	if ((videos = document.querySelectorAll('video')) != null) {
		Array.prototype.forEach.call(videos, video.setVideo);
	}

	/**
  *	Card animation into view
  */
	animations.animateVisibleCardTransforms('.animated-card');
	window.addEventListener('scroll', utils.throttle(animations.animateVisibleCardTransforms.bind(null, '.animated-card'), 200));

	/**
  *	Skip animations if promises 
  *	not supported. Polyfill will
  *	come soon for this.
  */
	if (!window.Promise) {
		return;
	}

	/**
  *	Call intro animation only if it has not already been run.
  */
	if (localStorage.getItem('intro-complete') == null) {
		animations.animateLetters('header h1').then(animations.animateFadeIn.bind(null, 'nav')).then(animations.animateFadeIn.bind(null, '.teaser:first-of-type')).then(animations.setAnimationsComplete).catch(console.log);
	} else {
		Promise.all([animations.animateLetters('header h1', 20), animations.animateFadeIn('nav'), animations.animateFadeIn('.teaser:first-of-type')]).catch(console.log);
	}
};
if (window.mf_site == null) {
	window.mf_site = {};
}

window.mf_site.menu = {

	/**
  *	This function acts on tap/click
  *	on the header menu button and 
  *	reveals the site navigation.
  *
  *	@function	toggleNavReveal
  */
	toggleNavReveal: function toggleNavReveal() {
		var body = document.body,
		    header = document.querySelector('header'),
		    nav = header.querySelector('nav');

		if (nav.classList.toggle('revealed')) {
			header.classList.add('nav-open');
			body.classList.add('prevent-scroll');
		} else {
			header.classList.remove('nav-open');
			body.classList.remove('prevent-scroll');
		}
	},

	/**
  *	This function toggles the bottom 
  *	shadow for element once the window
  *	scroll goes beyond a certain point.
  *
  *	@function 	toggleShadow
  *	@param 		{String} 	- selector string for the node to apply the shadow styling to.
  */
	toggleShadow: function toggleShadow(selector) {
		var teaser = document.querySelector('.teaser:first-of-type, .video-teaser:first-of-type'),
		    node = document.querySelector(selector),
		    scroll = document.body.scrollTop || document.documentElement.scrollTop,
		    height = teaser.clientHeight;

		if (scroll >= height) {
			if (!node.classList.contains('shadowed')) {
				node.classList.add('shadowed');
			}
		} else {
			if (node.classList.contains('shadowed')) {
				node.classList.remove('shadowed');
			}
		}
	}

};

if (window.mf_site == null) {
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
	deviceParameters: function deviceParameters() {
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

		var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

		var pixel_ratio = Math.ceil(window.devicePixelRatio || 1);

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
	primeTapEvent: function primeTapEvent(selector, fn) {
		var items = document.querySelectorAll(selector);
		Array.prototype.forEach.call(items, function (item) {
			if ('onpointerdown' in window) {
				item.addEventListener('pointerdown', fn);
			} else if ('ontouchstart' in window) {
				item.addEventListener('touchstart', fn);
			} else {
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
	throttle: function throttle(fn) {
		var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

		var waiting = false;

		return function () {
			if (!waiting) {
				fn.call();
				waiting = true;
				setTimeout(function () {
					waiting = false;
				}, limit);
			}
		};
	}

};
if (window.mf_site == null) {
	window.mf_site = {};
}

window.mf_site.video = {

	/**
  *	This function returns parameters needed to load
  *	a video of the correct size, given the screen.
  *	We read in the device screen parameters and return
  *	the most suitable breakpoint.
  *	
  *	@function	getVideoParams
  *	@return 	{Object} 	- breakpoint, with video size and screen pixel ratio
  */
	getVideoParams: function getVideoParams() {
		var device = mf_site.utils.deviceParameters(),
		    breaks = [{
			width: 320,
			wide: false
		}, {
			width: 640,
			wide: false
		}, {
			width: 768,
			wide: false
		}, {
			width: 1024,
			wide: false
		}, {
			width: 1280,
			wide: true
		}, {
			width: 1600,
			wide: true
		}];

		var min_cb = function min_cb(prev, curr) {
			return Math.abs(curr.width - device.width) < Math.abs(prev.width - device.width) ? curr : prev;
		},
		    breakpoint = breaks.reduce(min_cb);

		breakpoint.pixel_ratio = device.pixel_ratio;

		return breakpoint;
	},

	/**
  *	This function takes in a reference to a 
  *	DOM node for a video element, and sets the 
  *	correct video parameters given a calculated
  *	breakpoint. The video is then played.
  *
  *	@function	setVideo
  *	@param 		{HTMLElement} 	- the DOM node for the video element
  */
	setVideo: function setVideo(video) {
		var breakpoint = mf_site.video.getVideoParams(),
		    video_base = video.getAttribute('data-base-url'),
		    video_name = video.getAttribute('data-video'),
		    video_width = breakpoint.pixel_ratio * breakpoint.width,
		    poster_name = video.getAttribute('data-poster'),
		    append = breakpoint.wide ? '-wide' : '',
		    media_src = video_base + '/w_' + (video_width > 1920 ? 1920 : video_width) + ',br_3m/' + video_name + append;

		var formats = [{
			ext: 'webm',
			type: 'video/webm'
		}, {
			ext: 'mp4',
			type: 'video/mp4'
		}, {
			ext: 'ogv',
			type: 'video/ogg'
		}];

		video.setAttribute('poster', media_src + '.jpg');

		Array.prototype.forEach.call(formats, function (format) {
			var source = document.createElement('source');
			source.setAttribute('src', media_src + '.' + format.ext);
			source.setAttribute('type', '' + format.type);
			video.appendChild(source);
			video.play();
		});
	}

};