'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CURVE_OFFSET = 20;
  var SHADOW_CLOUD_OFFSET = 10;
  var CLOUD_COLOR = 'rgba(255, 255, 255, 1)';
  var SHADOW_CLOUD_COLOR = 'rgba(0, 0, 0, 0.7)';
  var CLOUD_POINT_X = 100;
  var CLOUD_POINT_Y = 10;

  var ORIGIN_MESSAGE = 'Ура вы победили!\nСписок результатов:';
  var TEXT_LINES = ORIGIN_MESSAGE.split('\n');
  var TEXT_OFFSET = 30;
  var TEXT_COLOR = 'rgb(0, 0, 0)';
  var FONT = '16px PT Mono';
  var FONT_SIZE = 16;
  var TEXT_BASELINE_ALPHABETIC = 'alphabetic';
  var TEXT_BASELINE_HANGING = 'hanging';

  var WIDTH_COLUMN = 40;
  var MAX_HEIGHT_COLUMN = 150;
  var GAP_COLUMN = 50;
  var START_POINT_Y_RENDER_CHART = CLOUD_POINT_Y + 230;
  var NAME_CURRENT_PLAYER = 'Вы';
  var COLOR_COLUMN_CURRENT_PLAYER = 'rgba(255, 0, 0, 1)';
  var PATTERN_COLOR_OTHER_PLAYER = 'rgba(0, 0, 255, ';

  var DIRECTION_X = [1, 1, 0, 0];
  var DIRECTION_Y = [0, 1, 1, 0];

  var calculateCurvePoints = function (startPointX, startPointY, width, height, curveOffset) {
    var curvePoints = [];
    var x1 = width / 2;
    var y1 = startPointY + curveOffset;
    curvePoints.push([x1, y1]);

    var x2 = width + startPointX - curveOffset;
    var y2 = height / 2;
    curvePoints.push([x2, y2]);

    var x3 = width / 2;
    var y3 = height + startPointY - curveOffset;
    curvePoints.push([x3, y3]);

    var x4 = startPointX + curveOffset;
    var y4 = height / 2;
    curvePoints.push([x4, y4]);

    return curvePoints;
  };

  var renderCloud = function (ctx, cloudColor, startPointX, startPointY, width, height) {
    var curvePoints = calculateCurvePoints(startPointX, startPointY, width, height, CURVE_OFFSET);
    ctx.fillStyle = cloudColor;

    ctx.beginPath();
    ctx.moveTo(startPointX, startPointY);

    for (var i = 0; i < DIRECTION_X.length; i++) {
      var x = startPointX + width * DIRECTION_X[i];
      var y = startPointY + height * DIRECTION_Y[i];
      var curveX = curvePoints[i][0];
      var curveY = curvePoints[i][1];
      ctx.quadraticCurveTo(curveX, curveY, x, y);
    }

    ctx.fill();
  };

  var renderText = function (ctx, messages, startPointX, startPointY) {
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = FONT;
    ctx.textBaseline = TEXT_BASELINE_ALPHABETIC;
    for (var i = 0; i < messages.length; i++) {
      var x = startPointX;
      var y = startPointY + FONT_SIZE * i;
      ctx.fillText(messages[i], x, y);
    }
  };

  var renderBarChart = function (ctx, names, times) {

    var maxTimeIndex = window.utils.getIndexMaxValueFromArray(times);

    ctx.font = FONT;

    for (var i = 0; i < times.length; i++) {
      var heightColumn = Math.round(MAX_HEIGHT_COLUMN * times[i] / times[maxTimeIndex]);

      var startColumnX = CLOUD_POINT_X + GAP_COLUMN + (GAP_COLUMN + WIDTH_COLUMN) * i;
      var startColumnY = START_POINT_Y_RENDER_CHART - heightColumn;

      if (names[i] === NAME_CURRENT_PLAYER) {
        ctx.fillStyle = COLOR_COLUMN_CURRENT_PLAYER;
      } else {
        var transparency = window.utils.getRandomValueTo(10) / 10;
        ctx.fillStyle = PATTERN_COLOR_OTHER_PLAYER + transparency + ')';
      }
      ctx.fillRect(startColumnX, startColumnY, WIDTH_COLUMN, heightColumn);

      ctx.fillStyle = TEXT_COLOR;
      ctx.font = FONT;
      ctx.textBaseline = TEXT_BASELINE_ALPHABETIC;
      ctx.fillText(Math.round(times[i]), startColumnX, startColumnY - 10);
      ctx.textBaseline = TEXT_BASELINE_HANGING;
      ctx.fillText(names[i], startColumnX, START_POINT_Y_RENDER_CHART + 10);
    }

  };

  window.renderStatistics = function (ctx, names, times) {
    var shadowStartX = CLOUD_POINT_X + SHADOW_CLOUD_OFFSET;
    var shadowStartY = CLOUD_POINT_Y + SHADOW_CLOUD_OFFSET;

    renderCloud(ctx, SHADOW_CLOUD_COLOR, shadowStartX, shadowStartY, CLOUD_WIDTH, CLOUD_HEIGHT);
    renderCloud(ctx, CLOUD_COLOR, CLOUD_POINT_X, CLOUD_POINT_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
    renderText(ctx, TEXT_LINES, CLOUD_POINT_X + TEXT_OFFSET, CLOUD_POINT_Y + TEXT_OFFSET);
    renderBarChart(ctx, names, times);
  };
})();

