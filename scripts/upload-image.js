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


    var uploadImageForm = document.querySelector('#upload-select-image');
    var uploadImageInput = uploadImageForm.querySelector('#upload-file');
    var imageChangeForm = uploadImageForm.querySelector('.img-upload__overlay');
    var uploadImageCancel = imageChangeForm.querySelector('#upload-cancel');

    var uploadingImage = imageChangeForm.querySelector('.img-upload__preview');
    var imageEffects = imageChangeForm.querySelectorAll('.effects__radio');

    var effectSlider = imageChangeForm.querySelector('.img-upload__effect-level');
    var effectLine = effectSlider.querySelector('.effect-level__line');
    var effectPin = effectSlider.querySelector('.effect-level__pin');
    var effectDepth = effectSlider.querySelector('.effect-level__depth');
    var effectValue = effectSlider.querySelector('.effect-level__value');

    var scaleImageSmallerButton = imageChangeForm.querySelector('.scale__control--smaller');
    var scaleImageBiggerButton = imageChangeForm.querySelector('.scale__control--bigger');
    var scaleImageControlValue = imageChangeForm.querySelector('.scale__control--value');

    var hashtagInput = imageChangeForm.querySelector('.text__hashtags');
    var uploadingImageComment = imageChangeForm.querySelector('.text__description');

    var scaleImageValue = MAX_EFFECT_VALUE;
    var currentEffect = Effect.none;
    var pinLeftCoord;

    function onUploadImageFormSubmit(evt) {
        evt.preventDefault();
        console.log(hashtagInput.value);

        hashtagInput.setCustomValidity(window.getValidationResult(hashtagInput.value));
        hashtagInput.reportValidity();

        // window.backend.postData(new FormData(uploadImageForm), function(response){
        //     clearEffect();
        //     closeForm();
        // });

        // var uploadData = new FormData(uploadImageForm);

        console.log(hashtagInput.value);

        // clearEffect();
        // closeForm();
    }

    function onUploadImageInputEscapeKeyDown(evt) {
        if (document.activeElement !== hashtagInput && document.activeElement !== uploadingImageComment) {
            window.util.isEscape(evt, closeForm);
        }
    }

    function setEffect(level) {
        var formula = (currentEffect.maxValue - currentEffect.minValue) / 100;
        uploadingImage.style.filter = currentEffect.filter + '(' + ((level * formula) + currentEffect.minValue) + currentEffect.measure + ')';
    }

    function clearEffect() {
        uploadingImage.className = 'img-upload__preview';
        uploadingImage.style.filter = '';
    }

    function onEffectPinMouseDown(evt) {
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
    }

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

    function openForm() {
        imageChangeForm.classList.remove('hidden');
        effectSlider.classList.add('hidden');

        scaleImageControlValue.value = scaleImageValue + '%';

        imageEffects.forEach(function(item, i, imageEffects) {
            viewEffect(i);
        })

        initFormListenes();
    }

    function closeForm() {
        clearEffect();
        imageChangeForm.classList.add('hidden');
        removeFormListeners();
    }

    function initFormListenes() {
        document.addEventListener('keydown', onUploadImageInputEscapeKeyDown); 
        scaleImageSmallerButton.addEventListener('click', onScaleImageSmallerClick);
        scaleImageBiggerButton.addEventListener('click', onScaleImageBiggerClick);
        uploadImageForm.addEventListener('submit', onUploadImageFormSubmit);
        effectPin.addEventListener('mousedown', onEffectPinMouseDown);
        uploadImageCancel.addEventListener('click', onUploadImageCancelClick);   
        uploadImageCancel.addEventListener('keydown', onUploadImageCancelEnterKeyDown);
    }

    function removeFormListeners() {
        document.removeEventListener('keydown', onUploadImageInputEscapeKeyDown); 
        scaleImageSmallerButton.removeEventListener('click', onScaleImageSmallerClick);
        scaleImageBiggerButton.removeEventListener('click', onScaleImageBiggerClick);
        uploadImageForm.removeEventListener('submit', onUploadImageFormSubmit);
        effectPin.removeEventListener('mousedown', onEffectPinMouseDown);
        uploadImageCancel.removeEventListener('click', onUploadImageCancelClick);   
        uploadImageCancel.removeEventListener('keydown', onUploadImageCancelEnterKeyDown);
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
        closeForm();
    }

    function onUploadImageCancelEnterKeyDown(evt) {
        evt.preventDefault();

        window.util.isEnter(evt, closeForm);
    }

    uploadImageInput.addEventListener('change', onUploadImageInputChange);
})();
