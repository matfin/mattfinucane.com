const splitLetters = (selector) => {
	let node 		= document.querySelector(selector),
		children	= node.children,
		index 		= 0;

	Array.prototype.forEach.call(children, (child) => {
		let letters = child.textContent.split('');
		let elements = letters.map((letter) => {
			let span = document.createElement('span');
			span.textContent = letter;
			span.classList.add('letter');
			return span;
		});

		child.textContent = '';
		node.style.display = 'inline-block';
		Array.prototype.forEach.call(elements, (element) => {
			child.appendChild(element);
			setTimeout(() => {
				element.classList.add('revealed');
			}, ++index * 75);
		});
	});
};
