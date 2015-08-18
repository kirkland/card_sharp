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

function leftPercentDistanceFromBodyToTarget(targetX) {
  return leftDistanceFromBodyToTarget(targetX) / bodyWidth();
}

function topPercentDistanceFromBodyToTarget(targetY) {
  return topDistanceFromBodyToTarget(targetY) / bodyWidth();
}

function traceClick(targetX, targetY) {
  $('#marker').remove()
  $('<div id="marker" style="position: fixed; left: 0; top: 0; border: 1px solid blue; height: ' + targetY + 'px; width: ' + targetX + 'px;"></div>').appendTo('html');
}

function zoomAndTranslate(directionIn, targetX, targetY) {
  var startingLeftPercentDistanceFromBodyToTarget = leftPercentDistanceFromBodyToTarget(targetX);
  var startingTopPercentDistanceFromBodyToTarget = topPercentDistanceFromBodyToTarget(targetY);

//  traceClick(targetX, targetY);

  console.log("BEFORE ZOOM")
  console.log("starting percents:", startingLeftPercentDistanceFromBodyToTarget, startingTopPercentDistanceFromBodyToTarget);
  console.log('topDistanceFromBodyToTarget', topDistanceFromBodyToTarget(targetY));

  zoom(directionIn);

  console.log("AFTER ZOOM")

  var leftDesiredDistanceFromBodyToTarget = bodyWidth() * startingLeftPercentDistanceFromBodyToTarget;
  var leftActualDistanceFromBodyToTarget = leftDistanceFromBodyToTarget(targetX);

  var topDesiredDistanceFromBodyToTarget = bodyHeight() * startingTopPercentDistanceFromBodyToTarget;
  var topActualDistanceFromBodyToTarget = topDistanceFromBodyToTarget(targetY);
  // somethihng wrong... cursor is not now 19+ pixels from the top
  console.log('topActualDistanceFromBodyToTarget', topActualDistanceFromBodyToTarget);

  translateX = translateX + (leftActualDistanceFromBodyToTarget - leftDesiredDistanceFromBodyToTarget);
  translateY = translateY + (topActualDistanceFromBodyToTarget - topDesiredDistanceFromBodyToTarget);
  updateBodyTransform()

  console.log("ending percents:", leftPercentDistanceFromBodyToTarget(targetX), topPercentDistanceFromBodyToTarget(targetY));
}

$(function() {
  $(document).bind('mousewheel DOMMouseScroll', function(event) {
    event.preventDefault();

    var originalEvent = event.originalEvent;
    console.log('originalEvent', originalEvent);
    zoomAndTranslate(originalEvent.wheelDelta > 0, originalEvent.clientX, originalEvent.clientY);
  });
});
