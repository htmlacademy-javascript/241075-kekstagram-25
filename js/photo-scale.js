const STEP_SCALE = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const NUMBER_OF_DECIMAL = 100;

const photoScaleForm = document.querySelector('.img-upload__scale');
const scaleControlSmaller = photoScaleForm.querySelector('.scale__control--smaller');
const scaleControlBigger = photoScaleForm.querySelector('.scale__control--bigger');
const scaleControlValue = photoScaleForm.querySelector('.scale__control--value');
const photoPreviewImg = document.querySelector('.img-upload__preview').querySelector('img');

const changeScale = () => {
  let scaleValue = scaleControlValue.value = MAX_SCALE_VALUE;

  const setStyleScale = () => {
    photoPreviewImg.style['transform'] = `scale(${scaleValue / NUMBER_OF_DECIMAL})`;
  };

  scaleControlSmaller.addEventListener('click', () => {
    if (scaleValue > MIN_SCALE_VALUE) {
      scaleValue -= STEP_SCALE;
    }
    scaleControlValue.value = `${scaleValue}%`;
    setStyleScale();
  });

  scaleControlBigger.addEventListener('click', () => {
    if (scaleValue < MAX_SCALE_VALUE) {
      scaleValue += STEP_SCALE;
    }
    scaleControlValue.value = `${scaleValue}%`;
    setStyleScale();
  });
};

export { changeScale };
