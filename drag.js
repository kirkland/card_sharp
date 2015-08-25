// Fix draggable issue for scaled elements
// http://stackoverflow.com/questions/10212683/jquery-drag-resize-with-css-transform-scale

// Must load zoom before drag

// Necessary if zoom is not being used
if (typeof zoom === 'undefined') {
  zoom = { scale: 1 };
}

(function($, zoom) {
  function resetHandle() {
    $('#main-drag-handle').css({ left: 0, top: 0 });
  }

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
        resetHandle();
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

    $('#main-drag, #main-drag-handle').height($('body').height());
    $('#main-drag, #main-drag-handle').width($('body').width());
  });

}($, zoom));
