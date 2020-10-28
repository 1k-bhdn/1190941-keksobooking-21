"use strict";

const MAP = document.querySelector(`.map`);
const MAP_PINS = document.querySelector(`.map__pins`);
const MAP_MAIN_PIN = MAP.querySelector(`.map__pin--main`);
const MAP_FILTERS_CONTAINER = MAP.querySelector(`.map__filters-container`);
const MAP_FILTERS_FORM = MAP.querySelector(`.map__filters`);
const FILTERS_FORM_SELECT = MAP_FILTERS_FORM.querySelectorAll(`select`);
const FILTERS_FORM_FIELDSET = MAP_FILTERS_FORM.querySelectorAll(`fieldset`);
const AD_FORM = document.querySelector(`.ad-form`);
const AD_FORM_FIELDSET = AD_FORM.querySelectorAll(`fieldset`);
const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const CARD_TEMPLATE = document.querySelector(`#card`).content.querySelector(`.map__card`);

const roomTypes = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`,
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

let offersData = [];
let offerData = {};

roomFeatures.length = Math.ceil(Math.random() * 6);
roomPhotos.length = Math.ceil(Math.random() * 3);

const randomInteger = (min, max) => {
  const randomNum = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(randomNum);
};

const mapMode = (display, disabled) => {
  FILTERS_FORM_FIELDSET[0].style.display = display;
  for (let i = 0; i < FILTERS_FORM_SELECT.length; i++) {
    FILTERS_FORM_SELECT[i].style.display = display;
  }

  if (MAP.classList.contains(`map--faded`)) {
    for (let i = 0; i < AD_FORM_FIELDSET.length; i++) {
      AD_FORM_FIELDSET[i].setAttribute(disabled, disabled);
    }
  } else {
    for (let i = 0; i < AD_FORM_FIELDSET.length; i++) {
      AD_FORM_FIELDSET[i].removeAttribute(disabled);
    }
  }
};

MAP_MAIN_PIN.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    MAP.classList.remove(`map--faded`);
    AD_FORM.classList.remove(`ad-form--disabled`);
    mapMode(`block`, `disabled`);
  }
});

MAP_MAIN_PIN.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    MAP.classList.remove(`map--faded`);
    AD_FORM.classList.remove(`ad-form--disabled`);
    mapMode(`block`, `disabled`);
  }
});

const generateOfferData = (i) => {

  offerData = {
    "author": {
      "avatar": `img/avatars/user0` + i + `.png`,
    },
    "offer": {
      "title": `Комната №` + i,
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
  const OFFER_PIN = PIN_TEMPLATE.cloneNode(true);
  const PIN_AVATAR = OFFER_PIN.querySelector(`img`);

  OFFER_PIN.style.left = offerData.location.x + OFFER_PIN.offsetWidth / 2 + `px`;
  OFFER_PIN.style.top = offerData.location.y + OFFER_PIN.offsetHeight + `px`;
  PIN_AVATAR.src = offerData.author.avatar;
  PIN_AVATAR.alt = offerData.offer.title;

  return MAP_PINS.appendChild(OFFER_PIN);
};

const renderCard = () => {
  const CARD = CARD_TEMPLATE.cloneNode(true);
  const CARD_AVATAR = CARD.querySelector(`.popup__avatar`);
  const CARD_TITLE = CARD.querySelector(`.popup__title`);
  const CARD_ADDRESS = CARD.querySelector(`.popup__text--address`);
  const CARD_PRICE = CARD.querySelector(`.popup__text--price`);
  const CARD_TYPE = CARD.querySelector(`.popup__type`);
  const CARD_CAPACITY = CARD.querySelector(`.popup__text--capacity`);
  const CARD_TIME = CARD.querySelector(`.popup__text--time`);
  const CARD_FEATURES = CARD.querySelector(`.popup__features`);
  const CARD_FEATURE = CARD_FEATURES.querySelectorAll(`.popup__feature`);
  const CARD_DESCRIPTION = CARD.querySelector(`.popup__description`);
  const CARD_PHOTOS = CARD.querySelector(`.popup__photos`);
  const CARD_PHOTO = CARD_PHOTOS.querySelector(`.popup__photo`);

  let roomType;

  if (offerData.offer.type === `palace`) {
    roomType = `Дворец`;
  } else if (offerData.offer.type === `flat`) {
    roomType = `Квартира`;
  } else if (offerData.offer.type === `house`) {
    roomType = `Дом`;
  } else if (offerData.offer.type === `bungalow`) {
    roomType = `Бунгало`;
  }

  CARD_AVATAR.src = offerData.author.avatar;
  CARD_TITLE.textContent = offerData.offer.title;
  CARD_ADDRESS.textContent = offerData.offer.address;
  CARD_PRICE.textContent = offerData.offer.price + `₽/ночь`;
  CARD_TYPE.textContent = roomType;
  CARD_CAPACITY.textContent = offerData.offer.rooms + ` комнаты для ` + offerData.offer.guests + ` гостей.`;
  CARD_TIME.textContent = `Заезд после ` + offerData.offer.checkin + `, выезд до ` + offerData.offer.checkout;

  for (let i = 5; i > offerData.offer.features.length - 1; i--) {
    CARD_FEATURES.removeChild(CARD_FEATURE[i]);
  }

  CARD_DESCRIPTION.textContent = offerData.offer.description;
  CARD_PHOTO.src = offerData.offer.photos[0];

  for (let i = 1; i < offerData.offer.photos.length; i++) {
    const CLONED_PHOTO = CARD_PHOTO.cloneNode(true);
    CARD_PHOTOS.appendChild(CLONED_PHOTO);
    CLONED_PHOTO.src = offerData.offer.photos[i];
  }

  return MAP.insertBefore(CARD, MAP_FILTERS_CONTAINER);
};

mapMode(`none`, `disabled`);

for (let i = 1; i <= 8; i++) {
  generateOfferData([i]);
  offersData.push(offerData);
  /* createOfferPin();
  if (i === 1) {
    renderCard();
  }*/
}
