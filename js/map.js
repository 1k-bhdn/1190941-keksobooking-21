"use strict";

(() => {
  const MAP = document.querySelector(`.map`);
  const FILTERS_FORM = document.querySelector(`.map__filters`);
  const FILTERS_CONTAINER = MAP.querySelector(`.map__filters-container`);
  const FILTERS_FORM_SELECT = FILTERS_FORM.querySelectorAll(`select`);
  const FILTERS_FORM_FIELDSET = FILTERS_FORM.querySelector(`#housing-features`);
  const PINS_AREA = document.querySelector(`.map__pins`);
  const AD_PINS_CONTAINER = document.createDocumentFragment();
  const AD_CARDS_CONTAINER = document.createDocumentFragment();
  const adCount = window.data.adCount;
  const offersData = window.data.offersData;

  for (let i = 0; i <= adCount - 1; i++) {
    AD_PINS_CONTAINER.appendChild(window.pin.renderAdPin(offersData[i]));
    AD_CARDS_CONTAINER.appendChild(window.card.renderAdCard(offersData[i]));
  }

  window.map = {
    toggleFieldsAvailability: (display) => {
      FILTERS_FORM_FIELDSET.style.display = display;

      for (let i = 0; i < FILTERS_FORM_SELECT.length; i++) {
        FILTERS_FORM_SELECT[i].style.display = display;
      }
    },
    activateMap: () => {
      window.pin.togglePinAvailability(true);
      PINS_AREA.appendChild(AD_PINS_CONTAINER);
      MAP.insertBefore(AD_CARDS_CONTAINER, FILTERS_CONTAINER);
      window.form.activateFormValidation();

      const AD_CARDS = MAP.querySelectorAll(`.map__card`);
      const CARD_CLOSE_BUTTONS = MAP.querySelectorAll(`.popup__close`);
      const PINS = PINS_AREA.querySelectorAll(`.map__pin:not(:first-of-type)`);

      window.util.hideHtmlElements(AD_CARDS);
      window.card.showModalWhenInteraction(PINS, AD_CARDS, CARD_CLOSE_BUTTONS);
    },
  };
})();
