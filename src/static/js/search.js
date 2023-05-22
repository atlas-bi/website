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
const searchBox = document.getElementById('search');
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
  searchBox.addEventListener('input', runSearch.debounce(250));
  searchBox.addEventListener('focus', runSearch.debounce(250));

  document.addEventListener('click', ({ target }) => {
    if (
      !searchBox.parentElement.contains(target) &&
      !target.closest('#s-results')
    ) {
      searchResults.textContent = '';
    }
  });
};

const runSearch = (e) => {
  const searchString = e.target.value.trim();

  if (searchString) {
    searchIndex.search(searchString, alogliaArgs).then((e) => {
      const data = renderString(window.template, { hits: e.hits });
      searchResults.innerHTML = data;
    });
  }
};
