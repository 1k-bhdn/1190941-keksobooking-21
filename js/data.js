"use strict";

(() => {
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

  const arrayRandomLength = (array) => {
    return array.slice(0, randomInteger(1, array.length));
  };

  const randomInteger = (min, max) => {
    const randomNum = min - ROUND_UP + Math.random() * (max - min + 1);
    return Math.round(randomNum);
  };

  const collectData = (adCount) => {
    for (let i = 1; i <= adCount; i++) {
      window.data.offersData.push(window.data.generateAdData([i]));
    }
  };

  window.data = {
    generateAdData: (i) => {
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
    },
    offersData: [],
    adCount: 8,
  };

  collectData(window.data.adCount);
})();
