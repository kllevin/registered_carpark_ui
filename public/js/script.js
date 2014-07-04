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
 * Avoid `console` errors in browsers that lack a console.
 */

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


/**
 * Do stuff on DOM ready
 */

$(function() {

	/**
	 * Apply a style hook to each form field module when their inputs are focused
	 */
	var inputContainer = '.form-field';

	$(inputContainer).on('focus blur', 'input, select', function() {
	  var input = $(this);
	  //debugger;
	  setTimeout(function() {
	  	input.closest(inputContainer).toggleClass('is-focused', input.is(':focus'));
	  }, 0 );
	});

});