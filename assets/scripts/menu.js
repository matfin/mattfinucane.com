export const toggleNavReveal = () => {
  const { body } = document;
  const header = document.querySelector('header');
  const nav = header.querySelector('nav');

  if (nav.classList.toggle('revealed')) {
    header.classList.add('nav-open');
    body.classList.add('prevent-scroll');
  } else {
    header.classList.remove('nav-open');
    body.classList.remove('prevent-scroll');
  }
};

export const toggleShadow = (selector) => {
  const teaser = document.querySelector('.teaser, .video-teaser');
  const node = document.querySelector(selector);
  const scroll = document.body.scrollTop || document.documentElement.scrollTop;
  const { clientHeight:height } = teaser;

  if (scroll >= height) {
    if (!node.classList.contains('shadowed')) {
      node.classList.add('shadowed');
    }
  } else if (node.classList.contains('shadowed')) {
    node.classList.remove('shadowed');
  }
};

