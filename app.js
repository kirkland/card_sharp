mainScale = 1;
translate = [0, 0];

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
  $('#main').css({ transform: 'scale(' + mainScale + ') translate(' + translate[0] + 'px, ' +
    translate[1] + 'px)' });
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

function zoomAndTranslate(directionIn, targetX, targetY) {
  $('#target').remove();
  $('<div id="target" style="left: ' + targetX + 'px; top: ' + targetY + 'px;"></div>').appendTo('body');

  var startingPercentMainToTarget = percentMainToTarget();

  zoom(directionIn);

  var desiredMainToTarget = multiplyArrays(mainDimensions(), startingPercentMainToTarget);
  console.log('desiredMainToTarget', desiredMainToTarget);

  var currentMainToTarget = mainToTarget();

  var addToTranslate = subtractArrays(currentMainToTarget, desiredMainToTarget);
  translate[0] += addToTranslate[0];
  translate[1] += addToTranslate[1];

  console.log('translate', translate);

  updateMainTransform();
}

$(function() {
  $('#main').height($('body').height());
  $('#main').width($('body').width());

  $(document).bind('mousewheel DOMMouseScroll', function(event) {
    event.preventDefault();

    var originalEvent = event.originalEvent;
    console.log(originalEvent);
    zoomAndTranslate(originalEvent.wheelDelta > 0, originalEvent.clientX, originalEvent.clientY);
  });
});
