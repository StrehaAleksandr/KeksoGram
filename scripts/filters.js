'use strict';

(function() {
    var NEW_COMMENTS = 10;

    var popularImagesButton = document.querySelector('#filter-popular');
    var newImagesButton = document.querySelector('#filter-new');
    var discussedImageButton = document.querySelector('#filter-discussed');

    function popularImagesFilter() {
        window.viewAllImages(window.allImage);

        popularImagesButton.className = 'img-filters__button  img-filters__button--active';
        newImagesButton.className = 'img-filters__button';
        discussedImageButton.className = 'img-filters__button';
    }

    function newImagesFilter() {
        var newImagesArray = window.allImage.slice();
        var tenRandomImages = [];

        function getRandomNumber(min, max) {
            return Math.floor(min + Math.random() * (max - min));
        }

        for (var i = 0; i < NEW_COMMENTS; i++) {
            tenRandomImages.push(newImagesArray.splice(getRandomNumber(0, newImagesArray.length), 1)[0]);
        }

        window.viewAllImages(tenRandomImages);

        newImagesButton.className = 'img-filters__button  img-filters__button--active';
        popularImagesButton.className = 'img-filters__button';
        discussedImageButton.className = 'img-filters__button';
    }

    function discussedImageFilter() {
        var sortArray = window.allImage.slice();

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

    function onPopularImagesButtonClick() {
        window.util.debouce(popularImagesFilter);
    }

    function onNewImagesButtonClick() {
        window.util.debouce(newImagesFilter);
    }

    function onDiscussedImageButtonClick() {
        window.util.debouce(discussedImageFilter);
    }

    popularImagesButton.addEventListener('click', onPopularImagesButtonClick);
    newImagesButton.addEventListener('click', onNewImagesButtonClick);
    discussedImageButton.addEventListener('click', onDiscussedImageButtonClick)
})();
