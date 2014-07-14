/* ======================================================================================
   @MASTER JAVASCRIPT
   ====================================================================================== */

/**
 * Handy elements to keep cached
 */

var htmlElement = $('html');
var telLinks = $('a[href^="tel:"]');

/**
 * Detect touch/non-touch
 */

var isTouch = ('ontouchstart' in window) ||
							window.DocumentTouch &&
							document instanceof DocumentTouch;

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

var isiOS = navigator.userAgent.match(/iPhone/i) ||
						navigator.userAgent.match(/iPad/i) ||
						navigator.userAgent.match(/iPod/i);

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

  var determineCardTypeElem = $('.js-credit-card-type');
  var determineCardTypeAmex = $('.js-credit-card-type-amex');
  var determineCardTypeVisa = $('.js-credit-card-type-visa');
  var determineCardTypeMc = $('.js-credit-card-type-mc');

  var determineCardTypeEvent = function() {
    var firstNum = $(this).val().slice(0,1);
    determineCardTypeElem.removeClass('is-visible').removeClass('is-invisible');
    switch(firstNum) {
      case '3':
        determineCardTypeAmex.addClass('is-visible');
        determineCardTypeVisa.addClass('is-invisible');
        determineCardTypeMc.addClass('is-invisible');
        break;
      case '4':
        determineCardTypeVisa.addClass('is-visible');
        determineCardTypeAmex.addClass('is-invisible');
        determineCardTypeMc.addClass('is-invisible');
        break;
      case '5':
        determineCardTypeMc.addClass('is-visible');
        determineCardTypeAmex.addClass('is-invisible');
        determineCardTypeVisa.addClass('is-invisible');
        break;
    }
  }

  $(document).on('keyup', '.js-credit-card-type-input', determineCardTypeEvent);
}

// Payment type selection for Registration 3
var paymentTypeSelection = function() {

  // Hide elements on page load
  var hideByDefault = $('.js-payment-type-default-hide');

  // Radio inputs
  var inputPrepaid = $('.js-payment-type-prepaid-input');
  var inputPayPerVisit = $('.js-payment-type-pay-per-visit-input');
  var inputPayStation = $('.js-payment-type-paystation-input');

  // Hide/show elements based on the above radio inputs
  var hidePayPerVisit = $('.js-payment-type-pay-per-visit-hide');
  var showPayPerVisit = $('.js-payment-type-pay-per-visit-show');
  var hidePrepaid = $('.js-payment-type-prepaid-hide');
  var hidePayStation = $('.js-payment-type-paystation-hide');
  var showPayStation = $('.js-payment-type-paystation-show');

  // Misc
  var miscPaymentTypeGridItem = $('.js-payment-type-grid-item-full');

  // Hide by default
  hideByDefault.hide();

  // Prepaid radio
  inputPrepaid.change(function() {
    showPayStation.hide();
    hidePayStation.show();
    hidePrepaid.show();
    hidePayPerVisit.show();
    showPayPerVisit.hide();
    // Make the grid item half width to balance the grid rows
    miscPaymentTypeGridItem.removeClass('one-whole').addClass('non-palm-one-half');
  });

  // Pay per visit radio
  inputPayPerVisit.change(function() {
    hidePayPerVisit.hide();
    showPayPerVisit.show();
    hidePrepaid.hide();
    hidePayStation.show();
    showPayStation.hide();
    // Make the grid item full width to balance the grid rows
    miscPaymentTypeGridItem.addClass('one-whole').removeClass('non-palm-one-half');
  });

  // Paystation radio
  inputPayStation.change(function() {
    showPayStation.show();
    hidePayStation.hide();
  });

}

/**
 * Initialise functions
 */

$(function() {

  formLabelFocus();
  fauxLabelFocus();
  determineCardType();
  paymentTypeSelection();

});