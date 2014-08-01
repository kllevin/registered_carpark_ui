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

    // Radio inputs
    this.inputPayAtCentre = $('.js-payment-type-pay-centre-input');
    this.inputPayCreditCard = $('.js-payment-type-pay-credit-card-input');

    // The elements to hide/show
    this.payAtCentreMsg = $('.js-payment-type-pay-centre-msg');
    this.payCreditCardMsg = $('.js-payment-type-pay-credit-card-msg');
    this.theForm = $('.js-payment-type-form');

  },

  // Pay at centre radio
  payAtCentre: function() {
    // Show
    paymentType.payAtCentreMsg.removeClass('js-enabled-hide').addClass('fade-in');

    // Hide
    paymentType.theForm.addClass('js-enabled-hide');
    paymentType.payCreditCardMsg.addClass('js-enabled-hide');
  },

  // Pay by credit card radio
  payCreditCard: function() {
    // Show
    paymentType.payCreditCardMsg.removeClass('js-enabled-hide').addClass('fade-in');
    paymentType.theForm.removeClass('js-enabled-hide').addClass('fade-in');

    // Hide
    paymentType.payAtCentreMsg.addClass('js-enabled-hide');
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

};

// Add and remove additional vehicles for the Modify Vehicle screen
var addRemoveVehicles = function() {

  // Elements
  var addBtn = $('.js-license-plate-add-btn');
  var removeBtn = $('.js-license-plate-remove-btn');
  var hideShow = 'js-hide-show';
  var additionVehicle = $('.js-license-plate-additional');
  var additionVehicleContainer = $('.js-license-plate-additional-container');

  // Add
  addBtn.on('click', function() {
    additionVehicleContainer.removeClass(hideShow);
    additionVehicle.filter('.' + hideShow).eq(0).removeClass(hideShow).focus();
    if (additionVehicle.filter('.' + hideShow).length == 0) {
      addBtn.addClass(hideShow);
    }
  });

  // Remove
  removeBtn.on('click', function() {
    $(this).parent(additionVehicle).addClass(hideShow);
    if (additionVehicle.not('.' + hideShow).length == 0) {
      additionVehicleContainer.addClass(hideShow);
    }
    addBtn.removeClass(hideShow);
  });
}

/**
 * Initialise functions
 */

$(function() {

  formLabelFocus();
  fauxLabelFocus();
  determineCardType();
  addRemoveVehicles();
  $('.js-menu-toggle-menu').toggleMenu();

  // Payment type selection for Registration 3
  paymentType.init();
  paymentType.inputPayCreditCard.change(paymentType.payCreditCard);
  paymentType.inputPayAtCentre.change(paymentType.payAtCentre);

});