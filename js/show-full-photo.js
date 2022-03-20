import { POSTS } from '../js/data.js';
import { removeAllChildren } from '../js/utils.js';
import { BODY } from '../js/data.js';

const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const templateComment = document.querySelector('#comment').content.querySelector('.social__comment');
const counterComments = bigPicture.querySelector('.social__comment-count');
const loaderComments = bigPicture.querySelector('.comments-loader');

const fillComments = (insertPointComments, comments) => {
  removeAllChildren(commentsList);
  const fragmentComments = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = templateComment.cloneNode(true);
    const commentator = commentElement.querySelector('.social__picture');
    commentator.src = comment.avatar;
    commentator.alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    fragmentComments.appendChild(commentElement);
  });
  insertPointComments.appendChild(fragmentComments);
};

const fillFullPhoto = (data) => {
  const image = document.querySelector('.big-picture__img').querySelector('img');
  const likes = document.querySelector('.likes-count');
  const comments = document.querySelector('.comments-count');
  const description = bigPicture.querySelector('.social__caption');
  const idClickedElement = data.getAttribute('id');

  image.src = data.getAttribute('src');
  image.alt = data.getAttribute('alt');

  POSTS.forEach((post) => {
    if (post.id === Number(idClickedElement)) {
      description.textContent = post.description;
      likes.textContent = post.likes;
      comments.textContent = post.comments.length;
      fillComments(commentsList, post.comments);
    }
  });

  BODY.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  counterComments.classList.add('hidden');
  loaderComments.classList.add('hidden');
};

export {fillFullPhoto, bigPicture};
