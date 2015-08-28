$(function() {
  var editor = new nicEditor();

  $('.card').dblclick(function(event) {
    $('#editor').removeAttr('id');
    $(event.currentTarget).find('.body').attr('id', 'editor');
    editor.addInstance('editor');
  });
});
