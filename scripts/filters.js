'use strict';

(function() {
    var NEW_COMMENTS = 10;

    var imageFilterButtons = document.querySelectorAll('.img-filters__button');
    var popularImagesButton = document.querySelector('#filter-popular');
    var newImagesButton = document.querySelector('#filter-new');
    var discussedImageButton = document.querySelector('#filter-discussed');

    function activeFilter(evt) {
        for(var i = 0; i < imageFilterButtons.length; i++) {
            imageFilterButtons[i].classList.remove('img-filters__button--active');
        }

        evt.target.classList.add('img-filters__button--active');
    }

    function popularImagesFilter(evt) {
        window.viewAllImages(window.allImage);

        activeFilter(evt);
    }

    function newImagesFilter(evt) {
        var newImagesArray = window.allImage.slice();
        var tenRandomImages = [];

        function getRandomNumber(min, max) {
            return Math.floor(min + Math.random() * (max - min));
        }

        for (var i = 0; i < NEW_COMMENTS; i++) {
            tenRandomImages.push(newImagesArray.splice(getRandomNumber(0, newImagesArray.length), 1)[0]);
        }

        window.viewAllImages(tenRandomImages);

        activeFilter(evt);
    }

    function discussedImageFilter(evt) {
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
        
        activeFilter(evt);
    }

    function onPopularImagesButtonClick(evt) {
        window.util.debouce(evt, popularImagesFilter);
    }

    function onNewImagesButtonClick(evt) {
        window.util.debouce(evt,newImagesFilter);
    }

    function onDiscussedImageButtonClick(evt) {
        window.util.debouce(evt,discussedImageFilter);
    }

    popularImagesButton.addEventListener('click', onPopularImagesButtonClick);
    newImagesButton.addEventListener('click', onNewImagesButtonClick);
    discussedImageButton.addEventListener('click', onDiscussedImageButtonClick)
})();
