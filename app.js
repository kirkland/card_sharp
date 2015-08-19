mainScale = 1;
translateX = 0;
translateY = 0;

function updateMainTransform() {
  $('#main').css({ transform: 'scale(' + mainScale + ') translate(' + translateX + 'px, ' +
    translateY + 'px)' });
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

function mainWidth() {
  return $('#main').width() * mainScale;
}

function mainHeight() {
  return $('#main').height() * mainScale;
}

function leftDistanceFromMainToTarget(targetX) {
  var leftDistanceFromWindowToTarget = targetX;
  var leftDistanceFromWindowToMain = $('#main').position().left;
  return leftDistanceFromWindowToTarget - leftDistanceFromWindowToMain;
}

function topDistanceFromMainToTarget(targetY) {
  var topDistanceFromWindowToTarget = targetY;
  var topDistanceFromWindowToMain = $('#main').position().top;
  return topDistanceFromWindowToTarget - topDistanceFromWindowToMain;
}

function leftPercentDistanceFromMainToTarget(targetX) {
  return leftDistanceFromMainToTarget(targetX) / mainWidth();
}

function topPercentDistanceFromMainToTarget(targetY) {
  return topDistanceFromMainToTarget(targetY) / mainHeight();
}

function zoomAndTranslate(directionIn, targetX, targetY) {
  $('#target').remove();
  $('<div id="target" style="left: ' + targetX + 'px; top: ' + targetY + 'px;"></div>').appendTo('body');

  var startingLeftPercentDistanceFromMainToTarget = leftPercentDistanceFromMainToTarget(targetX);
  var startingTopPercentDistanceFromMainToTarget = topPercentDistanceFromMainToTarget(targetY);

  console.log('starting percent distances', startingLeftPercentDistanceFromMainToTarget, startingTopPercentDistanceFromMainToTarget);

  zoom(directionIn);

  var leftDesiredDistanceFromMainToTarget = mainWidth() * startingLeftPercentDistanceFromMainToTarget;
  var leftActualDistanceFromMainToTarget = leftDistanceFromMainToTarget(targetX);

  var topDesiredDistanceFromMainToTarget = mainHeight() * startingTopPercentDistanceFromMainToTarget;
  var topActualDistanceFromMainToTarget = topDistanceFromMainToTarget(targetY);

  translateX = translateX + (leftActualDistanceFromMainToTarget - leftDesiredDistanceFromMainToTarget);
  translateY = translateY + (topActualDistanceFromMainToTarget - topDesiredDistanceFromMainToTarget);

  // What's wrong with this?
//  translateX = targetX - leftDesiredDistanceFromMainToTarget;
//  translateY = targetY - topDesiredDistanceFromMainToTarget;

  updateMainTransform()

  console.log('ending percent distances', leftPercentDistanceFromMainToTarget(targetX), topPercentDistanceFromMainToTarget(targetY));
}

$(function() {
  $('#main').height($('body').height());

  $(document).bind('mousewheel DOMMouseScroll', function(event) {
    event.preventDefault();

    var originalEvent = event.originalEvent;
    console.log(originalEvent);
    zoomAndTranslate(originalEvent.wheelDelta > 0, originalEvent.clientX, originalEvent.clientY);
  });
});
