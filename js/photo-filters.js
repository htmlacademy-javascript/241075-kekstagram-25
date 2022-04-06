const intensivityEffectSlider = document.querySelector('.effect-level__slider');
const intensivityEffectValue = document.querySelector('.effect-level__value');
const intensivityEffectForm = document.querySelector('.img-upload__effect-level');
const photoPreview = document.querySelector('.img-upload__preview');
const filtersList = document.querySelector('.img-upload__effects');

const filters = {
  'effect-none': {
    class: 'chrome',
    filter: 'grayscale',
    unit: '',
    range: {
      min: 0,
      max: 0,
    },
    start: 0,
    step: 0,
    connect: 'lower'
  },
  'effect-chrome': {
    class: 'chrome',
    filter: 'grayscale',
    unit: '',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower'
  },
  'effect-sepia': {
    class: 'sepia',
    filter: 'sepia',
    unit: '',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower'
  },
  'effect-marvin': {
    class: 'marvin',
    filter: 'invert',
    unit: '%',
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    connect: 'lower'
  },
  'effect-phobos': {
    class: 'phobos',
    filter: 'blur',
    unit: 'px',
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    connect: 'lower'
  },
  'effect-heat': {
    class: 'heat',
    filter: 'brightness',
    unit: '',
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    connect: 'lower'
  }
};

const settingsSlider = () => {
  noUiSlider.create(intensivityEffectSlider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value;
        }
        return value.toFixed(1);
      },
      from: (value) => (
        parseFloat(value)
      ),
    }
  });

  const onChangeFiltersList = (evt) => {
    intensivityEffectValue.value = filters[`${evt.target.id}`].range.max;

    photoPreview.classList = 'img-upload__preview';
    if (evt.target.id === 'effect-none') {
      intensivityEffectForm.classList.add('hidden');
      intensivityEffectValue.value = '';
      photoPreview.style['filter'] = 'none';
    } else {
      intensivityEffectForm.classList.remove('hidden');
      intensivityEffectSlider.noUiSlider.updateOptions(filters[`${evt.target.id}`]);
      photoPreview.classList.add(`effects__preview--${filters[evt.target.id].class}`);
      intensivityEffectSlider.noUiSlider.set(filters[`${evt.target.id}`].range.max);

      intensivityEffectSlider.noUiSlider.on('update', () => {
        intensivityEffectValue.value = intensivityEffectSlider.noUiSlider.get();
        photoPreview.style['filter'] = `${filters[`${evt.target.id}`].filter}(${intensivityEffectValue.value}${filters[evt.target.id].unit})`;
      });
    }
  };
  filtersList.addEventListener('change', onChangeFiltersList);
};

export { settingsSlider };
