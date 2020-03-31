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

/***/ "./src/components/Banner.js":
/*!**********************************!*\
  !*** ./src/components/Banner.js ***!
  \**********************************/
/*! exports provided: BannerElement, Banner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannerElement", function() { return BannerElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Banner", function() { return Banner; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/components/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var DEFAULTS = {
  BORDER_RADIUS: 16,
  COLOR_SCHEME: "primary",
  DISMISSIBLE: true,
  FONT_SIZE: 16,
  GRADIENT_LEVEL: 1,
  HORIZONTAL_MARGIN: 0,
  HORIZONTAL_PADDING: 0,
  VERTICAL_MARGIN: 0,
  VERTICAL_PADDING: 0,
  LOCATION: {
    selector: "body",
    method: "prepend"
  },
  MAX_IMAGE_WIDTH: 20
};
var SCHEME_NAME_COLORS_MAP = {
  primary: "#cce5ff,#004085",
  secondary: "#e2e3e5,#383d41",
  success: "#d4edda,#155724",
  danger: "#f8d7da,#721c24",
  warning: "#fff3cd,#856404",
  info: "#d1ecf1,#0c5460",
  light: "#fefefe,#818182",
  dark: "#d6d8d9,#1b1e21"
};

function getColors(colorScheme) {
  /* Return the colors for the specified scheme as the array:
     [<mainBackgroundColor>, <mainColor>]
   */
  return (SCHEME_NAME_COLORS_MAP[colorScheme] || colorScheme).split(",");
}

var STYLE = document.createElement("style");
STYLE.textContent = "\n  .wrapper {\n    display: flex;\n    padding: 1.5em; 1em;\n    font-size: 16px;\n    font-family: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Ubuntu, \"Helvetica Neue\", sans-serif;\n    text-align: left;\n    color: #000;\n    background-color: #fff;\n  }\n\n  .wrapper.dismissible {\n    position: fixed;\n    left: 0;\n    top: 0;\n    right: 0;\n    cursor: pointer;\n    box-shadow: 0 0 1em .2em #444;\n  }\n\n  .wrapper.dismissible.show {\n    animation-duration: .5s;\n    animation-name: slideDown;\n    animation-timing-function: linear;\n  }\n\n  .wrapper.dismissible.hide {\n    animation-duration: .25s;\n    animation-name: slideDown;\n    animation-timing-function: linear;\n    animation-direction: reverse;\n  }\n\n  .message {\n    display: inline;\n    flex-grow: 1;\n  }\n\n  button {\n    margin: 0;\n    padding: 0;\n    background-color: transparent;\n    border: none;\n    font-family: arial;\n    font-size: inherit;\n  }\n\n  @keyframes slideDown {\n    from {\n      transform: translate(0, -150%);\n    }\n\n    to {\n      transform: translate(0, 0);\n    }\n  }\n\n  p {\n    margin: 0;\n  }\n";
var BannerElement = /*#__PURE__*/function (_HTMLElement) {
  _inherits(BannerElement, _HTMLElement);

  var _super = _createSuper(BannerElement);

  function BannerElement() {
    var _this;

    _classCallCheck(this, BannerElement);

    _this = _super.call(this);
    _this.eventListenerRemovers = []; // Define the shadow DOM and attach the <style> element.

    _this.shadow = _this.attachShadow({
      mode: "open"
    });

    _this.shadow.appendChild(STYLE); // Define the accessibility attributes.


    _this.setAttribute("role", "banner");

    _this.setAttribute("aria-label", "Important Message");

    return _this;
  }

  _createClass(BannerElement, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      // Get the configuration attributes.
      // String-type
      var getStr = function getStr() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _utils_js__WEBPACK_IMPORTED_MODULE_0__["getStrAttr"].apply(void 0, [_this2].concat(args));
      };

      var message = getStr("message").replace(/@quot;/g, '"');
      var colorScheme = getStr("color-scheme", DEFAULTS.COLOR_SCHEME); // Bool-type

      var getBool = function getBool() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _utils_js__WEBPACK_IMPORTED_MODULE_0__["getBoolAttr"].apply(void 0, [_this2].concat(args));
      };

      var dismissible = getBool("dismissible", DEFAULTS.DISMISSIBLE); // Int-type

      var getInt = function getInt() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return _utils_js__WEBPACK_IMPORTED_MODULE_0__["getIntAttr"].apply(void 0, [_this2].concat(args));
      };

      var borderRadius = getInt("border-radius", DEFAULTS.BORDER_RADIUS);
      var maxImageWidth = getInt("max-image-width", DEFAULTS.MAX_IMAGE_WIDTH); // Float-type

      var getFloat = function getFloat() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return _utils_js__WEBPACK_IMPORTED_MODULE_0__["getFloatAttr"].apply(void 0, [_this2].concat(args));
      };

      var fontSize = getFloat("font-size", DEFAULTS.FONT_SIZE);
      var xMargin = getFloat("horizontal-margin", DEFAULTS.HORIZONTAL_MARGIN);
      var yMargin = getFloat("vertical-margin", DEFAULTS.VERTICAL_MARGIN);
      var xPadding = getFloat("horizontal-padding", DEFAULTS.HORIZONTAL_PADDING);
      var yPadding = getFloat("vertical-padding", DEFAULTS.VERTICAL_PADDING);
      var gradientLevel = getFloat("gradient-level", DEFAULTS.GRADIENT_LEVEL); // Define the main wrapper element.

      var _getColors = getColors(colorScheme),
          _getColors2 = _slicedToArray(_getColors, 2),
          bgColor = _getColors2[0],
          color = _getColors2[1];

      var bgRGB = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["hexToRgb"])(bgColor);
      this.wrapperEl = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["Element"])("\n      <div class=\"wrapper show ".concat(dismissible ? "dismissible" : "", "\"\n           style=\"margin: ").concat(yMargin, "em ").concat(xMargin, "em;\n                  color: ").concat(color, ";\n                  border-radius:\n                    ").concat(dismissible ? "0" : borderRadius, "px\n                    ").concat(dismissible ? "0" : borderRadius, "px\n                    ").concat(borderRadius, "px\n                    ").concat(borderRadius, "px;\n                  background-image:\n                    linear-gradient(\n                      0deg,\n                      rgba(").concat(bgRGB.r, ", ").concat(bgRGB.g, ", ").concat(bgRGB.b, ", 1),\n                      rgba(").concat(bgRGB.r, ", ").concat(bgRGB.g, ", ").concat(bgRGB.b, ", ").concat(1 - gradientLevel, ")\n                    );\n                  z-index: ").concat(Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getMaxZIndex"])() + 1, ";\"\n      >\n      </div>\n    "));
      this.shadow.appendChild(this.wrapperEl); // Define the message container element.

      var messageEl = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["Element"])("\n      <div class=\"message\"\n         style=\"font-size: ".concat(fontSize, "px;\n                padding: ").concat(yPadding, "em ").concat(xPadding, "em;\"\n      >\n        ").concat(message, "\n      </div>\n    ")); // Apply max-width to any included images.

      messageEl.querySelectorAll("img").forEach(function (el) {
        var style = el.getAttribute("style") || "";
        el.setAttribute("style", "max-width: ".concat(maxImageWidth, "px; ").concat(style));
      });
      this.wrapperEl.appendChild(messageEl); // Skip adding the button, event listeners, etc. if not dismissible.

      if (!dismissible) {
        return;
      } // Define the dismiss button element.


      var buttonEl = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["Element"])("<button>x</button>");
      this.wrapperEl.appendChild(buttonEl); // Add event listeners.
      // Bold the X on mouse enter.

      this.addEventListener(this, "mouseenter", function (e) {
        buttonEl.style.fontWeight = "bold";
      }); // Unbold the X on mouse leave.

      this.addEventListener(this, "mouseleave", function (e) {
        buttonEl.style.fontWeight = "normal";
      }); // Remove the element on click.

      this.addEventListener(this, "click", function () {
        return _this2.dismiss();
      }); // Remove the element on Escape.

      this.addEventListener(window, "keydown", function (e) {
        if (e.key === "Escape") {
          _this2.dismiss();
        }
      });
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.removeEventListeners();
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(el, event, fn) {
      var _this3 = this;

      if (el instanceof BannerElement) {
        _get(_getPrototypeOf(BannerElement.prototype), "addEventListener", this).call(this, event, fn);

        this.eventListenerRemovers.push(function () {
          return _get(_getPrototypeOf(BannerElement.prototype), "removeEventListener", _this3).call(_this3, event, fn);
        });
      } else {
        el.addEventListener(event, fn);
        this.eventListenerRemovers.push(function () {
          return el.removeEventListener(event, fn);
        });
      }
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      while (this.eventListenerRemovers.length > 0) {
        this.eventListenerRemovers.shift()();
      }
    }
  }, {
    key: "dismiss",
    value: function dismiss() {
      var _this4 = this;

      var el = this.wrapperEl;
      this.addEventListener(el, "animationend", function () {
        return _this4.remove();
      });
      el.classList.remove("show"); // See here for why I'm reading the offsetWidth:
      // https://stackoverflow.com/a/30072037/2327940

      var _ = el.offsetWidth;
      el.classList.add("hide");
    }
  }]);

  return BannerElement;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
function Banner(options, location) {
  /* Helper to instantiate and optionally insert a banner element via
     Javascript.
   */
  // Define helper to get option value if set but otherwise return a default.
  var getOpt = function getOpt(k, defVal) {
    return options[k] === undefined ? defVal : options[k];
  };

  var bannerEl = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["Element"])("\n     <x-banner\n       message=\"".concat(getOpt("message", "").replace(/"/g, "@quot;"), "\"\n       dismissible=\"").concat(getOpt("dismissible", DEFAULTS.DISMISSIBLE), "\"\n       color-scheme=\"").concat(getOpt("colorScheme", DEFAULTS.COLOR_SCHEME), "\"\n       font-size=\"").concat(getOpt("fontSize", DEFAULTS.FONT_SIZE), "\"\n       horizontal-padding=\"").concat(getOpt("horizontalPadding", DEFAULTS.HORIZONTAL_PADDING), "\"\n       vertical-padding=\"").concat(getOpt("verticalPadding", DEFAULTS.VERTICAL_PADDING), "\"\n       horizontal-margin=\"").concat(getOpt("horizontalMargin", DEFAULTS.HORIZONTAL_MARGIN), "\"\n       vertical-margin=\"").concat(getOpt("verticalMargin", DEFAULTS.VERTICAL_MARGIN), "\"\n       border-radius=\"").concat(getOpt("borderRadius", DEFAULTS.BORDER_RADIUS), "\"\n       gradient-level=\"").concat(getOpt("gradientLevel", DEFAULTS.GRADIENT_LEVEL), "\"\n       max-image-width=\"").concat(getOpt("maxImageWidth", DEFAULTS.MAX_IMGAGE_WIDTH), "\"\n     >\n     </x-banner>\n   "));

  if (!location) {
    return bannerEl;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["insertElementAtLocation"])(bannerEl, location.selector, location.method);
    });
  } else {
    Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["insertElementAtLocation"])(bannerEl, location.selector, location.method);
  }
}
customElements.define("x-banner", BannerElement);

/***/ }),

/***/ "./src/components/utils.js":
/*!*********************************!*\
  !*** ./src/components/utils.js ***!
  \*********************************/
/*! exports provided: Element, getMaxZIndex, getPixelScaleFactor, hexToRgb, getAttr, getStrAttr, getBoolAttr, getIntAttr, getFloatAttr, insertElementAtLocation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMaxZIndex", function() { return getMaxZIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPixelScaleFactor", function() { return getPixelScaleFactor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexToRgb", function() { return hexToRgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAttr", function() { return getAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStrAttr", function() { return getStrAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBoolAttr", function() { return getBoolAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIntAttr", function() { return getIntAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFloatAttr", function() { return getFloatAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertElementAtLocation", function() { return insertElementAtLocation; });
function Element(tagNameOrDOMString) {
  var wrapperTag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "div";
  // Return a new Element for a given tag name or DOM string.
  var s = tagNameOrDOMString.trim();
  if (!s.startsWith("<")) return document.createElement(s);
  var wrapper = document.createElement(wrapperTag);
  wrapper.innerHTML = s.trim();
  var el = wrapper.firstChild;

  if (el.nodeName === "#text") {
    throw new Error("Element creation failed. Maybe ".concat(wrapperTag, " is not a valid parent for: ").concat(s));
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
/* Return the specified element attribute, or defaultValue if attribute
   is unspecified.
 */

var getAttr = function getAttr(el, attr, defaultValue) {
  return el.hasAttribute(attr) ? el.getAttribute(attr) : defaultValue;
};
var getStrAttr = getAttr;
var getBoolAttr = function getBoolAttr() {
  return getStrAttr.apply(void 0, arguments) === "true";
};
var getIntAttr = function getIntAttr() {
  return parseInt(getStrAttr.apply(void 0, arguments), 10);
};
var getFloatAttr = function getFloatAttr() {
  return parseFloat(getStrAttr.apply(void 0, arguments));
};
function insertElementAtLocation(element, selector, method) {
  /* Relocate an element to the location specified by selector and method.
   */
  var target = document.querySelector(selector);

  if (target === null) {
    throw new Error("No location found for selector: ".concat(selector));
  }

  var children = target.childNodes;
  var hasChildren = children.length > 0;
  var nextSibling = target.nextSibling;

  switch (method) {
    case "before":
      target.parentNode.insertBefore(element, target);
      break;

    case "after":
      if (nextSibling === null) {
        target.parentNode.appendChild(element);
      } else {
        target.parentNode.insertBefore(element, nextSibling);
      }

      break;

    case "prepend":
      target.insertBefore(element, hasChildren ? children[0] : null);
      break;

    case "append":
      target.appendChild(element);
      break;

    case "replace":
      target.replaceWith(element);
      break;

    default:
      throw new Error("method \"".concat(method, "\" not implemented"));
  }
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Banner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Banner */ "./src/components/Banner.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


 //
// Constants
//

var APP_NAME = "important-message";
var DISMISSED_UNTIL_SESSION_KEY = "".concat(APP_NAME, "-dismissedUntil");
var DISMISSED_MESSAGE_SESSION_KEY = "".concat(APP_NAME, "-dismissedMessage");
var PREDEFINED_MESSAGES = {
  minorServiceInterruption: "&#9888; We're experiencing a minor service interruption - some features may not work.",
  majorServiceInterruption: "&#9888; We're experiencing a major service outage - many features may not work.",
  scheduledMaintenance: "&#9888; We're currently undergoing scheduled maintenance - some features may not work."
}; //
// Variables
//

var options = INSTALL_OPTIONS;
var product = INSTALL_PRODUCT;
var listenerRemovers = [];
var appElement; //
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
    throw new Error("Element creation failed. Maybe ".concat(wrapperTag, " is not a valid parent for: ").concat(tagNameOrDOMString));
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
  while (listenerRemovers.length > 0) {
    listenerRemovers.shift()();
  }
}; //
// Options Getters
//


function getMessageContent() {
  var message;

  switch (options.messageType) {
    case "customPlain":
      // Wrap in <p> for consistency with custom message richtext format and
      // escape HTML to enforce plain-text.
      message = "<p>".concat(escapeHTML(options.customPlainMessage), "</p>");
      break;

    case "customRich":
      ;
      message = options.customRichMessageGroup.message;
      break;

    case "customHTML":
      // Wrap in <p> for consistency with custom message richtext format.
      message = "<p>".concat(options.customHTMLMessage, "</p>");
      break;

    default:
      // Wrap in <p> for consistency with custom message richtext format.
      message = "<p>".concat(PREDEFINED_MESSAGES[options.messageType], "</p>");
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

  return "linear-gradient(0deg, rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", 1), rgba(").concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(finalOpacity, "))");
} //
//  Dismissal Helper Functions
//


var nowMs = Date.now;

var setDismissedUntil = function setDismissedUntil(value) {
  return localStorage.setItem(DISMISSED_UNTIL_SESSION_KEY, "".concat(value));
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
  } // Return a Boolean indicating whether user dismissal is active.


  var dismissedUntil = getDismissedUntil(); // Check for any saved dismissedUntil value.

  if (dismissedUntil === null) {
    return false;
  } // Check whether the dismissal period has expired.


  if (nowMs() >= dismissedUntil) {
    clearDismissalStorage();
    return false;
  } // Check whether the message content has changed since dismissal.


  if (getMessageContent() !== getDismissedMessage()) {
    clearDismissalStorage();
    return false;
  }

  return true;
} //
//  Component Factory Functions
//


function ModalElement(message) {
  var el = Element("<modal role=\"dialog\" aria-modal=\"true\" aria-label=\"Important Message\">\n       <content>\n         <message>".concat(message, "</message>\n         ").concat(options.notDismissible ? "" : "<br><button>".concat(options.buttonText, "</button>"), "\n       </content>\n     </modal>"));
  el.classList.add(options.notDismissible ? "non-dismissible" : "dismissible");

  if (!options.notDismissible) {
    // Add click and keypress handlers.
    // Close the modal on overlay or button click.
    addEventListener(window, "click", function (e) {
      if (e.target.tagName === "MODAL" || e.target.tagName === "BUTTON") {
        dismiss();
      }
    }); // Close the modal if either Escape or Enter was pressed.

    addEventListener(window, "keydown", function (e) {
      if (e.key === "Escape" || e.key === "Enter") {
        dismiss();
      }
    });
  }

  return el;
} //
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
  } // Destructure the options we'll be using.


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
  var location;

  if (displayMode === "banner" && notDismissible) {
    ;
    var _options2 = options;
    location = _options2.location;
  } else {
    location = {
      selector: "body",
      method: "prepend"
    };
  } // Get the message content.


  var message = getMessageContent(); // Get the colors.

  var _getColors = getColors(),
      _getColors2 = _slicedToArray(_getColors, 4),
      bgColor = _getColors2[0],
      color = _getColors2[1],
      buttonBgColor = _getColors2[2],
      buttonColor = _getColors2[3]; // Get the component.


  if (displayMode === "banner") {
    var bannerEl = Object(_components_Banner__WEBPACK_IMPORTED_MODULE_1__["Banner"])({
      borderRadius: borderRadius,
      colorScheme: "".concat(bgColor, ",").concat(color),
      dismissible: !notDismissible,
      fontSize: fontSize * 16,
      horizontalMargin: horizontalMargin,
      horizontalPadding: horizontalPadding,
      message: message,
      verticalMargin: verticalMargin,
      verticalPadding: verticalPadding,
      gradientLevel: options.customBackgroundGradientLevel,
      maxImageWidth: options.customRichMessageGroup.maxImageWidth
    }); // Create the appElement, set the "app" prop, and append the component.

    appElement = INSTALL.createElement(location, appElement);
    appElement.setAttribute("app", APP_NAME);
    appElement.appendChild(bannerEl);
    return;
  }

  var el = ModalElement(message); // Set the z-index to max + 1

  var maxZIndex = getMaxZIndex();
  el.style.zIndex = maxZIndex + 1; // Get the content element.

  var contentEl = displayMode === "modal" ? el.querySelector("content") : el; // Set the font-size and image max-width based on the display pixel density.

  var pixelScaleFactor = getPixelScaleFactor();
  contentEl.style.fontSize = "".concat(16 * pixelScaleFactor, "px"); // Apply the configurable styles.
  // colorScheme

  contentEl.style.backgroundImage = getBackgroundImageGradient(bgColor);
  contentEl.style.color = color; // Apply style to dismissible modal button.

  if (displayMode === "modal" && !notDismissible) {
    var buttonEl = contentEl.querySelector("button");
    buttonEl.style.backgroundColor = buttonBgColor;
    buttonEl.style.color = buttonColor;
  } // fontSize


  var messageEl = contentEl.querySelector("message");
  messageEl.style.fontSize = "".concat(fontSize, "em"); // padding

  messageEl.style.padding = "".concat(verticalPadding, "em ").concat(horizontalPadding, "em ").concat(verticalPadding, "em ").concat(horizontalPadding, "em"); // margin

  if (displayMode === "banner" && notDismissible) {
    contentEl.style.margin = "".concat(verticalMargin, "em ").concat(horizontalMargin, "em ").concat(verticalMargin, "em ").concat(horizontalMargin, "em");
  } // borderRadius


  if (displayMode === "banner" && !notDismissible) {
    // Only style bottom edge of dismissible banner.
    contentEl.style.borderRadius = "0 0 ".concat(borderRadius, "px ").concat(borderRadius, "px");
  } else {
    contentEl.style.borderRadius = "".concat(borderRadius, "px");
  } // image max-width


  if (messageType === "customRich") {
    contentEl.querySelectorAll("img").forEach(function (_el) {
      _el.setAttribute("style", "width: ".concat(options.customRichMessageGroup.maxImageWidth, "px"));
    });
  } // Create the appElement, set the "app" prop, and append the component.


  appElement = INSTALL.createElement(location, appElement);
  appElement.setAttribute("app", APP_NAME);
  appElement.appendChild(el);

  if (!notDismissible && INSTALL_ID !== "preview") {
    // Focus the dismiss button.
    el.querySelector("button").focus();
  }
}

function init() {
  // Check for IE10+
  if (!window.addEventListener || !document.documentElement.classList) {
    return;
  } // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.


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
  }; // This code ensures that the app doesn't run before the page is loaded.

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