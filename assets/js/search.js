const searchForm    = document.getElementById('search-form');
const searchInput   = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

function getSearchableNodes() {
  const cards = document.querySelectorAll('.card');
  if (cards.length > 0) return Array.from(cards);

  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) return Array.from(faqItems);

  return [];
}

function extractTextFromNode(node) {
  const selectors = node.classList.contains('card')
    ? ['.card__title', '.card__body', '.card__meta']
    : ['.faq-item__question', '.faq-item__answer'];

  return selectors
    .map(function(selector) {
      const el = node.querySelector(selector);
      return el ? el.textContent : '';
    })
    .join(' ')
    .toLowerCase()
    .trim();
}

function showNode(node) { node.classList.remove('u-hidden'); }
function hideNode(node) { node.classList.add('u-hidden'); }

function renderNoResultsMessage(query) {
  searchResults.textContent = '';
  const p = document.createElement('p');
  p.classList.add('search-result-item');
  p.textContent = 'No se encontraron resultados para "' + query + '".';
  searchResults.appendChild(p);
}

function clearResults() {
  searchResults.textContent = '';
  getSearchableNodes().forEach(function(node) { showNode(node); });
}

function filterNodes(query) {
  const nodes = getSearchableNodes();
  let matched = 0;

  nodes.forEach(function(node) {
    const text = extractTextFromNode(node);
    if (text.includes(query)) {
      showNode(node);
      matched++;
    } else {
      hideNode(node);
    }
  });

  if (matched === 0) {
    renderNoResultsMessage(query);
  } else {
    searchResults.textContent = '';
  }
}

function handleSearch(event) {
  event.preventDefault();

  if (typeof window.DOMPurify === 'undefined') {
    console.error('DOMPurify no disponible');
    return;
  }

  const rawQuery = searchInput.value.trim();
  const sanitizedQuery = window.DOMPurify.sanitize(rawQuery).toLowerCase();

  if (sanitizedQuery === '') {
    clearResults();
    return;
  }

  filterNodes(sanitizedQuery);
}

function handleInputClear() {
  if (searchInput.value.trim() === '') {
    clearResults();
  }
}

function initSearch() {
  if (searchForm === null || searchInput === null || searchResults === null) return;

  searchForm.addEventListener('submit', handleSearch);
  searchInput.addEventListener('input', handleInputClear);
}

initSearch();