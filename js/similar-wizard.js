'use strict';

(function () {
  var names = window.mock.names;
  var surnames = window.mock.surnames;
  var eyesColors = window.mock.eyesColors;
  var coatColors = window.mock.coatColors;

  var CLASS_HIDDEN = 'hidden';

  var QUANTITY_RANDOM_WIZARD = 4;

  var createWizard = function (name, coatColor, eyesColor) {
    var wizard = {
      name: name,
      coatColor: coatColor,
      eyesColor: eyesColor
    };
    return wizard;
  };

  var createWizards = function (quantity) {
    var wizards = [];
    for (var i = 0; i < quantity; i++) {

      var name = names[window.utils.getRandomValueTo(names.length - 1)];
      var surname = surnames[window.utils.getRandomValueTo(surnames.length - 1)];
      var wizardName = name + ' ' + surname;

      var wizardCoatColor = coatColors[window.utils.getRandomValueTo(coatColors.length - 1)];
      var wizardEyesColor = eyesColors[window.utils.getRandomValueTo(coatColors.length - 1)];

      var wizard = createWizard(wizardName, wizardCoatColor, wizardEyesColor);
      wizards.push(wizard);
    }
    return wizards;
  };

  var getTemplateElement = function (templateTagSelector, elementSelector) {
    var template = document.querySelector(templateTagSelector);
    return template.content.querySelector(elementSelector);
  };

  var fillTemplateWizardData = function (wizards, templateTagSelector, elementSelector) {
    var elements = [];
    var wizardTemplate = getTemplateElement(templateTagSelector, elementSelector);
    for (var i = 0; i < wizards.length; i++) {
      var element = wizardTemplate.cloneNode(true);
      element.querySelector(window.enum.SELECTOR.SETUP_SIMILAR_LABEL).textContent = wizards[i].name;
      element.querySelector(window.enum.SELECTOR.WIZARD_COAT).style.fill = wizards[i].coatColor;
      element.querySelector(window.enum.SELECTOR.WIZARD_EYES).style.fill = wizards[i].eyesColor;
      elements.push(element);
    }
    return elements;
  };

  var addWizardElementsToDocumentFragment = function (elements) {
    var documentFragment = document.createDocumentFragment();
    for (var i = 0; i < elements.length; i++) {
      documentFragment.appendChild(elements[i]);
    }
    return documentFragment;
  };

  var wizards = createWizards(QUANTITY_RANDOM_WIZARD);
  var elements = fillTemplateWizardData(wizards, window.enum.SELECTOR.SIMILAR_WIZARD_TEMPLATE, window.enum.SELECTOR.SETUP_SIMILAR_ITEM);
  var documentFragment = addWizardElementsToDocumentFragment(elements);
  var targetElement = document.querySelector(window.enum.SELECTOR.SETUP_SIMILAR_LIST);
  targetElement.appendChild(documentFragment);
  window.utils.removeClass(window.enum.SELECTOR.SETUP_SIMILAR, CLASS_HIDDEN);
})();
