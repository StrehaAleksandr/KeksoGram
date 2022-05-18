'use strict'

var allImage = [];
var imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures'); 

function getRandomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

function getCommentsData() {
    var userCommets = [];
    var count = getRandomNumber(0, (MAX_COMMENTS + 1));

    for (var i = 0; i < count; i++) {
        userCommets[i] = {
            avatar: USER_AVATARS[getRandomNumber(0, USER_AVATARS.length)],
            message: ALL_COMMENTS[getRandomNumber(0, ALL_COMMENTS.length)],
            name: USER_NAMES[getRandomNumber(0, USER_NAMES.length)]
        }
    }

    return userCommets;
}

for (var i = 0; i < All_PHOTOS_COUNT; i++) {
    allImage[i] = {
        url: "photos/" + (i + 1) + ".jpg",
        likes: getRandomNumber(MIN_LIKES, (MAX_LIKES + 1)),
        comments: getCommentsData(),
        description: ALL_DESCRPTIONS[getRandomNumber(0, ALL_DESCRPTIONS.length)]
    }
}

var pictureFragment = document.createDocumentFragment();

for (var i = 0; i < All_PHOTOS_COUNT; i++) {
    var cloneImageTemplate = imageTemplate.cloneNode(true);

    cloneImageTemplate.querySelector('.picture__img').src = allImage[i].url;
    cloneImageTemplate.querySelector('.picture__likes').textContent = allImage[i].likes;
    cloneImageTemplate.querySelector('.picture__comments').textContent = allImage[i].comments.length;

    pictureFragment.appendChild(cloneImageTemplate);
}

pictures.appendChild(pictureFragment);
