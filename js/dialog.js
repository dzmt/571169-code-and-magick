'use strict';

(function () {
  var TOP_CSS_PROPERTY = 'top';
  var LEFT_CSS_PROPERTY = 'left';

  var dialog = document.querySelector(window.enum.SELECTOR.SETUP);
  var dialogHandler = document.querySelector(window.enum.SELECTOR.SETUP_DIALOG_HANDLER);

  var dialogHandlerMousedownHandler = function (mousedownEvt) {
    var dragged = false;

    var startCoords = window.utils.setCoords(mousedownEvt.clientX, mousedownEvt.clientY);

    var documentMousemoveHandler = function (moveEvt) {
      dragged = true;
      var shift = window.utils.calculateShift(startCoords.x, startCoords.y, moveEvt.clientX, moveEvt.clientY);

      startCoords = window.utils.setCoords(moveEvt.clientX, moveEvt.clientY);

      var offsetTop = dialog.offsetTop + shift.y;
      var offsetLeft = dialog.offsetLeft + shift.x;

      window.utils.setStyle(dialog, TOP_CSS_PROPERTY, offsetTop + 'px');
      window.utils.setStyle(dialog, LEFT_CSS_PROPERTY, offsetLeft + 'px');
    };

    var documentMouseupHandler = function () {
      document.removeEventListener(window.enum.EVENT.MOUSEMOVE, documentMousemoveHandler);
      document.removeEventListener(window.enum.EVENT.MOUSEUP, documentMouseupHandler);

      if (dragged) {
        var dialogHandlerClickPreventDefualt = function (clickEvent) {
          clickEvent.preventDefault();
          dialogHandler.removeEventListener(window.enum.EVENT.CLICK, dialogHandlerClickPreventDefualt);
        };
        dialogHandler.addEventListener(window.enum.EVENT.CLICK, dialogHandlerClickPreventDefualt);
      }
    };

    document.addEventListener(window.enum.EVENT.MOUSEMOVE, documentMousemoveHandler);
    document.addEventListener(window.enum.EVENT.MOUSEUP, documentMouseupHandler);
  };

  dialogHandler.addEventListener(window.enum.EVENT.MOUSEDOWN, dialogHandlerMousedownHandler);
})();

