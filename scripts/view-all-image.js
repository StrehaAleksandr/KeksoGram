// 'use strict'

(function () {
    var imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var pictures = document.querySelector('.pictures');
    var pictureFragment = document.createDocumentFragment();

    for (var i = 0; i < All_PHOTOS_COUNT; i++) {
        var cloneImageTemplate = imageTemplate.cloneNode(true);

        cloneImageTemplate.querySelector('.picture__img').src = allImage[i].url;
        cloneImageTemplate.querySelector('.picture__likes').textContent = allImage[i].likes;
        cloneImageTemplate.querySelector('.picture__comments').textContent = allImage[i].comments.length;

        pictureFragment.appendChild(cloneImageTemplate);
    }

    pictures.appendChild(pictureFragment);
})();