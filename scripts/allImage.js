'use strict';

(function() {
    window.allImage = [];

    function loadHandler(images) {
        allImage = images.slice();
        window.viewAllImages(allImage);        
    }

    function errorHandler(errorMessage) {
        var node = document.createElement('div');
        node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';
        
        node.textContent = errorMessage; 
        document.body.insertAdjacentElement('afterbegin', node);
      };

    window.backend.getData(loadHandler, errorHandler)
})();
