import { removeAllPictures } from '../js/utils.js';

const pictures = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content;
const picturesFragment = document.createDocumentFragment();
const picturesFiltres = document.querySelector('.img-filters');

const createPictures = (data) => {
  data.forEach((post) => {
    const pictureElement = picturesTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = post.url;
    pictureElement.querySelector('.picture__likes').textContent = post.likes;
    pictureElement.querySelector('.picture__comments').textContent = post.comments.length;
    pictureElement.querySelector('.picture__img').alt = post.description;
    pictureElement.querySelector('.picture__img').id = post.id;

    picturesFragment.appendChild(pictureElement);
  });
  removeAllPictures(pictures);
  pictures.appendChild(picturesFragment);

  picturesFiltres.classList.remove('img-filters--inactive');

};

export { createPictures };
