(() => {
  const collapses = document.querySelectorAll('button[data-state]');

  const close = (element) => {
    element.setAttribute('data-state', 'closed');
    element.closest('h3[data-state]')?.setAttribute('data-state', 'closed');
    element.closest('div[data-state]')?.setAttribute('data-state', 'closed');
    element
      .closest('div[data-state]')
      ?.querySelector('div[data-state]')
      ?.setAttribute('data-state', 'closed');
  };
  const open = (element) => {
    element.setAttribute('data-state', 'open');
    element.closest('h3[data-state]')?.setAttribute('data-state', 'open');
    element.closest('div[data-state]')?.setAttribute('data-state', 'open');
    element
      .closest('div[data-state]')
      ?.querySelector('div[data-state]')
      ?.setAttribute('data-state', 'open');
  };

  const toggle = (event) => {
    event.preventDefault();

    if (event.target.getAttribute('data-state') == 'open') {
      close(event.target);
    } else {
      open(event.target);
    }
  };

  collapses.forEach((collapse) => {
    collapse.addEventListener('click', toggle);
  });
})();
