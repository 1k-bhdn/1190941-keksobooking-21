"use strict";

const map = document.querySelector(`.map`);
const filterContainer = map.querySelector(`.map__filters-container`);
const offersData = [];
const roomTypes = [`palace`, `flat`, `house`, `bungalow`];
const times = [`12:00`, `13:00`, `14:00`];
const roomFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const roomPhotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = document.querySelector(`.map__pins`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
let offerData = {};

const randomInteger = (min, max) => {
  const randomNum = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(randomNum);
};

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
      "price": randomInteger(5000, 70000),
      "type": roomTypes[Math.floor(Math.random() * roomTypes.length)],
      "rooms": Math.ceil(Math.random() * 3),
      "guests": Math.floor(Math.random() * 3),
      "checkin": times[Math.floor(Math.random() * times.length)],
      "checkout": times[Math.floor(Math.random() * times.length)],
      "features": roomFeatures,
      "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
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
  const offerPin = pinTemplate.cloneNode(true);
  const pinAvatar = offerPin.querySelector(`img`);

  offerPin.style.left = offerData.location.x + offerPin.offsetWidth / 2 + `px`;
  offerPin.style.top = offerData.location.y + offerPin.offsetHeight + `px`;
  pinAvatar.src = offerData.author.avatar;
  pinAvatar.alt = offerData.offer.title;

  return mapPins.appendChild(offerPin);
};

const renderCard = () => {
  const card = cardTemplate.cloneNode(true);
  const cardAvatar = card.querySelector(`.popup__avatar`);
  const cardTitle = card.querySelector(`.popup__title`);
  const cardAddress = card.querySelector(`.popup__text--address`);
  const cardPrice = card.querySelector(`.popup__text--price`);
  const cardType = card.querySelector(`.popup__type`);
  let roomType;
  const cardCapacity = card.querySelector(`.popup__text--capacity`);
  const cardTime = card.querySelector(`.popup__text--time`);
  const cardFeatures = card.querySelector(`.popup__features`);
  const cardFeature = cardFeatures.querySelectorAll(`.popup__feature`);
  const cardDescription = card.querySelector(`.popup__description`);
  const cardPhotos = card.querySelector(`.popup__photos`);
  const cardPhoto = card.querySelector(`.popup__photo`);

  if (offerData.offer.type === `palace`) {
    roomType = `Дворец`;
  } else if (offerData.offer.type === `flat`) {
    roomType = `Квартира`;
  } else if (offerData.offer.type === `house`) {
    roomType = `Дом`;
  } else if (offerData.offer.type === `bungalow`) {
    roomType = `Бунгало`;
  }

  cardAvatar.src = offerData.author.avatar;
  cardTitle.textContent = offerData.offer.title;
  cardAddress.textContent = offerData.offer.address;
  cardPrice.textContent = offerData.offer.price + `₽/ночь`;
  cardType.textContent = roomType;
  cardCapacity.textContent = offerData.offer.rooms + ` комнаты для ` + offerData.offer.guests + ` гостей.`;
  cardTime.textContent = `Заезд после ` + offerData.offer.checkin + `, выезд до ` + offerData.offer.checkout;

  for (let i = 5; i > offerData.offer.features.length - 1; i--) {
    cardFeatures.removeChild(cardFeature[i]);
  }

  cardDescription.textContent = offerData.offer.description;
  cardPhoto.src = offerData.offer.photos[0];

  for (let i = 1; i < offerData.offer.photos.length; i++) {
    let clonedPhoto = cardPhoto.cloneNode(true);
    cardPhotos.appendChild(clonedPhoto);
    clonedPhoto.src = offerData.offer.photos[i];
  }

  return map.insertBefore(card, filterContainer);
};

for (let i = 1; i <= 8; i++) {
  generateOfferData([i]);
  offersData.push(offerData);
  createOfferPin();
  if (i === 1) {
    renderCard();
  }
}

map.classList.remove(`map--faded`);
