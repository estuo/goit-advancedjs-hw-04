import { getImages } from '../services/pixabay-api.js';
import { renderGallery, clearGallery } from '../render-functions.js';
import {
  showEndMessage,
  showNoResultsMessage,
  smoothScroll,
} from '../utils/helpers.js';
import { buttonService } from '../services/ButtonService.js';

const form = document.querySelector('#search-form');
let currentPage = 1;
let currentQuery = '';
let totalPages = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value.trim();
  if (!query) return;

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  buttonService.hide();

  try {
    const { hits, totalHits } = await getImages(currentQuery, currentPage);
    if (hits.length === 0) {
      showNoResultsMessage();
      return;
    }
    renderGallery(hits);
    totalPages = Math.ceil(totalHits / 15);
    if (currentPage < totalPages) buttonService.show();
  } catch (error) {
    console.error(error);
  }
});

export function getSearchContext() {
  return { currentPage, currentQuery, totalPages };
}

export function incrementPage() {
  currentPage += 1;
}
