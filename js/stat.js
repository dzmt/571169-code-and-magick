'use strict';

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

var WIDTH_COLUMN = 40;
var MAX_HEIGHT_COLUMN = 150;
var GAP_COLUMN = 50;
var START_POINT_Y_RENDER_CHART = CLOUD_POINT_Y + 230;
var COLOR_COLUMN_CURRENT_PLAYER = 'rgba(255, 0, 0, 1)';
var PATTERN_COLOR_OTHER_PLAYER = 'rgba(0, 0, 255, .';

var renderCloud = function (ctx, cloudColor, startPointX, startPointY, width, height) {
  var DIRECTION_X = [1, 1, 0, 0];
  var DIRECTION_Y = [0, 1, 1, 0];

  var CURVE_POINTS = [
    [width / 2, startPointY + CURVE_OFFSET],
    [width + startPointX - CURVE_OFFSET, height / 2],
    [width / 2, height + startPointY - CURVE_OFFSET],
    [startPointX + CURVE_OFFSET, height / 2]
  ];

  ctx.fillStyle = cloudColor;

  ctx.beginPath();
  ctx.moveTo(startPointX, startPointY);

  var x;
  var y;
  var curveX;
  var curveY;
  for (var i = 0; i < DIRECTION_X.length; i++) {
    x = startPointX + width * DIRECTION_X[i];
    y = startPointY + height * DIRECTION_Y[i];
    curveX = CURVE_POINTS[i][0];
    curveY = CURVE_POINTS[i][1];
    ctx.quadraticCurveTo(curveX, curveY, x, y);
  }

  ctx.fill();
};

var renderText = function (ctx, messages, startPointX, startPointY) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = FONT;
  ctx.textBaseline = 'alphabetic';
  for (var i = 0; i < messages.length; i++) {
    var x = startPointX;
    var y = startPointY + FONT_SIZE * i;
    ctx.fillText(messages[i], x, y);
  }
};

var getIndexMaxValueFromArray = function (times) {
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

  var indexMaxTime = getIndexMaxValueFromArray(times);

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
  var shadowStartX = CLOUD_POINT_X + SHADOW_CLOUD_OFFSET;
  var shadowStartY = CLOUD_POINT_Y + SHADOW_CLOUD_OFFSET;

  renderCloud(ctx, SHADOW_CLOUD_COLOR, shadowStartX, shadowStartY, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderCloud(ctx, CLOUD_COLOR, CLOUD_POINT_X, CLOUD_POINT_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderText(ctx, TEXT_LINES, CLOUD_POINT_X + TEXT_OFFSET, CLOUD_POINT_Y + TEXT_OFFSET);
  renderBarChart(ctx, names, times);
};
