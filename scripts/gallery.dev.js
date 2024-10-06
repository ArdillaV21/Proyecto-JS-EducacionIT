"use strict";

var galleries = document.querySelectorAll(".gallery-container"); //Funciones

var getActiveItem = function getActiveItem(array, type) {
  var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "active";
  var nextItem;

  for (var i = 0; i < array.length; i++) {
    if (array[i].classList.contains(className)) {
      array[i].classList.remove(className);

      switch (type) {
        case "prev":
          nextItem = i > 0 ? array[i - 1] : array[array.length - 1];
          break;

        case "next":
          nextItem = i < array.length - 1 ? array[i + 1] : array[0];
          break;

        default:
          nextItem = array[type];
      }
    }
  }

  nextItem.classList.add(className);
};

var setActiveItem = function setActiveItem(array) {};