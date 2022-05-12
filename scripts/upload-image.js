var uploadImageButton = document.querySelector('#upload-file');
var imageChangeForm = document.querySelector('.img-upload__overlay');
var uploadImageCancel = document.querySelector('#upload-cancel');

var uploadingImage = document.querySelector('.img-upload__preview');

var imageEffectNoneButton = document.querySelector('#effect-none');
var imageEffectChromeButton = document.querySelector('#effect-chrome');
var imageEffectSepiaButton = document.querySelector('#effect-sepia');
var imageEffectMarvinButton = document.querySelector('#effect-marvin');
var imageEffectPhobosButton = document.querySelector('#effect-phobos');
var imageEffectHeatButton = document.querySelector('#effect-heat');

function imageEffectNoneFunction() {
    uploadingImage.classList.remove('effects__preview--chrome', 'effects__preview--sepia','effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    uploadingImage.classList.add('effects__preview--none');
}

function imageEffectChromeFunction() {
    uploadingImage.classList.remove('effects__preview--none', 'effects__preview--sepia','effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    uploadingImage.classList.add('effects__preview--chrome');
}

function imageEffectSepiaFunction() {
    uploadingImage.classList.remove('effects__preview--chrome', 'effects__preview--none','effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    uploadingImage.classList.add('effects__preview--sepia');
}

function imageEffectMarvinFunction() {
    uploadingImage.classList.remove('effects__preview--chrome', 'effects__preview--none','effects__preview--sepia', 'effects__preview--phobos', 'effects__preview--heat');
    uploadingImage.classList.add('effects__preview--marvin');
}

function imageEffectPhobosFunction() {
    uploadingImage.classList.remove('effects__preview--chrome', 'effects__preview--none','effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--heat');
    uploadingImage.classList.add('effects__preview--phobos');
}

function imageEffectHeatFunction() {
    uploadingImage.classList.remove('effects__preview--chrome', 'effects__preview--none','effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos');
    uploadingImage.classList.add('effects__preview--heat');
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

function onViewImageChangeForm(evt) {
    evt.preventDefault();
    imageChangeForm.classList.remove('hidden'); 

    scaleImageControlValue.value = scaleImageValue + '%';    

    scaleImageSmallerButton.addEventListener('click', onScaleImageSmallerClick)
    scaleImageBiggerButton.addEventListener('click', onScaleImageBiggerClick)

    imageEffectNoneButton.addEventListener('click', imageEffectNoneFunction);    
    imageEffectChromeButton.addEventListener('click', imageEffectChromeFunction);
    imageEffectSepiaButton.addEventListener('click', imageEffectSepiaFunction);
    imageEffectMarvinButton.addEventListener('click', imageEffectMarvinFunction);
    imageEffectPhobosButton.addEventListener('click', imageEffectPhobosFunction);
    imageEffectHeatButton.addEventListener('click', imageEffectHeatFunction);
}

function onHiddenImageChangeForm(evt) {
    evt.preventDefault();

    scaleImageSmallerButton.removeEventListener('click', onScaleImageSmallerClick)
    scaleImageBiggerButton.removeEventListener('click', onScaleImageBiggerClick)

    imageEffectNoneButton.removeEventListener('click', imageEffectNoneFunction);    
    imageEffectChromeButton.removeEventListener('click', imageEffectChromeFunction);
    imageEffectSepiaButton.removeEventListener('click', imageEffectSepiaFunction);
    imageEffectMarvinButton.removeEventListener('click', imageEffectMarvinFunction);
    imageEffectPhobosButton.removeEventListener('click', imageEffectPhobosFunction);
    imageEffectHeatButton.removeEventListener('click', imageEffectHeatFunction);

    imageChangeForm.classList.add('hidden');
}

uploadImageButton.addEventListener('click', onViewImageChangeForm);
uploadImageCancel.addEventListener('click', onHiddenImageChangeForm);
