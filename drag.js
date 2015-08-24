// Fix draggable issue for scaled elements
// http://stackoverflow.com/questions/10212683/jquery-drag-resize-with-css-transform-scale

// Must load zoom before drag

// Necessary if zoom is not being used
if (typeof zoom === 'undefined') {
  zoom = { scale: 1 };
}

(function($, zoom) {
  $(function() {
    $('.card, #main-drag').draggable({
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
      }
    });
  });

  $(function() {
    $('#main-drag').height($('body').height());
    $('#main-drag').width($('body').width());
  });

}($, zoom));
