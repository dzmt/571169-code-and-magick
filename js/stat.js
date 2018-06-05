'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CURVE_OFFSET = 20;
var SHADOW_CLOUD_OFFSET = 10;
var CLOUD_COLOR = 'rgba(255, 255, 255, 1)';
var SHADOW_CLOUD_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_POINT_X = 100;
var CLOUD_POINT_Y = 10;

var MESSAGES = ['Ура вы победили!', 'Список результатов:'];
var TEXT_OFFSET = 30;
var TEXT_COLOR = 'rgb(0, 0, 0)';
var FONT = '16px PT Mono';
var FONT_SIZE = 16;

var WIDTH_COLUMN = 40;
var MAX_HEIGHT_COLUMN = 150;
var GAP_COLUMN = 50;
var START_POINT_Y_RENDER_CHART = CLOUD_POINT_Y + 230;
var COLOR_COLUMN_CURRENT_PLAYER = 'rgba(255, 0, 0, 1)';
var PATTERN_COLOR_OTHER_PLAYER = 'rgba(0, 0, 255, .';

var renderCloud = function (
    ctx,
    cloudColor,
    startPointX,
    startPointY,
    width,
    height
) {
  ctx.fillStyle = cloudColor;

  ctx.beginPath();
  ctx.moveTo(startPointX, startPointY);

  ctx.quadraticCurveTo(
      (width) / 2 + startPointX,
      startPointY + CURVE_OFFSET,
      startPointX + width,
      startPointY
  );

  ctx.quadraticCurveTo(
      (width + startPointX) - CURVE_OFFSET,
      (height / 2) + startPointY,
      startPointX + width,
      startPointY + height
  );

  ctx.quadraticCurveTo(
      (width) / 2 + startPointX,
      height + startPointY - CURVE_OFFSET,
      startPointX,
      startPointY + height
  );

  ctx.quadraticCurveTo(
      startPointX + CURVE_OFFSET,
      height / 2 + startPointY - CURVE_OFFSET,
      startPointX,
      startPointY
  );

  ctx.fill();
};

var renderText = function (ctx, messages, startPointX, startPointY) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = FONT;
  for (var i = 0; i < messages.length; i++) {
    ctx.fillText(messages[i], startPointX, startPointY + FONT_SIZE * i);
  }
};

var indexMaxPlayerTime = function (times) {
  var maxTime = times[0];
  var indexOfMaxTime = 0;
  for (var i = 0; i < times.length; i++) {
    if (maxTime < times[i]) {
      maxTime = times[i];
      indexOfMaxTime = i;
    }
  }
  return indexOfMaxTime;
};

var renderBarChart = function (ctx, names, times) {

  var indexMaxTime = indexMaxPlayerTime(times);

  ctx.font = FONT;

  for (var i = 0; i < times.length; i++) {
    var heightColumn = Math.round(MAX_HEIGHT_COLUMN * times[i] / times[indexMaxTime]);

    var startColumnX = CLOUD_POINT_X + GAP_COLUMN + (GAP_COLUMN + WIDTH_COLUMN) * i;
    var startColumnY = START_POINT_Y_RENDER_CHART - heightColumn;

    if (names[i] === 'Вы') {
      ctx.fillStyle = COLOR_COLUMN_CURRENT_PLAYER;
    } else {
      ctx.fillStyle = PATTERN_COLOR_OTHER_PLAYER + Math.ceil(Math.random() * 10) + ')';
    }
    ctx.fillRect(startColumnX, startColumnY, WIDTH_COLUMN, heightColumn);

    ctx.fillStyle = TEXT_COLOR;
    ctx.font = FONT;
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(Math.round(times[i]), startColumnX, startColumnY - 10);
    ctx.textBaseline = 'hanging';
    ctx.fillText(names[i], startColumnX, START_POINT_Y_RENDER_CHART + 10);
  }

};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      SHADOW_CLOUD_COLOR,
      CLOUD_POINT_X + SHADOW_CLOUD_OFFSET,
      CLOUD_POINT_Y + SHADOW_CLOUD_OFFSET,
      CLOUD_WIDTH,
      CLOUD_HEIGHT
  );

  renderCloud(
      ctx,
      CLOUD_COLOR,
      CLOUD_POINT_X,
      CLOUD_POINT_Y,
      CLOUD_WIDTH,
      CLOUD_HEIGHT
  );

  renderText(
      ctx,
      MESSAGES,
      CLOUD_POINT_X + TEXT_OFFSET,
      CLOUD_POINT_Y + TEXT_OFFSET
  );

  renderBarChart(ctx, names, times);
};
