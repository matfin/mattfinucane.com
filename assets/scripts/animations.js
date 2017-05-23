if(window.mf_site == null) {
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
	getLetters: (node, letters = []) => {

		/**
		 *	Get a list of child nodes converted
		 *	to an array and filter them  down to 
		 *	the ones we are interested in:
		 *	- html element nodes
		 *	- child text nodes that have actual text in them
		 */
		let child_nodes 	= Array.prototype.slice.call(node.childNodes),
			filtered_nodes	= child_nodes.filter((child) => {
				return (child.nodeType === 1 || child.nodeType === 3) && child.textContent.trim().length > 0;
			});

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
		Array.prototype.forEach.call(filtered_nodes, (filtered_node) => {
			if(filtered_node.nodeType === 3) {
				letters.push({
					append_to: node,
					letters: filtered_node.textContent.trim().split('')
				});
			}
			else {
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
	clearText: (node) => {
		let child_nodes 	= Array.prototype.slice.call(node.childNodes),
			filtered_nodes 	= child_nodes.filter((child) => {
				return child.nodeType === 3;
			});

		Array.prototype.forEach.call(filtered_nodes, (filtered_node) => {
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
	animateLetters: (selector, delay = 75) => {

		return new Promise((resolve, reject) => {

			/**
			 *	Here, we do the following:
			 *	- grab a reference to the parent node
			 *	- grab all the children of that node and the letters inside each child
			 *	- set the index and timeouts to 0, which we will accumulate later
			 *	- call a map and reduce function to get the total letter count
			 *  - set the runcount, which we use to determine when all letters have been processed
			 */
			let node 		= document.querySelector(selector),
				letters 	= mf_site.animations.getLetters(node),
				index 		= 0,
				timeout 	= 0,
				haschild	= false,
				lettercount = letters.map((item) => item.letters.length).reduce((a, b) => a + b),
				runcount 	= 0;

			/**
			 *	Go through each item in the collection of letters.
			 */
			Array.prototype.forEach.call(letters, (item) => {

				/**
				 *	Go through each letter and create a span 
				 *	element for each of them with required attributes.
				 */
				let elements = item.letters.map((letter) => {
					let span = document.createElement('span');
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
				Array.prototype.forEach.call(elements, (element) => {
					/**
					 *	If there is already a child element when inserting the 
					 *	span, we want this to go in before and not after.
					 *	
					 *	If there is no child element, when we can insert in turn.
					 */
					if(haschild) {
						item.append_to.insertBefore(element, item.append_to.lastChild);
					}
					else {
						item.append_to.appendChild(element);
					}

					/**
					 *	We need to animate the letters in sequentially,
					 *	so we set the timeout as follows to take care 
					 *	of this by adding the class 'revealed' in turn.
					 */
					timeout = (++index) * delay;
					
					setTimeout(() => {
						element.classList.add('revealed');
						/**
						 *	Then we resolve the promise when we are finished.
						 */
						if(++runcount === lettercount) {
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
	animateFadeIn: (selector) => {

		return new Promise((resolve, reject) => {

			let node = document.querySelector(selector);

			if(!node) {
				reject({
					missing: selector
				});
			}
			else {
				if(window.getComputedStyle(node).getPropertyValue('opacity') === '0') {
					node.classList.add('faded-in');
					node.addEventListener('transitionend', resolve);
				}
				else {
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
	setAnimationsComplete: () => {
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
	filterCards: (node) => {
		let top 	= node.getBoundingClientRect().top,	
			height 	= window.innerHeight,
			applied = node.classList.contains('is-animated');

		return (top <= height) && !applied;
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
	animateVisibleCardTransforms: (selector) => {

		/**
		 *	Grab and filter the card nodes so we choose
		 *	the ones that are in view and have not yet 
		 *	been animated. 
		 *	We also set an index for the timeout function.
		 */
		let nodes 	= document.querySelectorAll(selector),
			items 	= Array.prototype.slice.call(nodes),
			cards 	= items.filter(mf_site.animations.filterCards),
			index 	= 0;

		/**
		 *	Go through each filtered card and add 
		 *	the class to start the CSS animation.
		 *	Each card should animate 75ms after the 
		 *	previous card has started.
		 */
		Array.prototype.forEach.call(cards, (card) => {
			setTimeout(() => {
				card.classList.add('is-animated');
			}, (++index) * 75);
		});
	}
};








