"use strict";

(() => {
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  window.server = {
    get: (onSuccess, onError) => {
      const GET_URL = `https://21.javascript.pages.academy/keksobooking/data`;
      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, () => {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
        }
      });

      xhr.open(`GET`, GET_URL);
      xhr.send();

      xhr.addEventListener(`error`, function () {
        onError(`Произошла ошибка соединения`);
      });
      xhr.addEventListener(`timeout`, function () {
        onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
      });

      xhr.timeout = TIMEOUT_IN_MS;
    },
    post: (data, onSuccess, onError) => {
      const POST_URL = `https://21.javascript.pages.academy/keksobooking`;
      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, () => {
        onSuccess(xhr.response);
      });

      xhr.addEventListener(`error`, () => {
        onError(`Не удалось отправить данные`);
        window.modal.showErrorModal();
      });

      xhr.open(`POST`, POST_URL);
      xhr.send(data);
    },
  };
})();
