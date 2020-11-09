"use strict";

(() => {
  const BUNGALOW_MIN_COST = 0;
  const FLAT_MIN_COST = 1000;
  const HOUSE_MIN_COST = 5000;
  const PALACE_MIN_COST = 10000;
  const AD_FORM = document.querySelector(`.ad-form`);
  const AD_FORM_FIELDSET = AD_FORM.querySelectorAll(`fieldset`);
  const AD_FORM_TITLE = AD_FORM.querySelector(`#title`);
  const TITLE_MIN_LENGTH = AD_FORM_TITLE.getAttribute(`minlength`);
  const TITLE_MAX_LENGTH = AD_FORM_TITLE.getAttribute(`maxlength`);
  const AD_FORM_ADDRESS = AD_FORM.querySelector(`#address`);
  const AD_FORM_ROOM_TYPE = AD_FORM.querySelector(`#type`);
  const AD_FORM_ROOM_PRICE = AD_FORM.querySelector(`#price`);
  const AD_FORM_TIME = AD_FORM.querySelector(`.ad-form__element--time`);
  const TIME_IN = AD_FORM_TIME.querySelector(`#timein`);
  const TIME_OUT = AD_FORM_TIME.querySelector(`#timeout`);
  const AD_FORM_ROOM_COUNT = AD_FORM.querySelector(`#room_number`);
  const AD_FORM_ROOM_CAPACITY = AD_FORM.querySelector(`#capacity`);

  window.form = {
    toggleFieldsAvailability: (isAvailable) => {
      for (let i = 0; i < AD_FORM_FIELDSET.length; i++) {
        if (isAvailable) {
          AD_FORM_FIELDSET[i].removeAttribute(`disabled`);
          AD_FORM_ADDRESS.value = window.pin.mainPinActiveLocation;
        } else {
          AD_FORM_FIELDSET[i].setAttribute(`disabled`, `disabled`);
          AD_FORM_ADDRESS.value = window.pin.mainPinNotActiveLocation;
        }
      }
    },
    activateFormValidation: () => {
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
    },
  };
})();
