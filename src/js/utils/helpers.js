import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showEndMessage() {
  iziToast.info({
    title: 'Info',
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
  });
}

export function showNoResultsMessage() {
  iziToast.error({
    title: 'Error',
    message: 'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
}

export function smoothScroll() {
  const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
