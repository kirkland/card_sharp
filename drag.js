// Must load zoom before drag

// Necessary if zoom is not being used
if (typeof zoom === 'undefined') {
  zoom = { scale: 1 };
}

(function($, zoom) {
  function resetHandle() {
    var handle = $('#main-drag-handle');
    var body = $('body');
    var main = $('#main');

    var resetZoom = 1 / zoom.scale;
    var resetHeight = body.height() * resetZoom;
    var resetWidth = body.width() * resetZoom;

    var resetLeft = 0 - main.position().left * resetZoom;
    var resetTop = 0 - main.position().top * resetZoom;

    handle.css({ left: resetLeft, top: resetTop, height: resetHeight, width: resetWidth });
  }

  zoom.afterZoom(function() {
    resetHandle();
  });

  $(function() {
    var commonDraggableOptions = {
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
    };

    $('.card').draggable(commonDraggableOptions);

    $('#main-drag').draggable($.extend($.extend({}, commonDraggableOptions), {
      handle: '#main-drag-handle',

      stop: function(event, ui) {
        resetHandle();
      }
    }));

    $('#main-drag, #main-drag-handle').height($('body').height());
    $('#main-drag, #main-drag-handle').width($('body').width());
  });

}($, zoom));
