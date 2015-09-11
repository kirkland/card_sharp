define(['jquery', 'jquery_ui', 'app/drag'], function($, unused, drag) {
  // Public

  var my = {};

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

  // Private

  var _newCardLeft = 10;
  var _newCardTop = 10;

  function activeCard() {
    return $('.active-card');
  }

  function activateCard(card) {
    deactiveCard();

    card.addClass('active-card');
    activeCard().draggable({ disabled: true });
  }

  function deactiveCard() {
    activeCard().draggable({ disabled: false });
    activeCard().attr('contenteditable', false);
    activeCard().removeClass('active-card');
  }

  function editCard(card) {
    card.attr('contenteditable', true);
    card.get(0).focus();
  }

  function initializeCardEditing(selector) {
    selector.click(function(event) {
      if ( $(event.currentTarget).hasClass('active-card') ) {
        editCard($(event.currentTarget));
      } else {
        activateCard($(event.currentTarget));
      }
    });
  }

  function newCardLeft() {
    _newCardLeft += 10;
    return _newCardLeft;
  }

  function newCardTop() {
    _newCardTop += 10;
    return _newCardTop;
  }

  $(function() {
    $('#menu a').click(function(event) {
      event.preventDefault()
      my.addCard();
    });

    $('#main-drag-handle').click(function() {
      deactiveCard()
    });

    initializeCardEditing($('.card'));
  });

  return my;
});
