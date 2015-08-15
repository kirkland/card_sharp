debug_once = true
current_scale = 1;

function set_scale(new_scale) {
  $('body').css({ transform: 'scale(' + new_scale + ')' });
}

function percent_distance_from_left_to_cursor(event) {
  var distance_from_left_to_cursor = event.originalEvent.screenX - $('body').position().left;
  var body_width = $('body').width() * current_scale;
  return distance_from_left_to_cursor / body_width;
}

function zoom(delta) {
  if ( delta > 0 ) {
    current_scale = current_scale * 1.05;
  } else {
    current_scale = current_scale * 0.95;
  }

  set_scale(current_scale);
}


$(function() {

  $(document).bind('mousewheel', function(e){

    if ( e.ctrlKey ) {
      var delta = e.originalEvent.wheelDelta;

      if ( debug_once || true ) {
        console.log('cursor', e.originalEvent.screenX, e.originalEvent.screenY);
        console.log('body', $('body').position().left, $('body').position().top);
        debug_once = false;
      }

      var starting_percent_distance_from_left_to_cursor = percent_distance_from_left_to_cursor(e);

      zoom(delta);
    }
  });
});
