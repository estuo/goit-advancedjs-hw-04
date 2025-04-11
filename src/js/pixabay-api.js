import axios from 'axios';

const API_KEY = '49692460-099fca5bd4b56e7d7d026f90d';
const BASE_URL = 'https://pixabay.com/api/';

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
  },
});

export async function getImages(query, page = 1) {
  const response = await instance.get('', {
    params: { q: query, page },
  });
  return response.data;
}
