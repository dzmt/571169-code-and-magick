'use strict';

(function () {
  var coatColors = window.mock.coatColors;
  var fireballColors = window.mock.fireballColors;
  var eyesColors = window.mock.eyesColors;

  var INLINE_PROPERTY_FILL = 'fill';
  var INLINE_PROPERTY_BACKGROUND_COLOR = 'backgroundColor';

  var TAG_NAME_USE = 'use';

  var INPUT_NAME_COAT_COLOR = 'coat-color';
  var INPUT_NAME_EYES_COLOR = 'eyes-color';
  var INPUT_NAME_FIREBALL_COLOR = 'fireball-color';

  var setColor = function (element, colors, inputName) {
    var color = colors[window.utils.getRandomValueTo(colors.length - 1)];
    if (element.tagName === TAG_NAME_USE) {
      window.utils.setStyle(element, INLINE_PROPERTY_FILL, color);
    } else {
      window.utils.setStyle(element, INLINE_PROPERTY_BACKGROUND_COLOR, color);
    }
    var inputSelector = 'input[name="' + inputName + '"]';
    var inputHidden = document.querySelector(inputSelector);
    inputHidden.value = color;
  };

  var wizardCoat = document.querySelector(window.enum.SELECTOR.WIZARD_COAT);
  var wizardEyes = document.querySelector(window.enum.SELECTOR.WIZARD_EYES);
  var fireball = document.querySelector(window.enum.SELECTOR.SETUP_FIREBALL_WRAP);

  var wizardCoatClickHandler = function () {
    setColor(wizardCoat, coatColors, INPUT_NAME_COAT_COLOR);
  };

  var wizardEyesClickHandler = function () {
    setColor(wizardEyes, eyesColors, INPUT_NAME_EYES_COLOR);
  };

  var fireballClickHandler = function () {
    setColor(fireball, fireballColors, INPUT_NAME_FIREBALL_COLOR);
  };

  wizardCoat.addEventListener(window.enum.EVENT.CLICK, wizardCoatClickHandler);
  wizardEyes.addEventListener(window.enum.EVENT.CLICK, wizardEyesClickHandler);
  fireball.addEventListener(window.enum.EVENT.CLICK, fireballClickHandler);
})();