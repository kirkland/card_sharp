define(['jquery', 'app/edit'], function($, edit) {
  $(function() {
    var card = edit.addCard().css({ left: '100px', top: '100px' })
    card.find('.title h1').html('First card');
    card.find('.body').html('<p>Try dragging cards around</p>');

    card = edit.addCard().css({ left: '350px', top: '100px' })
    card.find('.title h1').html('Second card');
    card.find('.body').html('<p>Try zooming in and out with your scroll wheel</p>');

    card = edit.addCard().css({ left: '350px', top: '300px' })
    card.find('.title h1').html('Third card');
    card.find('.body').html('<p>You can also double click a card to edit it</p>');
  });
});
