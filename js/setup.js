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

var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var QUANTITY_RANDOM_WIZARD = 4;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var TOP_CSS_PROPERTY = 'top';
var LEFT_CSS_PROPERTY = 'left';

var getRandomNumberExcluding = function (max) {
  var randomValue = Math.floor(Math.random() * max);
  return randomValue;
};

var resetStyle = function (element, property) {
  element.style[property] = '';
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

var removeClass = function (elementClassName, targetClass) {
  var selector = '.' + elementClassName;
  var element = document.querySelector(selector);
  element.classList.remove(targetClass);
};

var addClass = function (elementClassName, targetClass) {
  var selector = '.' + elementClassName;
  var element = document.querySelector(selector);
  element.classList.add(targetClass);
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

var wizards = createWizards(QUANTITY_RANDOM_WIZARD);
var elements = fillTemplateWizardData(wizards, '#similar-wizard-template', '.setup-similar-item');
var documentFragment = addWizardElementsToDocumentFragment(elements);
var targetElement = document.querySelector('.setup-similar-list');
targetElement.appendChild(documentFragment);
removeClass('setup-similar', 'hidden');

// add event handlers
var setupCloseEscPressHandler = function (evt) {
  var inpupElement = document.querySelector('.setup-user-name');
  if (evt.keyCode === ESC_KEYCODE && evt.target !== inpupElement) {
    closeSetup();
  }
};

var openSetup = function () {
  var setup = document.querySelector('.setup');
  setup.classList.remove('hidden');
  resetStyle(setup, TOP_CSS_PROPERTY);
  resetStyle(setup, LEFT_CSS_PROPERTY);
  document.addEventListener('keydown', setupCloseEscPressHandler);
};

var closeSetup = function () {
  addClass('setup', 'hidden');
  document.removeEventListener('keydown', setupCloseEscPressHandler);
};

var setupOpenClickHandler = function () {
  openSetup();
};

var setupCloseClickHandler = function () {
  closeSetup();
};

var setupOpenEnterDownHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
};

var setupCloseEnterDownHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetup();
  }
};

var setupOpenElement = document.querySelector('.setup-open');
setupOpenElement.addEventListener('click', setupOpenClickHandler);
setupOpenElement.addEventListener('keydown', setupOpenEnterDownHandler);

var setupCloseElement = document.querySelector('.setup-close');
setupCloseElement.addEventListener('click', setupCloseClickHandler);
setupCloseElement.addEventListener('keydown', setupCloseEnterDownHandler);


// wizard setup event
var setColor = function (element, colors, inputName) {
  var color = colors[getRandomNumberExcluding(colors.length)];
  if (element.tagName === 'use') {
    element.style.fill = color;
  } else {
    element.style.backgroundColor = color;
  }
  var inputSelector = 'input[name="' + inputName + '"]';
  var inputHidden = document.querySelector(inputSelector);
  inputHidden.value = color;
};

var wizardCoat = document.querySelector('.wizard-coat');
wizardCoat.addEventListener('click', function () {
  setColor(wizardCoat, coatColors, 'coat-color');
});

var wizardEyes = document.querySelector('.wizard-eyes');
wizardEyes.addEventListener('click', function () {
  setColor(wizardEyes, eyesColors, 'eyes-color');
});

var fireball = document.querySelector('.setup-fireball-wrap');
fireball.addEventListener('click', function () {
  setColor(fireball, fireballColors, 'fireball-color');
});
