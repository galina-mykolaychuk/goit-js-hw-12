import { fetchImages } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showMessage,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
let currentQuery = '';

document.querySelector('#search-form').addEventListener('submit', async e => {
  e.preventDefault();

  currentQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (currentQuery === '') {
    showMessage('Please enter a search query');
    return;
  }

  currentPage = 1;
  clearGallery();
  document.querySelector('.loader-text').style.display = 'block';
  document.querySelector('.load-more').style.display = 'none';

  try {
    const data = await fetchImages(currentQuery, currentPage);
    if (data.hits.length === 0) {
      showMessage(
        'Sorry, there are no images matching your search query. Please, try again!'
      );
    } else {
      renderGallery(data.hits);
      if (data.totalHits > 15) {
        document.querySelector('.load-more').style.display = 'block';
      }
    }
  } catch (error) {
    showMessage('Something went wrong. Please try again later.');
  } finally {
    document.querySelector('.loader-text').style.display = 'none';
  }
});

document.querySelector('.load-more').addEventListener('click', async () => {
  currentPage += 1;
  document.querySelector('.loader-text').style.display = 'block';

  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderGallery(data.hits);
    if (currentPage * 15 >= data.totalHits) {
      document.querySelector('.load-more').style.display = 'none';
      showMessage("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    showMessage('Something went wrong. Please try again later.');
  } finally {
    document.querySelector('.loader-text').style.display = 'none';
  }
});
