$(function() {
  var editor = new nicEditor();

  $('.card').dblclick(function(event) {
    editor.removeInstance('editor');
    $('#editor').removeAttr('id');
    $(event.currentTarget).find('.body').attr('id', 'editor');
    $(event.currentTarget).draggable({ disabled: true });
    editor.addInstance('editor');
  });
});
