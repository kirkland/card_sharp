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
    setBodyScale(bodyScale * 1.05);
  } else {
    setBodyScale(bodyScale * 0.95);
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

function leftPercentDistanceFromBodyToTarget(targetX) {
  return leftDistanceFromBodyToTarget(targetX) / bodyWidth();
}

function topPercentDistanceFromBodyToTarget(targetY) {
  return topDistanceFromBodyToTarget(targetY) / bodyHeight();
}

function zoomAndTranslate(directionIn, targetX, targetY) {
  targetX = (targetX - translateX) * bodyScale;
  targetY = (targetY - translateY) * bodyScale;

  $('#target').remove();
  $('<div id="target" style="left: ' + targetX + 'px; top: ' + targetY + 'px;"></div>').appendTo('body');

  var startingLeftPercentDistanceFromBodyToTarget = leftPercentDistanceFromBodyToTarget(targetX);
  var startingTopPercentDistanceFromBodyToTarget = topPercentDistanceFromBodyToTarget(targetY);

  console.log('starting percent distances', startingLeftPercentDistanceFromBodyToTarget, startingTopPercentDistanceFromBodyToTarget);

  zoom(directionIn);

  var leftDesiredDistanceFromBodyToTarget = bodyWidth() * startingLeftPercentDistanceFromBodyToTarget;
  var leftActualDistanceFromBodyToTarget = leftDistanceFromBodyToTarget(targetX);

  var topDesiredDistanceFromBodyToTarget = bodyHeight() * startingTopPercentDistanceFromBodyToTarget;
  var topActualDistanceFromBodyToTarget = topDistanceFromBodyToTarget(targetY);

  translateX = translateX + (leftActualDistanceFromBodyToTarget - leftDesiredDistanceFromBodyToTarget);
  translateY = translateY + (topActualDistanceFromBodyToTarget - topDesiredDistanceFromBodyToTarget);

  // What's wrong with this?
//  translateX = targetX - leftDesiredDistanceFromBodyToTarget;
//  translateY = targetY - topDesiredDistanceFromBodyToTarget;

  updateBodyTransform()

  console.log('ending percent distances', leftPercentDistanceFromBodyToTarget(targetX), topPercentDistanceFromBodyToTarget(targetY));
}

$(function() {
  $(document).bind('mousewheel DOMMouseScroll', function(event) {
    event.preventDefault();

    var originalEvent = event.originalEvent;
    console.log(originalEvent);
    zoomAndTranslate(originalEvent.wheelDelta > 0, originalEvent.clientX, originalEvent.clientY);
  });
});
