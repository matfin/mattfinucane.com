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
let getLetters = (node, letters = []) => {

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
			getLetters(filtered_node, letters);
		}
	});

	/**
	 *	Return a list of the letters that have been split
	 *	out and associated with their parent html nodes.
	 */
	return letters;

};

/**
 *	This function takes a node and clears out all its
 *	text nodes but leaves the html nodes in place.
 *
 *	@function 	clearText
 *	@param 		{HTMLElement} - the node to clear the text from
 *	@return 	{HTMLElement} - the node with the text cleared
 */
let clearText = (node) => {
	let child_nodes 	= Array.prototype.slice.call(node.childNodes),
		filtered_nodes 	= child_nodes.filter((child) => {
			return child.nodeType === 3;
		});

	Array.prototype.forEach.call(filtered_nodes, (filtered_node) => {
		node.removeChild(filtered_node);
	});

	return node;
};

/**
 *	This function will animate the letters in place
 *	for a html element. It will go through each letter
 *	in turn, wrapping it in a span and adding a class 
 *	name so we can reference this in CSS and start
 *	the transtion.
 *
 *	@function 	animateLetters
 *	@param		{String} 	- the DOM selector string
 *	@return 	{Promise} 	- a resolved promise when the animation is finished 
 */
let animateLetters = (selector) => {

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
			letters 	= getLetters(node),
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
			clearText(item.append_to);

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
				timeout = (++index) * 75;
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
};