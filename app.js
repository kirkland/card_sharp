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

function add_translate_x(new_x) {
  translate_x = translate_x + new_x;
  update_main_transform();
}

function main_width() {
  return $('#main').width() * current_scale;
}

function percent_distance_from_main_to_cursor(cursor_x) {
  var distance_from_left_to_cursor = cursor_x - $('#main').position().left;
  return distance_from_left_to_cursor / main_width();
}

function zoom(delta) {
  if ( delta > 20 ) {
    current_scale = current_scale * 1.02;
  } else if (delta < -20) {
    current_scale = current_scale * 0.98;
  }

  set_scale(current_scale);
}

function react_to_mouse(wheel_delta, cursor_x) {
  var starting_percent_distance_from_main_to_cursor = percent_distance_from_main_to_cursor(cursor_x);

  zoom(wheel_delta);

  desired_distance_from_main_to_cursor = starting_percent_distance_from_main_to_cursor * main_width();
  actual_distance_from_main_to_cursor = cursor_x - $('#main').position().left;

  add_translate_x(actual_distance_from_main_to_cursor - desired_distance_from_main_to_cursor);
}

$(function() {
  $(document).bind('mousewheel', function(event){
    react_to_mouse(event.originalEvent.wheelDelta, event.originalEvent.screenX);
  });
});
