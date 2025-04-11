import { getImages } from '../services/pixabay-api.js';
import { renderGallery } from '../render-functions.js';
import { showEndMessage, smoothScroll } from '../utils/helpers.js';
import { buttonService } from '../services/ButtonService.js';
import { getSearchContext, incrementPage } from './form.js';

const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.addEventListener('click', async () => {
  incrementPage();
  const { currentPage, currentQuery, totalPages } = getSearchContext();
  document.querySelector('.loader').classList.remove('is-hidden');

  try {
    const { hits } = await getImages(currentQuery, currentPage);
    document.querySelector('.loader').classList.add('is-hidden');
    renderGallery(hits);
    smoothScroll();
    if (currentPage >= totalPages) {
      buttonService.hide();
      showEndMessage();
    }
  } catch (error) {
    document.querySelector('.loader').classList.add('is-hidden');
    console.error(error);
  }
});
