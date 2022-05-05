'use strict'

var MAX_COMMETS = 10;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var All_PHOTOS = 25;

var ALL_COMMETS = [
    "Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];

var USER_NAMES = [
    "Артём",
    "Женя",
    "Сергей",
    "Анна",
    "Надежда",
    "Александр",
    "Настя",
    "Кирилл"
];

var USER_AVATARS = [
    "img/avatar-1.svg",
    "img/avatar-2.svg",
    "img/avatar-3.svg",
    "img/avatar-4.svg",
    "img/avatar-5.svg",
    "img/avatar-6.svg"
];

var ALL_DESCRPTIONS = [
    "Тестим новую камеру!",
    "Затусили с друзьями на море",
    "Как же круто тут кормят",
    "Отдыхаем...",
    "Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......",
    "Вот это тачка!"
];

var allImage = [];
var template = document.querySelector('#picture');
var pictures = document.querySelector('.pictures');

function getRandomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min))
}

function getCommentsData() {
    var userCommets = [];
    var count = getRandomNumber(0, (MAX_COMMETS + 1));

    for (var i = 0; i < count; i++) {
        userCommets[i] = {
            avatar: USER_AVATARS[getRandomNumber(0, USER_AVATARS.length)],
            message: ALL_COMMETS[getRandomNumber(0, ALL_COMMETS.length)],
            name: USER_NAMES[getRandomNumber(0, USER_NAMES.length)]
        }
    }

    return userCommets;
}

for (var i = 0; i < All_PHOTOS; i++) {
    allImage[i] = {
        url: "photos/" + (i + 1) + ".jpg",
        likes: getRandomNumber(MIN_LIKES, (MAX_LIKES + 1)),
        comments: getCommentsData(),
        description: ALL_DESCRPTIONS[getRandomNumber(0, ALL_DESCRPTIONS.length)]
    }

    
    var clone = template.content.cloneNode(true);
    var image = clone.querySelector('.picture__img');
    var pictureLikes = clone.querySelector('.picture__likes');
    var pictureComments = clone.querySelector('.picture__comments');

    image.src = allImage[i].url;
    pictureLikes.textContent = allImage[i].likes;
    pictureComments.textContent = allImage[i].comments.length;

    pictures.appendChild(clone);
}

console.log(allImage);
