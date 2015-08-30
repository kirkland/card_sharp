$(function() {
  var currentlyEditingCard;

  function disableCurrentEditor() {
    if ( typeof currentlyEditingCard !== 'undefined' ) {
      currentlyEditingCard.draggable({ disabled: false });
    }
  }

  $('.card').dblclick(function(event) {
    disableCurrentEditor();

    currentlyEditingCard = $(event.currentTarget);
    currentlyEditingCard.get(0).focus();
    currentlyEditingCard.draggable({ disabled: true });
  });

  $('#main-drag-handle').click(function() {
    disableCurrentEditor()
  });
});
