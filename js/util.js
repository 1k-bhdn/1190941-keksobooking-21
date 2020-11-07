"use strict";

(() => {
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
  };
})();
