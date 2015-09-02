define(['jquery'], function($) {
  var my = {}
  var afterZoomCallbacks = [];
  my.scale = 1;
  my.afterZoom = function(callback) {
    afterZoomCallbacks.push(callback);
  };

  var position = [0, 0];
  var target = [0, 0];

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
    $('#main').css({ transform: 'scale(' + my.scale + ')', left: position[0] + 'px', top: position[1] + 'px' });
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

    var i;
    for ( i = 0; i < afterZoomCallbacks.length; i++ ) {
      afterZoomCallbacks[i].call();
    }
  }

  function mainDimensions() {
    return [$('#main').width() * my.scale, $('#main').height() * my.scale];
  }

  function mainPosition() {
    return [$('#main').position().left, $('#main').position().top];
  }

  function mainToTarget() {
    return subtractArrays(target, mainPosition());
  }

  function percentMainToTarget() {
    return divideArrays(mainToTarget(), mainDimensions());
  }

  function zoomAndPosition(directionIn, targetX, targetY) {
    target = [targetX, targetY];

    var startingPercentMainToTarget = percentMainToTarget();

    zoom(directionIn);

    var desiredMainToTarget = multiplyArrays(mainDimensions(), startingPercentMainToTarget);
    var currentMainToTarget = mainToTarget();

    var addToPosition = subtractArrays(currentMainToTarget, desiredMainToTarget);
    position[0] += addToPosition[0];
    position[1] += addToPosition[1];

    updateMainTransform();
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
