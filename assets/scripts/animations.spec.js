import * as animations from './animations';
import * as utils from './utils';
import * as sinon from 'sinon';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}
global.localStorage = new LocalStorageMock();

describe('animations', () => {

  it('should get letters with nested nodes', () => {
    const spy_getLetters = sinon.spy(utils, 'getLetters');
    const node = document.createElement('h1');
    const message = 'This is';
    const innerNode = document.createElement('span');
    const innerMessage = 'another test';

    node.appendChild(document.createTextNode(message));
    innerNode.appendChild(document.createTextNode(innerMessage));
    node.appendChild(innerNode);

    expect(utils.getLetters(node)).toEqual(
      [
        {
          append_to: node,
          letters: 'This is'.split('')
        },
        {
          append_to: innerNode,
          letters: 'another test'.split('')
        }
      ]
    );
    expect(spy_getLetters.callCount).toEqual(1);
    expect(spy_getLetters.getCall(0).args[0]).toEqual(node);
    expect(spy_getLetters.getCall(0).args[1]).toBe(undefined);

    spy_getLetters.restore();
  });

  it('should remove child nodes', () => {
    const spy_removeChild = sinon.spy();
    const node = {
      removeChild: spy_removeChild,
      childNodes: [
        {
          nodeType: 3
        },
        {
          nodeType: 3
        },
        {
          nodeType: 1
        }
      ]
    };

    animations.clearText(node);
    expect(spy_removeChild.callCount).toEqual(2);
    expect(spy_removeChild.getCall(0).args[0]).toEqual({ nodeType: 3 });
    expect(spy_removeChild.getCall(1).args[0]).toEqual({ nodeType: 3 });
  });

  it('should animate letters', () => {
    const clock = sinon.useFakeTimers();
    const spy_clearText = sinon.spy(animations, 'clearText');
    const spy_createElement = sinon.spy(document, 'createElement');
    const heading = document.createElement('h1');

    heading.appendChild(document.createTextNode('Testing'));
    heading.classList.add('test');
    document.body.appendChild(heading);

    expect(animations.animateLetters('h1')).resolves.toBe(true);

    clock.tick(550);

    const letters = document.querySelectorAll('span');

    expect(spy_clearText.callCount).toEqual(0);
    expect(spy_createElement.callCount).toEqual(9);
    expect(letters).toHaveLength(7);

    for (const letter of letters) {
      expect(letter.classList.contains('revealed')).toBe(true);
    }

    document.body.removeChild(heading);
    spy_clearText.restore();
    spy_createElement.restore();

    clock.restore();
  });

  it('should animate letters for a text node with a child text node', () => {
    const clock = sinon.useFakeTimers();
    const heading = document.createElement('h1');
    const child = document.createElement('strong');
    const spy_clearText = sinon.spy(animations, 'clearText');
    const spy_createElement = sinon.spy(document, 'createElement');

    heading.appendChild(document.createTextNode('First'));
    child.appendChild(document.createTextNode('Last'));
    heading.appendChild(child);
    document.body.appendChild(heading);

    expect(animations.animateLetters('h1')).resolves.toBe(true);
    expect(spy_clearText.callCount).toEqual(0);
    expect(spy_createElement.callCount).toEqual(9);

    document.body.removeChild(heading);
    spy_clearText.restore();
    spy_createElement.restore();

    clock.restore();
  });

  it('animates fade in', () => {
    const node = document.createElement('h1');
    const spy_add = sinon.spy(node.classList, 'add');
    const stub_addEventListener = sinon.stub(node, 'addEventListener').yields(true);
    const stub_getComputedStyle = sinon.stub(window, 'getComputedStyle');

    stub_getComputedStyle.onCall(0).returns({
      getPropertyValue: () => {
        return '1';
      }
    });
    stub_getComputedStyle.onCall(1).returns({
      getPropertyValue: () => {
        return '0';
      }
    });
    document.body.appendChild(node);

    expect(animations.animateFadeIn('h2')).rejects.toEqual({ missing: 'h2' });
    expect(spy_add.callCount).toEqual(0);
    expect(stub_addEventListener.callCount).toEqual(0);
    expect(stub_getComputedStyle.callCount).toEqual(0);

    expect(animations.animateFadeIn('h1')).resolves.toBe(true);
    expect(spy_add.callCount).toEqual(0);
    expect(stub_addEventListener.callCount).toEqual(0);
    expect(stub_getComputedStyle.getCall(0).args[0]).toEqual(node);

    expect(animations.animateFadeIn('h1')).resolves.toBe(true);
    expect(stub_getComputedStyle.getCall(1).args[0]).toEqual(node);
    expect(spy_add.getCall(0).args[0]).toEqual('faded-in');
    expect(stub_addEventListener.getCall(0).args[0]).toEqual('transitionend');

    spy_add.restore();
    stub_addEventListener.restore();
    stub_getComputedStyle.restore();
  });

  it('sets animations complete', () => {
    const stub_setItem = sinon.stub(window.localStorage, 'setItem');

    animations.setAnimationsComplete();
    expect(stub_setItem.getCall(0).args[0]).toEqual('intro-complete');

    stub_setItem.restore();
  });

  it('filters cards', () => {
    const node = document.createElement('div');
    const stub_getBoundingClientRect = sinon.stub(node, 'getBoundingClientRect');
    const stub_contains = sinon.stub(node.classList, 'contains');

    stub_getBoundingClientRect.onCall(0).returns({ top: 0 });
    stub_contains.onCall(0).returns(false);
    expect(animations.filterCards(node)).toBe(true);

    stub_getBoundingClientRect.onCall(1).returns({ top: 400 });
    stub_contains.onCall(1).returns(true);
    expect(animations.filterCards(node)).toBe(false);

    stub_getBoundingClientRect.onCall(2).returns({ top: 800 });
    stub_contains.onCall(2).returns(true);
    expect(animations.filterCards(node)).toBe(false);

    stub_getBoundingClientRect.onCall(3).returns({ top: 400 });
    stub_contains.onCall(3).returns(false);
    expect(animations.filterCards(node)).toBe(true);

    stub_getBoundingClientRect.restore();
    stub_contains.restore();
  });

  it('animated visible card transforms', (done) => {
    const cards = [...new Array(10)].map(() => document.createElement('div'));

    cards.forEach(card => {
      document.body.appendChild(card);
    });
    animations.animateVisibleCardTransforms('div');
    expect([...document.querySelectorAll('.is-animated')].length).toEqual(0);

    setTimeout(() => {
      expect([...document.querySelectorAll('.is-animated')].length).toEqual(10);
      done();
    }, 500);
  });

});
