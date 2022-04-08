(function () {
  /*
    [data-action="collapse"][data-target="#el"]
    #el
    */
  var d = document;
  d.addEventListener('click', function (e) {
    var el, src;

    if (e.target.closest('[data-action="collapse"]')) {
      src = e.target.closest('[data-action="collapse"]');
      el = d.getElementById(src.getAttribute('data-target').replace('#', ''));
      if (el == null) {
        return;
      }

      if (el.style.maxHeight || el.classList.contains('is-active')) {
        c(el);
        src.classList.remove('is-active');
      } else {
        src.classList.add('is-active');
        o(el);
      }
      // } else if (e.target.closest(".collapse:not(.is-active")) {
      //   src = e.target.closest(".collapse:not(.is-active")
      //   o(src);
      //   src.classList.add("is-active")
    }
  });

  function h(el) {
    el.style.maxHeight = el.scrollHeight + 'px';
  }

  function c(el) {
    el.style.maxHeight = null;
    el.style.overflow = 'hidden';
    el.classList.remove('is-active');
  }

  function o(el) {
    el.classList.add('is-active');
    h(el);
    var l = el;
    while ((l = l.parentElement.closest('.is-collapsible.is-active'))) {
      l.style.removeProperty('max-height');
    }
    d.dispatchEvent(new CustomEvent('collapse-opened'));

    // close siblings
    var open = el.parentElement.querySelector('.is-collapsible.is-active'),
      r = [];

    while (open) {
      if (open !== el && o.nodeType === Node.ELEMENT_NODE) r.push(open);
      open = open.nextElementSibling || open.nextSibling;
    }

    for (var x = 0; x < r.length; x++) c(r[x]);

    // after animation finished add max-height back
    window.setTimeout(function () {
      var subL = el.parentElement.closest('.is-collapsible.is-active');
      while (subL) {
        h(subL);
        subL = subL.parentElement.closest('.is-collapsible.is-active');
      }
      if (el.classList.contains('is-active')) {
        el.style.overflow = 'visible';
      }
    }, 300);
  }

  d.addEventListener('change', function (e) {
    if (e.target.closest('.is-collapsible.is-active')) {
      var l = e.target.closest('.is-collapsible.is-active');
      while (l) {
        l.style.removeProperty('max-height');
        l = l.parentElement.closest('.is-collapsible.is-active');
      }
      // after animation finished add max-height back
      window.setTimeout(function () {
        var subL = e.target.closest('.is-collapsible.is-active');
        while (subL) {
          h(subL);
          subL = subL.parentElement.closest('.is-collapsible.is-active');
        }
      }, 300);
    }
  });

  d.addEventListener(
    'clps-close',
    function (e) {
      if (typeof e.detail !== 'undefined') {
        c(e.detail.el);
      }
    },
    false,
  );
  d.addEventListener(
    'clps-open',
    function (e) {
      if (typeof e.detail !== 'undefined') {
        o(e.detail.el);
      }
    },
    false,
  );
  d.addEventListener('click', function (e) {
    var el, src;

    if (e.target.closest('[data-action="collapse-menu"]')) {
      src = e.target.closest('[data-action="collapse-menu"]');
      el = d.getElementById(src.getAttribute('data-target').replace('#', ''));
      if (el == null) {
        return;
      }
      if (el.style.maxHeight || el.classList.contains('is-active')) {
        el.classList.remove('is-active');
        src.classList.remove('is-active');
      } else {
        src.classList.add('is-active');
        el.classList.add('is-active');
      }
    }
  });
})();
