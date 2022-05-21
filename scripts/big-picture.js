'use strict';

(function () {
    var COMMENT_STEP = 5;

    var allPictures = document.querySelectorAll('.picture')
    var bigPicture = document.querySelector('.big-picture');;
    var bigViewClose = bigPicture.querySelector('#picture-cancel');
    var socialCommentCount = bigPicture.querySelector('.social__comment-count');
    var commentList = bigPicture.querySelector('.social__comments');
    var commentLoader = bigPicture.querySelector('.comments-loader');

    function onBigViewCloseClick() {
        closePicture();
    }

    function onBigPictureEscapeKeyDown(evt) {
        window.util.isEscape(evt, closePicture);
    }

    function closePicture() {
        document.removeEventListener('keydown', onBigPictureEscapeKeyDown);
        bigViewClose.removeEventListener('click', onBigViewCloseClick);
        bigPicture.classList.add('hidden');
    }

    function initPicture(index) {
        function onPictureClick(evt) {
            evt.preventDefault();
        
            while (commentList.firstChild) {
                commentList.removeChild(commentList.firstChild);
            } 

            var commentFragment = document.createDocumentFragment();
            
            for (var i = 0; i < Math.min(allImage[index].comments.length, COMMENT_STEP); i++) {
                var userComment = document.createElement('li');
                userComment.classList.add('social__comment');
                userComment.innerHTML = '<img class="social__picture" src="#" alt="Аватар комментатора фотографии" width="35" height="35"> <p class="social__text"></p>';

                userComment.querySelector('img').src = allImage[index].comments[i].avatar;
                userComment.querySelector('p').textContent = allImage[index].comments[i].message;

                commentFragment.appendChild(userComment);
            }

            commentList.appendChild(commentFragment);

            bigPicture.querySelector('.big-picture__img img').src = allImage[index].url;
            bigPicture.querySelector('.likes-count').textContent = allImage[index].likes;
            bigPicture.querySelector('.comments-count').textContent = allImage[index].comments.length;
            bigPicture.querySelector('.social__caption').textContent = allImage[index].description;

            document.addEventListener('keydown', onBigPictureEscapeKeyDown);
            bigViewClose.addEventListener('click', onBigViewCloseClick);
        
            bigPicture.classList.remove('hidden');
            socialCommentCount.classList.add('visually-hidden');
            commentLoader.classList.add('visually-hidden');
        }

        allPictures[index].addEventListener('click', onPictureClick);
    }

    for (var i = 0; i < allPictures.length; i++) {
        initPicture(i);
    }
})();
