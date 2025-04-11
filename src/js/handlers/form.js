import { getImages } from '../services/pixabay-api.js';
import { renderGallery, clearGallery } from '../render-functions.js';
import {
  showEndMessage,
  showNoResultsMessage,
  smoothScroll,
} from '../utils/helpers.js';
import { buttonService } from '../services/ButtonService.js';
import iziToast from 'izitoast';

const form = document.querySelector('#search-form');
let currentPage = 1;
let currentQuery = '';
let totalPages = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  buttonService.hide();
  document.querySelector('.loader').classList.remove('is-hidden');

  try {
    const { hits, totalHits } = await getImages(currentQuery, currentPage);
    document.querySelector('.loader').classList.add('is-hidden');
    if (hits.length === 0) {
      showNoResultsMessage();
      return;
    }
    renderGallery(hits);

    e.target.elements.searchQuery.value = '';

    totalPages = Math.ceil(totalHits / 15);
    if (currentPage < totalPages) {
      buttonService.show();
    }
  } catch (error) {
    document.querySelector('.loader').classList.add('is-hidden');
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
      position: 'topRight',
    });
    console.error(error);
  }
});

export function getSearchContext() {
  return { currentPage, currentQuery, totalPages };
}

export function incrementPage() {
  currentPage += 1;
}
