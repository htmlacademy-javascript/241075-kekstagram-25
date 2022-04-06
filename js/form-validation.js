import { blockSubmitButton, unblockSubmitButton} from '../js/utils.js';
import { postData } from '../js/data-server.js';

const MAX_HASH_TAGS_AMOUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASH_TAGS_LENGTH = 20;

const uploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const descriptionTextarea = uploadForm.querySelector('.text__description');
const hashTagsInput = uploadForm.querySelector('.text__hashtags');

//Шаблон регулярного выражения для проверки хэш-тегов
// eslint-disable-next-line no-misleading-character-class
const regularExpression = /^#[A-Za-zА-Яа-яËё0-9]{1,19}$/g;

const pristine = new Pristine(uploadForm, {
  classTo: 'validate__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'validate__item',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

//Сщздание массива хеш-тегов
const getHashTags = (str) => str.split(' ').map((element) => element.toLowerCase());

//Проверка на количество хэш-тегов - не более maxHashTagsAmount
const checkHashTagsAmount = (str) => getHashTags(str).length <= MAX_HASH_TAGS_AMOUNT;

//Проверка длины хэш-тега - не более MAX_HASH_TAGS_LENGTH
const checkHashTagsLength = (str) => {
  if (str > 0) {
    return getHashTags(str).every((element) => element.length <= MAX_HASH_TAGS_LENGTH);
  } else {
    return true;
  }
};

//Проверка на отсутствие одинаковых хэш-тегов
const checkHashTagsRepeat = (str) => {
  if (str > 0) {
    return getHashTags(str).every((currentValue, index, arr) => arr.indexOf(currentValue) === index);
  } else {
    return true;
  }
};

const checkHashTagsRegExp = (str) => {
  if (str > 0) {
    return getHashTags(str).every((element) => regularExpression.test(element));
  } else {
    return true;
  }
};

//Проверка длины введенного комментария - не более maxDescriptionLength
const validateDescription = (str) => str.length <= MAX_DESCRIPTION_LENGTH;

//Добавление валидаторов
pristine.addValidator(hashTagsInput, checkHashTagsRegExp, 'Введено невалидное значение хэш-тега');
pristine.addValidator(hashTagsInput, checkHashTagsAmount, `Количество хэш-тегов не должно превышать ${MAX_HASH_TAGS_AMOUNT}`);
pristine.addValidator(hashTagsInput, checkHashTagsLength, `Длина хэш-тега не должна превышать ${MAX_HASH_TAGS_LENGTH} символов`);
pristine.addValidator(hashTagsInput, checkHashTagsRepeat, 'Хэш-теги не должны повторяться!');
pristine.addValidator(descriptionTextarea, validateDescription, `Длина комментария не должна превышать ${MAX_DESCRIPTION_LENGTH} символов`);

const onUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton(submitButton);
      postData(
        () => {
          onSuccess();
          unblockSubmitButton(submitButton);
        },
        () => {
          unblockSubmitButton(submitButton);
        },
        new FormData(evt.target)
      );
    }
  });
};

export { onUploadFormSubmit, pristine };
