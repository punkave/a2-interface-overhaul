$( function() {

  var $overlay = $('.overlay');

  $('[data-open]').on('click', function(e) {
    $('[data-screen="' + $(this).attr('data-open') + '"]')
      .toggleClass('screen--open', true);
    $overlay.toggleClass('overlay--open', true);
  });

  $('[data-close]').on('click', function(e) {
    $('[data-screen="' + $(this).attr('data-close') + '"]')
      .toggleClass('screen--open', false);
    $overlay.toggleClass('overlay--open', false);
  });

  $('[data-open-section]').on('click', function(e) {
    $('[data-section]').addClass('hidden');

    var target = +$(this).attr('data-open-section');

    for(var i = 0; i <= target; i++) {
      $('.section[data-section="' + i + '"]')
        .toggleClass('hidden', false);
    }

    $('.context-section[data-section="' + target + '"]')
        .toggleClass('hidden', false);

  });

});