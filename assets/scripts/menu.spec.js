import * as menu from './menu';

describe('menu', () => {

  it('should toggle to reveal the menu', () => {
    const body = document.body;
    const header = document.createElement('header');
    const nav = document.createElement('nav');

    header.appendChild(nav);
    body.appendChild(header);

    menu.toggleNavReveal();
    expect(nav.classList.contains('revealed')).toBe(true);
    expect(header.classList.contains('nav-open')).toBe(true);
    expect(body.classList.contains('prevent-scroll')).toBe(true);

    menu.toggleNavReveal();
    expect(nav.classList.contains('revealed')).toBe(false);
    expect(header.classList.contains('nav-open')).toBe(false);
    expect(body.classList.contains('prevent-scroll')).toBe(false);
  });

  it('should add or remove shadow', () => {
    const { body } = document;
    const teaser = document.createElement('div');
    const header = document.createElement('header');

    body.style.height = '1000px';

    teaser.classList.add('teaser');
    Object.defineProperty(teaser, 'clientHeight', {
      value: 300
    });

    header.classList.add('header');
    Object.defineProperty(header, 'clientHeight', {
      value: 64
    });

    body.appendChild(header);
    body.appendChild(teaser);

    menu.toggleShadow('.header');
    expect(header.classList.contains('shadowed')).toBe(false);

    document.body.scrollTop = 400;
    menu.toggleShadow('.header');
    expect(header.classList.contains('shadowed')).toBe(true);

    document.body.scrollTop = 600;
    menu.toggleShadow('.header');
    expect(header.classList.contains('shadowed')).toBe(true);

    document.body.scrollTop = 200;
    menu.toggleShadow('.header');
    expect(header.classList.contains('shadowed')).toBe(false);

    body.removeChild(teaser);
    body.removeChild(header);
  });

});
