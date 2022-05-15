var MAX_EFFECT_VALUE = 100;

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

var uploadImageInput = document.querySelector('#upload-file');
var imageChangeForm = document.querySelector('.img-upload__overlay');
var uploadImageCancel = document.querySelector('#upload-cancel');

var uploadingImage = document.querySelector('.img-upload__preview');
var imageEffects = document.querySelectorAll('.effects__radio');

var effectLine = document.querySelector('.effect-level__line');
var effectPin = document.querySelector('.effect-level__pin');
var effectDepth = document.querySelector('.effect-level__depth');
var effectValue = document.querySelector('.effect-level__value');
var pinLeftCoord;

var currentEffect = Effect.none;

function setEffect(level) {
    var formula = (currentEffect.maxValue - currentEffect.minValue) / 100;
    uploadingImage.style.filter = currentEffect.filter + '(' + ((level * formula) + currentEffect.minValue) + currentEffect.measure + ')';
}

function clearEffect() {
    uploadingImage.style.filter = '';
}

effectPin.addEventListener('mousedown', function(evt) {
    evt.preventDefault();

    var startCoords = {
        x: evt.clientX
    }

    var onMouseMove = function(moveEvt) {
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

    var onMouseUp = function(upEvt) {
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
            document.querySelector('.img-upload__effect-level').classList.add('hidden');
            clearEffect();
        }
        else {
            document.querySelector('.img-upload__effect-level').classList.remove('hidden');
        }

        setEffect(MAX_EFFECT_VALUE);
        
        effectPin.style.left = effectLine.offsetWidth + 'px';
        effectDepth.style.width = effectLine.offsetWidth + 'px';

    }

    imageEffects[index].addEventListener('click', onImageEffectClick);
}

var scaleImageSmallerButton = document.querySelector('.scale__control--smaller');
var scaleImageBiggerButton = document.querySelector('.scale__control--bigger');

var scaleImageControlValue = document.querySelector('.scale__control--value');
var scaleImageValue = 100;

function onScaleImageSmallerClick(evt) {
    evt.preventDefault();

    if (scaleImageValue > 25) {
        scaleImageValue = scaleImageValue - 25;
        scaleImageControlValue.value = scaleImageValue + '%';
        uploadingImage.style.transform = 'scale(' + (scaleImageValue / 100) + ')';
    }     
}

function onScaleImageBiggerClick(evt) {
    evt.preventDefault();
    
    if (scaleImageValue < 100) {
        scaleImageValue = scaleImageValue + 25;
        scaleImageControlValue.value = scaleImageValue + '%';
        uploadingImage.style.transform = 'scale(' + (scaleImageValue / 100) + ')';
    }
}

var hashtagInput = document.querySelector('.text__hashtags');

function onHashTagInputValidation(evt) {
    evt.preventDefault();

    var hashtagsArray = hashtagInput.value.split(' ');
    
    var isNotValidityHashTag = true;

    if (hashtagsArray.length > 5) {
        hashtagInput.setCustomValidity('Должо быть не больше 5 хэш-тегов');
        hashtagInput.reportValidity();
        isNotValidityHashTag = false;
    }

    for (var i = 0; i < hashtagsArray.length; i++) {
        if (hashtagsArray[i].indexOf('#') !== 0) {
            hashtagInput.setCustomValidity('Хэш-тег начинается с <#>');
            hashtagInput.reportValidity();
            isNotValidityHashTag = false;
        }
        if (hashtagsArray[i].length === 1) {
            hashtagInput.setCustomValidity('Хэш-тег не может состоять только из <#>');
            hashtagInput.reportValidity();
            isNotValidityHashTag = false;
        }
        if (hashtagsArray[i].length > 20) {
            hashtagInput.setCustomValidity('Длина хеш-тега не больше 20 символов, включая <#>');
            hashtagInput.reportValidity();
            isNotValidityHashTag = false;
        }

        if (hashtagsArray[i].lastIndexOf('#') > 0) {
            hashtagInput.setCustomValidity('Хеш-теги должны разделяться пробелом');
            hashtagInput.reportValidity();
            isNotValidityHashTag = false;
        }

        for (var i2 = 0; i2 < hashtagsArray.length; i2++) {
            if (i2 === i) continue;
            if (hashtagsArray[i2].toUpperCase() === hashtagsArray[i].toUpperCase()) {
                hashtagInput.setCustomValidity('Нельзя повторять хеш-теги');
                hashtagInput.reportValidity();
                isNotValidityHashTag = false;
                break;
            }
        }
    }
}

var uploadSubmitButton = document.querySelector('#upload-submit');

function onUploadImageInputChange(evt) {
    evt.preventDefault();
    imageChangeForm.classList.remove('hidden');

    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    
    scaleImageControlValue.value = scaleImageValue + '%';    

    scaleImageSmallerButton.addEventListener('click', onScaleImageSmallerClick);
    scaleImageBiggerButton.addEventListener('click', onScaleImageBiggerClick);

    for (var i = 0; i < imageEffects.length; i++) {
        viewEffect(i);
    }

    uploadSubmitButton.addEventListener('click', onHashTagInputValidation);
}

function onuploadImageCancelClick(evt) {
    evt.preventDefault();

    scaleImageSmallerButton.removeEventListener('click', onScaleImageSmallerClick);
    scaleImageBiggerButton.removeEventListener('click', onScaleImageBiggerClick);

    uploadSubmitButton.removeEventListener('submit', onHashTagInputValidation);

    imageChangeForm.classList.add('hidden');
}

uploadImageInput.addEventListener('click', onUploadImageInputChange);
uploadImageCancel.addEventListener('click', onuploadImageCancelClick);
