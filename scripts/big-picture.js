'use strict';

(function () {
    var COMMENT_STEP = 5;

    var bigPicture = document.querySelector('.big-picture');
    var allPictures = document.querySelectorAll('.picture');
    var bigViewClose = document.querySelector('#picture-cancel');
    var socialCommentCount = document.querySelector('.social__comment-count');
    var commentLoader = document.querySelector('.comments-loader');

    function onBigViewCloseClick(evt) {
        evt.preventDefault();
        bigPicture.classList.add('hidden');
    }

    function onBigPictureEscapeKeyDown(evt) {
        if (evt.key === 'Escape') {
            onBigViewCloseClick(evt);
        }
    }

    bigViewClose.addEventListener('click', onBigViewCloseClick);
    document.addEventListener('keydown', onBigPictureEscapeKeyDown);

    function initPicture(index) {
        function onPictureClick(evt) {
            evt.preventDefault();
        
            var commentList = bigPicture.querySelector('.social__comments');

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
        
            bigPicture.classList.remove('hidden');
            socialCommentCount.classList.add('visually-hidden');
            commentLoader.classList.add('visually-hidden');
        }

        allPictures[i].addEventListener('click', onPictureClick);
    }

    for (var i = 0; i < allPictures.length; i++) {
        initPicture(i);
    }
})();
