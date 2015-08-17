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

function setBodyTranslateX(newTranslateX) {
  translateX = newTranslateX;
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

function leftDistanceFromBodyToTarget(targetX) {
  var leftDistanceFromWindowToTarget = targetX;
  var leftDistanceFromWindowToBody = $('body').position().left;
  return leftDistanceFromWindowToTarget - leftDistanceFromWindowToBody;
}

function zoomAndTranslate(directionIn, targetX, targetY) {
  var leftPercentDistanceFromBodyToTarget = leftDistanceFromBodyToTarget(targetX) / bodyWidth();
  console.log(leftPercentDistanceFromBodyToTarget);

  zoom(directionIn);

  var leftDesiredDistanceFromBodyToTarget = bodyWidth() * leftPercentDistanceFromBodyToTarget;
  var leftActualDistanceFromBodyToTarget = leftDistanceFromBodyToTarget(targetX);
  setBodyTranslateX(translateX + (leftActualDistanceFromBodyToTarget - leftDesiredDistanceFromBodyToTarget));
}

$(function() {
  $(document).bind('mousewheel', function(event) {
    event.preventDefault();

    var originalEvent = event.originalEvent;
    zoomAndTranslate(originalEvent.wheelDelta > 0, originalEvent.screenX, originalEvent.screenY);
  });
});
