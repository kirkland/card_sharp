mainScale = 1;
position = [0, 0];

function subtractArrays(firstArray, secondArray) {
  var i = 0;
  var rv = []

  for ( i = 0; i < firstArray.length; i++ ) {
    rv.push(firstArray[i] - secondArray[i]);
  }

  return rv;
}

function divideArrays(firstArray, secondArray) {
  var i = 0;
  var rv = []

  for ( i = 0; i < firstArray.length; i++ ) {
    rv.push(firstArray[i] / secondArray[i]);
  }

  return rv;
}

function multiplyArrays(firstArray, secondArray) {
  var i = 0;
  var rv = []

  for ( i = 0; i < firstArray.length; i++ ) {
    rv.push(firstArray[i] * secondArray[i]);
  }

  return rv;
}

function updateMainTransform() {
  $('#main').css({ transform: 'scale(' + mainScale + ')', left: position[0] + 'px', top: position[1] + 'px' });
}

function setMainScale(newMainScale) {
  mainScale = newMainScale;
  updateMainTransform();
}

function zoom(directionIn) {
  if ( directionIn ) {
    setMainScale(mainScale * 1.05);
  } else {
    setMainScale(mainScale * 0.95);
  }
}

function mainDimensions() {
  return [$('#main').width() * mainScale, $('#main').height() * mainScale];
}

function mainPosition() {
  return [$('#main').position().left, $('#main').position().top];
}

function targetPosition() {
  return [$('#target').position().left, $('#target').position().top];
}

function mainToTarget() {
  return subtractArrays(targetPosition(), mainPosition());
}

function percentMainToTarget() {
  return divideArrays(mainToTarget(), mainDimensions());
}

function zoomAndPosition(directionIn, targetX, targetY) {
  $('#target').remove();
  $('<div id="target" style="left: ' + targetX + 'px; top: ' + targetY + 'px;"></div>').appendTo('body');

  var startingPercentMainToTarget = percentMainToTarget();
  console.log('startingPercentMainToTarget', startingPercentMainToTarget);

  zoom(directionIn);

  var desiredMainToTarget = multiplyArrays(mainDimensions(), startingPercentMainToTarget);
  var currentMainToTarget = mainToTarget();

  var addToPosition = subtractArrays(currentMainToTarget, desiredMainToTarget);
  position[0] += addToPosition[0];
  position[1] += addToPosition[1];

  updateMainTransform();

  console.log('desiredMainToTarget', desiredMainToTarget);
  console.log('currentMainToTarget', mainToTarget());
}

$(function() {
  $('#main').height($('body').height());
  $('#main').width($('body').width());

  $(document).bind('mousewheel DOMMouseScroll', function(event) {
    event.preventDefault();

    var originalEvent = event.originalEvent;
    zoomAndPosition(originalEvent.wheelDelta > 0, originalEvent.clientX, originalEvent.clientY);
  });
});
