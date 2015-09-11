$( function() {

  var $overlay = $('.overlay');

  // ================================================================
  // SCREENS
  // ================================================================

  // open a screen

  $('[data-open]').on('click', function(e) {
    var $screen = $('[data-screen="' + $(this).attr('data-open') + '"]');

    $screen.toggleClass('screen--open', true);
    $overlay.toggleClass('overlay--open', true);

    $screen.find('.screen__body').css({
      top: $screen.find('.header').outerHeight() + $screen.find('.context-bar').outerHeight() + 'px'
    });
  });

  // close a screen

  $('[data-close]').on('click', function(e) {
    $('[data-screen="' + $(this).attr('data-close') + '"]')
      .toggleClass('screen--open', false);

    var $recededScreens = $('.screen--recede');

    if($recededScreens.length) {
      $recededScreens.removeClass('screen--recede');
    } else {
      $overlay.toggleClass('overlay--open', false);
    }
  });

  $(window).on('keydown', function(e) {
    if (e.keyCode === 27) {
      // if there is a receding screen, only close one layer
      if( $('.screen--recede').length ) {
        $('.screen--open:not(.screen--recede)').removeClass('screen--open');
        $('.screen--recede').removeClass('screen--recede');
      } else {
        $('.screen--open').removeClass('screen--open');
        $overlay.toggleClass('overlay--open', false);
      }
    }
  });

  // opening a second modal

  $('[data-open-another]').on('click', function(e) {
    var targetScreen = $(this).attr('data-open-another');
    $(this).parents('.screen').toggleClass('screen--recede');
    $('[data-screen="' + targetScreen + '"]').toggleClass('screen--open');
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
    togglePreview();
    e.stopPropagation();
  });

  $('[data-close-preview]').on('click', function(e) {
    if($('.screen--preview').length) {
      togglePreview();
    }
  });

  function togglePreview(open) {
    $(this)
      .toggleClass('fa-eye', open)
      .toggleClass('fa-eye-slash', !open);

    $('.overlay-preview').toggleClass('active', open);

    $('.a2-global-control, .hide-on-preview').toggleClass('hidden', open);

    $('.screen--open').toggleClass('screen--preview', open);

    $('.overlay').toggleClass('overlay--open');

    if( $('.screen--preview').length ) {
      $('body').animate({
        scrollTop: $('[data-preview-target]').position().top - 100
      });
    }
  }

  // ================================================================
  // MANAGE VIEW CHECKBOXES
  // ================================================================

  $('[data-check-all]').on('change', function(e) {
    var isChecked = this.checked;
    $('[data-check]').each( function() {
      this.checked = isChecked;
    });
  });

  $('[data-check-all], [data-check]').on('change', function(e) {
    // get the total number of checked boxes
    var count = $('[data-check]:checked').length;
    $('[data-item-count]').text('(' + count + ')');

    $('[data-table-control]').toggleClass('active', !!count);
  });

});