var Effect = {
    none: {
        name: 'none',
        filter: 'none',
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

        startCoords = {
            x: moveEvt.clientX
        }

        pinLeftCoord = effectPin.offsetLeft - shift.x;

        if (pinLeftCoord < 0) {
            pinLeftCoord = 0;
        }

        if (pinLeftCoord > effectLine.offsetWidth) {
            pinLeftCoord = effectLine.offsetWidth;
        }

        effectPin.style.left = pinLeftCoord + 'px';
        effectDepth.style.width = pinLeftCoord + 'px';
        effectValue.value = pinLeftCoord * 100 / effectLine.offsetWidth;
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
    function effect() {
        uploadingImage.className = 'img-upload__preview effects__preview--' + imageEffects[index].value;

        if (imageEffects[index].value === 'none') {
            document.querySelector('.img-upload__effect-level').classList.add('hidden');
        }
        else {
            document.querySelector('.img-upload__effect-level').classList.remove('hidden');
        }
    }
    imageEffects[index].addEventListener('click', effect);
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

function onUploadImageInputChange(evt) {
    evt.preventDefault();
    imageChangeForm.classList.remove('hidden');

    var effectLineSize = effectLine.getBoundingClientRect();

    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    
    scaleImageControlValue.value = scaleImageValue + '%';    

    scaleImageSmallerButton.addEventListener('click', onScaleImageSmallerClick)
    scaleImageBiggerButton.addEventListener('click', onScaleImageBiggerClick)

    for (var i = 0; i < imageEffects.length; i++) {
        viewEffect(i);
    }
}

function onuploadImageCancelClick(evt) {
    evt.preventDefault();

    scaleImageSmallerButton.removeEventListener('click', onScaleImageSmallerClick)
    scaleImageBiggerButton.removeEventListener('click', onScaleImageBiggerClick)

    imageChangeForm.classList.add('hidden');
}

uploadImageInput.addEventListener('click', onUploadImageInputChange);
uploadImageCancel.addEventListener('click', onuploadImageCancelClick);
