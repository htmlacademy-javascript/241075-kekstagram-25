import { onError } from '../js/utils.js';
import { showDownloadMessage } from '../js/utils.js';

const BODY = document.querySelector('body');

let pictures = [];

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}: Something went wrong. Please try again or contact support.`);
    })
    .then((element) => {
      pictures = element;
      onSuccess(element);
    })
    .catch((err) => {
      onError(BODY, err, 'error-load-container');
    });
};

const postData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      showDownloadMessage('success');
      onSuccess();
    } else {
      onFail();
      showDownloadMessage('error');
      throw new Error(`${response.status} ${response.statusText}`);
    }
  })
    .catch((err) => {
      onError(BODY, err, 'error-post-container');
    });
};

export { pictures, getData, postData };
