export const isIE = () => {
  return 'ActiveXObject' in window;
};

export const replaceSVG = (svg) => {
  const src = `/svg/${svg.getAttribute('data-svg')}.svg`;
  const img	= document.createElement('img');
  const { parentNode: parent } = svg;
  const attrs = {
    src,
    width:	svg.getAttribute('width'),
    height:	svg.getAttribute('height')
  };

  for (const key in attrs) {
    if (Object.prototype.hasOwnProperty.call(attrs, key)) {
      img[key] = attrs[key];
    }
  }

  parent.removeChild(svg);
  parent.appendChild(img);
};

export const ieSvgFix = () => {
  [...document.querySelectorAll('svg')].forEach(replaceSVG);
};

export const setClass = () => {
  const doc_root = document.querySelector('html');

  doc_root.classList.add('is-ie');
};

