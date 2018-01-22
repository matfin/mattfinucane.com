import * as sinon from 'sinon';
import * as utils from './utils';

const noop = () => {};

describe('utils', () => {

  it('should get letters', () => {
    const spy_getLetters = sinon.spy(utils, 'getLetters');
    const message = 'This is a test';
    const node = document.createElement('h1');

    node.appendChild(document.createTextNode(message));
    expect(utils.getLetters(node)).toEqual([
      {
        append_to: node,
        letters: message.split('')
      }
    ]);
    expect(spy_getLetters.callCount).toEqual(1);
    expect(spy_getLetters.getCall(0).args[0]).toEqual(node);
    expect(spy_getLetters.getCall(0).args[1]).toBe(undefined);

    spy_getLetters.restore();
  });

  it('should return the correct device parameters', () => {
    global.innerWidth = 1200;
    global.innerHeight = 800;
    global.devicePixelRatio = 2;
    expect(utils.deviceParameters()).toEqual({
      width: 1200,
      height: 800,
      pixel_ratio: 2
    });

    global.innerWidth = null;
    global.innerHeight = null;
    global.devicePixelRatio = null;
    expect(utils.deviceParameters()).toEqual({
      width: 0,
      height: 0,
      pixel_ratio: 1
    });
  });

  it('should return the correct video params', () => {
    global.innerWidth = 375;
    global.devicePixelRatio = 1;

    expect(utils.getVideoParams()).toEqual({
      width: 320,
      wide: false,
      pixel_ratio: 1
    });

    global.innerWidth = 640;
    expect(utils.getVideoParams()).toEqual({
      width: 640,
      wide: false,
      pixel_ratio: 1
    });

    global.innerWidth = 800;
    global.devicePixelRatio = 1.5;
    expect(utils.getVideoParams()).toEqual({
      width: 768,
      wide: false,
      pixel_ratio: 2
    });

    global.innerWidth = 1136;
    global.devicePixelRatio = 1;
    expect(utils.getVideoParams()).toEqual({
      width: 1024,
      wide: false,
      pixel_ratio: 1
    });

    global.innerWidth = 1440;
    expect(utils.getVideoParams()).toEqual({
      width: 1280,
      wide: true,
      pixel_ratio: 1
    });

    global.innerWidth = 1920;
    expect(utils.getVideoParams()).toEqual({
      width: 1600,
      wide: true,
      pixel_ratio: 1
    });
  });

  it('should set up tap events', () => {
    const spy_addEventListener = sinon.spy();
    const stub_querySelectorAll = sinon.stub(document, 'querySelectorAll').returns([
      {
        addEventListener: spy_addEventListener
      }
    ]);

    utils.primeTapEvent([{}], noop);
    expect(spy_addEventListener.getCall(0).args[0]).toEqual('click');
    expect(spy_addEventListener.getCall(0).args[1]).toEqual(noop);

    document.ontouchstart = {};
    utils.primeTapEvent([{}], noop);
    expect(spy_addEventListener.getCall(1).args[0]).toEqual('touchstart');
    expect(spy_addEventListener.getCall(1).args[1]).toEqual(noop);

    document.onpointerdown = {};
    utils.primeTapEvent([{}], noop);
    expect(spy_addEventListener.getCall(2).args[0]).toEqual('pointerdown');
    expect(spy_addEventListener.getCall(2).args[1]).toEqual(noop);

    delete document.onpointerdown;
    delete document.ontouchstart;
    stub_querySelectorAll.restore();
  });

  it('should throttle a function', (done) => {
    const spy = sinon.spy();

    global.addEventListener('resize', utils.throttle(spy, 20));
    global.dispatchEvent(new Event('resize'));
    global.dispatchEvent(new Event('resize'));
    global.dispatchEvent(new Event('resize'));
    global.dispatchEvent(new Event('resize'));
    global.dispatchEvent(new Event('resize'));

    setTimeout(() => {
      expect(spy.callCount).toEqual(1);
      done();
    }, 30);
  });

  it('should throttle a function with the default limit', (done) => {
    const spy = sinon.spy();

    global.addEventListener('resize', utils.throttle(spy));
    global.dispatchEvent(new Event('resize'));
    global.dispatchEvent(new Event('resize'));

    setTimeout(() => {
      expect(spy.callCount).toEqual(1);
      done();
    }, 200);
  });

  it('should check if a child node is valid', () => {
    expect(utils.isValidChild({
      nodeType: 1,
      textContent: ' test'
    })).toBe(true);

    expect(utils.isValidChild({
      nodeType: 3,
      textContent: 'another test'
    })).toBe(true);

    expect(utils.isValidChild({
      nodeType: 1,
      textContent: ''
    })).toBe(false);
  });

});
