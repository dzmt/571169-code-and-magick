'use strict';

var SELECTOR_DIALOG_HANDLER = '.upload';
var SELECTOR_SETUP = '.setup';

var TOP_CSS_PROPERTY = 'top';
var LEFT_CSS_PROPERTY = 'left';

var dialog = document.querySelector(SELECTOR_SETUP);
var dialogHandler = document.querySelector(SELECTOR_DIALOG_HANDLER);

var calculateShift = function (startX, startY, endX, endY) {
  var deltaX = endX - startX;
  var deltaY = endY - startY;
  return {
    x: deltaX,
    y: deltaY
  };
};

var setCoords = function (valueX, valueY) {
  return {
    x: valueX,
    y: valueY
  };
};

var setStyle = function (element, property, style) {
  element.style[property] = style;
};

var dialogHandlerMousedownHandler = function (mousedownEvt) {
  var dragged = false;

  var startCoords = setCoords(mousedownEvt.clientX, mousedownEvt.clientY);

  var documentMousemoveHandler = function (moveEvt) {
    dragged = true;
    var shift = calculateShift(startCoords.x, startCoords.y, moveEvt.clientX, moveEvt.clientY);

    startCoords = setCoords(moveEvt.clientX, moveEvt.clientY);

    var offsetTop = dialog.offsetTop + shift.y;
    var offsetLeft = dialog.offsetLeft + shift.x;

    setStyle(dialog, TOP_CSS_PROPERTY, offsetTop + 'px');
    setStyle(dialog, LEFT_CSS_PROPERTY, offsetLeft + 'px');
  };

  var documentMouseupHandler = function () {
    document.removeEventListener('mousemove', documentMousemoveHandler);
    document.removeEventListener('mouseup', documentMouseupHandler);

    if (dragged) {
      var dialogHandlerClickPreventDefualt = function (clickEvent) {
        clickEvent.preventDefault();
        dialogHandler.removeEventListener('click', dialogHandlerClickPreventDefualt);
      };
      dialogHandler.addEventListener('click', dialogHandlerClickPreventDefualt);
    }
  };

  document.addEventListener('mousemove', documentMousemoveHandler);
  document.addEventListener('mouseup', documentMouseupHandler);
};

dialogHandler.addEventListener('mousedown', dialogHandlerMousedownHandler);
