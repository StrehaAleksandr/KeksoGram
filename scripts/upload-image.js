'use strict';

(function () {
    var MAX_EFFECT_VALUE = 100;
    var MIN_EFFECT_VALUE = 25;
    var SCALING_STEP = 25;

    var Effect = {
        none: {
            name: 'none',
            filter: '',
            minValue: 0,
            maxValue: 0,
            measure: ''
        },
        chrome: {
            name: 'chrome',
            filter: 'grayscale',
            minValue: 0,
            maxValue: 1,
            measure: ''
        },
        sepia: {
            name: 'sepia',
            filter: 'sepia',
            minValue: 0,
            maxValue: 1,
            measure: ''
        },
        marvin: {
            name: 'marvin',
            filter: 'invert',
            minValue: 0,
            maxValue: 100,
            measure: '%'
        },
        phobos: {
            name: 'phobos',
            filter: 'blur',
            minValue: 0,
            maxValue: 3,
            measure: 'px'
        },
        heat: {
            name: 'heat',
            filter: 'brightness',
            minValue: 1,
            maxValue: 3,
            measure: ''
        }
    }

    var FILE_TYPE_ERROR_MESSAGE = 'Файл не является изображением';
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    var uploadImageInput = document.querySelector('#upload-file');
    var imageChangeForm = document.querySelector('.img-upload__overlay');
    var uploadImageCancel = document.querySelector('#upload-cancel');

    var uploadingImage = document.querySelector('.img-upload__preview');
    var imageEffects = document.querySelectorAll('.effects__radio');

    var effectSlider = document.querySelector('.img-upload__effect-level');
    var effectLine = effectSlider.querySelector('.effect-level__line');
    var effectPin = effectSlider.querySelector('.effect-level__pin');
    var effectDepth = effectSlider.querySelector('.effect-level__depth');
    var effectValue = effectSlider.querySelector('.effect-level__value');
    var pinLeftCoord;

    var currentEffect = Effect.none;

    var scaleImageSmallerButton = document.querySelector('.scale__control--smaller');
    var scaleImageBiggerButton = document.querySelector('.scale__control--bigger');

    var scaleImageControlValue = document.querySelector('.scale__control--value');
    var scaleImageValue = MAX_EFFECT_VALUE;

    var hashtagInput = document.querySelector('.text__hashtags');

    var uploadImageForm = document.querySelector('#upload-select-image');

    var uploadingImageComment = document.querySelector('.text__description');

    function setEffect(level) {
        var formula = (currentEffect.maxValue - currentEffect.minValue) / 100;
        uploadingImage.style.filter = currentEffect.filter + '(' + ((level * formula) + currentEffect.minValue) + currentEffect.measure + ')';
    }

    function clearEffect() {
        uploadingImage.style.filter = '';
    }

    effectPin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoords = {
            x: evt.clientX
        }

        function onMouseMove(moveEvt) {
            moveEvt.preventDefault();

            var shift = {
                x: startCoords.x - moveEvt.clientX
            }

            startCoords.x = moveEvt.clientX;

            pinLeftCoord = effectPin.offsetLeft - shift.x;

            if (pinLeftCoord < 0) {
                pinLeftCoord = 0;
            }

            if (pinLeftCoord > effectLine.offsetWidth) {
                pinLeftCoord = effectLine.offsetWidth;
            }

            effectPin.style.left = pinLeftCoord + 'px';
            effectDepth.style.width = pinLeftCoord + 'px';

            var valueLevel = pinLeftCoord * 100 / effectLine.offsetWidth;

            effectValue.value = valueLevel;
            setEffect(valueLevel);
        }

        function onMouseUp(upEvt) {
            upEvt.preventDefault();

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    })

    function viewEffect(index) {
        function onImageEffectClick(evt) {
            var effectName = evt.target.value;
            currentEffect = Effect[effectName];

            uploadingImage.className = 'img-upload__preview effects__preview--' + effectName;

            if (effectName === 'none') {
                effectSlider.classList.add('hidden');
                clearEffect();
            }
            else {
                effectSlider.classList.remove('hidden');
            }

            setEffect(MAX_EFFECT_VALUE);

            effectPin.style.left = effectLine.offsetWidth + 'px';
            effectDepth.style.width = effectLine.offsetWidth + 'px';

        }

        imageEffects[index].addEventListener('click', onImageEffectClick);
    }

    function onScaleImageSmallerClick(evt) {
        evt.preventDefault();

        if (scaleImageValue > MIN_EFFECT_VALUE) {
            scaleImageValue = scaleImageValue - SCALING_STEP;
            scaleImageControlValue.value = scaleImageValue + '%';
            uploadingImage.style.transform = 'scale(' + (scaleImageValue / 100) + ')';
        }
    }

    function onScaleImageBiggerClick(evt) {
        evt.preventDefault();

        if (scaleImageValue < MAX_EFFECT_VALUE) {
            scaleImageValue = scaleImageValue + SCALING_STEP;
            scaleImageControlValue.value = scaleImageValue + '%';
            uploadingImage.style.transform = 'scale(' + (scaleImageValue / 100) + ')';
        }
    }

    function onUploadImageFormSubmit(evt) {
        evt.preventDefault();

        hashtagInput.setCustomValidity(window.getValidationResult(hashtagInput.value));
        hashtagInput.reportValidity();

    }

    function onUploadImageInputEscapeKeyDown(evt) {
        if (document.activeElement !== hashtagInput && document.activeElement !== uploadingImageComment) {
            EscapeCallBack(evt, onUploadImageCancelClick);
        }
    }

    function openForm() {
        imageChangeForm.classList.remove('hidden');

        document.addEventListener('keydown', onUploadImageInputEscapeKeyDown);

        effectSlider.classList.add('hidden');

        scaleImageControlValue.value = scaleImageValue + '%';

        scaleImageSmallerButton.addEventListener('click', onScaleImageSmallerClick);
        scaleImageBiggerButton.addEventListener('click', onScaleImageBiggerClick);

        for (var i = 0; i < imageEffects.length; i++) {
            viewEffect(i);
        }

        uploadImageForm.addEventListener('submit', onUploadImageFormSubmit);
    }

    function onUploadImageInputChange() {
        var file = uploadImageInput.files[0];
        var fileName = file.name.toLowerCase();
        
        var matches = FILE_TYPES.some(function (fileType) {
            return fileName.endsWith(fileType);
        });

        if (matches) {
            var reader = new FileReader();
      
            reader.addEventListener('load', function () {
              uploadingImage.querySelector('img').src = reader.result;
              openForm();
            });
      
            reader.readAsDataURL(file);
          } else {
            onError(FILE_TYPE_ERROR_MESSAGE);
        }

        function onError(errorMessage) {
            console.log(errorMessage);
        }
    }

    function onUploadImageCancelClick() {
        scaleImageSmallerButton.removeEventListener('click', onScaleImageSmallerClick);
        scaleImageBiggerButton.removeEventListener('click', onScaleImageBiggerClick);

        uploadImageForm.removeEventListener('submit', onUploadImageFormSubmit);

        document.removeEventListener('keydown', onUploadImageInputEscapeKeyDown);

        imageChangeForm.classList.add('hidden');
    }

    function onUploadImageCancelEnterKeyDown(evt) {
        evt.preventDefault();
        if (evt.key === 'Enter') {
            onUploadImageCancelClick(evt);
        }
    }

    uploadImageInput.addEventListener('change', onUploadImageInputChange);
    uploadImageCancel.addEventListener('click', onUploadImageCancelClick);

    uploadImageCancel.addEventListener('keydown', onUploadImageCancelEnterKeyDown);
})();
