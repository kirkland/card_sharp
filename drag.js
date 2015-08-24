// Fix draggable issue for scaled elements
// http://stackoverflow.com/questions/10212683/jquery-drag-resize-with-css-transform-scale

// Must load zoom before drag

// Necessary if zoom is not being used
if (typeof zoom === 'undefined') {
  zoom = { scale: 1 };
}

(function($, zoom) {
  $(function() {
    $('#main-drag').draggable({
      handle: '#main-drag-handle',

      start: function(event, ui) {
        ui.position.left = 0;
        ui.position.top = 0;
      },

      drag: function(event, ui) {
        var changeLeft = ui.position.left - ui.originalPosition.left;
        var newLeft = ui.originalPosition.left + changeLeft / zoom.scale;

        var changeTop = ui.position.top - ui.originalPosition.top;
        var newTop = ui.originalPosition.top + changeTop / zoom.scale;

        ui.position.left = newLeft;
        ui.position.top = newTop;
      },

      stop: function(event, ui) {
        // Set main-drag dimensions to match body
        $('#main-drag-handle').width($('body').width() / zoom.scale * 0.90);
        $('#main-drag-handle').height($('body').height() / zoom.scale * 0.90);

        // TODO: Try setting top and left to offset top and left on #main
        $('#main-drag-handle').css({top: 0, left: 0, transform: 'scale(' + (1 / zoom.scale) + ')'});
      }
    });

    $('.card').draggable({
      start: function(event, ui) {
        ui.position.left = 0;
        ui.position.top = 0;
      },

      drag: function(event, ui) {
        var changeLeft = ui.position.left - ui.originalPosition.left;
        var newLeft = ui.originalPosition.left + changeLeft / zoom.scale;

        var changeTop = ui.position.top - ui.originalPosition.top;
        var newTop = ui.originalPosition.top + changeTop / zoom.scale;

        ui.position.left = newLeft;
        ui.position.top = newTop;
      },
    });
  });

  $(function() {
    $('#main-drag, #main-drag-handle').height($('body').height());
    $('#main-drag, #main-drag-handle').width($('body').width());
  });

}($, zoom));
