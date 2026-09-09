(() => {
  const collapses = document.querySelectorAll('button[data-state]');

  const close = (element) => {
    element.setAttribute('data-state', 'closed');
    element.setAttribute('aria-expanded', 'false');
    element.closest('h3[data-state]')?.setAttribute('data-state', 'closed');
    element.closest('div[data-state]')?.setAttribute('data-state', 'closed');
    element
      .closest('div[data-state]')
      ?.querySelector('div[data-state]')
      ?.setAttribute('data-state', 'closed');
  };
  const open = (element) => {
    element.setAttribute('data-state', 'open');
    element.setAttribute('aria-expanded', 'true');
    element.closest('h3[data-state]')?.setAttribute('data-state', 'open');
    element.closest('div[data-state]')?.setAttribute('data-state', 'open');
    element
      .closest('div[data-state]')
      ?.querySelector('div[data-state]')
      ?.setAttribute('data-state', 'open');
  };

  const toggle = (event) => {
    event.preventDefault();
    const element = event.target.closest('button[data-state]');
    if (!element) return;

    if (element.getAttribute('data-state') === 'open') {
      close(element);
    } else {
      open(element);
    }
  };

  collapses.forEach((collapse) => {
    collapse.addEventListener('click', toggle);
  });
})();
