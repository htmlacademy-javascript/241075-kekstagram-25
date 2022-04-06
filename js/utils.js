const BODY = document.querySelector('body');
const ALERT_SHOW_TIME = 5000;

const getRandomNumber = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

const makeCounter = (start) => {
  let currentCount = start;

  return () => currentCount++;
};

const counter = makeCounter(1);

const removeAllChildren = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};
const removeAllPictures = (element) => {
  while (element.childNodes[6]) {
    element.removeChild(element.lastChild);
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const closePopup = (element, closeButton) => {
  BODY.classList.remove('modal-open');

  const onElementCloseClick = () => {
    BODY.classList.remove('modal-open');
    element.classList.add('hidden');
    closeButton.removeEventListener('click', onElementCloseClick);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onElementKeydownEsc);
    // eslint-disable-next-line no-use-before-define
    element.removeEventListener('click', onElementClickOutside);
  };

  const onElementKeydownEsc = (evt) => {
    if (isEscapeKey(evt) && evt.target !== document.querySelector('.text__hashtags') && evt.target !== document.querySelector('.text__description')) {
      evt.preventDefault();
      onElementCloseClick();
    }
  };

  const onElementClickOutside = (evt) => {
    if (evt.target === element) {
      evt.preventDefault();
      onElementCloseClick();
    }
  };


  closeButton.addEventListener('click', onElementCloseClick);
  document.addEventListener('keydown', onElementKeydownEsc);
  element.addEventListener('click', onElementClickOutside);
};

const onError = (element, error, className) => {
  const errorOverlay = document.createElement('div');
  errorOverlay.classList.add(`${className}`);
  errorOverlay.innerHTML = `<p>${error.message}</p>`;
  element.appendChild(errorOverlay);

  setTimeout(() => errorOverlay.remove(), ALERT_SHOW_TIME);
};

const showDownloadMessage = (status) => {
  const statusTemplate = document.querySelector(`#${status}`).content;
  const statusElement = statusTemplate.cloneNode(true);
  BODY.classList.add('modal-open');
  statusElement.classList.remove('hidden');
  BODY.appendChild(statusElement);
  closePopup (document.querySelector(`.${status}`), document.querySelector(`.${status}__button`));
};

const blockSubmitButton = (submitButton) => {
  submitButton.disabled = true;
  submitButton.textContent = 'Подождите...';
};

const unblockSubmitButton = (submitButton) => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const debounce = (callback, timeoutDelay) => {
  // eslint-disable-next-line prefer-const
  let timeoutId;
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => callback.apply(), timeoutDelay);
};


export { getRandomNumber, getRandomArrayElement, counter, removeAllChildren,
  removeAllPictures, closePopup, onError, blockSubmitButton, unblockSubmitButton,
  debounce, showDownloadMessage };
