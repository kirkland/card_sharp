define(['jquery'], function($) {
  // Public

  var my = {}
  my.scale = 1;

  my.afterZoom = function(callback) {
    afterZoomCallbacks.push(callback);
  };

  // Private

  var mainLeftOffset = 0;
  var mainTopOffset = 0;
  var zoomTarget = [0, 0];
  var afterZoomCallbacks = [];

  function subtractArrays(firstArray, secondArray) {
    var i = 0;
    var rv = []

    for ( i = 0; i < firstArray.length; i++ ) {
      rv.push(firstArray[i] - secondArray[i]);
    }

    return rv;
  }

  function divideArrays(firstArray, secondArray) {
    var i = 0;
    var rv = []

    for ( i = 0; i < firstArray.length; i++ ) {
      rv.push(firstArray[i] / secondArray[i]);
    }

    return rv;
  }

  function multiplyArrays(firstArray, secondArray) {
    var i = 0;
    var rv = []

    for ( i = 0; i < firstArray.length; i++ ) {
      rv.push(firstArray[i] * secondArray[i]);
    }

    return rv;
  }

  function updateMainTransform() {
    $('#main').css({ transform: 'scale(' + my.scale + ')', left: mainLeftOffset + 'px', top: mainTopOffset + 'px' });
  }

  function setMainScale(newMainScale) {
    my.scale = newMainScale;
    updateMainTransform();
  }

  function zoom(directionIn) {
    if ( directionIn ) {
      setMainScale(my.scale * 1.04);
    } else {
      setMainScale(my.scale * 0.96);
    }
  }

  function mainDimensions() {
    return [$('#main').width() * my.scale, $('#main').height() * my.scale];
  }

  function mainPosition() {
    return [$('#main').position().left, $('#main').position().top];
  }

  function mainToTarget() {
    return subtractArrays(zoomTarget, mainPosition());
  }

  function percentMainToTarget() {
    return divideArrays(mainToTarget(), mainDimensions());
  }

  function zoomAndPosition(directionIn, targetX, targetY) {
    zoomTarget = [targetX, targetY];

    var startingPercentMainToTarget = percentMainToTarget();

    zoom(directionIn);

    var desiredMainToTarget = multiplyArrays(mainDimensions(), startingPercentMainToTarget);
    var currentMainToTarget = mainToTarget();

    var addToPosition = subtractArrays(currentMainToTarget, desiredMainToTarget);
    mainLeftOffset += addToPosition[0];
    mainTopOffset += addToPosition[1];

    updateMainTransform();

    var i;
    for ( i = 0; i < afterZoomCallbacks.length; i++ ) {
      afterZoomCallbacks[i].call();
    }
  }

  $(function() {
    $('#main').height($('body').height());
    $('#main').width($('body').width());

    $(document).bind('mousewheel DOMMouseScroll', function(event) {
      event.preventDefault();

      var originalEvent = event.originalEvent;
      zoomAndPosition(originalEvent.wheelDelta > 0, originalEvent.clientX, originalEvent.clientY);
    });
  });

  return my;
});
