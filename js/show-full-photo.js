import { removeAllChildren } from '../js/utils.js';
import { pictures } from '../js/data-server.js';

const BODY = document.querySelector('body');
const COMMENTS_LOAD_LIMIT = 5;

const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const templateComment = document.querySelector('#comment').content.querySelector('.social__comment');
const counterComments = bigPicture.querySelector('.social__comment-count');
const loaderComments = bigPicture.querySelector('.comments-loader');
let commentsCounter = 0;

const fillComments = (insertPointComments, comments) => {
  const fragmentComments = document.createDocumentFragment();
  const commentsArray = comments.slice();
  const commentsArrayLength = commentsArray.length;
  let commentsShow = [];
  removeAllChildren(commentsList);

  const showComments = (array) => {
    array.forEach((comment) => {
      const commentElement = templateComment.cloneNode(true);
      const commentator = commentElement.querySelector('.social__picture');
      commentator.src = comment.avatar;
      commentator.alt = comment.name;
      commentElement.querySelector('.social__text').textContent = comment.message;
      counterComments.querySelector('.comments-count-view').textContent = commentsCounter;
      counterComments.querySelector('.comments-count').textContent = commentsArrayLength;
      fragmentComments.appendChild(commentElement);
      insertPointComments.appendChild(fragmentComments);
    });
  };

  const onCommentsView = () => {
    commentsShow = commentsArray.splice(0, COMMENTS_LOAD_LIMIT);
    commentsCounter += commentsShow.length;
    showComments(commentsShow);
    if (commentsArray.length === 0) {
      loaderComments.classList.add('hidden');
      loaderComments.removeEventListener('click', onCommentsView);
    }
  };

  if (commentsArray.length > COMMENTS_LOAD_LIMIT) {
    counterComments.classList.remove('hidden');
    commentsShow = commentsArray.splice(0, COMMENTS_LOAD_LIMIT);
    loaderComments.classList.remove('hidden');
    commentsCounter = commentsShow.length;

    showComments(commentsShow);
    loaderComments.addEventListener('click', onCommentsView);
  } else {
    counterComments.classList.add('hidden');
    showComments(commentsArray);
  }
};

const fillFullPhoto = (data) => {
  const image = document.querySelector('.big-picture__img').querySelector('img');
  const likes = document.querySelector('.likes-count');
  const comments = document.querySelector('.comments-count');
  const description = bigPicture.querySelector('.social__caption');
  const idClickedElement = data.getAttribute('id');

  image.src = data.getAttribute('src');
  image.alt = data.getAttribute('alt');

  BODY.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  pictures.forEach((post) => {
    if (post.id === Number(idClickedElement)) {
      description.textContent = post.description;
      likes.textContent = post.likes;
      comments.textContent = post.comments.length;
      fillComments(commentsList, post.comments);
    }
  });
};

export { fillFullPhoto, bigPicture };
