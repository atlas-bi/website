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

const setMenuOpen = ({
  menu,
  menuBody,
  trigger,
  body,
  open,
  closedTranslate,
  openTranslate,
}) => {
  if (open) {
    menu?.classList.remove('invisible');
    menu?.setAttribute('aria-hidden', 'false');
    menuBody?.classList.add(openTranslate);
    menuBody?.classList.remove(closedTranslate);
    menuBody?.setAttribute('aria-hidden', 'false');
    trigger?.setAttribute('aria-expanded', 'true');
    body?.classList.add('overflow-hidden');
  } else {
    menu?.classList.add('invisible');
    menu?.setAttribute('aria-hidden', 'true');
    menuBody?.classList.remove(openTranslate);
    menuBody?.classList.add(closedTranslate);
    menuBody?.setAttribute('aria-hidden', 'true');
    trigger?.setAttribute('aria-expanded', 'false');
    body?.classList.remove('overflow-hidden');
  }
};

(() => {
  const menu = document.querySelector('#nav-menu');
  const menuBody = document.querySelector('#nav-menu-body');
  const menuTrigger = document.querySelector('#nav-menu-trigger');
  const menuClose = document.querySelector('#nav-menu-close');
  const body = document.querySelector('body');

  const open = () =>
    setMenuOpen({
      menu,
      menuBody,
      trigger: menuTrigger,
      body,
      open: true,
      closedTranslate: '-translate-x-full',
      openTranslate: 'translate-x-0',
    });
  const close = () =>
    setMenuOpen({
      menu,
      menuBody,
      trigger: menuTrigger,
      body,
      open: false,
      closedTranslate: '-translate-x-full',
      openTranslate: 'translate-x-0',
    });

  const isOpen = () => menuTrigger?.getAttribute('aria-expanded') === 'true';
  const isSearchClick = (target) =>
    Boolean(target.closest('#open-search, #search-dialog, #search-backdrop'));

  menuTrigger?.addEventListener('click', open);
  menuClose?.addEventListener('click', close);

  if (menuTrigger && menuBody) {
    document.addEventListener('click', (e) => {
      if (!isOpen() || isSearchClick(e.target)) return;
      if (!menuBody.contains(e.target) && !menuTrigger.contains(e.target)) {
        close();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) close();
    });
  }
})();

(() => {
  const menu = document.querySelector('#menu');
  const menuBody = document.querySelector('#menu-body');
  const menuTrigger = document.querySelector('#menu-trigger');
  const menuClose = document.querySelector('#menu-close');
  const body = document.querySelector('body');

  const open = () =>
    setMenuOpen({
      menu,
      menuBody,
      trigger: menuTrigger,
      body,
      open: true,
      closedTranslate: 'translate-x-full',
      openTranslate: 'translate-x-0',
    });
  const close = () =>
    setMenuOpen({
      menu,
      menuBody,
      trigger: menuTrigger,
      body,
      open: false,
      closedTranslate: 'translate-x-full',
      openTranslate: 'translate-x-0',
    });

  const isOpen = () => menuTrigger?.getAttribute('aria-expanded') === 'true';
  const isSearchClick = (target) =>
    Boolean(target.closest('#open-search, #search-dialog, #search-backdrop'));

  menuTrigger?.addEventListener('click', open);
  menuClose?.addEventListener('click', close);

  if (menuTrigger && menuBody) {
    document.addEventListener('click', (e) => {
      if (!isOpen() || isSearchClick(e.target)) return;
      if (!menuBody.contains(e.target) && !menuTrigger.contains(e.target)) {
        close();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) close();
    });
  }
})();
