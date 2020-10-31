"use strict";

const AD_COUNT = 8;
const ROUND_UP = 0.5;
const MIN_ROOM_COST = 5000;
const MAX_ROOM_COST = 70000;
const MIN_ROOM_COUNT = 1;
const MAX_ROOM_COUNT = 3;
const MIN_GUESTS = 0;
const MAX_GUESTS = 5;
const X_LOCATION_START = 50;
const X_LOCATION_END = 1150;
const Y_LOCATION_START = 130;
const Y_LOCATION_END = 630;
const MAP = document.querySelector(`.map`);
const PINS_AREA = MAP.querySelector(`.map__pins`);
const FILTERS_CONTAINER = MAP.querySelector(`.map__filters-container`);
const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const CARD_TEMPLATE = document.querySelector(`#card`).content.querySelector(`.map__card`);

const AD_PINS_CONTAINER = document.createDocumentFragment();
const AD_CARDS_CONTAINER = document.createDocumentFragment();

const roomTypes = [
  {
    "type": `palace`,
    "translate": `Дворец`,
  },
  {
    "type": `flat`,
    "translate": `Квартира`,
  },
  {
    "type": `house`,
    "translate": `Дом`,
  },
  {
    "type": `bungalow`,
    "translate": `Бунгало`,
  },
];
const times = [
  `12:00`,
  `13:00`,
  `14:00`,
];
const roomFeatures = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`,
];
const roomPhotos = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
];

const offersData = [];

const randomInteger = (min, max) => {
  const randomNum = min - ROUND_UP + Math.random() * (max - min + 1);
  return Math.round(randomNum);
};

roomFeatures.length = randomInteger(1, roomFeatures.length);
roomPhotos.length = randomInteger(1, roomPhotos.length);

const generateAdData = (i) => {

  return {
    "author": {
      "avatar": `img/avatars/user0` + i + `.png`,
    },
    "offer": {
      "title": `Номер ` + i,
      "address": `600, 350`,
      "price": randomInteger(MIN_ROOM_COST, MAX_ROOM_COST),
      "type": roomTypes[randomInteger(0, roomTypes.length - 1)],
      "rooms": randomInteger(MIN_ROOM_COUNT, MAX_ROOM_COUNT),
      "guests": randomInteger(MIN_GUESTS, MAX_GUESTS),
      "checkin": times[randomInteger(0, times.length - 1)],
      "checkout": times[randomInteger(0, times.length - 1)],
      "features": roomFeatures,
      "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      "photos": roomPhotos,
    },
    "location": {
      "x": randomInteger(X_LOCATION_START, X_LOCATION_END),
      "y": randomInteger(Y_LOCATION_START, Y_LOCATION_END),
    },
  };
};

const renderAdPin = (data) => {
  const CLONED_AD_PIN = PIN_TEMPLATE.cloneNode(true);
  const PIN_AVATAR = CLONED_AD_PIN.querySelector(`img`);

  CLONED_AD_PIN.style.left = data.location.x + CLONED_AD_PIN.offsetWidth / 2 + `px`;
  CLONED_AD_PIN.style.top = data.location.y + CLONED_AD_PIN.offsetHeight + `px`;
  PIN_AVATAR.src = data.author.avatar;
  PIN_AVATAR.alt = data.offer.title;

  return CLONED_AD_PIN;
};

const renderAdCard = (data) => {
  const CLONED_CARD = CARD_TEMPLATE.cloneNode(true);
  const CARD_AVATAR = CLONED_CARD.querySelector(`.popup__avatar`);
  const CARD_TITLE = CLONED_CARD.querySelector(`.popup__title`);
  const CARD_ADDRESS = CLONED_CARD.querySelector(`.popup__text--address`);
  const CARD_PRICE = CLONED_CARD.querySelector(`.popup__text--price`);
  const CARD_TYPE = CLONED_CARD.querySelector(`.popup__type`);
  const CARD_CAPACITY = CLONED_CARD.querySelector(`.popup__text--capacity`);
  const CARD_TIME = CLONED_CARD.querySelector(`.popup__text--time`);
  const CARD_FEATURES = CLONED_CARD.querySelector(`.popup__features`);
  const CARD_FEATURE = CARD_FEATURES.querySelectorAll(`.popup__feature`);
  const CARD_DESCRIPTION = CLONED_CARD.querySelector(`.popup__description`);
  const CARD_PHOTOS = CLONED_CARD.querySelector(`.popup__photos`);
  const CARD_PHOTO = CLONED_CARD.querySelector(`.popup__photo`);

  let roomType = data.offer.type.translate;

  CARD_AVATAR.src = data.author.avatar;
  CARD_TITLE.textContent = data.offer.title;
  CARD_ADDRESS.textContent = data.offer.address;
  CARD_PRICE.textContent = data.offer.price + `₽/ночь`;
  CARD_TYPE.textContent = roomType;
  CARD_CAPACITY.textContent = data.offer.rooms + ` комнаты для ` + data.offer.guests + ` гостей.`;
  CARD_TIME.textContent = `Заезд после ` + data.offer.checkin + `, выезд до ` + data.offer.checkout;

  for (let i = 5; i > data.offer.features.length - 1; i--) {
    CARD_FEATURES.removeChild(CARD_FEATURE[i]);
  }

  CARD_DESCRIPTION.textContent = data.offer.description;
  CARD_PHOTO.src = data.offer.photos[0];

  for (let i = 1; i < data.offer.photos.length; i++) {
    let CLONED_PHOTO = CARD_PHOTO.cloneNode(true);
    CARD_PHOTOS.appendChild(CLONED_PHOTO);
    CLONED_PHOTO.src = data.offer.photos[i];
  }

  return CLONED_CARD;
};

const init = () => {
  for (let i = 1; i <= AD_COUNT; i++) {
    let AdData = generateAdData([i]);
    offersData.push(AdData);
    AD_PINS_CONTAINER.appendChild(renderAdPin(AdData));
  }

  AD_CARDS_CONTAINER.appendChild(renderAdCard(offersData[0]));
  PINS_AREA.appendChild(AD_PINS_CONTAINER);
  MAP.insertBefore(AD_CARDS_CONTAINER, FILTERS_CONTAINER);

  MAP.classList.remove(`map--faded`);
};

init();
