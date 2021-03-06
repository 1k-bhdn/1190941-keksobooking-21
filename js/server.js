"use strict";

(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  window.server = {
    get: (onSuccess, onError) => {
      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, () => {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
        }
      });

      xhr.open(`GET`, URL);
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
      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, () => {
        onSuccess(xhr.response);
      });

      xhr.addEventListener(`error`, function () {
        onError(`Произошла ошибка, данные не отправились`);
      });

      xhr.open(`POST`, URL);
      xhr.send(data);
    },
  };
})();
