function set_scale(new_scale) {
  $('body').css({ transform: 'scale(' + new_scale + ')' });
}

$(function() {
  var current_scale = 1;

  $(document).keypress(function(e) {
    var key = e.which;
    if (key === 120) { // x
      current_scale = current_scale * 1.05;
    } else if (key === 122) { // z
      current_scale = current_scale * 0.95;
    }

    set_scale(current_scale);
  });

  $(document).bind('mousewheel', function(e){
    if ( e.ctrlKey ) {
      if ( e.originalEvent.wheelDelta > 0 ) {
        current_scale = current_scale * 1.05;
      } else {
        current_scale = current_scale * 0.95;
      }

      set_scale(current_scale);
    }
  });
});
