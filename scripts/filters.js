'use strict';

(function() {
    var popularImagesButton = document.querySelector('#filter-popular');
    var newImagesButton = document.querySelector('#filter-new');
    var discussedImageButton = document.querySelector('#filter-discussed');

    function popularImagesFilter() {
        var allViewImages = document.querySelectorAll('.picture');

        for (var i = 0; i < allViewImages.length; i++) {
            allViewImages[i].remove();
        }

        window.viewAllImages(allImage);

        popularImagesButton.className = 'img-filters__button  img-filters__button--active';
        newImagesButton.className = 'img-filters__button';
        discussedImageButton.className = 'img-filters__button';
    }

    function newImagesFilter() {
        var allViewImages = document.querySelectorAll('.picture');

        for (var i = 0; i < allViewImages.length; i++) {
            allViewImages[i].remove();
        }

        var newImagesArray = allImage.slice();

        newImagesButton.className = 'img-filters__button  img-filters__button--active';
        popularImagesButton.className = 'img-filters__button';
        discussedImageButton.className = 'img-filters__button';
    }

    function discussedImageFilter() {
        var allViewImages = document.querySelectorAll('.picture');

        for (var i = 0; i < allViewImages.length; i++) {
            allViewImages[i].remove();
        }

        var sortArray = allImage.slice();

        sortArray.sort(function(a, b) {
            if (a.comments.length > b.comments.length) {
                return -1;
            }

            if (a.comments.length < b.comments.length) {
                return 1;
            }

            return 0;
        })

        window.viewAllImages(sortArray);

        
        discussedImageButton.className = 'img-filters__button  img-filters__button--active';
        newImagesButton.className = 'img-filters__button';
        popularImagesButton.className = 'img-filters__button';
    }

    popularImagesButton.addEventListener('click', popularImagesFilter);
    newImagesButton.addEventListener('click', newImagesFilter);
    discussedImageButton.addEventListener('click', discussedImageFilter)
})();