"use strict";

const MAIN_PIN = document.querySelector(`.map__pin--main`);

const init = () => {
  window.pin.togglePinAvailability(false);

  MAIN_PIN.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0) {
      window.map.activateMap();
    }
  }, {once: true});

  MAIN_PIN.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      window.map.activateMap();
    }
  }, {once: true});
};

init();
