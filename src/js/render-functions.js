import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let lightbox;

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const imageCards = images.map(image => createImageCard(image)).join('');
  gallery.insertAdjacentHTML('beforeend', imageCards);

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a');
  }
}

export function createImageCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <div class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="360" height="152" />
      </a>
      <div class="info">
        <ul class="descr-list">
          <li><h2 class="title">Likes:</h2><p class="text">${likes}</p></li>
          <li><h2 class="title">Views:</h2><p class="text">${views}</p></li>
          <li><h2 class="title">Comments:</h2><p class="text">${comments}</p></li>
          <li><h2 class="title">Downloads:</h2><p class="text">${downloads}</p></li>
        </ul>
      </div>
    </div>
  `;
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function showMessage(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'bottomRight',
  });
}
