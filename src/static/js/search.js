var client = algoliasearch('QFXNLHI6NP', '6b5ccc86ead48e79e587963eeb2d83e8');
var searchIndex = client.initIndex('dev_atlas');

var searchBox = document.getElementById('search');
var searchForm = document.getElementById('search-form');

var runSearch = function (event) {
  var searchResultsContainer = document.getElementById('search-results');
  searchResultsContainer.textContent = '';

  var searchTerm = event.target.value;
  if (searchTerm.length < 2) return;

  var toolToFilterBy = event.target.dataset.filter || false;

  var alogliaArgs = {
    hitsPerPage: 10,
    attributesToRetrieve: ['title', 'url', '_tags'],
    attributesToSnippet: ['content'],
    snippetEllipsisText: '…',
  };

  if (toolToFilterBy) alogliaArgs.filters = toolToFilterBy;

  searchIndex.search(searchTerm, alogliaArgs).then(function (e) {
    var results = e['hits'];

    var formattedResults = results.map(function (result) {
      var toolName = extractToolName(result._tags);

      // Create elements
      var link = document.createElement('a');
      var title = document.createElement('strong');
      var excerpt = document.createElement('p');
      var tool = document.createElement('span');

      link.href = result.url;
      link.classList.add('panel-block', 'p-3', 'is-block');

      excerpt.classList.add('search-snippet');
      excerpt.innerHTML = result._snippetResult.content.value;

      title.classList.add('is-flex', 'is-justify-content-space-between');
      title.innerText = result.title;

      tool.innerText = toolName;
      tool.classList.add('tag', 'is-info', 'is-light');

      // Put all the elements together
      title.appendChild(tool);
      link.appendChild(title);
      link.appendChild(excerpt);
      return link;
    });

    formattedResults.map(function (el) {
      searchResultsContainer.insertAdjacentElement('beforeend', el);
    });
    searchResultsContainer.classList.add('search-focus');
    document.getElementById('search-background').style.display = 'block';
  });
};

var extractToolName = function (tags) {
  return tags.filter(function (tag) {
    return tag === 'BI Library' || tag === 'Automation Hub' || tag === 'Atlas';
  });
};

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

searchBox.addEventListener('input', runSearch.debounce(250));
searchBox.addEventListener('focus', runSearch.debounce(250));
searchForm.addEventListener('submit', (e) => e.preventDefault());

// load search from url param
function getUrlVars() {
  var vars = {};
  window.location.href
    .split('#')[0]
    .replace(/[?&]+([^=&]+)=([^&]*)/gi, function (_m, key, value) {
      vars[key] = value;
    });
  return vars;
}

var urlParams = getUrlVars();
// prefill search
// set input value
if (urlParams['search']) {
  // open burger if existing
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-burger'),
    0,
  ); // Check if there are any navbar burgers

  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function (el) {
      var target = el.dataset.target;
      var $target = document.getElementById(target); // add the "is-active" class on both the "navbar-burger" and the "navbar-menu"

      el.classList.add('is-active');
      $target.classList.add('is-active');
    });
  }

  searchBox.value = urlParams['search'];
  searchBox.dispatchEvent(new Event('input'));
  searchBox.focus();
}

function closeSearch() {
  (document.querySelectorAll('.search-focus') || []).forEach(function (el) {
    el.classList.remove('search-focus');
  });

  document.getElementById('search-background').style.display = 'none';
}

document
  .getElementById('search-background')
  .addEventListener('click', function () {
    closeSearch();
  });

// do search as a modal as search-focus and links doesn't work well on safari :(
// Add a keyboard event to close all modals
document.addEventListener('keydown', function (event) {
  var e = event || window.event;
  if (e.keyCode === 27) {
    // Escape key
    closeSearch();
  }
});
