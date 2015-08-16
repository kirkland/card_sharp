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

function percent_distance_from_main_to_cursor(cursor_x) {
  var distance_from_left_to_cursor = cursor_x - $('#main').position().left;
  return distance_from_left_to_cursor / main_width();
}

function desired_distance_from_main_to_cursor(percent) {
  console.log('desired distance from main to cursor', percent * main_width());
  return percent * main_width();
}

function main_left_offset_to_restore_percent(cursor_distance_from_left_of_window, percent) {
  return desired_distance_from_main_to_cursor(percent) - cursor_distance_from_left_of_window;
}

function zoom(delta) {
  if ( delta > 0 ) {
    current_scale = current_scale * 1.02;
  } else {
    current_scale = current_scale * 0.98;
  }

  set_scale(current_scale);
}

function react_to_mouse(wheel_delta, cursor_x) {
  var starting_percent_distance_from_main_to_cursor = percent_distance_from_main_to_cursor(cursor_x);
  console.log('percent distance from main left to cursor', starting_percent_distance_from_main_to_cursor);

  zoom(wheel_delta);

  console.log('distance fom left side to main', $('#main').position().left);
  var main_offset = main_left_offset_to_restore_percent(cursor_x, starting_percent_distance_from_main_to_cursor);
  console.log('desired main offset', main_offset);

  set_translate_x(main_offset);

  console.log('actual distance from main to cursor', cursor_x - $('#main').position().left);

  // Should match other log
  console.log('new percent distance from main left to cursor', percent_distance_from_main_to_cursor(cursor_x));
}

$(function() {
  $(document).bind('mousewheel', function(event){
    react_to_mouse(event.originalEvent.wheelDelta, event.originalEvent.screenX);
  });
});
