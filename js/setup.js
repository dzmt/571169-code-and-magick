'use strict';

(function () {
  var CLASS_HIDDEN = 'hidden';

  var TOP_CSS_PROPERTY = 'top';
  var LEFT_CSS_PROPERTY = 'left';

  var setup = document.querySelector(window.enum.SELECTOR.SETUP);

  var setupCloseEscPressHandler = function (evt) {
    var inputElement = document.querySelector(window.enum.SELECTOR.SETUP_USER_NAME);
    if (window.utils.isEscKeyCode(evt.keyCode) && evt.target !== inputElement) {
      closeSetup();
    }
  };

  var openSetup = function () {
    setup.classList.remove(CLASS_HIDDEN);
    window.utils.resetStyle(setup, TOP_CSS_PROPERTY);
    window.utils.resetStyle(setup, LEFT_CSS_PROPERTY);
    document.addEventListener(window.enum.EVENT.KEYDOWN, setupCloseEscPressHandler);
  };

  var closeSetup = function () {
    setup.classList.add(CLASS_HIDDEN);
    document.removeEventListener(window.enum.EVENT.KEYDOWN, setupCloseEscPressHandler);
  };

  var setupOpenClickHandler = function () {
    openSetup();
  };

  var setupCloseClickHandler = function () {
    closeSetup();
  };

  var setupOpenEnterDownHandler = function (evt) {
    if (window.utils.isEnterKeyCode(evt.keyCode)) {
      openSetup();
    }
  };

  var setupCloseEnterDownHandler = function (evt) {
    if (window.utils.isEnterKeyCode(evt.keyCode)) {
      closeSetup();
    }
  };

  var setupOpenElement = document.querySelector(window.enum.SELECTOR.SETUP_OPEN);
  setupOpenElement.addEventListener(window.enum.EVENT.CLICK, setupOpenClickHandler);
  setupOpenElement.addEventListener(window.enum.EVENT.KEYDOWN, setupOpenEnterDownHandler);

  var setupCloseElement = document.querySelector(window.enum.SELECTOR.SETUP_CLOSE);
  setupCloseElement.addEventListener(window.enum.EVENT.CLICK, setupCloseClickHandler);
  setupCloseElement.addEventListener(window.enum.EVENT.KEYDOWN, setupCloseEnterDownHandler);
})();
