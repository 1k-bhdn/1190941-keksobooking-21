"use strict";

const map = document.querySelector(`.map`);
const offersData = [];
const roomTypes = [`palace`, `flat`, `house`, `bungalow`];
const times = [`12:00`, `13:00`, `14:00`];
const roomFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const roomPhotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = document.querySelector(`.map__pins`);
let offerData = {};

const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

const randomInteger = (min, max) => {
  let randomNum = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(randomNum);
};

shuffle(roomFeatures);
roomFeatures.length = Math.ceil(Math.random() * 6);
roomPhotos.length = Math.ceil(Math.random() * 3);

const generateOfferData = (i) => {

  offerData = {
    "author": {
      "avatar": `img/avatars/user0` + i + `.png`,
    },
    "offer": {
      "title": `Номер ` + i,
      "address": `600, 350`,
      "price": Math.ceil(Math.random() * 100000) + `₽`,
      "type": roomTypes[Math.floor(Math.random() * roomTypes.length)],
      "rooms": Math.ceil(Math.random() * 3),
      "guests": Math.floor(Math.random() * 2),
      "checkin": times[Math.floor(Math.random() * times.length)],
      "checkout": times[Math.floor(Math.random() * times.length)],
      "features": roomFeatures,
      "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      "photos": roomPhotos,
    },
    "location": {
      "x": randomInteger(50, 1150),
      "y": randomInteger(130, 630),
    },
  };

  return offerData;
};

const createOfferPin = () => {
  let offerPin = pinTemplate.cloneNode(true);
  let pinAvatar = offerPin.querySelector(`img`);

  offerPin.style.left = offerData.location.x + offerPin.offsetWidth / 2 + `px`;
  offerPin.style.top = offerData.location.y + offerPin.offsetHeight + `px`;
  pinAvatar.src = offerData.author.avatar;
  pinAvatar.alt = offerData.offer.title;

  return mapPins.appendChild(offerPin);
};

for (let i = 1; i <= 8; i++) {
  generateOfferData([i]);
  offersData.push(offerData);
  createOfferPin();
}

map.classList.remove(`map--faded`);
