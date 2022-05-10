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
    uploadingImage.querySelector('img').classList.remove('effects__preview--chrome', 'effects__preview--sepia','effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    uploadingImage.querySelector('img').classList.add('effects__preview--none');
}

function imageEffectChromeFunction() {
    uploadingImage.querySelector('img').classList.remove('effects__preview--none', 'effects__preview--sepia','effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    uploadingImage.querySelector('img').classList.add('effects__preview--chrome');
}

function imageEffectSepiaFunction() {
    uploadingImage.querySelector('img').classList.remove('effects__preview--chrome', 'effects__preview--none','effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    uploadingImage.querySelector('img').classList.add('effects__preview--sepia');
}

function imageEffectMarvinFunction() {
    uploadingImage.querySelector('img').classList.remove('effects__preview--chrome', 'effects__preview--none','effects__preview--sepia', 'effects__preview--phobos', 'effects__preview--heat');
    uploadingImage.querySelector('img').classList.add('effects__preview--marvin');
}

function imageEffectPhobosFunction() {
    uploadingImage.querySelector('img').classList.remove('effects__preview--chrome', 'effects__preview--none','effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--heat');
    uploadingImage.querySelector('img').classList.add('effects__preview--phobos');
}

function imageEffectHeatFunction() {
    uploadingImage.querySelector('img').classList.remove('effects__preview--chrome', 'effects__preview--none','effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos');
    uploadingImage.querySelector('img').classList.add('effects__preview--heat');
}

function onViewImageChangeForm(evt) {
    evt.preventDefault();
    imageChangeForm.classList.remove('hidden');

    imageEffectNoneButton.addEventListener('click', imageEffectNoneFunction)
    
    imageEffectChromeButton.addEventListener('click', imageEffectChromeFunction)

    imageEffectSepiaButton.addEventListener('click', imageEffectSepiaFunction)

    imageEffectMarvinButton.addEventListener('click', imageEffectMarvinFunction)

    imageEffectPhobosButton.addEventListener('click', imageEffectPhobosFunction)

    imageEffectHeatButton.addEventListener('click', imageEffectHeatFunction)
}

function onHiddenImageChangeForm(evt) {
    evt.preventDefault();

    imageEffectNoneButton.removeEventListener('click', imageEffectNoneFunction)
    
    imageEffectChromeButton.removeEventListener('click', imageEffectChromeFunction)

    imageEffectSepiaButton.removeEventListener('click', imageEffectSepiaFunction)

    imageEffectMarvinButton.removeEventListener('click', imageEffectMarvinFunction)

    imageEffectPhobosButton.removeEventListener('click', imageEffectPhobosFunction)

    imageEffectHeatButton.removeEventListener('click', imageEffectHeatFunction)

    imageChangeForm.classList.add('hidden');
}

uploadImageButton.addEventListener('click', onViewImageChangeForm);
uploadImageCancel.addEventListener('click', onHiddenImageChangeForm);
