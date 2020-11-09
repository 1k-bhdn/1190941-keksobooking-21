"use strict";

(() => {
  const CARD_TEMPLATE = document.querySelector(`#card`).content.querySelector(`.map__card`);

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

  window.card = {
    renderAdCard: (data) => {
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
    },
    showModalWhenInteraction: (targets, modals, closeButtons) => {
      for (let i = 0; i < targets.length; i++) {
        targets[i].addEventListener(`mousedown`, () => {
          window.util.showHtmlElement(modals, [i]);
          closeModals(modals, closeButtons, [i]);
        });

        targets[i].addEventListener(`keydown`, (evt) => {
          if (evt.key === `Enter`) {
            window.util.showHtmlElement(modals, [i]);
            closeModals(modals, closeButtons, [i]);
          }
        });
      }
    },
  };
})();
