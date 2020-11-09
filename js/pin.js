"use strict";

(() => {
  const MAP = document.querySelector(`.map`);
  const MAIN_PIN = document.querySelector(`.map__pin--main`);
  const AD_FORM = document.querySelector(`.ad-form`);
  const AD_FORM_ADDRESS = AD_FORM.querySelector(`#address`);
  const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const MAIN_PIN_AFTER_HEIGHT = 22;

  const mainPinLeftTop = {
    "coordinates": {
      "x": parseInt(MAIN_PIN.style.left, 10),
      "y": parseInt(MAIN_PIN.style.top, 10),
    },
  };

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
    mainPinNotActiveLocation: AD_FORM_ADDRESS.value = Math.round((mainPinLeftTop.coordinates.x + MAIN_PIN.offsetWidth / 2))
      + `, `
      + Math.round((mainPinLeftTop.coordinates.y + MAIN_PIN.offsetHeight / 2)),
    mainPinActiveLocation: Math.round((mainPinLeftTop.coordinates.x + MAIN_PIN.offsetWidth / 2))
      + `, `
      + Math.round((mainPinLeftTop.coordinates.y + MAIN_PIN.offsetHeight + MAIN_PIN_AFTER_HEIGHT)),
  };
})();
