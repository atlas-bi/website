import { renderString } from 'nunjucks';

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
const searchUpdating = document.getElementById('search-updating');
const pageBody = document.body;
const pageHtml = document.documentElement;

let searchRequest = 0;
let activeAbort = null;
let debounceTimer = null;
let lockedScrollY = 0;
let touchLockBound = false;
let viewportSyncBound = false;

const loadingSpinner = `
  <svg class="h-4 w-4 animate-spin text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
  </svg>`;

/** Keep the dialog inside the visible viewport above the soft keyboard. */
const syncSearchViewport = () => {
  const vv = window.visualViewport;
  const top = vv ? vv.offsetTop : 0;
  const height = vv ? vv.height : window.innerHeight;
  pageHtml.style.setProperty('--search-vv-top', `${top}px`);
  pageHtml.style.setProperty('--search-vv-height', `${height}px`);
};

const setViewportSync = (enabled) => {
  if (enabled) {
    syncSearchViewport();
    if (!viewportSyncBound) {
      window.visualViewport?.addEventListener('resize', syncSearchViewport);
      window.visualViewport?.addEventListener('scroll', syncSearchViewport);
      window.addEventListener('resize', syncSearchViewport);
      viewportSyncBound = true;
    }
    return;
  }

  if (viewportSyncBound) {
    window.visualViewport?.removeEventListener('resize', syncSearchViewport);
    window.visualViewport?.removeEventListener('scroll', syncSearchViewport);
    window.removeEventListener('resize', syncSearchViewport);
    viewportSyncBound = false;
  }
  pageHtml.style.removeProperty('--search-vv-top');
  pageHtml.style.removeProperty('--search-vv-height');
};

/** Allow touch scrolling only inside the results list (iOS ignores overflow:hidden on body). */
const canTouchScroll = (target) => {
  const panel = target instanceof Element ? target.closest('#s-results') : null;
  if (!panel || panel.classList.contains('hidden')) return false;
  return panel.scrollHeight > panel.clientHeight;
};

const onTouchMoveWhileOpen = (e) => {
  if (!window.open) return;
  if (canTouchScroll(e.target)) return;
  e.preventDefault();
};

const setBodyScrollLocked = (locked) => {
  if (!pageBody) return;

  if (locked) {
    lockedScrollY = window.scrollY || window.pageYOffset || 0;
    pageHtml.classList.add('search-open');
    pageBody.classList.add('search-open', 'overflow-hidden');
    pageBody.style.position = 'fixed';
    pageBody.style.top = `-${lockedScrollY}px`;
    pageBody.style.left = '0';
    pageBody.style.right = '0';
    pageBody.style.width = '100%';
    if (!touchLockBound) {
      document.addEventListener('touchmove', onTouchMoveWhileOpen, {
        passive: false,
      });
      touchLockBound = true;
    }
    return;
  }

  pageHtml.classList.remove('search-open');
  pageBody.classList.remove('search-open', 'overflow-hidden');
  pageBody.style.position = '';
  pageBody.style.top = '';
  pageBody.style.left = '';
  pageBody.style.right = '';
  pageBody.style.width = '';
  window.scrollTo(0, lockedScrollY);
  if (touchLockBound) {
    document.removeEventListener('touchmove', onTouchMoveWhileOpen);
    touchLockBound = false;
  }
};

const setResultsPanel = (visible, busy = false) => {
  searchResultsPanel?.classList.toggle('hidden', !visible);
  searchResultsPanel?.classList.toggle('is-searching', busy);
  searchResultsPanel?.setAttribute('aria-busy', busy ? 'true' : 'false');
  searchUpdating?.setAttribute('aria-hidden', busy ? 'false' : 'true');
  searchInput?.setAttribute('aria-expanded', visible ? 'true' : 'false');
  if (window.open) syncSearchViewport();
};

const hasRenderedResults = () =>
  Boolean(searchResults?.querySelector('.search-result, [data-search-empty]'));

const clearResults = () => {
  if (!searchResults) return;
  searchResults.innerHTML = '';
};

const abortActive = () => {
  if (!activeAbort) return;
  activeAbort.abort();
  activeAbort = null;
};

const showFullLoading = () => {
  setResultsPanel(true, true);
  if (!searchResults) return;
  searchResults.innerHTML = `
    <div data-search-loading="full" class="flex items-center justify-center gap-2 px-3 py-6 text-sm text-slate-500" role="status" aria-live="polite">
      ${loadingSpinner}
      <span>Searching…</span>
    </div>`;
};

const showStaleLoading = () => {
  // Keep existing results visible; CSS dims them via #s-results.is-searching
  setResultsPanel(true, true);
};

/** Only allow Meilisearch <em> highlights — strip other HTML that breaks the result list. */
const sanitizeHighlight = (value) => {
  if (value == null) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&lt;em&gt;/gi, '<em>')
    .replace(/&lt;\/em&gt;/gi, '</em>')
    .replace(/∞/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const prepareHits = (hits) =>
  (hits || []).map((hit) => {
    const formatted = hit._formatted || {};
    return {
      ...hit,
      title: sanitizeHighlight(hit.title),
      _formatted: {
        ...formatted,
        title: sanitizeHighlight(formatted.title || hit.title),
        content: sanitizeHighlight(formatted.content || ''),
      },
    };
  });

const renderHits = (hits) => {
  if (!searchResults || !searchTemplate) return;
  const list = prepareHits(hits);
  searchResults.innerHTML = renderString(searchTemplate, { hits: list });
  if (!list.length) {
    const empty = searchResults.querySelector('[role="status"]');
    empty?.setAttribute('data-search-empty', '');
  }
};

const fetchHits = (searchString, requestId) => {
  if (!searchTemplate) return;
  if (requestId !== searchRequest) return;

  if (!hasRenderedResults()) {
    showFullLoading();
  } else {
    showStaleLoading();
  }

  abortActive();
  const controller = new AbortController();
  activeAbort = controller;

  fetch(searchEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: searchString }),
    signal: controller.signal,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Search failed (${response.status})`);
      }
      return response.json();
    })
    .then(({ hits }) => {
      if (requestId !== searchRequest || !window.open) return;
      renderHits(hits || []);
      setResultsPanel(true, false);
    })
    .catch((error) => {
      if (error?.name === 'AbortError') return;
      console.error('Search failed', error);
      if (requestId !== searchRequest || !window.open) return;
      renderHits([]);
      setResultsPanel(true, false);
    })
    .finally(() => {
      if (activeAbort === controller) activeAbort = null;
    });
};

const onQueryInput = (e) => {
  const searchString = e.target.value.trim();

  searchRequest += 1;
  const requestId = searchRequest;
  abortActive();
  clearTimeout(debounceTimer);

  if (!searchString || !window.open) {
    setResultsPanel(false);
    clearResults();
    return;
  }

  if (hasRenderedResults()) {
    showStaleLoading();
  }

  debounceTimer = setTimeout(() => {
    fetchHits(searchString, requestId);
  }, 200);
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
    setBodyScrollLocked(true);
    setViewportSync(true);
    window.open = true;
    setResultsPanel(false);
    // Focus after layout so iOS keeps the top-docked field above the keyboard.
    requestAnimationFrame(() => {
      syncSearchViewport();
      searchInput?.focus();
    });
  } else {
    searchRequest += 1;
    abortActive();
    clearTimeout(debounceTimer);
    setResultsPanel(false);
    setViewportSync(false);
    setBodyScrollLocked(false);
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
    if (searchInput) searchInput.value = '';
    clearResults();
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
