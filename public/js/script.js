/* ======================================================================================
   @MASTER JAVASCRIPT
   ====================================================================================== */

/**
 * Handy elements to keep cached
 */

var htmlElement = $('html');

/**
 * Detect touch/non-touch
 */

var isTouch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

// Add hooks
if (isTouch) {
	htmlElement.addClass('touch');
} else {
	htmlElement.addClass('no-touch');
}

/**
 * Detect Android devices
 */

var isAndroid = navigator.userAgent.match(/android/i);

// Add a hook
if (isAndroid) {
  htmlElement.addClass('android');
}

/**
 * Detect iOS devices
 */

var isiOS = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

var isiPhone = navigator.userAgent.match(/iPhone/i);

// Add hooks
if (isiOS) {
	htmlElement.addClass('ios');
}

if (isiPhone) {
  htmlElement.addClass('iphone');
}

/**
 * Define functions
 */

// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Apply a style hook to each form field label when their inputs are focused
var formLabelFocus = function() {
  var formLabelFocusHighlight = '.js-form-label-focus';

  $(formLabelFocusHighlight).on('focus blur', 'input, select', function() {
    var input = $(this);
    setTimeout(function() {
      input.closest(formLabelFocusHighlight).toggleClass('is-focused', input.is(':focus'));
    }, 0 );
  });
}

// Focus on first selector or input in the container when clicking a faux label
var fauxLabelFocus = function() {
  var fauxLabel = '.js-faux-label';
  var fauxLabelContainer = '.js-faux-label-container';

  $(fauxLabel).on('click', function() {
    $(fauxLabelContainer).find('select, input').eq(0).focus();
  });
}

// Highlight relevant credit card image determined by the first number a user types into the credit card number input
var determineCardType = function() {

  var determineCardTypeEvent = function() {

    // Each credit card
    var elem = $('.js-credit-card-type');

    // The cards
    var amex = $('.js-credit-card-type-amex');
    var visa = $('.js-credit-card-type-visa');
    var mc = $('.js-credit-card-type-mc');

    // The first number of the input to determine which card type it is
    var firstNum = $(this).val().slice(0,1);

    elem.removeClass('is-visible').removeClass('is-invisible');

    switch(firstNum) {
      case '3':
        amex.addClass('is-visible');
        visa.addClass('is-invisible');
        mc.addClass('is-invisible');
        break;
      case '4':
        visa.addClass('is-visible');
        amex.addClass('is-invisible');
        mc.addClass('is-invisible');
        break;
      case '5':
        mc.addClass('is-visible');
        amex.addClass('is-invisible');
        visa.addClass('is-invisible');
        break;
    }
  }

  $(document).on('keyup', '.js-credit-card-type-input', determineCardTypeEvent);
}

// Payment type selection for Registration 3
var paymentType = {

  // Initiliase
  init: function() {

    // Hide elements on page load
    $('.js-payment-type-default-hide').hide();

    // Radio inputs
    this.inputPrepaid = $('.js-payment-type-prepaid-input');
    this.inputPayPerVisit = $('.js-payment-type-pay-per-visit-input');
    this.inputPayStation = $('.js-payment-type-paystation-input');

    // The elements to hide/show
    this.introOne = $('.js-payment-type-intro-1');
    this.introTwo = $('.js-payment-type-intro-2');
    this.payStationMsg = $('.js-payment-type-paystation-msg');
    this.theForm = $('.js-payment-type-form');
    this.formPrepaidAmt = $('.js-payment-type-form-prepaid-amount');
    this.formCCV = $('.js-payment-type-ccv');

    // Misc
    this.miscPaymentTypeGridItem = $('.js-payment-type-grid-item-full');

  },

  // Prepaid radio
  prePaid: function() {
    // Show
    paymentType.introOne.show().addClass('fade-in');
    paymentType.theForm.show().addClass('fade-in');
    paymentType.formPrepaidAmt.show().addClass('fade-in');
    paymentType.formCCV.show().addClass('fade-in');

    // Hide
    paymentType.introTwo.hide();
    paymentType.payStationMsg.hide();

    // Make the grid item half width to balance the grid rows
    paymentType.miscPaymentTypeGridItem.removeClass('one-whole').addClass('non-palm-one-half');
  },

  // Pay per visit radio
  payPerVisit: function() {
    // Show
    paymentType.introTwo.show().addClass('fade-in');
    paymentType.theForm.show().addClass('fade-in');

    // Hide
    paymentType.introOne.hide();
    paymentType.formPrepaidAmt.hide();
    paymentType.formCCV.hide();
    paymentType.payStationMsg.hide();

    // Make the grid item full width to balance the grid rows
    paymentType.miscPaymentTypeGridItem.addClass('one-whole').removeClass('non-palm-one-half');
  },

  // Paystation radio
  payStation: function() {
    // Show
    paymentType.payStationMsg.show().addClass('fade-in');

    // Hide
    paymentType.theForm.hide();
    paymentType.introOne.hide();
    paymentType.introTwo.hide();
  }

}

// Generic toggle function via click event
$.fn.toggleClick = function() {

  // Store the passed arguments for future reference
  var methods = arguments;
  // Cache the number of methods
  var count = methods.length;

  // Use return this to maintain jQuery chainability
  return this.each(function(i, item){
    // For each element you bind to create a local counter for that element
    var index = 0;
    $(item).click(function(){
      // That when called will apply the 'index' th method to that element
      return methods[index++ % count].apply(this,arguments);
      // The index % count means that we constrain our iterator between 0 and (count-1)
    });
  });

};

// Toggle main menu for palm sized viewports plugin
$.fn.toggleMenu = function() {

  var btn = $('.js-menu-toggle-btn');
  var menu = $(this);
  var toggleClassName = 'is-expanded';

  // Set default ARIA on button
  btn.attr({'aria-expanded' : 'false', 'aria-haspopup' : 'true'});

  // Toggle on click event
  btn.toggleClick(
    // Expanded state
    function() {
      menu.toggleClass(toggleClassName);
      $(this).toggleClass(toggleClassName).attr('aria-expanded', 'true');
    },
    // Collapsed state
    function() {
      menu.toggleClass(toggleClassName);
      $(this).toggleClass(toggleClassName).attr('aria-expanded', 'false');
  })

}

/**
 * Initialise functions
 */

$(function() {

  formLabelFocus();
  fauxLabelFocus();
  determineCardType();
  $('.js-menu-toggle-menu').toggleMenu();

  // Payment type selection for Registration 3
  paymentType.init();
  paymentType.inputPrepaid.change(paymentType.prePaid);
  paymentType.inputPayPerVisit.change(paymentType.payPerVisit);
  paymentType.inputPayStation.change(paymentType.payStation);

});