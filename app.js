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

function mainPosition() {
  return [$('#main').width() * mainScale, $('#main').height() * mainScale];
}

function leftDistanceFromMainToTarget() {
  var leftDistanceFromWindowToTarget = $('#target').position().left;
  var leftDistanceFromWindowToMain = $('#main').position().left;
  return leftDistanceFromWindowToTarget - leftDistanceFromWindowToMain;
}

function topDistanceFromMainToTarget() {
  var topDistanceFromWindowToTarget = $('#target').position().top;
  var topDistanceFromWindowToMain = $('#main').position().top;
  return topDistanceFromWindowToTarget - topDistanceFromWindowToMain;
}

function leftPercentDistanceFromMainToTarget() {
  return leftDistanceFromMainToTarget() / mainPosition()[0];
}

function topPercentDistanceFromMainToTarget() {
  return topDistanceFromMainToTarget() / mainPosition()[1];
}

function zoomAndTranslate(directionIn, targetX, targetY) {
  $('#target').remove();
  $('<div id="target" style="left: ' + targetX + 'px; top: ' + targetY + 'px;"></div>').appendTo('body');

  var startingLeftPercentDistanceFromMainToTarget = leftPercentDistanceFromMainToTarget();
  var startingTopPercentDistanceFromMainToTarget = topPercentDistanceFromMainToTarget();

  console.log('starting percent distances', startingLeftPercentDistanceFromMainToTarget, startingTopPercentDistanceFromMainToTarget);

  zoom(directionIn);

  var leftDesiredDistanceFromMainToTarget = mainPosition()[0] * startingLeftPercentDistanceFromMainToTarget;
  var leftActualDistanceFromMainToTarget = leftDistanceFromMainToTarget();

  var topDesiredDistanceFromMainToTarget = mainPosition()[1] * startingTopPercentDistanceFromMainToTarget;
  var topActualDistanceFromMainToTarget = topDistanceFromMainToTarget();

  translateX = translateX + (leftActualDistanceFromMainToTarget - leftDesiredDistanceFromMainToTarget);
  translateY = translateY + (topActualDistanceFromMainToTarget - topDesiredDistanceFromMainToTarget);

  // What's wrong with this?
//  translateX = targetX - leftDesiredDistanceFromMainToTarget;
//  translateY = targetY - topDesiredDistanceFromMainToTarget;

  updateMainTransform()

  console.log('ending percent distances', leftPercentDistanceFromMainToTarget(), topPercentDistanceFromMainToTarget());
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
