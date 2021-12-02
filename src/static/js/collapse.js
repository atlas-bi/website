(function () {
  /*
    [data-action="collapse"][data-target="#el"]
    #el
    */
  var d = document;
  d.addEventListener("click", function (e) {
    var el;

    if (e.target.closest('[data-action="collapse"]')) {
      el = d.getElementById(
        e.target
          .closest("[data-action]")
          .getAttribute("data-target")
          .replace("#", "")
      );
      if (el == null) {
        return;
      }

      if (el.style.height || el.classList.contains("is-active")) {
        c(el);
      } else {
        o(el);
      }
    } else if (e.target.closest(".collapse:not(.is-active")) {
      o(e.target.closest(".collapse:not(.is-active"));
    }
  });

  function h(el) {
    el.style.height = el.scrollHeight + "px";
  }

  function c(el) {
    el.style.height = null;
    el.style.overflow = "hidden";
    el.classList.remove("is-active");
  }

  function o(el) {
    el.classList.add("is-active");
    h(el);
    var l = el;
    while ((l = l.parentElement.closest(".is-active"))) {
      l.style.removeProperty("max-height");
    }
    d.dispatchEvent(new CustomEvent("collapse-opened"));

    // close siblings
    var o = el.parentElement.querySelector(".is-active"),
      r = [];

    while (o) {
      if (o !== el && o.nodeType === Node.ELEMENT_NODE) r.push(o);
      o = o.nextElementSibling || o.nextSibling;
    }

    for (var x = 0; x < r.length; x++) c(r[x]);

    // after animation finished add max-height back
    window.setTimeout(function () {
      var l = el.parentElement.closest(".is-active");
      while (l) {
        h(l);
        l = l.parentElement.closest(".is-active");
      }
      if (el.classList.contains("is-active")) {
        el.style.overflow = "visible";
      }
    }, 300);
  }

  d.addEventListener("change", function (e) {
    if (e.target.closest(".is-active")) {
      var l = e.target.closest(".is-active");
      while (l) {
        l.style.removeProperty("max-height");
        l = l.parentElement.closest(".is-active");
      }
      // after animation finished add max-height back
      window.setTimeout(function () {
        var l = e.target.closest(".is-active");
        while (l) {
          h(l);
          l = l.parentElement.closest(".is-active");
        }
      }, 300);
    }
  });

  d.addEventListener(
    "clps-close",
    function (e) {
      if (typeof e.detail !== "undefined") {
        c(e.detail.el);
      }
    },
    false
  );
  d.addEventListener(
    "clps-open",
    function (e) {
      if (typeof e.detail !== "undefined") {
        o(e.detail.el);
      }
    },
    false
  );
})();
