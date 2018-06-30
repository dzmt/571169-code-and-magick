'use strict';

(function () {
  var mockNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var mockSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var mockCoatColors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var mockEyesColors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green',
  ];

  var mockFireballColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  window.mock = {
    coatColors: mockCoatColors,
    eyesColors: mockEyesColors,
    fireballColors: mockFireballColors,
    names: mockNames,
    surnames: mockSurnames
  };
})();
