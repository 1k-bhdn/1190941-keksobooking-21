"use strict";

(() => {
  const ROUND_UP = 0.5;

  window.util = {
    hideHtmlElements: (nodeList) => {
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.display = `none`;
      }
    },
    showHtmlElement: (nodeList, i) => {
      window.util.hideHtmlElements(nodeList);
      nodeList[i].style.display = `block`;
    },
    randomInteger: (min, max) => {
      const randomNum = min - ROUND_UP + Math.random() * (max - min + 1);
      return Math.round(randomNum);
    },
    arrayRandomLength: (array) => {
      return array.slice(0, window.util.randomInteger(1, array.length));
    },
  };
})();
