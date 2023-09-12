import { renderString } from 'nunjucks';
import algoliasearch from 'algoliasearch/lite';
Function.prototype.debounce = function (delay) {
  var outter = this,
    timer;

  return function () {
    var inner = this,
      args = [].slice.apply(arguments);

    clearTimeout(timer);
    timer = setTimeout(function () {
      outter.apply(inner, args);
    }, delay);
  };
};

if (typeof String.prototype.trim === 'undefined') {
  String.prototype.trim = function () {
    return String(this).replace(/^\s+|\s+$/g, '');
  };
}

const client = algoliasearch('QFXNLHI6NP', '6b5ccc86ead48e79e587963eeb2d83e8');
const searchIndex = client.initIndex('dev_atlas');
const searchInput = document.getElementById('search');
const searchResults = document.getElementById('search-results');

const alogliaArgs = {
  hitsPerPage: 10,
  attributesToRetrieve: ['title', 'url', '_tags'],
  attributesToSnippet: ['content'],
  snippetEllipsisText: '…',
};

fetch('/static/searchResults.njk?' + String(Date.now()))
  .then((resp) => resp.text())
  .then((data) => loadSearch(data));

const loadSearch = (template) => {
  window.template = template;
  searchInput.addEventListener('input', runSearch.debounce(250));
  searchInput.addEventListener('focus', runSearch.debounce(250));

  document.addEventListener('click', ({ target }) => {
    if (target.closest('.search-result')?.dataset?.value) {
      window.location = target.closest('.search-result')?.dataset?.value;
    }
  });
};

const runSearch = (e) => {
  const searchString = e.target.value.trim();

  if (searchString && window.open) {
    searchIndex.search(searchString, alogliaArgs).then((e) => {
      const data = renderString(window.template, { hits: e.hits });
      searchResults.innerHTML = data;
    });
  }
};

const searchBackdrop = document.querySelector('#search-backdrop');
const searchOpen = document.querySelector('#open-search');
const searchDialog = document.querySelector('#search-dialog');
const searchClose = document.querySelector('#search-close');

window.open = false;
const setOpen = (value) => {
  if (value) {
    if (searchBackdrop) {
      searchBackdrop.style.display = '';
      searchBackdrop.dataset.state = 'open';
    }
    if (searchDialog) {
      searchDialog.style.display = '';
      searchDialog.dataset.state = 'open';
    }
    searchInput.focus();
    window.open = true;
  } else {
    setTimeout(() => (searchBackdrop.style.display = 'none'), 150);
    searchBackdrop.dataset.state = 'closed';
    if (searchDialog) {
      setTimeout(() => (searchDialog.style.display = 'none'), 150);
      searchDialog.dataset.state = 'closed';
    }
    window.open = false;
    searchInput.value = '';
    searchResults.innerText = '';
  }
};

searchOpen?.addEventListener('click', () => {
  setOpen(true);
});

searchBackdrop?.addEventListener('click', () => {
  setOpen(false);
});

searchClose?.addEventListener('click', () => {
  setOpen(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    setOpen(!window.open);
  }
});
