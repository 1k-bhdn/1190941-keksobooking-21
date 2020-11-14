"use strict";

(() => {
  const MAP = document.querySelector(`.map`);
  const FILTERS_FORM = document.querySelector(`.map__filters`);
  const FILTERS_CONTAINER = MAP.querySelector(`.map__filters-container`);
  const FILTERS_FORM_SELECT = FILTERS_FORM.querySelectorAll(`select`);
  const FILTERS_FORM_FIELDSET = FILTERS_FORM.querySelector(`#housing-features`);
  const PINS_AREA = document.querySelector(`.map__pins`);
  const adCount = 8;
  const AD_PINS_CONTAINER = document.createDocumentFragment();
  const AD_CARDS_CONTAINER = document.createDocumentFragment();

  window.map = {
    toggleFieldsAvailability: (display) => {
      FILTERS_FORM_FIELDSET.style.display = display;

      for (let i = 0; i < FILTERS_FORM_SELECT.length; i++) {
        FILTERS_FORM_SELECT[i].style.display = display;
      }
    },
    activateMap: () => {
      window.pin.togglePinAvailability(true);
      window.server.get(window.map.successHandler, window.map.errorHandler);
      window.form.activateFormValidation();
    },
    errorHandler: (errorMessage) => {
      const node = document.createElement(`div`);
      node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white; padding: 10px;`;
      node.style.position = `absolute`;
      node.style.left = `0`;
      node.style.right = `0`;
      node.style.fontSize = `30px`;

      node.textContent = errorMessage;
      document.body.insertAdjacentElement(`afterbegin`, node);
    },
    successHandler: (offersData) => {
      for (let i = 0; i <= adCount - 1; i++) {
        AD_PINS_CONTAINER.appendChild(window.pin.renderAdPin(offersData[i]));
        AD_CARDS_CONTAINER.appendChild(window.card.renderAdCard(offersData[i]));
      }

      PINS_AREA.appendChild(AD_PINS_CONTAINER);
      MAP.insertBefore(AD_CARDS_CONTAINER, FILTERS_CONTAINER);

      const AD_CARDS = MAP.querySelectorAll(`.map__card`);
      const CARD_CLOSE_BUTTONS = MAP.querySelectorAll(`.popup__close`);
      const PINS = PINS_AREA.querySelectorAll(`.map__pin:not(:first-of-type)`);

      window.util.hideHtmlElements(AD_CARDS);
      window.card.showModalWhenInteraction(PINS, AD_CARDS, CARD_CLOSE_BUTTONS);
    },
  };
})();
