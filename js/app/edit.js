define(['jquery', 'jquery_ui', 'app/drag'], function($, unused, drag) {
  var my = {};

  function disableCurrentEditor() {
    if ( typeof currentlyEditingCard !== 'undefined' ) {
      currentlyEditingCard.draggable({ disabled: false });
    }
  }

  function initializeCardEditing(selector) {
    selector.dblclick(function(event) {
      disableCurrentEditor();

      currentlyEditingCard = $(event.currentTarget);
      currentlyEditingCard.get(0).focus();
      currentlyEditingCard.draggable({ disabled: true });
    });
  }

  var _newCardTop = 10;
  var _newCardLeft = 10;

  function newCardTop() {
    _newCardTop += 10;
    return _newCardTop;
  }

  function newCardLeft() {
    _newCardLeft += 10;
    return _newCardLeft;
  }

  my.addCard = function() {
    var newCard = $('#prototype-card').clone().attr('id', null).removeClass('hidden').appendTo($('#main-drag'));
    drag.initializeCardDragging(newCard);
    initializeCardEditing(newCard);
    newCard.css('top', newCardTop() + 'px');
    newCard.css('left', newCardLeft() + 'px');
    highestZIndex += 1;
    newCard.zIndex(highestZIndex);

    return newCard;
  }

  $(function() {
    var currentlyEditingCard;

    $('#menu a').click(function(event) {
      event.preventDefault()
      my.addCard();
    });

    $('#main-drag-handle').click(function() {
      disableCurrentEditor()
    });

    initializeCardEditing($('.card'));
  });

  return my;
});
