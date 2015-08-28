$(function() {
  var nic_editor = new nicEditor();
  var currentlyEditingCard;

  function removeCurrentEditor() {
    if ( typeof currentlyEditingCard !== 'undefined' ) {
      currentlyEditingCard.draggable({ disabled: false });
      nic_editor.removeInstance('editor');
      currentlyEditingCard.find('#editor').removeAttr('id');
    }
  }

  $('.card').dblclick(function(event) {
    removeCurrentEditor();

    currentlyEditingCard = $(event.currentTarget);
    currentlyEditingCard.find('.body').attr('id', 'editor');
    currentlyEditingCard.draggable({ disabled: true });
    nic_editor.addInstance('editor');
  });

  $('#main-drag-handle').click(function() {
    removeCurrentEditor();
  });
});
