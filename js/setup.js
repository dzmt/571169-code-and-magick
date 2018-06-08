'use strict';

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

var QUANTITY_RANDOM_WIZARD = 4;

var getRandomNumberExcluding = function (max) {
  var randomValue = Math.floor(Math.random() * max);
  return randomValue;
};

var createWizards = function (quantity) {
  var wizards = [];
  for (var i = 0; i < quantity; i++) {
    var name = names[getRandomNumberExcluding(names.length)];
    var surname = surnames[getRandomNumberExcluding(surnames.length)];
    var wizardName = name + ' ' + surname;
    var wizardCoatColor = coatColors[getRandomNumberExcluding(coatColors.length)];
    var wizardEyesColor = eyesColors[getRandomNumberExcluding(coatColors.length)];

    var wizard = {
      name: wizardName,
      coatColor: wizardCoatColor,
      eyesColor: wizardEyesColor
    };
    wizards.push(wizard);
  }
  return wizards;
};

var removeClass = function (selector, targetClassName) {
  var element = document.querySelector(selector);
  element.classList.remove(targetClassName);
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
    element.querySelector('.setup-similar-label').textContent = wizards[i].name;
    element.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
    element.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
    elements.push(element);
  }
  return elements;
};

var addWizardElementsToDocumentFragment = function (elements) {
  var documnetFragment = document.createDocumentFragment();
  for (var i = 0; i < elements.length; i++) {
    documnetFragment.appendChild(elements[i]);
  }
  return documnetFragment;
};


removeClass('.setup', 'hidden');
var wizards = createWizards(QUANTITY_RANDOM_WIZARD);

var elements = fillTemplateWizardData(wizards, '#similar-wizard-template', '.setup-similar-item');
var documentFragment = addWizardElementsToDocumentFragment(elements);
var targetElement = document.querySelector('.setup-similar-list');
targetElement.appendChild(documentFragment);
removeClass('.setup-similar', 'hidden');
