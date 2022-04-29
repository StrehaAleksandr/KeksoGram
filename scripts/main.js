'use strict'

var MAX_COMMETS = 10;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
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
]
var USER_AVATARS = [
    "img/avatar-1.svg",
    "img/avatar-2.svg",
    "img/avatar-3.svg",
    "img/avatar-4.svg",
    "img/avatar-5.svg",
    "img/avatar-6.svg"
]
var ALL_DESCRPTIONS = [
    "Тестим новую камеру!",
    "Затусили с друзьями на море",
    "Как же круто тут кормят",
    "Отдыхаем...",
    "Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......",
    "Вот это тачка!"
]

var allImage = [];

function getRandomNumber(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min))
}

function getUserName(index) {
    if (index === USER_NAMES.length) {
        index--;
    }
    return USER_NAMES[index];
}

function getRandomComment(index) {
    if (index === ALL_COMMETS.length) {
        index--;
    }
    return ALL_COMMETS[index];
}

function getUserAvatar(index) {
    if (index === USER_AVATARS.length) {
        index--;
    }
    return USER_AVATARS[index];
}

function getPhotoDescription(index) {
    if (index === ALL_DESCRPTIONS.length) {
        index--;
    }
    return ALL_DESCRPTIONS[index];
}

function getCommentsData() {
    var userCommets = [];
    var count = getRandomNumber(0, MAX_COMMETS);

    for (var i = 0; i < count; i++) {
        userCommets[i] = {
            avatar: getUserAvatar(getRandomNumber(0, USER_AVATARS.length)),
            message: getRandomComment(getRandomNumber(0, ALL_COMMETS.length)),
            name: getUserName(getRandomNumber(0, USER_NAMES.length))
        }
    }

    return userCommets;
}

for (var i = 0; i < 25; i++) {
    allImage[i] = {
        url: "photos/" + (i + 1) + ".jpg",
        likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
        comments: getCommentsData(),
        description: getPhotoDescription(getRandomNumber(0, ALL_DESCRPTIONS.length))
    }
}

console.log(allImage);
