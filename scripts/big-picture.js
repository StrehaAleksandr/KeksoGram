'use strict';

(function () {
    var COMMENT_STEP = 5;

    var bigPicture = document.querySelector('.big-picture');;
    var bigViewClose = bigPicture.querySelector('#picture-cancel');
    var socialCommentCount = bigPicture.querySelector('.social__comment-count');
    var commentList = bigPicture.querySelector('.social__comments');
    var commentLoader = bigPicture.querySelector('.comments-loader');

    function onBigViewCloseClick() {
        removePictureListeners();
        closePicture();
    }

    function onBigPictureEscapeKeyDown(evt) {
        window.util.isEscape(evt, removePictureListeners, closePicture);
    }

    function openPicture() {
        initPictureListenres();

        bigPicture.classList.remove('hidden');
        socialCommentCount.classList.add('visually-hidden');
        commentLoader.classList.add('visually-hidden');
    }

    function closePicture() {
        bigPicture.classList.add('hidden');
    }

    function initPictureListenres() {
        document.addEventListener('keydown', onBigPictureEscapeKeyDown);
        bigViewClose.addEventListener('click', onBigViewCloseClick);
    }

    function removePictureListeners() {
        document.removeEventListener('keydown', onBigPictureEscapeKeyDown);
        bigViewClose.removeEventListener('click', onBigViewCloseClick);
    }

    function showBigPicture(pictureData) {
        while (commentList.firstChild) {
            commentList.removeChild(commentList.firstChild);
        } 

        var commentFragment = document.createDocumentFragment();
        
        for (var i = 0; i < Math.min(pictureData.comments.length, COMMENT_STEP); i++) {
            var userComment = document.createElement('li');
            userComment.classList.add('social__comment');
            userComment.innerHTML = '<img class="social__picture" src="#" alt="Аватар комментатора фотографии" width="35" height="35"> <p class="social__text"></p>';

            userComment.querySelector('img').src = pictureData.comments[i].avatar;
            userComment.querySelector('p').textContent = pictureData.comments[i].message;

            commentFragment.appendChild(userComment);
        }

        commentList.appendChild(commentFragment);

        bigPicture.querySelector('.big-picture__img img').src = pictureData.url;
        bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
        bigPicture.querySelector('.comments-count').textContent = pictureData.comments.length;
        bigPicture.querySelector('.social__caption').textContent = pictureData.description;

        openPicture();
    }

    window.showBigPicture = showBigPicture;
})();
