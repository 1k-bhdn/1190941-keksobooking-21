"use strict";

const AD_COUNT = 8;
const ROUND_UP = 0.5;
const MIN_ROOM_COST = 5000;
const MAX_ROOM_COST = 70000;
const MIN_ROOM_COUNT = 1;
const MAX_ROOM_COUNT = 3;
const MIN_GUESTS = 0;
const MAX_GUESTS = 3;
const X_LOCATION_START = 50;
const X_LOCATION_END = 1150;
const Y_LOCATION_START = 130;
const Y_LOCATION_END = 630;
const MAIN_PIN_AFTER_HEIGHT = 22;
const MAP = document.querySelector(`.map`);
const PINS_AREA = MAP.querySelector(`.map__pins`);
const MAIN_PIN = MAP.querySelector(`.map__pin--main`);
const FILTERS_CONTAINER = MAP.querySelector(`.map__filters-container`);
const FILTERS_FORM = MAP.querySelector(`.map__filters`);
const FILTERS_FORM_SELECT = FILTERS_FORM.querySelectorAll(`select`);
const FILTERS_FORM_FIELDSET = FILTERS_FORM.querySelector(`#housing-features`);
const AD_FORM = document.querySelector(`.ad-form`);
const AD_FORM_TITLE = AD_FORM.querySelector(`#title`);
const TITLE_MIN_LENGTH = AD_FORM_TITLE.getAttribute(`minlength`);
const TITLE_MAX_LENGTH = AD_FORM_TITLE.getAttribute(`maxlength`);
const AD_FORM_ADDRESS = AD_FORM.querySelector(`#address`);
const AD_FORM_ROOM_TYPE = AD_FORM.querySelector(`#type`);
const AD_FORM_ROOM_PRICE = AD_FORM.querySelector(`#price`);
const BUNGALOW_MIN_COST = 0;
const FLAT_MIN_COST = 1000;
const HOUSE_MIN_COST = 5000;
const PALACE_MIN_COST = 10000;
const AD_FORM_TIME = AD_FORM.querySelector(`.ad-form__element--time`);
const TIME_IN = AD_FORM_TIME.querySelector(`#timein`);
const TIME_OUT = AD_FORM_TIME.querySelector(`#timeout`);
const AD_FORM_ROOM_COUNT = AD_FORM.querySelector(`#room_number`);
const AD_FORM_ROOM_CAPACITY = AD_FORM.querySelector(`#capacity`);
const AD_FORM_FIELDSET = AD_FORM.querySelectorAll(`fieldset`);
const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const CARD_TEMPLATE = document.querySelector(`#card`).content.querySelector(`.map__card`);
const AD_PINS_CONTAINER = document.createDocumentFragment();
const AD_CARDS_CONTAINER = document.createDocumentFragment();

const mainPinLeftTop = {
  "coordinates": {
    "x": parseInt(MAIN_PIN.style.left, 10),
    "y": parseInt(MAIN_PIN.style.top, 10),
  },
};

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

const arrayRandomLength = (array) => {
  return array.slice(0, randomInteger(1, array.length));
};

const togglePinAvailability = (isAvailable) => {
  const toggleFieldsAvailability = (display) => {
    FILTERS_FORM_FIELDSET.style.display = display;

    for (let i = 0; i < FILTERS_FORM_SELECT.length; i++) {
      FILTERS_FORM_SELECT[i].style.display = display;
    }

    for (let i = 0; i < AD_FORM_FIELDSET.length; i++) {
      if (isAvailable) {
        AD_FORM_FIELDSET[i].removeAttribute(`disabled`);
      } else {
        AD_FORM_FIELDSET[i].setAttribute(`disabled`, `disabled`);
      }
    }
  };

  if (isAvailable) {
    MAP.classList.remove(`map--faded`);
    AD_FORM.classList.remove(`ad-form--disabled`);

    toggleFieldsAvailability(`block`);
  } else {
    toggleFieldsAvailability(`none`);
  }
};

const randomInteger = (min, max) => {
  const randomNum = min - ROUND_UP + Math.random() * (max - min + 1);
  return Math.round(randomNum);
};

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
      "features": arrayRandomLength(roomFeatures),
      "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      "photos": arrayRandomLength(roomPhotos),
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

const hideHtmlElements = (nodeList) => {
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].style.display = `none`;
  }
};

const showHtmlElement = (nodeList, i) => {
  hideHtmlElements(nodeList);
  nodeList[i].style.display = `block`;
};

const closeModals = (nodeList, closeButtons, [i]) => {
  window.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      nodeList[i].style.display = `none`;
    }
  });

  closeButtons[i].addEventListener(`mousedown`, () => {
    nodeList[i].style.display = `none`;
  });
};

const showModalWhenInteraction = (targets, modals, closeButtons) => {
  for (let i = 0; i < targets.length; i++) {
    targets[i].addEventListener(`mousedown`, () => {
      showHtmlElement(modals, [i]);
      closeModals(modals, closeButtons, [i]);
    });

    targets[i].addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        showHtmlElement(modals, [i]);
        closeModals(modals, closeButtons, [i]);
      }
    });
  }
};

const init = () => {
  for (let i = 1; i <= AD_COUNT; i++) {
    let AdData = generateAdData([i]);
    offersData.push(AdData);
    AD_PINS_CONTAINER.appendChild(renderAdPin(AdData));
    AD_CARDS_CONTAINER.appendChild(renderAdCard(AdData));
  }

  togglePinAvailability(false);
  AD_FORM_ADDRESS.value = Math.round((mainPinLeftTop.coordinates.x + MAIN_PIN.offsetWidth / 2))
    + `, `
    + Math.round((mainPinLeftTop.coordinates.y + MAIN_PIN.offsetHeight / 2));

  const activateMap = () => {
    togglePinAvailability(true);
    PINS_AREA.appendChild(AD_PINS_CONTAINER);
    MAP.insertBefore(AD_CARDS_CONTAINER, FILTERS_CONTAINER);
    AD_FORM_ADDRESS.value = Math.round((mainPinLeftTop.coordinates.x + MAIN_PIN.offsetWidth / 2))
      + `, `
      + Math.round((mainPinLeftTop.coordinates.y + MAIN_PIN.offsetHeight + MAIN_PIN_AFTER_HEIGHT));

    const AD_CARDS = MAP.querySelectorAll(`.map__card`);
    const CARD_CLOSE_BUTTONS = MAP.querySelectorAll(`.popup__close`);
    const PINS = PINS_AREA.querySelectorAll(`.map__pin:not(:first-of-type)`);

    hideHtmlElements(AD_CARDS);
    showModalWhenInteraction(PINS, AD_CARDS, CARD_CLOSE_BUTTONS);

    AD_FORM_ROOM_CAPACITY.addEventListener(`change`, () => {
      let roomCount = AD_FORM_ROOM_COUNT.value;
      let roomCapacity = AD_FORM_ROOM_CAPACITY.value;

      if (roomCount === `1` && roomCapacity !== `1`) {
        AD_FORM_ROOM_CAPACITY.setCustomValidity(`В 1-й комнате может разместиться только 1 гость.`);
      } else if (roomCount === `2` && roomCapacity !== `1` && roomCapacity !== `2`) {
        AD_FORM_ROOM_CAPACITY.setCustomValidity(`2 комнаты предусматривают размещение до 2-х гостей.`);
      } else if (roomCount === `3` && roomCapacity === `0`) {
        AD_FORM_ROOM_CAPACITY.setCustomValidity(`3 комнаты предусмотрены для размещения гостей, пожалуйста укажите количество.`);
      } else if (roomCount === `100` && roomCapacity !== `0`) {
        AD_FORM_ROOM_CAPACITY.setCustomValidity(`100 комнат не для гостей.`);
      } else {
        AD_FORM_ROOM_CAPACITY.setCustomValidity(``);
      }
    });

    AD_FORM_TITLE.addEventListener(`input`, () => {
      let titleLength = AD_FORM_TITLE.value.length;

      if (titleLength < TITLE_MIN_LENGTH) {
        AD_FORM_TITLE.setCustomValidity(`Ещё ` + (TITLE_MIN_LENGTH - titleLength) + ` симв.`);
      } else if (titleLength > TITLE_MAX_LENGTH) {
        AD_FORM_TITLE.setCustomValidity(`Удалите лишние ` + (titleLength - TITLE_MAX_LENGTH) + ` симв.`);
      } else {
        AD_FORM_TITLE.setCustomValidity(``);
      }

      AD_FORM_TITLE.reportValidity();
    });

    AD_FORM_ROOM_TYPE.addEventListener(`change`, () => {
      let roomType = AD_FORM_ROOM_TYPE.value;
      AD_FORM_ROOM_PRICE.value = ``;

      if (roomType === `bungalow`) {
        AD_FORM_ROOM_PRICE.setAttribute(`placeholder`, String(BUNGALOW_MIN_COST));
      } else if (roomType === `flat`) {
        AD_FORM_ROOM_PRICE.setAttribute(`placeholder`, String(FLAT_MIN_COST));
      } else if (roomType === `house`) {
        AD_FORM_ROOM_PRICE.setAttribute(`placeholder`, String(HOUSE_MIN_COST));
      } else if (roomType === `palace`) {
        AD_FORM_ROOM_PRICE.setAttribute(`placeholder`, String(PALACE_MIN_COST));
      }
    });

    AD_FORM_ROOM_PRICE.addEventListener(`input`, () => {
      let roomCost = AD_FORM_ROOM_PRICE.value;
      let roomType = AD_FORM_ROOM_TYPE.value;

      if (roomType === `flat` && roomCost < FLAT_MIN_COST) {
        AD_FORM_ROOM_PRICE.setCustomValidity(`Минимальная цена для размещения в квартире на 1-ну ночь ` + FLAT_MIN_COST + ` руб.`);
      } else if (roomType === `house` && roomCost < HOUSE_MIN_COST) {
        AD_FORM_ROOM_PRICE.setCustomValidity(`Минимальная цена для размещения в доме на 1-ну ночь ` + HOUSE_MIN_COST + ` руб.`);
      } else if (roomType === `palace` && roomCost < PALACE_MIN_COST) {
        AD_FORM_ROOM_PRICE.setCustomValidity(`Минимальная цена для размещения в дворце на 1-ну ночь ` + PALACE_MIN_COST + ` руб.`);
      } else {
        AD_FORM_ROOM_PRICE.setCustomValidity(``);
      }
    });

    TIME_IN.addEventListener(`change`, () => {
      if (TIME_IN.value !== TIME_OUT.value) {
        TIME_OUT.value = TIME_IN.value;
      }
    });

    TIME_OUT.addEventListener(`change`, () => {
      if (TIME_OUT.value !== TIME_IN.value) {
        TIME_IN.value = TIME_OUT.value;
      }
    });
  };

  MAIN_PIN.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0) {
      activateMap();
    }
  });

  MAIN_PIN.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      activateMap();
    }
  });
};

init();
