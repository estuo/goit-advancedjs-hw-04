import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import { refs, IS_HIDDEN } from './refs';

const fetchParams = {
  BASE_URL: 'https://pixabay.com/api/',
  API_KEY: '49692460-099fca5bd4b56e7d7d026f90d',
  IMAGE_TYPE: 'photo',
  ORIENTATION: 'horizontal',
  SAFESEARCH: true,
};

const { BASE_URL, API_KEY, IMAGE_TYPE, ORIENTATION, SAFESEARCH } = fetchParams;

function fetchImages(query) {
  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a valid search query!',
    });
    return Promise.resolve([]);
  }
  refs.loader.classList.remove(IS_HIDDEN);
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFESEARCH}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error data: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return [];
      }
      return data.hits;
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again!',
      });
      console.log(error);
    })
    .finally(() => {
      refs.loader.classList.add(IS_HIDDEN);
    });
}

export default fetchImages;
