$( function() {

  var $overlay = $('.overlay');

  // ================================================================
  // SCREENS
  // ================================================================

  // open a screen

  $('[data-open]').on('click', function(e) {
    $('[data-screen="' + $(this).attr('data-open') + '"]')
      .toggleClass('screen--open', true);
    $overlay.toggleClass('overlay--open', true);
  });

  // close a screen

  $('[data-close]').on('click', function(e) {
    $('[data-screen="' + $(this).attr('data-close') + '"]')
      .toggleClass('screen--open', false);
    $overlay.toggleClass('overlay--open', false);
  });

  // ================================================================
  // SECTIONS
  // ================================================================

  // go to a section

  $('[data-open-section]').on('click', function(e) {
    $('[data-section]')
      .addClass('hidden')
      .removeClass('hidden--left');

    var target = +$(this).attr('data-open-section');

    for(var i = 0; i <= target; i++) {
      $('.section[data-section="' + i + '"]')
        .toggleClass('hidden', false)
        .toggleClass('hidden--left', i < target);
    }

    $('.context-section[data-section="' + target + '"]')
        .toggleClass('hidden', false);

  });

  // ================================================================
  // TABS
  // ================================================================

  // highlight a tab

  $('.tab').on('click', function(e) {
    $(this).addClass('tab--active').siblings().removeClass('tab--active');
  });

  // ================================================================
  // PREVIEW
  // ================================================================

  $('[data-preview-control]').on('click', function(e) {
    $(this)
      .toggleClass('fa-eye')
      .toggleClass('fa-eye-slash');

    $('[data-preview]').toggleClass('preview--open');
  });

});