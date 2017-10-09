import * as utils from './utils';

export const clearText = (node) => {
  const filtered_nodes = [...node.childNodes].filter(child => child.nodeType === 3);

  filtered_nodes.forEach(filtered_node => node.removeChild(filtered_node));
  return node;
};

export const animateLetters = (selector, delay = 75) => {
  return new Promise((resolve) => {
    const node = document.querySelector(selector);
    const	letters = utils.getLetters(node);
    const	lettercount = letters.map((item) => item.letters.length).reduce((a, b) => a + b);
    let index = 0;
    let	haschild = false;
    let	runcount = 0;
    let	timeout = 0;

    /**
     *	Go through each item in the collection of letters.
     */
    letters.forEach((item) => {
      const elements = item.letters.map((letter) => {
        const span = document.createElement('span');

        span.textContent = letter;
        span.classList.add('letter');
        return span;
      });

      /**
       *  Make the parent node visible and
       *  clear out child text nodes.
       */
      node.style.opacity = 1.0;
      clearText(item.append_to);

      /**
       * Controlling where the child nodes are placed is
       * important to ensure they are inserted in the
       * correct places.
       */
      haschild = item.append_to.hasChildNodes();

      /**
       *	Now we start to go through each generated span element.
       */
      elements.forEach((element) => {

        /**
         *	If there is already a child element when inserting the
         *	span, we want this to go in before and not after.
         *
         *	If there is no child element, when we can insert in turn.
         */
        if (haschild) {
          item.append_to.insertBefore(element, item.append_to.lastChild);
        } else {
          item.append_to.appendChild(element);
        }

        /**
         *	We need to animate the letters in sequentially,
         *	so we set the timeout as follows to take care
         *	of this by adding the class 'revealed' in turn.
         */

        index += 1;
        timeout = (index) * delay;

        setTimeout(() => {
          element.classList.add('revealed');

          /**
           *	Then we resolve the promise when we are finished.
           */
          runcount += 1;
          if (runcount === lettercount) {
            resolve(true);
          }
        }, timeout);
      });
    });
  });
};

export const animateFadeIn = (selector) => {
  return new Promise((resolve, reject) => {
    const node = document.querySelector(selector);

    if (!node) {
      reject({
        missing: selector
      });
      return;
    }
    if (window.getComputedStyle(node).getPropertyValue('opacity') === '0') {
      node.classList.add('faded-in');
      node.addEventListener('transitionend', resolve);
    } else {
      resolve(true);
    }
  });
};

export const setAnimationsComplete = () => {
  localStorage.setItem('intro-complete', true);
};

export const filterCards = (node) => {
  const top 		= node.getBoundingClientRect().top;
  const height 	= window.innerHeight;
  const applied = node.classList.contains('is-animated');

  return (top <= height) && !applied;
};

export const animateVisibleCardTransforms = (selector) => {
  const cards = [...document.querySelectorAll(selector)].filter(filterCards);
  const speed = Math.ceil(500 / cards.length);
  let index = 0;

  cards.forEach((card) => {
    setTimeout(() => {
      card.classList.add('is-animated');
      index += 1;
    }, (index) * speed);
  });
};

