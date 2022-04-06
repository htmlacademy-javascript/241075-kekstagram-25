const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

const photoPreview = document.querySelector('.img-upload__preview');
const uploadButton = document.querySelector('#upload-file[type=file]');

const downloadPhoto = () => {
  const file = uploadButton.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    photoPreview.querySelector('img').src = URL.createObjectURL(file);
  }
};

export { downloadPhoto };
