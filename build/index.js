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

var PREDEFINED_MESSAGES = {
  "minorServiceInterruption": "\n&#9888; We're experiencing a minor service interruption - some features may not work.\n",

  "majorServiceInterruption": "\n&#9888; We're experiencing a major service outage - many features may not work.\n",

  "scheduledMaintenance": "\n&#9888; We're currently undergoing scheduled maintenance - some features may not work.\n"
};

function getMaxZIndex() {
  // Adapted from: https://dash.cloudflare.com/apps/developer/docs/techniques/styles#z-indexes
  var max = 0;
  var elements = document.getElementsByTagName('*');
  Array.prototype.slice.call(elements).forEach(function (element) {
    var zIndex = parseInt(document.defaultView.getComputedStyle(element).zIndex, 10);
    max = zIndex ? Math.max(max, zIndex) : max;
  });
  return max;
}

function MakeIntoBanner(appElement, message, options) {
  /* Mutate the App element into a banner.
   */
  appElement.classList.add('banner');
  if (options.notDismissible) {
    appElement.classList.add('non-dismissible');
  } else {
    appElement.classList.add('dismissible');
  }
  appElement.innerHTML = "\n    <div class=\"message\">\n      " + message + "\n      " + (options.notDismissible ? '' : '<span class="close">x</span>') + "\n    </div>\n  ";
  // If dismissible, add click and keypress handlers.
  if (!options.notDismissible) {
    var clickHandler = function clickHandler(e) {
      // Close the modal on any click.
      appElement.removeEventListener('click', clickHandler);
      appElement.remove();
    };
    appElement.addEventListener('click', clickHandler);

    var keyHandler = function keyHandler(e) {
      // Close the modal if either Escape or Enter was pressed.
      if (e.key === "Escape") {
        appElement.remove();
        window.removeEventListener('keydown', keyHandler);
      }
    };
    window.addEventListener('keydown', keyHandler);
  }
}

function MakeIntoModal(appElement, message, options) {
  /* Mutate the App element into a modal.
   */
  appElement.classList.add('modal');
  if (options.notDismissible) {
    appElement.classList.add('non-dismissible');
  } else {
    appElement.classList.add('dismissible');
  }
  appElement.innerHTML = "\n    <div class=\"message\">\n      " + message + "\n      " + (options.notDismissible ? '' : '<p><button>OK</button></p>') + "\n    </div>\n  ";

  // If dismissible, add click and keypress handlers.
  if (!options.notDismissible) {
    var clickHandler = function clickHandler(e) {
      // Close the modal on any click.
      appElement.remove();
      window.removeEventListener('click', clickHandler);
    };
    window.addEventListener('click', clickHandler);

    var keyHandler = function keyHandler(e) {
      // Close the modal if either Escape or Enter was pressed.
      if (e.key === "Escape" || e.key === "Enter") {
        appElement.remove();
        window.removeEventListener('keydown', keyHandler);
      }
    };
    window.addEventListener('keydown', keyHandler);
  }
}

function init() {
  if (!window.addEventListener) return; // Check for IE9+

  var options = INSTALL_OPTIONS;
  var element = void 0;

  // updateElement runs every time the options are updated.
  // Most of your code will end up inside this function.
  function updateElement() {
    if (!options.enabled || !INSTALL.matchPage(options.pages)) {
      if (element) {
        element.remove();
      }
      return;
    }

    var location = { selector: "body", method: "prepend" };
    element = INSTALL.createElement(location, element);

    // Set the app attribute to your app's dash-delimited alias.
    element.setAttribute("app", "important-message");

    // Get the message content.
    var message = void 0;
    if (options.messageType === "predefined") {
      // Wrap in <p> for consistency with custom message richtext format.
      message = "<p>" + PREDEFINED_MESSAGES[options.predefinedMessage] + "</p>";
    } else {
      message = options.customMessage;
    }

    // Insert the HTML.
    if (options.displayMode === "banner") {
      MakeIntoBanner(element, message, options);
    } else {
      MakeIntoModal(element, message, options);
    }

    // Set the z-index to max + 1
    var maxZIndex = getMaxZIndex();
    element.style.zIndex = maxZIndex + 1;

    // Apply the configurable styles.
    var messageEl = element.querySelector('.message');

    if (options.colorScheme === "predefined") {
      var _options$predefinedCo = options.predefinedColorScheme.split(','),
          _options$predefinedCo2 = _slicedToArray(_options$predefinedCo, 4),
          bgColor = _options$predefinedCo2[0],
          color = _options$predefinedCo2[1],
          buttonBgColor = _options$predefinedCo2[2],
          buttonColor = _options$predefinedCo2[3];

      messageEl.style.backgroundColor = bgColor;
      messageEl.style.color = color;
      // Apply style to dismissible modal button.
      if (options.displayMode === "modal" && !options.notDismissible) {
        var buttonEl = messageEl.querySelector('button');
        buttonEl.style.backgroundColor = buttonBgColor;
        buttonEl.style.color = buttonColor;
      }
    } else {
      messageEl.style.backgroundColor = options.customBackgroundColor;
      messageEl.style.color = options.customTextColor;
    }

    if (options.displayMode === "modal") {
      messageEl.style.borderRadius = options.borderRadius + "px";
    }
  }

  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptions: function setOptions(nextOptions) {
      options = nextOptions;

      updateElement();
    }
  };

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateElement);
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