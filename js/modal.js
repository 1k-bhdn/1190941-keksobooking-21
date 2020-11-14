"use strict";

const SUCCESS_MODAL_TEMPLATE = document.querySelector(`#success`).content.querySelector(`.success`);
const ERROR_MODAL_TEMPLATE = document.querySelector(`#error`).content.querySelector(`.error`);
const PAGE_MAIN = document.querySelector(`main`);
const MODAL_CONTAINER = document.createDocumentFragment();

(() => {
  const CLONED_SUCCESS_MODAL = SUCCESS_MODAL_TEMPLATE.cloneNode(true);
  CLONED_SUCCESS_MODAL.style.display = `none`;
  MODAL_CONTAINER.appendChild(CLONED_SUCCESS_MODAL);

  const CLONED_ERROR_MODAL = ERROR_MODAL_TEMPLATE.cloneNode(true);
  CLONED_ERROR_MODAL.style.display = `none`;
  MODAL_CONTAINER.appendChild(CLONED_ERROR_MODAL);

  PAGE_MAIN.appendChild(MODAL_CONTAINER);
  window.modal = {
    showSuccessModal: () => {
      CLONED_SUCCESS_MODAL.style.display = `block`;

      window.addEventListener(`mousedown`, () => {
        CLONED_SUCCESS_MODAL.style.display = `none`;
      });

      window.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Escape`) {
          CLONED_SUCCESS_MODAL.style.display = `none`;
        }
      });
    },
    showErrorModal: () => {
      CLONED_ERROR_MODAL.style.display = `block`;
      const CLOSE_BUTTON = CLONED_ERROR_MODAL.querySelector(`.error__button`);

      CLOSE_BUTTON.addEventListener(`mousedown`, (evt) => {
        if (evt.button === 0) {
          CLONED_ERROR_MODAL.style.display = `none`;
        }
      });

      window.addEventListener(`mousedown`, () => {
        CLONED_ERROR_MODAL.style.display = `none`;
      });

      window.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Escape`) {
          CLONED_ERROR_MODAL.style.display = `none`;
        }
      });
    },
  };

})();
