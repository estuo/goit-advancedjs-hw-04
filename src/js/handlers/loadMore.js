import { getImages } from '../services/pixabay-api.js';
import { renderGallery } from '../render-functions.js';
import { showEndMessage, smoothScroll } from '../utils/helpers.js';
import { buttonService } from '../services/ButtonService.js';
import { getSearchContext, incrementPage } from './form.js';

const loaderEl = document.querySelector('.load-more-container .loader');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.addEventListener('click', async () => {
  buttonService.hide();
  loaderEl.classList.remove('is-hidden');

  incrementPage();
  const { currentPage, currentQuery, totalPages } = getSearchContext();

  try {
    const { hits } = await getImages(currentQuery, currentPage);
    loaderEl.classList.add('is-hidden');
    renderGallery(hits);
    smoothScroll();
    if (currentPage >= totalPages) {
      showEndMessage();
    } else {
      buttonService.show();
    }
  } catch (error) {
    loaderEl.classList.add('is-hidden');
    console.error(error);
  }
});
