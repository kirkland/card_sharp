function set_scale(new_scale) {
  $('body').css({ transform: 'scale(' + new_scale + ')' });
}

$(function() {
  var current_scale = 1;

  $(document).keypress(function(e) {
    var key = e.which;
    if (key === 120) { // x
      current_scale = current_scale * 1.05;
      set_scale(current_scale);
    } else if (key === 122) { // y
      current_scale = current_scale * 0.95;
      set_scale(current_scale);
    }
  });
});
