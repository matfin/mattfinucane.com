let getLetters = (node, letters = []) => {

	let child_nodes 	= Array.prototype.slice.call(node.childNodes),
		filtered_nodes	= child_nodes.filter((child) => {
			return (child.nodeType === 1 || child.nodeType === 3) && child.textContent.trim().length > 0;
		});

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

};

let clearText = (node) => {
	let child_nodes 	= Array.prototype.slice.call(node.childNodes),
		filtered_nodes 	= child_nodes.filter((child) => {
			return child.nodeType === 3;
		});

	Array.prototype.forEach.call(filtered_nodes, (filtered_node) => {
		node.removeChild(filtered_node);
	});
};

let animateLetters = (selector) => {
	let node 		= document.querySelector(selector),
		letters 	= [],
		index 		= 0,
		timeout 	= 0,
		haschild	= false;

	getLetters(node, letters);

	Array.prototype.forEach.call(letters, (item) => {

		let elements = item.letters.map((letter) => {
			let span = document.createElement('span');
			span.textContent = letter;
			span.classList.add('letter');
			return span;
		});

		node.style.opacity = 1.0;
		clearText(item.append_to);

		haschild = item.append_to.hasChildNodes();

		Array.prototype.forEach.call(elements, (element) => {
			if(haschild) {
				item.append_to.insertBefore(element, item.append_to.lastChild);
			}
			else {
				item.append_to.appendChild(element);
			}

			timeout = (++index) * 75;
			setTimeout(() => {
				element.classList.add('revealed');
			}, timeout);
		});

	});

};