zoom = (function($) {
  var my = {}
  my.mainScale = 1;

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
    $('#main').css({ transform: 'scale(' + my.mainScale + ')', left: position[0] + 'px', top: position[1] + 'px' });
  }

  function setMainScale(newMainScale) {
    my.mainScale = newMainScale;
    updateMainTransform();
  }

  function zoom(directionIn) {
    if ( directionIn ) {
      setMainScale(my.mainScale * 1.04);
    } else {
      setMainScale(my.mainScale * 0.96);
    }
  }

  function mainDimensions() {
    return [$('#main').width() * my.mainScale, $('#main').height() * my.mainScale];
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
}($));
