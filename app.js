current_scale = 1;
transform_scale = 1;
translate_x = 0;

function update_main_transform() {
  $('#main').css({ transform: 'scale(' + transform_scale + ') translateX(' + translate_x + 'px)' });
}

function set_scale(new_scale) {
  transform_scale = new_scale;
  update_main_transform();
}

function set_translate_x(new_x) {
  translate_x = new_x;
  update_main_transform();
}

function main_width() {
  return $('#main').width() * current_scale;
}

function percent_distance_from_left_to_cursor(event) {
  var distance_from_left_to_cursor = event.originalEvent.screenX - $('#main').position().left;
  return distance_from_left_to_cursor / main_width();
}

function desired_distance_from_left_to_cursor(percent) {
  return percent * main_width();
}

function main_left_offset_to_restore_percent(cursor_distance_from_left, percent) {
  return cursor_distance_from_left - desired_distance_from_left_to_cursor(percent);
}

function zoom(delta) {
  if ( delta > 0 ) {
    current_scale = current_scale * 1.02;
  } else {
    current_scale = current_scale * 0.98;
  }

  set_scale(current_scale);
}

function react_to_mouse(event) {
  var delta = event.originalEvent.wheelDelta;

  var starting_percent_distance_from_left_to_cursor = percent_distance_from_left_to_cursor(event);
  console.log('percent distance from main left to cursor', starting_percent_distance_from_left_to_cursor);

  zoom(delta);

  // Now do a translate on main so that it gets back to the percent it was before
  // The main width has changed
  // Now we want to change... something... to make percent_distance_from_left_to_cursor to be 
  // the same as before.
  // Well, we're not going to change the cursor position, so that leaves main's offset.

  console.log('distance fom left side to main', $('#main').position().left);
  var main_offset = main_left_offset_to_restore_percent(event.originalEvent.screenX, starting_percent_distance_from_left_to_cursor);
  console.log('desired main offset', main_offset);

  set_translate_x(main_offset);
}

$(function() {
  $(document).bind('mousewheel', function(event){
    react_to_mouse(event);
  });
});
