const animateLetters = (selector) => {

	return new Promise((resolve, reject) => {
		let node 		= document.querySelector(selector),
			children	= node.children,
			index 		= 0,
			timeout 	= 0;

		Array.prototype.forEach.call(children, (child) => {
			let letters = child.textContent.split('');

			let elements = letters.map((letter) => {
				let span = document.createElement('span');
				span.textContent = letter;
				span.classList.add('letter');
				return span;
			});

			child.textContent = '';
			node.style.opacity = 1.0;

			Array.prototype.forEach.call(elements, (element) => {
				child.appendChild(element);
				timeout = (++index) * 75;
				setTimeout(() => {
					element.classList.add('revealed');
				}, timeout);
			});
		});

		setTimeout(resolve, timeout);
	});

};
