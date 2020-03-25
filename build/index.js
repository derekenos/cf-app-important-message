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
      return appElement.remove();
    });

    // Remove the element on Escape.
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        appElement.remove();
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
        appElement.remove();
      }
    });

    // Close the modal if either Escape or Enter was pressed.
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" || e.key === "Enter") {
        appElement.remove();
      }
    });
  }
}

//
// updateElement Function
//

function updateElement() {
  if (!options.enabled || !INSTALL.matchPage(options.pages)) {
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
  appElement.setAttribute("app", "important-message");

  // Set the font-size based on the display pixel density.
  appElement.style.fontSize = 16 * getPixelScaleFactor() + "px";

  // Get the message content.
  var message = void 0;
  switch (options.messageType) {
    case "predefined":
      // Wrap in <p> for consistency with custom message richtext format.
      message = "<p>" + PREDEFINED_MESSAGES[options.predefinedMessage] + "</p>";
      break;

    case "customPlain":
      // Wrap in <p> for consistency with custom message richtext format.
      message = "<p>" + options.customPlainMessage + "</p>";
      break;

    case "customRich":
      message = options.customRichMessage;
      break;

    default:
      break;
  }

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
  if (options.colorScheme === "predefined") {
    var _options$predefinedCo = options.predefinedColorScheme.split(","),
        _options$predefinedCo2 = _slicedToArray(_options$predefinedCo, 4),
        bgColor = _options$predefinedCo2[0],
        color = _options$predefinedCo2[1],
        buttonBgColor = _options$predefinedCo2[2],
        buttonColor = _options$predefinedCo2[3];

    messageEl.style.backgroundColor = bgColor;
    messageEl.style.color = color;
    // Apply style to dismissible modal button.
    if (options.displayMode === "modal" && !options.notDismissible) {
      var buttonEl = messageEl.querySelector("closer");
      buttonEl.style.backgroundColor = buttonBgColor;
      buttonEl.style.color = buttonColor;
    }
  } else {
    messageEl.style.backgroundColor = options.customBackgroundColor;
    messageEl.style.color = options.customTextColor;
    if (options.displayMode === "modal" && !options.notDismissible) {
      var _buttonEl = messageEl.querySelector("closer");
      _buttonEl.style.backgroundColor = options.customButtonBackgroundColor;
      _buttonEl.style.color = options.customButtonTextColor;
    }
  }

  // fontSize
  messageEl.style.fontSize = options.fontSize + "em";

  // padding
  var messageInnerEl = messageEl.querySelector("message-inner");
  messageInnerEl.style.padding = options.verticalPadding + "em " + options.horizontalPadding + "em " + options.verticalPadding + "em " + options.horizontalPadding + "em";

  // borderRadius
  if (options.displayMode === "modal") {
    messageEl.style.borderRadius = options.borderRadius + "px";
  }
}

function init() {
  if (!window.addEventListener) return; // Check for IE9+

  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptions: function setOptions(nextOptions) {
      options = nextOptions;
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