var uploadImageInput = document.querySelector('#upload-file');
var imageChangeForm = document.querySelector('.img-upload__overlay');
var uploadImageCancel = document.querySelector('#upload-cancel');

var uploadingImage = document.querySelector('.img-upload__preview');
var imageEffects = document.querySelectorAll('.effects__radio');

function viewEffect(index) {
    function effect() {
        for (var i = 0; i < imageEffects.length; i++) {
            uploadingImage.classList.remove('effects__preview--' + imageEffects[i].value);
        }
        uploadingImage.classList.add('effects__preview--' + imageEffects[index].value);
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
