import { renderString } from 'nunjucks';

Function.prototype.debounce = function (delay) {
  var outter = this,
    timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      outter.apply(this, args);
    }, delay);
  };
};

const searchEndpoint = '/api/search';
const searchInput = document.getElementById('search');
const searchResults = document.getElementById('search-results');
const searchResultsPanel = document.getElementById('s-results');
const searchTemplateEl = document.getElementById('search-results-template');
const searchTemplate = searchTemplateEl ? searchTemplateEl.textContent : '';
const searchBackdrop = document.querySelector('#search-backdrop');
const searchOpen = document.querySelector('#open-search');
const searchDialog = document.querySelector('#search-dialog');
const searchClose = document.querySelector('#search-close');

let searchRequest = 0;

const setResultsPanel = (visible, busy = false) => {
  searchResultsPanel?.classList.toggle('hidden', !visible);
  searchResultsPanel?.setAttribute('aria-busy', busy ? 'true' : 'false');
  searchInput?.setAttribute('aria-expanded', visible ? 'true' : 'false');
};

const showLoading = () => {
  setResultsPanel(true, true);
  if (searchResults) {
    searchResults.className = '';
    searchResults.innerHTML = `
      <div class="flex items-center justify-center gap-2 px-3 py-6 text-sm text-slate-500" role="status" aria-live="polite">
        <svg class="h-4 w-4 animate-spin text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <span>Searching…</span>
      </div>`;
  }
};

const fetchHits = (searchString, requestId) => {
  if (!searchTemplate) return;

  fetch(searchEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: searchString }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Search failed (${response.status})`);
      }
      return response.json();
    })
    .then(({ hits }) => {
      if (requestId !== searchRequest || !window.open) return;
      if (searchResults) {
        searchResults.className = hits?.length ? 'p-2' : '';
        searchResults.innerHTML = renderString(searchTemplate, {
          hits: hits || [],
        });
      }
      setResultsPanel(true, false);
    })
    .catch((error) => {
      console.error('Search failed', error);
      if (requestId !== searchRequest || !window.open) return;
      if (searchResults) {
        searchResults.className = '';
        searchResults.innerHTML = renderString(searchTemplate, { hits: [] });
      }
      setResultsPanel(true, false);
    });
};

const debouncedFetchHits = fetchHits.debounce(250);

const onQueryInput = (e) => {
  const searchString = e.target.value.trim();
  searchRequest += 1;
  const requestId = searchRequest;

  if (!searchString || !window.open) {
    setResultsPanel(false);
    if (searchResults) {
      searchResults.className = '';
      searchResults.innerHTML = '';
    }
    return;
  }

  showLoading();
  debouncedFetchHits(searchString, requestId);
};

const loadSearch = () => {
  if (!searchInput) return;

  searchInput.addEventListener('input', onQueryInput);

  document.addEventListener('click', ({ target }) => {
    const result = target.closest('.search-result');
    if (result?.dataset?.value) {
      window.location = result.dataset.value;
    }
  });
};

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
    searchOpen?.setAttribute('aria-expanded', 'true');
    searchInput?.setAttribute('aria-expanded', 'true');
    searchInput?.focus();
    window.open = true;
    setResultsPanel(false);
  } else {
    searchRequest += 1;
    setResultsPanel(false);
    if (searchBackdrop) {
      setTimeout(() => (searchBackdrop.style.display = 'none'), 150);
      searchBackdrop.dataset.state = 'closed';
    }
    if (searchDialog) {
      setTimeout(() => (searchDialog.style.display = 'none'), 150);
      searchDialog.dataset.state = 'closed';
    }
    window.open = false;
    searchOpen?.setAttribute('aria-expanded', 'false');
    searchInput?.setAttribute('aria-expanded', 'false');
    if (searchInput) {
      searchInput.value = '';
    }
    if (searchResults) {
      searchResults.className = '';
      searchResults.innerHTML = '';
    }
  }
};

searchOpen?.addEventListener('click', (e) => {
  e.stopPropagation();
  setOpen(true);
});

searchBackdrop?.addEventListener('click', () => {
  setOpen(false);
});

searchClose?.addEventListener('click', () => {
  setOpen(false);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && window.open) {
    setOpen(false);
    return;
  }
  if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    setOpen(!window.open);
  }
});

loadSearch();
