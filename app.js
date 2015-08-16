debug_once = true
current_scale = 1;

function set_scale(new_scale) {
  $('#main').css({ transform: 'scale(' + new_scale + ')' });
}

function main_width() {
  return $('main').width() * current_scale;
}

function percent_distance_from_left_to_cursor(event) {
  var distance_from_left_to_cursor = event.originalEvent.screenX - $('#main').position().left;
  return distance_from_left_to_cursor / main_width();
}

function desired_distance_from_left_to_cursor(percent) {
  return percent * main_width();
}

function main_left_offset_to_restore_percent(cursor_distance_from_left, percent) {
  return  cursor_distance_from_left - desired_distance_from_left_to_cursor(percent);
}

function zoom(delta) {
  if ( delta > 0 ) {
    current_scale = current_scale * 1.02;
  } else {
    current_scale = current_scale * 0.98;
  }

  set_scale(current_scale);
}

$(function() {

  $(document).bind('mousewheel', function(e){

    var delta = e.originalEvent.wheelDelta;

    if ( debug_once || true ) {
      console.log('cursor', e.originalEvent.screenX, e.originalEvent.screenY);
      console.log('main', $('#main').position().left, $('#main').position().top);
      debug_once = false;
    }

    var starting_percent_distance_from_left_to_cursor = percent_distance_from_left_to_cursor(e);

    zoom(delta);

    // Now do a translate on main so that it gets back to the percent it was before
    // The main width has changed
    // Now we want to change... something... to make percent_distance_from_left_to_cursor to be 
    // the same as before.
    // Well, we're not going to change the cursor position, so that leaves main's offset.

    console.log('actual main offset', $('#main').position().left);
    console.log('desired main offset', main_left_offset_to_restore_percent(e.originalEvent.screenX, starting_percent_distance_from_left_to_cursor));
  });
});
