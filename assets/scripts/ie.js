if(window.mf_site == null) {
	window.mf_site = {};
}

window.mf_site.ie = {

	/**
	 *	Function to determine IE
	 *	
	 *	@function	isIE
	 *	@return		{Boolean} 	- true if IE
	 */
	isIE: () => {
		return 'ActiveXObject' in window;
	},

	/**
	 *	This function loops through all SVG 
	 *	nodes in the current document and 
	 *	calls another replace function.
	 *	
	 *	@function 	ieSvgFix
	 */
	ieSvgFix: () => {
		let svgs = document.querySelectorAll(`svg`);

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
	replaceSVG: (svg) => {
		let src 		= `/svg/${svg.getAttribute('data-svg')}.svg`,
			img			= document.createElement('img'),
			parent		= svg.parentNode;

		let	attrs = {
			src:	src,
			width:	svg.getAttribute('width'),
			height:	svg.getAttribute('height')
		};
		
		for(let key in attrs) {
			if(attrs.hasOwnProperty(key)) {
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
	setClass: () => {
		let doc_root = document.querySelector('html');
		doc_root.classList.add('is-ie');
	}
};