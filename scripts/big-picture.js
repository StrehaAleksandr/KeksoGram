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
        removePictureListeners();
        window.util.isEscape(evt, closePicture);
    }

    function openPicture() {
        initPictureListenres();

        bigPicture.classList.remove('hidden');
        commentLoader.classList.remove('hidden');
    }

    function closePicture() {
        removeComments();
        bigPicture.classList.add('hidden');
    }

    function initPictureListenres() {
        document.addEventListener('keydown', onBigPictureEscapeKeyDown);
        bigViewClose.addEventListener('click', onBigViewCloseClick);
        commentLoader.addEventListener('click', onCommentLoaderClick);
    }

    function removePictureListeners() {
        document.removeEventListener('keydown', onBigPictureEscapeKeyDown);
        bigViewClose.removeEventListener('click', onBigViewCloseClick);
        commentLoader.removeEventListener('click', onCommentLoaderClick);
    }

    function onCommentLoaderClick() {
        loadNextComments();
        commentLoaderDisable();
    }

    function removeComments() {        
        while (commentList.firstChild) {
            commentList.removeChild(commentList.firstChild);
        } 
    }

    function showBigPicture(pictureData) {   
        removeComments();
        
        var commentView = COMMENT_STEP;

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

        if (commentView < pictureData.comments.length) {
            socialCommentCount.firstChild.textContent = commentView + ' из ';
        }
        else {
            socialCommentCount.firstChild.textContent = pictureData.comments.length + ' из ';
        } 

        function loadNextComments() {
            for (var i = commentView; i < Math.min(pictureData.comments.length, (COMMENT_STEP + commentView)); i++) {
                var userComment = document.createElement('li');
                userComment.classList.add('social__comment');
                userComment.innerHTML = '<img class="social__picture" src="#" alt="Аватар комментатора фотографии" width="35" height="35"> <p class="social__text"></p>';
    
                userComment.querySelector('img').src = pictureData.comments[i].avatar;
                userComment.querySelector('p').textContent = pictureData.comments[i].message;
    
                commentFragment.appendChild(userComment);
            }
    
            commentList.appendChild(commentFragment);            
    
            if ((commentView + COMMENT_STEP) < pictureData.comments.length) {
                commentView = commentView + COMMENT_STEP;
            }
            else {
                commentView = pictureData.comments.length;
            }

            socialCommentCount.firstChild.textContent = commentView + ' из ';
        }

        function commentLoaderDisable() {
            var countViewComments = document.querySelectorAll('.social__comment');
    
            if (countViewComments.length === pictureData.comments.length) {
                commentLoader.classList.add('hidden');
            }
        }

        window.loadNextComments = loadNextComments;
        window.commentLoaderDisable = commentLoaderDisable;

        openPicture();     
        commentLoaderDisable(); 
    }

    window.showBigPicture = showBigPicture;
})();
