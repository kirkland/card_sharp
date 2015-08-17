function zoom(directionIn, targetX, targetY) {
  console.log(directionIn, targetX, targetY);
}

$(function() {
  $(document).bind('mousewheel', function(event) {
    event.preventDefault();

    var originalEvent = event.originalEvent;
    zoom(originalEvent.wheelDelta > 0, originalEvent.screenX, originalEvent.screenY);
  });
});
