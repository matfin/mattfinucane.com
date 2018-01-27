import {
  primeTapEvent,
  throttle
} from './utils';
import { isIE, setClass, ieSvgFix } from './ie';
import { setVideo } from './video';
import {
  animateVisibleCardTransforms,
  setAnimationsComplete,
  animateLetters,
  animateFadeIn
} from './animations';
import {
  toggleNavReveal,
  toggleShadow
} from './menu';

onload = () => {

  /**
   *	Monitor tap/click on header button
   */
  primeTapEvent('header button', toggleNavReveal);

  /**
   *	Detect IE11 then run fixes
   */
  if (isIE()) {
    setClass();
    ieSvgFix();
  }

  window.addEventListener('scroll', throttle(toggleShadow.bind(null, '.wrapper:first-of-type'), 50));

  /**
   *	Set the video source given device parameters
   */
  let videos;
  if ((videos = document.querySelectorAll('video'))) {
    [...videos].forEach(setVideo);
  }

  /**
   *	Card animation into view
   */
  animateVisibleCardTransforms('.animated-card');
  window.addEventListener('scroll', throttle(animateVisibleCardTransforms.bind(null, '.animated-card'), 200));

  /**
   *	Skip animations if promises
   *	not supported. Polyfill will
   *	come soon for this.
   */
  if (!window.Promise) {
    return;
  }

  /**
   *	Call intro animation only if it has not already been run.
   */
  if (!localStorage.getItem('intro-complete')) {
    animateLetters('header h1')
      .then(animateFadeIn.bind(null, 'nav'))
      .then(animateFadeIn.bind(null, '.teaser:first-of-type'))
      .then(setAnimationsComplete)
      .catch(console.error); // eslint-disable-line no-console
  } else if (localStorage.getItem('intro-complete')) {
    Promise.all([
      animateLetters('header h1', 20),
      animateFadeIn('nav'),
      animateFadeIn('.teaser:first-of-type')
    ]).catch(() => {});
  }

};
