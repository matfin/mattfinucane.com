import * as ie from './ie';
import * as sinon from 'sinon';

describe('ie', () => {

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should check for IE', () => {
    expect(ie.isIE()).toBe(false);

    window.ActiveXObject = {};
    expect(ie.isIE()).toBe(true);

    delete window.ActiveXObject;
  });

  it('should replace the svg element with an img element', () => {
    const stub_hasOwnProperty = sinon.stub(Object.prototype.hasOwnProperty, 'call');
    const svg = document.createElement('svg');
    let img = null;

    stub_hasOwnProperty.onCall(0).returns(true);
    stub_hasOwnProperty.onCall(1).returns(true);
    stub_hasOwnProperty.onCall(2).returns(false);

    svg.setAttribute('data-svg', 'test');
    svg.setAttribute('width', 100);
    svg.setAttribute('height', 100);

    document.body.appendChild(svg);
    ie.replaceSVG(svg);

    expect(document.querySelector('svg')).toBe(null);

    img = document.querySelector('img');
    expect(img.getAttribute('src')).toEqual('/svg/test.svg');
    expect(img.getAttribute('width')).toEqual('100');
    expect(img.getAttribute('height')).toBe(null);

    stub_hasOwnProperty.restore();
  });

  it('should replace many svgs', () => {
    [...new Array(5)].forEach(() => {
      const svg = document.createElement('svg');
      document.body.appendChild(svg);
    });

    expect(document.querySelectorAll('svg').length).toEqual(5);
    ie.ieSvgFix();
    expect(document.querySelectorAll('img').length).toEqual(5);
  });

  it('sets the root class', () => {
    expect(document.querySelector('.is-ie')).toBe(null);
    ie.setClass();
    expect(document.querySelectorAll('.is-ie').length).toEqual(1);
  });

});
