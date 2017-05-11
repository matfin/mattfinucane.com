/**
 *	Only IE has the following property in window
 */
const isIE = () => {
	return 'ActiveXObject' in window;
};

/**
 *	Loop through all SVGs and replace.
 */
const ieSvgFix = () => {
	let svgs = document.querySelectorAll(`svg`);

	Array.prototype.forEach.call(svgs, (svg) => {
		replaceSVG(svg);
	});
};

/**
 *	Replace SVG with `use` with the `img` tag
 *	and assign properties from one to the other.
 */
const replaceSVG = (svg) => {
	let src 		= `/svg/${svg.getAttribute('data-svg')}.svg`,
		img			= document.createElement('img'),
		parent		= svg.parentNode;

	let	attrs = {
		src:		src,
		width:		svg.getAttribute('width'),
		height:		svg.getAttribute('height'),
		classList:	svg.classList
	};
	
	for(let key in attrs) {
		if(attrs.hasOwnProperty(key)) {
			img[key] = attrs[key];
		}
	}

	parent.removeChild(svg);
	parent.appendChild(img);
};