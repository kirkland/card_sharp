define(['jquery', 'app/edit'], function($, edit) {
  $(function() {
    var card = edit.addCard().css({ left: '100px', top: '100px' })
    card.find('.body').html('<p>First card</p><p>Try dragging cards around</p>');

    card = edit.addCard().css({ left: '450px', top: '100px' })
    card.find('.body').html('<p>Second card</p><p>Try zooming in and out with your scroll wheel</p>');

    card = edit.addCard().css({ left: '450px', top: '300px' })
    card.find('.body').html('<p>Third card</p><p>You can also double click a card to edit it</p>');
  });
});
