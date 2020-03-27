/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _styles = __webpack_require__(/*! ./styles.css */ "./src/styles.css");

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// Constants
//

var APP_NAME = "important-message";
var DISMISSED_UNTIL_SESSION_KEY = APP_NAME + "-dismissedUntil";
var DISMISSED_MESSAGE_SESSION_KEY = APP_NAME + "-dismissedMessage";

var PREDEFINED_MESSAGES = {
  minorServiceInterruption: "&#9888; We're experiencing a minor service interruption - some features may not work.",
  majorServiceInterruption: "&#9888; We're experiencing a major service outage - many features may not work.",
  scheduledMaintenance: "&#9888; We're currently undergoing scheduled maintenance - some features may not work."

  //
  // Variables
  //

};var options = INSTALL_OPTIONS;
var product = INSTALL_PRODUCT;
var appElement = void 0;

//
//  Utility Functions
//

function Element(tagNameOrDOMString) {
  var wrapperTag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "div";

  // Returna new Element for a given tag name or DOM string.
  if (!tagNameOrDOMString.startsWith("<")) return document.createElement(tagNameOrDOMString);
  var wrapper = document.createElement(wrapperTag);
  wrapper.innerHTML = tagNameOrDOMString;
  var el = wrapper.firstChild;
  if (el.nodeName === "#text") {
    throw new Error("Element creation failed. Maybe " + wrapperTag + " is not a valid parent for: " + tagNameOrDOMString);
  }
  wrapper.removeChild(el);
  return el;
}

function getMaxZIndex() {
  // Adapted from: https://dash.cloudflare.com/apps/developer/docs/techniques/styles#z-indexes
  var max = 0;
  var elements = document.getElementsByTagName("*");
  Array.prototype.slice.call(elements).forEach(function (element) {
    var zIndex = parseInt(document.defaultView.getComputedStyle(element).zIndex, 10);
    max = zIndex ? Math.max(max, zIndex) : max;
  });
  return max;
}

function getPixelScaleFactor() {
  // Return the factor with which to scale our absolute pixel values for
  // consistent display across varying resolution displays.
  var el = document.querySelector("meta[name=viewport]");
  if (el !== null && el.content && el.content.includes("width=device-width") && el.content.includes("initial-scale=1")) {
    return 1;
  }
  return window.devicePixelRatio;
}

function escapeHTML(s) {
  var wrapper = Element("div");
  wrapper.innerText = s;
  return wrapper.innerHTML;
}

function hexToRgb(hex) {
  // Adapted from: https://stackoverflow.com/a/5624139/2327940
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var v = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(v);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

//
// Options Getters
//

function getMessageContent() {
  var message = void 0;
  switch (options.messageType) {
    case "customPlain":
      // Wrap in <p> for consistency with custom message richtext format and
      // escape HTML to enforce plain-text.
      message = "<p>" + escapeHTML(options.customPlainMessage) + "</p>";
      break;

    case "customRich":
      ;message = options.customRichMessageGroup.message;

      break;

    case "customHTML":
      // Wrap in <p> for consistency with custom message richtext format.
      message = "<p>" + options.customHTMLMessage + "</p>";
      break;

    default:
      // Wrap in <p> for consistency with custom message richtext format.
      message = "<p>" + PREDEFINED_MESSAGES[options.messageType] + "</p>";
      break;
  }
  return message;
}

function getColors() {
  if (options.colorScheme !== "custom") {
    return options.colorScheme.split(",");
  }
  return [options.customBackgroundColor, options.customTextColor, options.customButtonBackgroundColor, options.customButtonTextColor];
}

function getBackgroundImageGradient(hex) {
  var finalOpacity = options.colorScheme === "custom" ? 1 - options.customBackgroundGradientLevel : 0.5;

  var _hexToRgb = hexToRgb(hex),
      r = _hexToRgb.r,
      g = _hexToRgb.g,
      b = _hexToRgb.b;

  return "linear-gradient(0deg, rgba(" + r + ", " + g + ", " + b + ", 1), rgba(" + r + ", " + g + ", " + b + ", " + finalOpacity + "))";
}

//
//  Dismissal Helper Functions
//

var nowMs = Date.now;

var setDismissedUntil = function setDismissedUntil(value) {
  return localStorage.setItem(DISMISSED_UNTIL_SESSION_KEY, "" + value);
};

var getDismissedUntil = function getDismissedUntil() {
  var dismissedUntil = localStorage.getItem(DISMISSED_UNTIL_SESSION_KEY);
  return dismissedUntil === null ? null : parseInt(dismissedUntil, 10);
};

var setDismissedMessage = function setDismissedMessage(message) {
  return localStorage.setItem(DISMISSED_MESSAGE_SESSION_KEY, message);
};

var getDismissedMessage = function getDismissedMessage() {
  return localStorage.getItem(DISMISSED_MESSAGE_SESSION_KEY);
};

var clearDismissalStorage = function clearDismissalStorage() {
  localStorage.removeItem(DISMISSED_UNTIL_SESSION_KEY);
  localStorage.removeItem(DISMISSED_MESSAGE_SESSION_KEY);
};

function dismiss() {
  // Set the dismissedUntil time and remove the element from the DOM.
  var _options$dismissalPer = options.dismissalPeriodGroup,
      minutes = _options$dismissalPer.minutes,
      multipler = _options$dismissalPer.multipler;

  if (minutes > 0) {
    var dismissedUntil = nowMs() + minutes * parseInt(multipler, 10) * 1000 * 60;
    setDismissedUntil(dismissedUntil);
    setDismissedMessage(getMessageContent());
  }
  appElement.remove();
}

function isDismissed() {
  // Return a Boolean indicating whether user dismissal is active.
  var dismissedUntil = getDismissedUntil();
  // Check for any saved dismissedUntil value.
  if (dismissedUntil === null) {
    return false;
  }
  // Check whether the dismissal period has expired.
  if (nowMs() >= dismissedUntil) {
    clearDismissalStorage();
    return false;
  }
  // Check whether the message content has changed since dismissal.
  if (getMessageContent() !== getDismissedMessage()) {
    clearDismissalStorage();
    return false;
  }
  return true;
}

//
//  appElement Mutation Functions
//

function configureAppElementAsBanner(message) {
  // Mutate the App element into a banner.
  appElement.classList.add("banner");
  if (options.notDismissible) {
    appElement.classList.add("non-dismissible");
  } else {
    appElement.classList.add("dismissible");
  }
  appElement.appendChild(Element("<message>\n           " + (options.notDismissible ? "" : "<closer>x</closer>") + "\n           " + message + "\n         </message>"));

  // If dismissible, add click and keypress handlers.
  if (!options.notDismissible) {
    var closerEl = appElement.querySelector("closer");

    // Bold the X on mouse enter.
    appElement.addEventListener("mouseenter", function (e) {
      closerEl.style.fontWeight = "bold";
    });

    // Unbold the X on mouse leave.
    appElement.addEventListener("mouseleave", function (e) {
      closerEl.style.fontWeight = "normal";
    });

    // Remove the element on click.
    appElement.addEventListener("click", function (e) {
      return dismiss();
    });

    // Remove the element on Escape.
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        dismiss();
      }
    });
  }
}

function configureAppElementAsModal(message) {
  // Mutate the App element into a modal.
  appElement.classList.add("modal");
  if (options.notDismissible) {
    appElement.classList.add("non-dismissible");
  } else {
    appElement.classList.add("dismissible");
  }
  appElement.appendChild(Element("<message>\n           " + message + "\n           " + (options.notDismissible ? "" : "<br><closer>" + options.buttonText + "</closer>") + "\n         </message>"));

  // If dismissible, add click and keypress handlers.
  if (!options.notDismissible) {
    // Close the modal on overlay or button click.
    window.addEventListener("click", function (e) {
      if (e.target.tagName === "CLOUDFLARE-APP" || e.target.tagName === "CLOSER") {
        dismiss();
      }
    });

    // Close the modal if either Escape or Enter was pressed.
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" || e.key === "Enter") {
        dismiss();
      }
    });
  }
}

//
// updateElement Function
//

function updateElement() {
  if (!options.enabled || !INSTALL.matchPage(options.pages) || isDismissed()) {
    if (appElement) {
      appElement.remove();
    }
    return;
  }

  var location = void 0;
  if (options.displayMode === "banner" && options.notDismissible) {
    ;var _options = options;
    location = _options.location;
  } else {
    location = { selector: "body", method: "prepend" };
  }
  appElement = INSTALL.createElement(location, appElement);

  // Set the app attribute to your app's dash-delimited alias.
  appElement.setAttribute("app", APP_NAME);

  // Set the font-size and image max-width based on the display pixel density.
  var pixelScaleFactor = getPixelScaleFactor();
  appElement.style.fontSize = 16 * pixelScaleFactor + "px";

  // Get the message content.
  var message = getMessageContent();

  // Wrap in a <message-inner> element for padding control.
  message = "<message-inner>" + message + "</message-inner>";

  // Insert the HTML.
  if (options.displayMode === "banner") {
    configureAppElementAsBanner(message);
  } else {
    configureAppElementAsModal(message);
  }

  // Set the z-index to max + 1
  var maxZIndex = getMaxZIndex();
  appElement.style.zIndex = maxZIndex + 1;

  // Apply the configurable styles.
  var messageEl = appElement.querySelector("message");

  // colorScheme

  var _getColors = getColors(),
      _getColors2 = _slicedToArray(_getColors, 4),
      bgColor = _getColors2[0],
      color = _getColors2[1],
      buttonBgColor = _getColors2[2],
      buttonColor = _getColors2[3];

  messageEl.style.backgroundImage = getBackgroundImageGradient(bgColor);
  messageEl.style.color = color;
  // Apply style to dismissible modal button.
  if (options.displayMode === "modal" && !options.notDismissible) {
    var buttonEl = messageEl.querySelector("closer");
    buttonEl.style.backgroundColor = buttonBgColor;
    buttonEl.style.color = buttonColor;
  }

  // fontSize
  var messageInnerEl = messageEl.querySelector("message-inner");
  messageInnerEl.style.fontSize = options.fontSize + "em";

  // padding
  messageInnerEl.style.padding = options.verticalPadding + "em " + options.horizontalPadding + "em " + options.verticalPadding + "em " + options.horizontalPadding + "em";

  // borderRadius
  if (options.displayMode === "modal") {
    messageEl.style.borderRadius = options.borderRadius + "px";
  }

  // image max-width
  if (options.messageType === "customRich") {
    messageEl.querySelectorAll("img").forEach(function (el) {
      el.setAttribute("style", "max-width: " + options.customRichMessageGroup.maxImageWidth * pixelScaleFactor + "px");
    });
  }
}

function init() {
  if (!window.addEventListener) return; // Check for IE9+

  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptions: function setOptions(nextOptions) {
      options = nextOptions;
      clearDismissalStorage();
      updateElement();
    },
    setProduct: function setProduct(nextProduct) {
      product = nextProduct;
      updateElement();
    }
  };

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      return updateElement();
    });
  } else {
    updateElement();
  }
}

init();

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "styles.css";

/***/ })

/******/ });