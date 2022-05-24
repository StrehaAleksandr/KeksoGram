'use strict';

(function() {
    window.All_PHOTOS_COUNT = 25;

    window.allImage = [];

    window.backend.getData(function(images) {
        allImage = images.slice();
        window.viewAllImages(allImage);        
    })
})();
