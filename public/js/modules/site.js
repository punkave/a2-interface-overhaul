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

  $(window).on('keydown', function(e) {
    if (e.keyCode === 27) {
      $('[data-screen]').each(function() {
        $(this).toggleClass('screen--open', false);
        $overlay.toggleClass('overlay--open', false);
      });
    }
  })

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
    togglePreview();
    e.stopPropagation();
  });

  $('[data-close-preview]').on('click', function(e) {
    if($('.screen--preview').length) {
      togglePreview(false);
    }
  });

  function togglePreview(open) {
    $(this)
      .toggleClass('fa-eye', open)
      .toggleClass('fa-eye-slash', !open);

    $('.overlay-preview').toggleClass('active', open);

    $('.a2-global-control, .hide-on-preview').toggleClass('hidden', open);

    $('.screen--open').toggleClass('screen--preview', open);

                                               // sorry it's a prototype
    $('.overlay').toggleClass('overlay--open', open !== undefined ? true : false );
  }

});