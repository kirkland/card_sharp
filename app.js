bodyScale = 1;
translateX = 0;
translateY = 0;

function updateBodyTransform() {
  $('body').css({ transform: 'scale(' + bodyScale + ') translate(' + translateX + 'px, ' +
    translateY + 'px)' });
}

function setBodyScale(newBodyScale) {
  bodyScale = newBodyScale;
  updateBodyTransform();
}

function zoom(directionIn) {
  if ( directionIn ) {
    setBodyScale(bodyScale * 1.02);
  } else {
    setBodyScale(bodyScale * 0.98);
  }
}

function bodyWidth() {
  return $('body').width() * bodyScale;
}

function bodyHeight() {
  return $('body').height() * bodyScale;
}

function leftDistanceFromBodyToTarget(targetX) {
  var leftDistanceFromWindowToTarget = targetX;
  var leftDistanceFromWindowToBody = $('body').position().left;
  return leftDistanceFromWindowToTarget - leftDistanceFromWindowToBody;
}

function topDistanceFromBodyToTarget(targetY) {
  var topDistanceFromWindowToTarget = targetY;
  var topDistanceFromWindowToBody = $('body').position().top;
  return topDistanceFromWindowToTarget - topDistanceFromWindowToBody;
}

function zoomAndTranslate(directionIn, targetX, targetY) {
  var leftPercentDistanceFromBodyToTarget = leftDistanceFromBodyToTarget(targetX) / bodyWidth();
  var topPercentDistanceFromBodyToTarget = topDistanceFromBodyToTarget(targetY) / bodyHeight();

  zoom(directionIn);

  var leftDesiredDistanceFromBodyToTarget = bodyWidth() * leftPercentDistanceFromBodyToTarget;
  var leftActualDistanceFromBodyToTarget = leftDistanceFromBodyToTarget(targetX);

  var topDesiredDistanceFromBodyToTarget = bodyHeight() * topPercentDistanceFromBodyToTarget;
  var topActualDistanceFromBodyToTarget = topDistanceFromBodyToTarget(targetY);

  translateX = translateX + (leftActualDistanceFromBodyToTarget - leftDesiredDistanceFromBodyToTarget);
  translateY = translateY + (topActualDistanceFromBodyToTarget - topDesiredDistanceFromBodyToTarget);
  updateBodyTransform()
}

$(function() {
  $(document).bind('mousewheel', function(event) {
    event.preventDefault();

    var originalEvent = event.originalEvent;
    zoomAndTranslate(originalEvent.wheelDelta > 0, originalEvent.screenX, originalEvent.screenY);
  });
});
