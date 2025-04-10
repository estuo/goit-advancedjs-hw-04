import { getImages } from '../services/pixabay-api.js';
import { renderGallery } from '../render-functions.js';
import { showEndMessage, smoothScroll } from '../utils/helpers.js';
import { buttonService } from '../services/ButtonService.js';
import { getSearchContext, incrementPage } from './form.js';

const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.addEventListener('click', async () => {
  incrementPage();
  const { currentPage, currentQuery, totalPages } = getSearchContext();

  try {
    const { hits } = await getImages(currentQuery, currentPage);
    renderGallery(hits);
    smoothScroll();
    if (currentPage >= totalPages) {
      buttonService.hide();
      showEndMessage();
    }
  } catch (error) {
    console.error(error);
  }
});
