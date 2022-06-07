'use strict';

(function () {
    var imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var pictures = document.querySelector('.pictures');
    var pictureFragment = document.createDocumentFragment();

    function initListener(imagesData) {
        var allPictures = document.querySelectorAll('.picture');

        function initPicture(picture) {
            function onPictureClick() {
                var index = picture.querySelector('.picture__img').dataset.index;
                window.showBigPicture(imagesData[index]);
            }

            picture.addEventListener('click', onPictureClick);
        }
        
        allPictures.forEach(function(picture) {
            initPicture(picture);
        });
    }

    function removePictures() {
        var allViewImages = document.querySelectorAll('.picture');

        if (allViewImages.length !== 0) {
            allViewImages.forEach(function(item) {
                item.remove();
            });
        }
    }

    function viewAllImages(imagesData) {
        imagesData.forEach(function(currentPictureData, position) {
            var cloneImageTemplate = imageTemplate.cloneNode(true);

            cloneImageTemplate.querySelector('.picture__img').src = currentPictureData.url;
            cloneImageTemplate.querySelector('.picture__img').dataset.index = position;
            cloneImageTemplate.querySelector('.picture__likes').textContent = currentPictureData.likes;
            cloneImageTemplate.querySelector('.picture__comments').textContent = currentPictureData.comments.length;

            pictureFragment.appendChild(cloneImageTemplate);
        });

        removePictures();
        pictures.appendChild(pictureFragment);
        initListener(imagesData);
        document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    }

    window.viewAllImages = viewAllImages;
})();
