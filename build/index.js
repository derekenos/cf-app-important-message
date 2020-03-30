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
var listenerRemovers = [];
var appElement = void 0;

//
//  Utility Functions
//

var parseDecInt = function parseDecInt(s) {
  return parseInt(s, 10);
};

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
    var zIndex = parseDecInt(document.defaultView.getComputedStyle(element).zIndex);
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

function addEventListener(el, event, fn) {
  // Add an event listener and add the remover to listenerRemovers.
  el.addEventListener(event, fn);
  listenerRemovers.push(function () {
    return el.removeEventListener(event, fn);
  });
}

var removeListeners = function removeListeners() {
  // DEBUG
  console.log("Removing " + listenerRemovers.length + " listeners");
  while (listenerRemovers.length > 0) {
    listenerRemovers.shift()();
  }
};

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

function getDismissedUntilMinutes() {
  if (options.dismissedUntilMinutes !== "custom") {
    return parseDecInt(options.dismissedUntilMinutes);
  }
  return options.customDismissalPeriodGroup.minutes * parseDecInt(options.customDismissalPeriodGroup.multiplier);
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
  return dismissedUntil === null ? null : parseDecInt(dismissedUntil);
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
  if (options.notDismissible) {
    clearDismissalStorage();
  } else {
    var dismissalPeriodMs = getDismissedUntilMinutes() * 60 * 1000;
    if (dismissalPeriodMs > 0) {
      setDismissedUntil(nowMs() + dismissalPeriodMs);
      setDismissedMessage(getMessageContent());
    }
  }
  removeListeners();
  appElement.remove();
}

function isDismissed() {
  if (options.notDismissible) {
    return false;
  }
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
//  Component Factory Functions
//

function BannerElement(message) {
  var el = Element("<banner class=\"show\">\n       <message>" + message + "</message>\n       " + (options.notDismissible ? "" : "<button>x</button>") + "\n     </banner>");

  el.classList.add(options.notDismissible ? "non-dismissible" : "dismissible");

  if (!options.notDismissible) {
    // Add click and keypress handlers.
    var close = function close() {
      addEventListener(el, "animationend", dismiss);
      el.classList.remove("show");
      // See here for why I'm reading the offsetWidth:
      // https://stackoverflow.com/a/30072037/2327940
      var _ = el.offsetWidth;
      el.classList.add("hide");
    };

    // Bold the X on mouse enter.
    var buttonEl = el.querySelector("button");
    addEventListener(el, "mouseenter", function (e) {
      buttonEl.style.fontWeight = "bold";
    });

    // Unbold the X on mouse leave.
    addEventListener(el, "mouseleave", function (e) {
      buttonEl.style.fontWeight = "normal";
    });

    // Remove the element on click.
    addEventListener(el, "click", function (e) {
      close();
    });

    // Remove the element on Escape.
    addEventListener(window, "keydown", function (e) {
      if (e.key === "Escape") {
        close();
      }
    });
  }

  return el;
}

function ModalElement(message) {
  var el = Element("<modal>\n       <content>\n         <message>" + message + "</message>\n         " + (options.notDismissible ? "" : "<br><button>" + options.buttonText + "</button>") + "\n       </content>\n     </modal>");

  el.classList.add(options.notDismissible ? "non-dismissible" : "dismissible");

  if (!options.notDismissible) {
    // Add click and keypress handlers.

    // Close the modal on overlay or button click.
    addEventListener(window, "click", function (e) {
      if (e.target.tagName === "MODAL" || e.target.tagName === "BUTTON") {
        dismiss();
      }
    });

    // Close the modal if either Escape or Enter was pressed.
    addEventListener(window, "keydown", function (e) {
      if (e.key === "Escape" || e.key === "Enter") {
        dismiss();
      }
    });
  }

  return el;
}

//
// updateElement Function
//

function updateElement() {
  // Remove any existing event listeners.
  removeListeners();

  if (!options.enabled || !INSTALL.matchPage(options.pages) || isDismissed()) {
    if (appElement) {
      appElement.remove();
    }
    return;
  }

  // Destructure the options we'll be using.
  var _options = options,
      displayMode = _options.displayMode,
      fontSize = _options.fontSize,
      verticalPadding = _options.verticalPadding,
      horizontalPadding = _options.horizontalPadding,
      notDismissible = _options.notDismissible,
      verticalMargin = _options.verticalMargin,
      horizontalMargin = _options.horizontalMargin,
      borderRadius = _options.borderRadius,
      messageType = _options.messageType;


  var location = void 0;
  if (displayMode === "banner" && notDismissible) {
    ;var _options2 = options;
    location = _options2.location;
  } else {
    location = { selector: "body", method: "prepend" };
  }

  // Get the message content.
  var message = getMessageContent();

  // Get the component.
  var el = (displayMode === "banner" ? BannerElement : ModalElement)(message);

  // Set the z-index to max + 1
  var maxZIndex = getMaxZIndex();
  el.style.zIndex = maxZIndex + 1;

  // Get the content element.
  var contentEl = displayMode === "modal" ? el.querySelector("content") : el;

  // Set the font-size and image max-width based on the display pixel density.
  var pixelScaleFactor = getPixelScaleFactor();
  contentEl.style.fontSize = 16 * pixelScaleFactor + "px";

  // Apply the configurable styles.

  // colorScheme

  var _getColors = getColors(),
      _getColors2 = _slicedToArray(_getColors, 4),
      bgColor = _getColors2[0],
      color = _getColors2[1],
      buttonBgColor = _getColors2[2],
      buttonColor = _getColors2[3];

  contentEl.style.backgroundImage = getBackgroundImageGradient(bgColor);
  contentEl.style.color = color;
  // Apply style to dismissible modal button.
  if (displayMode === "modal" && !notDismissible) {
    var buttonEl = contentEl.querySelector("button");
    buttonEl.style.backgroundColor = buttonBgColor;
    buttonEl.style.color = buttonColor;
  }

  // fontSize
  var messageEl = contentEl.querySelector("message");
  messageEl.style.fontSize = fontSize + "em";

  // padding
  messageEl.style.padding = verticalPadding + "em " + horizontalPadding + "em " + verticalPadding + "em " + horizontalPadding + "em";

  // margin
  if (displayMode === "banner" && notDismissible) {
    contentEl.style.margin = verticalMargin + "em " + horizontalMargin + "em " + verticalMargin + "em " + horizontalMargin + "em";
  }

  // borderRadius
  if (displayMode === "banner" && !notDismissible) {
    // Only style bottom edge of dismissible banner.
    contentEl.style.borderRadius = "0 0 " + borderRadius + "px " + borderRadius + "px";
  } else {
    contentEl.style.borderRadius = borderRadius + "px";
  }

  // image max-width
  if (messageType === "customRich") {
    contentEl.querySelectorAll("img").forEach(function (_el) {
      _el.setAttribute("style", "max-width: " + options.customRichMessageGroup.maxImageWidth + "%");
    });
  }

  // Create the appElement, set the "app" prop, and append the component.
  appElement = INSTALL.createElement(location, appElement);
  appElement.setAttribute("app", APP_NAME);
  appElement.appendChild(el);
}

function init() {
  // Check for IE10+
  if (!window.addEventListener || !document.documentElement.classList) {
    return;
  }

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