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
    setMainScale(mainScale * 1.02);
  } else {
    setMainScale(mainScale * 0.98);
  }
}

function zoomAndTranslate(directionIn, targetX, targetY) {
  console.log(directionIn, targetX, targetY);
  zoom(directionIn);
}

$(function() {
  $(document).bind('mousewheel', function(event) {
    event.preventDefault();

    var originalEvent = event.originalEvent;
    zoomAndTranslate(originalEvent.wheelDelta > 0, originalEvent.screenX, originalEvent.screenY);
  });
});
