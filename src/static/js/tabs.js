(() => {
  const tabs = document.querySelectorAll('.tab-link');

  const activeLink = [
    'text-sky-700',
    'hover:text-sky-800',
    'hover:border-b-sky-800',
    'border-b-sky-700',
  ];

  const inactiveLink = [
    'border-b-transparent',
    'text-slate-600',
    'hover:text-slate-700',
    'hover:border-b-slate-300',
  ];

  const setActiveLink = (element) => {
    element.classList.add(...activeLink);
    element.classList.remove(...inactiveLink);
    element.setAttribute('aria-selected', 'true');
  };
  const setInactiveLink = (element) => {
    element.classList.add(...inactiveLink);
    element.classList.remove(...activeLink);
    element.setAttribute('aria-selected', 'false');
  };

  const setActiveTab = (element) => {
    element.classList.add('block');
    element.classList.remove('hidden');
  };
  const setInactiveTab = (element) => {
    element.classList.add('hidden');
    element.classList.remove('block');
  };

  const open = (event) => {
    event.preventDefault();
    const trigger = event.target.closest('.tab-link');
    if (!trigger) return;

    const root = trigger.closest('[data-tabs]') || document;
    const thisTab = trigger.getAttribute('data-tab');
    const links = root.querySelectorAll('.tab-link');
    const panels = root.querySelectorAll('.tab-block');

    links.forEach((link) => {
      if (link.getAttribute('data-tab') === thisTab) {
        setActiveLink(link);
      } else {
        setInactiveLink(link);
      }
    });

    panels.forEach((tab) => {
      if (tab.getAttribute('data-tab') === thisTab) {
        setActiveTab(tab);
      } else {
        setInactiveTab(tab);
      }
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', open);
  });
})();
