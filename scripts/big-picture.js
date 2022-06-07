'use strict';

(function () {
    var COMMENT_STEP = 5;

    var bigPicture = document.querySelector('.big-picture');;
    var bigViewClose = bigPicture.querySelector('#picture-cancel');
    var socialCommentCount = bigPicture.querySelector('.social__comment-count');
    var commentList = bigPicture.querySelector('.social__comments');
    var commentLoader = bigPicture.querySelector('.comments-loader');

    var pictureData = {};
    var commentView = 0;

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
        commentView = 0;

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

    function viewNewComments(pictureComments, commentView) {
        var commentFragment = document.createDocumentFragment();

        for (var i = commentView; i < Math.min(pictureComments.length, (COMMENT_STEP + commentView)); i++) {
            var userComment = document.createElement('li');
            userComment.classList.add('social__comment');
            userComment.innerHTML = '<img class="social__picture" src="#" alt="Аватар комментатора фотографии" width="35" height="35"> <p class="social__text"></p>';
    
            userComment.querySelector('img').src = pictureComments[i].avatar;
            userComment.querySelector('p').textContent = pictureComments[i].message;

            commentFragment.appendChild(userComment);
        }

        commentList.appendChild(commentFragment);
    }

    function viewNowComments(commentView, pictureDataCommentLength) {
        if (commentView < pictureDataCommentLength) {
            socialCommentCount.firstChild.textContent = commentView + ' из ';
        }
        else {
            socialCommentCount.firstChild.textContent = pictureDataCommentLength + ' из ';
        } 
    }

    function loadNextComments() {
        viewNewComments(pictureData.comments, commentView);
        
        commentView = commentView + COMMENT_STEP;

        viewNowComments(commentView, pictureData.comments.length);
    }

    function commentLoaderDisable() {    
        if (commentView >= pictureData.comments.length) {
            commentLoader.classList.add('hidden');
        }
    }

    function drowBigPicture(pictureData) {   
        removeComments();

        viewNewComments(pictureData.comments, commentView);
        
        commentView = COMMENT_STEP;

        bigPicture.querySelector('.big-picture__img img').src = pictureData.url;
        bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
        bigPicture.querySelector('.comments-count').textContent = pictureData.comments.length;
        bigPicture.querySelector('.social__caption').textContent = pictureData.description;

        viewNowComments(commentView, pictureData.comments.length);

        openPicture();     
        commentLoaderDisable(); 
    }

    function showBigPicture(data) {
        pictureData = data;
        drowBigPicture(pictureData);
    }

    window.showBigPicture = showBigPicture;
})();
