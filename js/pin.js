"use strict";

(() => {
  const MAP = document.querySelector(`.map`);
  const MAIN_PIN = document.querySelector(`.map__pin--main`);
  const AD_FORM = document.querySelector(`.ad-form`);
  const AD_FORM_ADDRESS = AD_FORM.querySelector(`#address`);
  const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const MAIN_PIN_AFTER_HEIGHT = 22;
  const X_LOCATION_START = 0 - MAIN_PIN.offsetWidth / 2;
  const X_LOCATION_END = 1200 - MAIN_PIN.offsetWidth / 2;
  const Y_LOCATION_START = 130 - (MAIN_PIN.offsetHeight + MAIN_PIN_AFTER_HEIGHT);
  const Y_LOCATION_END = 630 - (MAIN_PIN.offsetHeight + MAIN_PIN_AFTER_HEIGHT);

  const mainPinLeftTop = {
    "coordinates": {
      "x": parseInt(MAIN_PIN.style.left, 10),
      "y": parseInt(MAIN_PIN.style.top, 10),
    },
  };

  const calcCoords = () => {
    let xCoordinate = parseInt(MAIN_PIN.style.left, 10);
    let yCoordinate = parseInt(MAIN_PIN.style.top, 10);

    let mainPinCoordsX = Math.round((xCoordinate + MAIN_PIN.offsetWidth / 2));
    let mainPinCoordsY = Math.round((yCoordinate + MAIN_PIN.offsetHeight + MAIN_PIN_AFTER_HEIGHT));

    AD_FORM_ADDRESS.value = mainPinCoordsX + `, ` + mainPinCoordsY;
  };

  const interactionMainPin = () => {
    MAIN_PIN.addEventListener(`mousedown`, (evt) => {
      evt.preventDefault();

      if (evt.button === 0) {
        if (MAP.classList.contains(`map--faded`)) {
          window.map.activateMap();
        }

        calcCoords();

        let startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        let onMouseMove = (moveEvt) => {
          moveEvt.preventDefault();

          let shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          MAIN_PIN.style.top = (MAIN_PIN.offsetTop - shift.y) + `px`;
          MAIN_PIN.style.left = (MAIN_PIN.offsetLeft - shift.x) + `px`;

          mainPinLeftTop.coordinates.x = parseInt(MAIN_PIN.style.left, 10);
          mainPinLeftTop.coordinates.y = parseInt(MAIN_PIN.style.top, 10);

          if (mainPinLeftTop.coordinates.y < Y_LOCATION_START) {
            MAIN_PIN.style.top = Y_LOCATION_START + `px`;
          } else if (mainPinLeftTop.coordinates.y > Y_LOCATION_END) {
            MAIN_PIN.style.top = Y_LOCATION_END + `px`;
          }

          if (mainPinLeftTop.coordinates.x < X_LOCATION_START) {
            MAIN_PIN.style.left = X_LOCATION_START + `px`;
          } else if (mainPinLeftTop.coordinates.x > X_LOCATION_END) {
            MAIN_PIN.style.left = X_LOCATION_END + `px`;
          }

          calcCoords();
        };

        let onMouseUp = (upEvt) => {
          upEvt.preventDefault();

          document.removeEventListener(`mousemove`, onMouseMove);
          document.removeEventListener(`mouseup`, onMouseUp);
        };

        document.addEventListener(`mousemove`, onMouseMove);
        document.addEventListener(`mouseup`, onMouseUp);
      }
    });

    MAIN_PIN.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        if (MAP.classList.contains(`map--faded`)) {
          window.map.activateMap();
        }
      }
    });
  };

  interactionMainPin();

  window.pin = {
    renderAdPin: (data) => {
      const CLONED_AD_PIN = PIN_TEMPLATE.cloneNode(true);
      const PIN_AVATAR = CLONED_AD_PIN.querySelector(`img`);

      CLONED_AD_PIN.style.left = data.location.x + CLONED_AD_PIN.offsetWidth / 2 + `px`;
      CLONED_AD_PIN.style.top = data.location.y + CLONED_AD_PIN.offsetHeight + `px`;
      PIN_AVATAR.src = data.author.avatar;
      PIN_AVATAR.alt = data.offer.title;

      return CLONED_AD_PIN;
    },
    togglePinAvailability: (isAvailable) => {
      if (isAvailable) {
        MAP.classList.remove(`map--faded`);
        AD_FORM.classList.remove(`ad-form--disabled`);

        window.map.toggleFieldsAvailability(`block`);
        window.form.toggleFieldsAvailability(true);
      } else {
        window.map.toggleFieldsAvailability(`none`);
        window.form.toggleFieldsAvailability(false);
      }
    },
    setMainPinStartLocation: () => {
      MAIN_PIN.style.left = 570 + `px`;
      MAIN_PIN.style.top = 375 + `px`;

      calcCoords();
    },
    mainPinNotActiveLocation: AD_FORM_ADDRESS.value = Math.round((mainPinLeftTop.coordinates.x + MAIN_PIN.offsetWidth / 2))
      + `, `
      + Math.round((mainPinLeftTop.coordinates.y + MAIN_PIN.offsetHeight / 2)),
    mainPinActiveLocation: Math.round((mainPinLeftTop.coordinates.x + MAIN_PIN.offsetWidth / 2))
      + `, `
      + Math.round((mainPinLeftTop.coordinates.y + MAIN_PIN.offsetHeight + MAIN_PIN_AFTER_HEIGHT)),
  };
})();
