(() => {
  const nav = document.querySelector('#nav');
  const setClass = () => {
    if (window.pageYOffset > 10) {
      nav?.classList.add('lg:border-b', 'lg:shadow-md');
    } else {
      nav?.classList.remove('lg:border-b', 'lg:shadow-md');
    }
  };
  window.addEventListener('scroll', setClass, { passive: true });
})();

(() => {
  const mainNav = document.querySelector('#nav');
  const menu = document.querySelector('#nav-menu');
  const menuBody = document.querySelector('#nav-menu-body');
  const menuTrigger = document.querySelector('#nav-menu-trigger');
  const menuClose = document.querySelector('#nav-menu-close');
  const body = document.querySelector('body');

  const open = () => {
    menu?.classList.remove('invisible');
    menuBody?.classList.add('translate-x-0');
    menuBody?.classList.remove('-translate-x-full');
    body?.classList.add('overflow-hidden');
  };
  const close = () => {
    menu?.classList.add('invisible');
    menuBody?.classList.remove('translate-x-0');
    menuBody?.classList.add('-translate-x-full');
    body?.classList.remove('overflow-hidden');
  };

  menuTrigger?.addEventListener('click', open);
  menuClose?.addEventListener('click', close);

  document.addEventListener('click', (e) => {
    if (!menuBody?.contains(e.target) && !menuTrigger?.contains(e.target)) {
      close();
    }
  });
})();

(() => {
  const menu = document.querySelector('#menu');
  const menuBody = document.querySelector('#menu-body');
  const menuTrigger = document.querySelector('#menu-trigger');
  const menuClose = document.querySelector('#menu-close');
  const body = document.querySelector('body');

  const open = () => {
    menu?.classList.remove('invisible');
    menuBody?.classList.add('translate-x-0');
    menuBody?.classList.remove('translate-x-full');
    body?.classList.add('overflow-hidden');
  };
  const close = () => {
    menu?.classList.add('invisible');
    menuBody?.classList.remove('translate-x-0');
    menuBody?.classList.add('translate-x-full');
    body?.classList.remove('overflow-hidden');
  };

  menuTrigger?.addEventListener('click', open);
  menuClose?.addEventListener('click', close);

  document.addEventListener('click', (e) => {
    if (!menuBody?.contains(e.target) && !menuTrigger?.contains(e.target)) {
      close();
    }
  });
})();
