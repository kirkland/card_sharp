// Global variable
highestZIndex = 0;

define(['jquery', 'jquery_ui', 'app/zoom'], function($, unused, zoom) {
  var my = {};

  function resetHandle() {
    var handle = $('#main-drag-handle');
    var body = $('body');
    var main = $('#main');
    var menuHeight = $('#menu').height();

    var resetZoom = 1 / zoom.scale;
    var resetHeight = (body.height() - $('#menu').height()) * resetZoom;
    var resetWidth = body.width() * resetZoom;

    var resetLeft = 0 - main.position().left * resetZoom;
    var resetTop = (0 - main.position().top + menuHeight) * resetZoom;

    handle.css({ left: resetLeft, top: resetTop, height: resetHeight, width: resetWidth });
  }

  var commonDraggableOptions = {
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

  my.initializeCardDragging = function(selector) {
    selector.click(function(handler) {
      highestZIndex += 1;
      $(handler.currentTarget).zIndex(highestZIndex);
    });

    selector.draggable($.extend($.extend({}, commonDraggableOptions), {
      start: function(event, ui) {
        ui.position.left = 0;
        ui.position.top = 0;
        highestZIndex += 1;
        $(event.target).zIndex(highestZIndex);
      }
    }));
  }

  $(function() {
    zoom.afterZoom(function() {
      resetHandle();
    });

    my.initializeCardDragging($('.card'));

    $('#main-drag').draggable($.extend($.extend({}, commonDraggableOptions), {
      handle: '#main-drag-handle',

      start: function(event, ui) {
        ui.position.left = 0;
        ui.position.top = 0;
      },

      stop: function(event, ui) {
        resetHandle();
      }
    }));

    $('#main-drag, #main-drag-handle').height($('body').height());
    $('#main-drag, #main-drag-handle').width($('body').width());
  });

  return my;
});
