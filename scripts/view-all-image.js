'use strict';

(function () {
    var imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var pictures = document.querySelector('.pictures');
    var pictureFragment = document.createDocumentFragment();

    function initListener(images) {
        var allPictures = document.querySelectorAll('.picture');

        function initPicture(i) {
            function onPictureClick() {
                window.showBigPicture(images[i]);
            }

            allPictures[i].addEventListener('click', onPictureClick);
        }
        

        allPictures.forEach(function(item, i, allPictures) {
            initPicture(i);
        });
    }

    function removePictures() {
        var allViewImages = document.querySelectorAll('.picture');

        if (allViewImages.length !== 0) {
            allViewImages.forEach(function(item, i, allViewImages) {
                allViewImages[i].remove();
            });
        }
    }

    function viewAllImages(images) {
        images.forEach(function(item, i, images) {
            var cloneImageTemplate = imageTemplate.cloneNode(true);

            cloneImageTemplate.querySelector('.picture__img').src = images[i].url;
            cloneImageTemplate.querySelector('.picture__likes').textContent = images[i].likes;
            cloneImageTemplate.querySelector('.picture__comments').textContent = images[i].comments.length;

            pictureFragment.appendChild(cloneImageTemplate);
        });

        removePictures();
        pictures.appendChild(pictureFragment);
        initListener(images);
        document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    }

    window.viewAllImages = viewAllImages;
})();
