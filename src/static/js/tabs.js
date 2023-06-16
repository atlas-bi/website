(() => {
  const tabs = document.querySelectorAll('.tab-link');

  const activeLink = [
    'text-sky-600',
    'hover:text-sky-700',
    'hover:border-b-sky-700',
    'border-b-sky-600',
  ];

  const inactiveLink = [
    'border-b-transparent',
    'text-slate-500',
    'hover:text-slate-600',
    'hover:border-b-slate-300',
  ];

  const activeTab = ['block'];

  const inactiveTab = ['hidden'];

  const getSiblings = (node) =>
    [...node.parentElement.children].filter((el) => el != node);

  const setActiveLink = (element) => {
    element.classList.add(...activeLink);
    element.classList.remove(...inactiveLink);
  };
  const setInactiveLink = (element) => {
    element.classList.add(...inactiveLink);
    element.classList.remove(...activeLink);
  };

  const setActiveTab = (element) => {
    element.classList.add(...activeTab);
    element.classList.remove(...inactiveTab);
  };
  const setInactiveTab = (element) => {
    element.classList.add(...inactiveTab);
    element.classList.remove(...activeTab);
  };

  const open = (event) => {
    event.preventDefault();
    setActiveLink(event.target);

    const thisTab = event.target.getAttribute('data-tab');
    const links = document.querySelectorAll(`a[data-tab]`);
    const tabs = document.querySelectorAll(`div[data-tab]`);

    links.forEach((link) => {
      if (link.getAttribute('data-tab') == thisTab) {
        setActiveLink(link);
      } else {
        setInactiveLink(link);
      }
    });

    tabs.forEach((tab) => {
      if (tab.getAttribute('data-tab') == thisTab) {
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
