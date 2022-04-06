import { getRandomArrayElement } from '../js/utils.js';
import { createPictures } from '../js/create-thumbnails.js';
import { debounce } from '../js/utils.js';

const QUANTITY_RANDOM_PICTURES = 10;
const TIMEOUT = 500;

const picturesFilters = document.querySelector('.img-filters');
const defaultFilter = picturesFilters.querySelector('#filter-default');
const randomFilter = picturesFilters.querySelector('#filter-random');
const popularFilter = picturesFilters.querySelector('#filter-discussed');

const filteringImagesFromUsers = (data) => {
  const filterPictures = data.slice();

  const filterRandom = (quantity) => {
    const arrayRandomPictures = [];
    for (let i = 0; i < quantity; i++) {
      arrayRandomPictures.push(getRandomArrayElement(filterPictures));
    }
    return arrayRandomPictures;
  };

  const filterPopular = () => {
    const arrayPopularPictures = filterPictures.slice();
    const comparePost = (postA, postB) => {
      const rankA = postA.likes;
      const rankB = postB.likes;

      return rankB - rankA;
    };
    return arrayPopularPictures.sort(comparePost);
  };
  const onChangeFilter = (element) => {
    element.classList.remove('img-filters__button--active');

    if (element === randomFilter) {
      defaultFilter.classList.remove('img-filters__button--active');
      popularFilter.classList.remove('img-filters__button--active');
      element.classList.add('img-filters__button--active');
      return filterRandom(QUANTITY_RANDOM_PICTURES);
    } else if (element === popularFilter) {
      defaultFilter.classList.remove('img-filters__button--active');
      randomFilter.classList.remove('img-filters__button--active');
      element.classList.add('img-filters__button--active');
      return filterPopular();
    } else if (element === defaultFilter) {
      popularFilter.classList.remove('img-filters__button--active');
      randomFilter.classList.remove('img-filters__button--active');
      element.classList.add('img-filters__button--active');
      return data;
    }
  };

  picturesFilters.addEventListener('click', (evt) => {
    if (evt.target !== picturesFilters) {
      debounce(() => createPictures(onChangeFilter(evt.target)), TIMEOUT);
    }
  });
};

export { filteringImagesFromUsers };
