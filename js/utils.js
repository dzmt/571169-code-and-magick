'use strict';

(function () {

  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  window.utils = {
    getIndexMaxValueFromArray: function (array) {
      var maxValue = array[0];
      var maxValueIndex = 0;
      for (var i = 0; i < array.length; i++) {
        if (maxValue < array[i]) {
          maxValue = array[i];
          maxValueIndex = i;
        }
      }
      return maxValueIndex;
    },

    getRandomValueTo: function (max) {
      var randomValue = Math.ceil(Math.random() * max);
      return randomValue;
    },

    isEscKeyCode: function (keyCode) {
      return ESC_KEY_CODE === keyCode ? true : false;
    },

    isEnterKeyCode: function (keyCode) {
      return ENTER_KEY_CODE === keyCode ? true : false;
    },

    addClass: function (elementSelector, targetClass) {
      var element = document.querySelector(elementSelector);
      element.classList.add(targetClass);
    },

    removeClass: function (elementSelector, targetClass) {
      var element = document.querySelector(elementSelector);
      element.classList.remove(targetClass);
    },

    setStyle: function (element, property, value) {
      element.style[property] = value;
    },

    resetStyle: function (element, property) {
      element.style[property] = '';
    },

    calculateShift: function (startX, startY, endX, endY) {
      var deltaX = endX - startX;
      var deltaY = endY - startY;
      return {
        x: deltaX,
        y: deltaY
      };
    },

    setCoords: function (valueX, valueY) {
      return {
        x: valueX,
        y: valueY
      };
    }
  };
})();
