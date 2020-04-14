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
/*! exports provided: BannerComponent, Banner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannerComponent", function() { return BannerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Banner", function() { return Banner; });
/* harmony import */ var _Base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.js */ "./src/components/Base.js");
/* harmony import */ var _Dismissible_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dismissible.js */ "./src/components/Dismissible.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./src/components/utils.js");
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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




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

var styleFactory = function styleFactory(vars) {
  return "\n  .wrapper {\n    display: flex;\n    font-size: ".concat(vars.fontSize * vars.PX_SCALE_FACTOR, "px;\n    font-family: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Ubuntu, \"Helvetica Neue\", sans-serif;\n    text-align: left;\n    color: #000;\n    background-color: #fff;\n    margin: ").concat(vars.verticalMargin * vars.PX_SCALE_FACTOR, "px\n            ").concat(vars.horizontalMargin * vars.PX_SCALE_FACTOR, "px;\n    border-radius: ").concat(vars.borderRadius * vars.PX_SCALE_FACTOR, "px;\n    z-index: ").concat(vars.MAX_Z_INDEX + 1, ";\n  }\n\n  .wrapper.dismissible {\n    position: fixed;\n    left: 0;\n    top: 0;\n    right: 0;\n    cursor: pointer;\n    box-shadow: 0 0 16px 4px #444;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n    margin: 0;\n  }\n\n  .wrapper.dismissible.show {\n    animation-duration: .5s;\n    animation-name: slideDown;\n    animation-timing-function: linear;\n  }\n\n  .wrapper.dismissible.hide {\n    animation-duration: .25s;\n    animation-name: slideDown;\n    animation-timing-function: linear;\n    animation-direction: reverse;\n  }\n\n  .message {\n    display: inline;\n    flex-grow: 1;\n    padding: ").concat(vars.verticalPadding * vars.PX_SCALE_FACTOR, "px\n             ").concat(vars.horizontalPadding * vars.PX_SCALE_FACTOR, "px;\n  }\n\n  .wrapper.dismissible .message {\n    padding: ").concat((vars.verticalPadding + 4) * vars.PX_SCALE_FACTOR, "px\n             ").concat((vars.horizontalPadding + 16) * vars.PX_SCALE_FACTOR, "px;\n  }\n\n  .message img {\n    max-width: ").concat(vars.maxImageWidth * vars.PX_SCALE_FACTOR, "px;\n  }\n\n  .button-wrapper {\n    padding: ").concat(4 * vars.PX_SCALE_FACTOR, "px ").concat(32 * vars.PX_SCALE_FACTOR, "px;\n    font-weight: normal;\n    position: relative;\n  }\n\n  .button-wrapper.highlight {\n    background-color: rgba(255, 255, 255, .25);\n    box-shadow: -1px 0px 8px #888;\n    border-radius: ").concat(vars.borderRadius, "px;\n    border-top-right-radius: 0;\n  }\n\n  .button-wrapper:hover {\n    font-weight: bold;\n  }\n\n  button {\n    margin: 0;\n    padding: 0;\n    background-color: transparent;\n    border: none;\n    font-family: monospace;\n    font-size: ").concat(16 * vars.PX_SCALE_FACTOR, "px;\n    font-weight: inherit;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    cursor: pointer;\n  }\n\n  @keyframes slideDown {\n    from {\n      transform: translate(0, -150%);\n    }\n\n    to {\n      transform: translate(0, 0);\n    }\n  }\n\n  a {\n    text-decoration: none;\n  }\n\n  p {\n    margin: 0;\n  }\n");
};

var propNameTypeDefaults = [["bannerUrl", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].STRING, ""], ["borderRadius", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].INTEGER, 16], ["colorScheme", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].STRING, "primary"], ["dismissible", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].BOOLEAN, true], ["fontSize", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].INTEGER, 16], ["gradientLevel", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].FLOAT, 1.0], ["horizontalMargin", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].FLOAT, 0], ["horizontalPadding", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].FLOAT, 0], ["id", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].STRING, ""], ["maxImageWidth", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].INTEGER, 20], ["message", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].HTML, "A default message"], ["verticalMargin", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].FLOAT, 0], ["verticalPadding", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].FLOAT, 16]];
var BannerComponent = /*#__PURE__*/function (_Dismissible) {
  _inherits(BannerComponent, _Dismissible);

  var _super = _createSuper(BannerComponent);

  function BannerComponent() {
    _classCallCheck(this, BannerComponent);

    return _super.call(this, [propNameTypeDefaults], {
      styleFactory: styleFactory
    });
  }

  _createClass(BannerComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      _get(_getPrototypeOf(BannerComponent.prototype), "connectedCallback", this).call(this); // If dismissal is active, remove the component.


      if (this.isDismissed()) {
        this.remove();
        return;
      } // Define the accessibility attributes.


      this.setAttribute("role", "banner");
      this.setAttribute("aria-label", "Important Message"); // Get the configuration properties.

      var _this$props = this.props,
          colorScheme = _this$props.colorScheme,
          dismissible = _this$props.dismissible,
          gradientLevel = _this$props.gradientLevel,
          message = _this$props.message;
      var bannerUrl = this.props.bannerUrl; // Since <a>'s can't be nested, check for the condition where both
      // bannerUrl is specified and the message contains an <a> tag. When this
      // happens, give priority to the message by removing bannerUrl and emit a
      // warning.

      if (bannerUrl && message.includes("</a>")) {
        bannerUrl = "";
        console.warn("Banner URL disabled because message includes an <a> tag");
      } // Define the main wrapper element.


      var _split = (SCHEME_NAME_COLORS_MAP[colorScheme] || colorScheme).split(","),
          _split2 = _slicedToArray(_split, 2),
          bgColor = _split2[0],
          color = _split2[1];

      var bgRGB = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["hexToRgb"])(bgColor);
      this.shadow.appendChild(Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["Element"])("\n      ".concat(bannerUrl ? "<a href=\"".concat(bannerUrl, "\">") : "", "\n      <div class=\"wrapper show ").concat(dismissible ? "dismissible" : "", "\"\n           style=\"color: ").concat(color, ";\n                  background-image:\n                    linear-gradient(\n                      0deg,\n                      rgba(").concat(bgRGB.r, ", ").concat(bgRGB.g, ", ").concat(bgRGB.b, ", 1),\n                      rgba(").concat(bgRGB.r, ", ").concat(bgRGB.g, ", ").concat(bgRGB.b, ", ").concat(1 - gradientLevel, ")\n                    );\"\n      >\n        <div class=\"message\">\n          ").concat(message, "\n        </div>\n\n        ").concat(dismissible ? "\n        <div class=\"button-wrapper ".concat(bannerUrl ? "highlight" : "", "\">\n          <button>x</button>\n        </div>\n        ") : "", "\n\n      </div>\n      ").concat(bannerUrl ? "</a>" : "", "\n    ")));
      var wrapperEl = this.shadow.querySelector("div.wrapper"); // Skip adding the button, event listeners, etc. if not dismissible.

      if (!dismissible) {
        return;
      } // Add event listeners.


      var buttonWrapperEl = wrapperEl.querySelector(".button-wrapper"); // If bannerUrl is not defined, bold the X on any mouse hover.

      if (!bannerUrl) {
        this.addEventListener(this, "mouseenter", function () {
          buttonWrapperEl.style.fontWeight = "bold";
        }); // Unbold the X on mouse leave.

        this.addEventListener(this, "mouseleave", function () {
          buttonWrapperEl.style.fontWeight = "normal";
        });
      } // Dismiss on click. If bannerUrl is defined, only listen for clicks on
      // the button, otherwise listen for any click.


      this.addEventListener(bannerUrl ? buttonWrapperEl : this, "click", function (e) {
        _this.dismiss();

        e.preventDefault();
        e.stopPropagation();
      }); // Remove the element on Escape.

      this.addEventListener(window, "keydown", function (e) {
        if (e.key === "Escape") {
          _this.dismiss();
        }
      });
    }
  }, {
    key: "dismiss",
    value: function dismiss() {
      var _this2 = this;

      _get(_getPrototypeOf(BannerComponent.prototype), "dismiss", this).call(this);

      var el = this.shadow.querySelector("div.wrapper");
      this.addEventListener(el, "animationend", function () {
        return _this2.remove();
      });
      el.classList.remove("show"); // See here for why I'm reading the offsetWidth:
      // https://stackoverflow.com/a/30072037/2327940

      void el.offsetWidth;
      el.classList.add("hide");
    }
  }]);

  return BannerComponent;
}(Object(_Dismissible_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_Base_js__WEBPACK_IMPORTED_MODULE_0__["default"]));
var Banner = Object(_Base_js__WEBPACK_IMPORTED_MODULE_0__["ComponentCreator"])("important-message-banner", BannerComponent, [propNameTypeDefaults, _Dismissible_js__WEBPACK_IMPORTED_MODULE_1__["propNameTypeDefaults"]]); // Define a variable into which an external process can inject configuration
// options. If we find at runtime that this has been replaced with an options
// object,use it to extend DEFAULTS, and immediately instantiate a banner.
// Define the injection placeholder and do a runtime mutation to confuse the
// compiler into not optimizing it out.

var INJECTED_OPTIONS = "<INJECT-OPTIONS-HERE>";

INJECTED_OPTIONS = function () {
  return INJECTED_OPTIONS;
}();

if (_typeof(INJECTED_OPTIONS) === "object") {
  var defaultOptions = Object.fromEntries(propNameTypeDefaults.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        attr = _ref2[0],
        defVal = _ref2[2];

    return [attr, defVal];
  }));
  Banner(Object.assign(defaultOptions, INJECTED_OPTIONS));
}

/***/ }),

/***/ "./src/components/Base.js":
/*!********************************!*\
  !*** ./src/components/Base.js ***!
  \********************************/
/*! exports provided: default, ComponentCreator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentCreator", function() { return ComponentCreator; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/components/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



function flattenPropNameTypeDefaults(propNameTypeDefaultsArr) {
  // Flatten propNameTypeDefaultsArr into a single object, asserting
  // that no name is specified multiple times with different types.
  var seenNameTypeMap = {};
  var flattenedPropNameTypeDefaults = [];
  propNameTypeDefaultsArr.forEach(function (propNameTypeDefaults) {
    return propNameTypeDefaults.forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 3),
          name = _ref2[0],
          type = _ref2[1],
          defVal = _ref2[2];

      var seenType = seenNameTypeMap[name];

      if (!seenType || seenType === type) {
        // Name hasn't been seen or has and type is the same.
        flattenedPropNameTypeDefaults.push([name, type, defVal]);
        seenNameTypeMap[name] = type;
      } else {
        // Name has been seen before as a different type.
        throw new Error("Prop name (".concat(name, ") specified as both types (").concat(seenType, ") and (").concat(type, ")"));
      }
    });
  });
  return flattenedPropNameTypeDefaults;
}

var Base = /*#__PURE__*/function (_HTMLElement) {
  _inherits(Base, _HTMLElement);

  var _super = _createSuper(Base);

  function Base(propNameTypeDefaultsArr, options) {
    var _this;

    _classCallCheck(this, Base);

    _this = _super.call(this); // Create an array to collect event listener remover functions.

    _this.eventListenerRemovers = []; // Attach a shadow DOM.

    _this.shadow = _this.attachShadow({
      mode: "open"
    }); // Save some things for later.

    _this.propNameTypeDefaults = flattenPropNameTypeDefaults(propNameTypeDefaultsArr);
    _this.styleFactory = options.styleFactory;
    return _this;
  }

  _createClass(Base, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      // Parse the configured attributes and assign to this.props
      this.props = this.getParsedAttributes(); // Use the style factory to generate the style element content by
      // interpolating with this.props augmented with the following helpful
      // values:

      var vars = {
        PX_SCALE_FACTOR: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getPixelScaleFactor"])(),
        MAX_Z_INDEX: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getMaxZIndex"])()
      };
      var styleEl = document.createElement("style");
      styleEl.textContent = this.styleFactory(Object.assign(vars, this.props));
      this.shadow.appendChild(styleEl);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      // Remove all added event listeners.
      this.removeEventListeners();
    }
  }, {
    key: "getAttribute",
    value: function getAttribute(name, defVal) {
      // Override getAttribute() to allow the specification of a default value.
      return this.hasAttribute(name) ? _get(_getPrototypeOf(Base.prototype), "getAttribute", this).call(this, name) : defVal;
    }
  }, {
    key: "getParsedAttributes",
    value: function getParsedAttributes() {
      var _this2 = this;

      // Use the attribute configuration to parse and return the specified element
      // attribute values.
      var undefinedAttrNames = [];
      var props = Object.fromEntries(this.propNameTypeDefaults.map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 3),
            name = _ref4[0],
            type = _ref4[1],
            defVal = _ref4[2];

        var parser = _utils_js__WEBPACK_IMPORTED_MODULE_0__["STRING_TYPE_PARSER_MAP"][type];
        var attrName = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["camelToKebab"])(name);
        var value = parser(_this2.getAttribute(attrName), defVal);

        if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(value)) {
          undefinedAttrNames.push(attrName);
        }

        return [name, value];
      })); // Check for undefined values.

      if (undefinedAttrNames.length) {
        throw new Error("Undefined required attributes: ".concat(undefinedAttrNames.join(", ")));
      }

      return props;
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(el, event, fn) {
      var _this3 = this;

      // Override the default addEventListener method to allow non-this elements
      // to be specified and to generate and collect listener remover functions.
      if (el instanceof Base) {
        _get(_getPrototypeOf(Base.prototype), "addEventListener", this).call(this, event, fn);

        this.eventListenerRemovers.push(function () {
          return _get(_getPrototypeOf(Base.prototype), "removeEventListener", _this3).call(_this3, event, fn);
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
      // Call and remove all eventListenerRemovers functions.
      while (this.eventListenerRemovers.length > 0) {
        this.eventListenerRemovers.shift()();
      }
    }
  }]);

  return Base;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

/* harmony default export */ __webpack_exports__["default"] = (Base);
function ComponentCreator(tagName, component, propNameTypeDefaultsArr) {
  // Return a function that will create and optionally mount a component.
  // Register the element if necessary.
  try {
    customElements.define(tagName, component);
  } catch (e) {
    console.info(e);
  }

  var propNameTypeDefaults = flattenPropNameTypeDefaults(propNameTypeDefaultsArr);
  return function (attributes) {
    var autoMount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    // Generate an array for formatted element name/value pairs.
    var nameValuePairs = [];
    propNameTypeDefaults.forEach(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 3),
          attr = _ref6[0],
          type = _ref6[1],
          defVal = _ref6[2];

      var name = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["camelToKebab"])(attr);
      var attrsValue = attributes[attr];
      var value = attrsValue === undefined ? defVal : _utils_js__WEBPACK_IMPORTED_MODULE_0__["STRING_TYPE_ENCODER_MAP"][type](attrsValue); // Only include non-empty values.

      if (value) {
        nameValuePairs.push([name, value]);
      }
    }); // Create the element and use setAttribute() instead of setting innerHTML
    // to ensure that attribute values containing HTML entities are properly
    // escaped.
    // E.g. if you set innerHTML to something like:
    //   `<div a="&lt;br&gt;"></div>`
    // When you then read back innerHTML, you get:
    //   `<div a="<br>"></div>`
    // The properly escaped attribute value is:
    //   `<div a="&amp;lt;br&amp;gt;"></div>`
    // which setAttribute() will take care of for you.

    var el = document.createElement("".concat(tagName));
    nameValuePairs.forEach(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          k = _ref8[0],
          v = _ref8[1];

      return el.setAttribute(k, v);
    }); // If autoMount is specified, append the newly-created element to the body.
    // A reasonable assumption is that either:
    //   - The element is absolutely positioned and thus it's placement in
    //     the DOM doesn't matter
    //   - It implements the Insertable class and will be automatically
    //     relocated

    if (autoMount) {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () {
          return document.body.appendChild(el);
        });
      } else {
        document.body.appendChild(el);
      }
    } // Return the element for fun.


    return el;
  };
}

/***/ }),

/***/ "./src/components/Dismissible.js":
/*!***************************************!*\
  !*** ./src/components/Dismissible.js ***!
  \***************************************/
/*! exports provided: propNameTypeDefaults, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propNameTypeDefaults", function() { return propNameTypeDefaults; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/components/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var FOREVER = -1;
var nowMs = Date.now;
var propNameTypeDefaults = [["dismissalMinutes", _utils_js__WEBPACK_IMPORTED_MODULE_0__["TYPES"].INTEGER, 0], ["dismissalContentProp", _utils_js__WEBPACK_IMPORTED_MODULE_0__["TYPES"].STRING, undefined], ["id", _utils_js__WEBPACK_IMPORTED_MODULE_0__["TYPES"].STRING, ""]];

var Dismissible = function Dismissible(C) {
  return /*#__PURE__*/function (_C) {
    _inherits(_class, _C);

    var _super = _createSuper(_class);

    function _class(propNameTypeDefaultsArr, options) {
      _classCallCheck(this, _class);

      // Add this class's props to the array.
      propNameTypeDefaultsArr.push(propNameTypeDefaults);
      return _super.call(this, propNameTypeDefaultsArr, options);
    }

    _createClass(_class, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        _get(_getPrototypeOf(_class.prototype), "connectedCallback", this).call(this); // Generate the local storage keys using the element tagName and id
        // attribute value to allow for multiple unique intances of the same
        // component.


        var tagName = this.tagName.toLowerCase();
        var id = this.props.id;
        this.dismissedUntilKey = "".concat(tagName, "-").concat(id, "-dismissedUntil");
        this.dismissedContentKey = "".concat(tagName, "-").concat(id, "-dismissedContent");
      }
    }, {
      key: "setDismissedUntil",
      value: function setDismissedUntil(value) {
        // Set the dismissedUntil value in local storage.
        localStorage.setItem(this.dismissedUntilKey, "".concat(value));
      }
    }, {
      key: "getDismissedUntil",
      value: function getDismissedUntil() {
        // Return the dismissedUntil value from local storage.
        var dismissedUntil = localStorage.getItem(this.dismissedUntilKey);
        return dismissedUntil === null ? null : parseInt(dismissedUntil, 10);
      }
    }, {
      key: "setDismissedContent",
      value: function setDismissedContent(content) {
        // Set the dismissedContent value in local storage.
        localStorage.setItem(this.dismissedContentKey, content);
      }
    }, {
      key: "getDismissedContent",
      value: function getDismissedContent() {
        // Return the dismissedContent value from local storage.
        return localStorage.getItem(this.dismissedContentKey);
      }
    }, {
      key: "clearDismissalStorage",
      value: function clearDismissalStorage() {
        // Remove all dismissal-related items from local storage.
        localStorage.removeItem(this.dismissedUntilKey);
        localStorage.removeItem(this.dismissedContentKey);
      }
    }, {
      key: "getDismissalContent",
      value: function getDismissalContent() {
        // Return the value of the property indicated by dismissalContentProp.
        // Note that this expects dismissalContentProp to be specified in
        // property-style camelCase format, which is easy to remember when
        // instantiating the component via JS, but less so when hand-crafting
        // the component via HTML, e.g. <... dismissal-content-prop="messageText">
        return this.props[this.props.dismissalContentProp];
      }
    }, {
      key: "dismiss",
      value: function dismiss() {
        var numMinutes = this.props.dismissalMinutes;

        if (numMinutes === FOREVER || numMinutes > 0) {
          // Update local storage with dismissal period expiration time and
          // dismissed content values. A numMinutes time of -1 indicates "forever",
          // which we'll save to local storage to indicate the same.
          this.setDismissedUntil(numMinutes === FOREVER ? FOREVER : nowMs() + numMinutes * 60 * 1000);
          this.setDismissedContent(this.getDismissalContent());
        } else {
          // Purge any dismissal-related items from local storage.
          this.clearDismissalStorage();
        }
      }
    }, {
      key: "isDismissed",
      value: function isDismissed() {
        // Return a Boolean indicating whether this component is dismissed.
        var dismissedUntil = this.getDismissedUntil(); // If there's no saved dismissal, return false.

        if (dismissedUntil === null) {
          return false;
        } // If the currently configured dismissal period = 0, clear any existing
        // saved dismissal and return false.


        if (this.props.dismissalMinutes === 0) {
          this.clearDismissalStorage();
          return false;
        } // If the saved dismissal period != FOREVER and the period has lapsed,
        // clear the saved dismissal and return false.


        if (dismissedUntil !== FOREVER && nowMs() >= dismissedUntil) {
          this.clearDismissalStorage();
          return false;
        } // The dismissal period is either FOREVER or the period has not yet
        // lapsed, but if the message has changed, clear the saved dismissal and
        // return false.


        if (this.getDismissalContent() !== this.getDismissedContent()) {
          this.clearDismissalStorage();
          return false;
        } // The component is dismissed.


        return true;
      }
    }]);

    return _class;
  }(C);
};

/* harmony default export */ __webpack_exports__["default"] = (Dismissible);

/***/ }),

/***/ "./src/components/Modal.js":
/*!*********************************!*\
  !*** ./src/components/Modal.js ***!
  \*********************************/
/*! exports provided: ModalComponent, Modal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalComponent", function() { return ModalComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return Modal; });
/* harmony import */ var _Base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.js */ "./src/components/Base.js");
/* harmony import */ var _Dismissible_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dismissible.js */ "./src/components/Dismissible.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./src/components/utils.js");
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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var SCHEME_NAME_COLORS_MAP = {
  primary: "#cce5ff,#004085,#007bff,#ffffff",
  secondary: "#e2e3e5,#383d41,#6c757d,#ffffff",
  success: "#d4edda,#155724,#28a745,#ffffff",
  danger: "#f8d7da,#721c24,#dc3545,#ffffff",
  warning: "#fff3cd,#856404,#ffc107,#212529",
  info: "#d1ecf1,#0c5460,#17a2b8,#ffffff",
  light: "#fefefe,#818182,#f8f9fa,#212529",
  dark: "#d6d8d9,#1b1e21,#343a40,#ffffff"
};

var styleFactory = function styleFactory(vars) {
  return "\n  .wrapper {\n    position: fixed;\n    left: 0;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    background-color: rgba(0, 0, 0, .6);\n    cursor: pointer;\n    z-index: ".concat(vars.MAX_Z_INDEX + 1, ";\n  }\n\n  .content {\n    display: inline-block;\n    width: fit-content;\n    max-width: 85%;\n    max-height: 85%;\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    border: solid #000 2px;\n    overflow: auto;\n    cursor: default;\n    text-align: right;\n    padding: ").concat(16 * vars.PX_SCALE_FACTOR, "px;\n    background-color: #fff;\n    font-size: ").concat(vars.fontSize * vars.PX_SCALE_FACTOR, "px;\n    border-radius: ").concat(vars.borderRadius, "px;\n  }\n\n  @media screen and (min-width: 800px) {\n    .content {\n      max-width: 680px;\n    }\n  }\n\n  .message {\n    text-align: left;\n    display: block;\n    cursor: text;\n    padding: ").concat(vars.verticalPadding * vars.PX_SCALE_FACTOR, "px\n             ").concat(vars.horizontalPadding * vars.PX_SCALE_FACTOR, "px;\n  }\n\n  .message img {\n    max-width: ").concat(vars.maxImageWidth * vars.PX_SCALE_FACTOR, "px;\n  }\n\n  button {\n    display: inline;\n    padding: ").concat(8 * vars.PX_SCALE_FACTOR, "px ").concat(12 * vars.PX_SCALE_FACTOR, "px;\n    cursor: pointer;\n    border: none;\n    border-radius: 4px;\n    margin-top: ").concat(24 * vars.PX_SCALE_FACTOR, "px;\n    font-size: ").concat(16 * vars.PX_SCALE_FACTOR, "px;\n  }\n\n  p {\n    margin: 0;\n  }\n");
};

var propNameTypeDefaults = [["borderRadius", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].INTEGER, 16], ["buttonText", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].STRING, "OK"], ["colorScheme", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].STRING, "primary"], ["dismissible", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].BOOLEAN, true], ["fontSize", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].INTEGER, 16], ["gradientLevel", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].FLOAT, 1.0], ["horizontalPadding", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].FLOAT, 0], ["id", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].STRING, ""], ["maxImageWidth", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].INTEGER, 20], ["message", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].HTML, "A default message"], ["stealFocus", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].BOOLEAN, true], ["verticalPadding", _utils_js__WEBPACK_IMPORTED_MODULE_2__["TYPES"].FLOAT, 1]];
var ModalComponent = /*#__PURE__*/function (_Dismissible) {
  _inherits(ModalComponent, _Dismissible);

  var _super = _createSuper(ModalComponent);

  function ModalComponent() {
    _classCallCheck(this, ModalComponent);

    return _super.call(this, [propNameTypeDefaults], {
      styleFactory: styleFactory
    });
  }

  _createClass(ModalComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      _get(_getPrototypeOf(ModalComponent.prototype), "connectedCallback", this).call(this); // If dismissal is active, remove the component.


      if (this.isDismissed()) {
        this.remove();
        return;
      } // Define the accessibility attributes.


      this.setAttribute("role", "dialog");
      this.setAttribute("aria-label", "Important Message");
      this.setAttribute("aria-modal", "true"); // Get the configuration properties.

      var _this$props = this.props,
          buttonText = _this$props.buttonText,
          colorScheme = _this$props.colorScheme,
          dismissible = _this$props.dismissible,
          gradientLevel = _this$props.gradientLevel,
          message = _this$props.message,
          stealFocus = _this$props.stealFocus; // Define the main wrapper element.

      var _split = (SCHEME_NAME_COLORS_MAP[colorScheme] || colorScheme).split(","),
          _split2 = _slicedToArray(_split, 4),
          bgColor = _split2[0],
          color = _split2[1],
          buttonBgColor = _split2[2],
          buttonColor = _split2[3];

      var bgRGB = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["hexToRgb"])(bgColor);
      this.shadow.appendChild(Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["Element"])("\n      <div class=\"wrapper\">\n        <div class=\"content\"\n             style=\"color: ".concat(color, ";\n                    background-image:\n                      linear-gradient(\n                        0deg,\n                        rgba(").concat(bgRGB.r, ", ").concat(bgRGB.g, ", ").concat(bgRGB.b, ", 1),\n                        rgba(").concat(bgRGB.r, ", ").concat(bgRGB.g, ", ").concat(bgRGB.b, ", ").concat(1 - gradientLevel, ")\n                      );\"\n        >\n          <div class=\"message\">\n            ").concat(message, "\n          </div>\n        </div>\n      </div>\n    "))); // Skip adding the button, event listeners, etc. if not dismissible.

      if (!dismissible) {
        return;
      } // Define the dismiss button element.


      var contentEl = this.shadow.querySelector(".content");
      var buttonEl = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["Element"])("\n      <button style=\"background-color: ".concat(buttonBgColor, ";\n                     color: ").concat(buttonColor, ";\"\n      >\n        ").concat(buttonText, "\n      </button>\n    "));
      contentEl.appendChild(buttonEl); // Add event listeners.
      // Dismiss the modal on wrapper or button click.
      // It seems as though it's complicated to determine the original event
      // target within the shadow DOM, so we'll simplify things by adding all the
      // click handlers we need to control what's happening.

      this.addEventListener(this.shadow, "click", function () {
        return _this.dismiss();
      });
      this.addEventListener(contentEl, "click", function (e) {
        return e.stopPropagation();
      });
      this.addEventListener(buttonEl, "click", function () {
        return _this.dismiss();
      }); // Remove the element on Escape.

      this.addEventListener(window, "keydown", function (e) {
        if (e.key === "Escape") {
          _this.dismiss();
        }
      }); // Save the currently focused element and focus the dismiss button.

      if (stealFocus) {
        this.previousFocusEl = document.activeElement;
        buttonEl.focus();
      }
    }
  }, {
    key: "dismiss",
    value: function dismiss() {
      // Remove the element and restore focus.
      _get(_getPrototypeOf(ModalComponent.prototype), "dismiss", this).call(this);

      this.remove();

      if (this.previousFocusEl) {
        this.previousFocusEl.focus();
      }
    }
  }]);

  return ModalComponent;
}(Object(_Dismissible_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_Base_js__WEBPACK_IMPORTED_MODULE_0__["default"]));
var Modal = Object(_Base_js__WEBPACK_IMPORTED_MODULE_0__["ComponentCreator"])("important-message-modal", ModalComponent, [propNameTypeDefaults, _Dismissible_js__WEBPACK_IMPORTED_MODULE_1__["propNameTypeDefaults"]]); // Define a variable into which an external process can inject configuration
// options. If we find at runtime that this has been replaced with an options
// object,use it to extend DEFAULTS, and immediately instantiate a modal.
// Define the injection placeholder and do a runtime mutation to confuse the
// compiler into not optimizing it out.

var INJECTED_OPTIONS = "<INJECT-OPTIONS-HERE>";

INJECTED_OPTIONS = function () {
  return INJECTED_OPTIONS;
}();

if (_typeof(INJECTED_OPTIONS) === "object") {
  var defaultOptions = Object.fromEntries(propNameTypeDefaults.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        attr = _ref2[0],
        defVal = _ref2[2];

    return [attr, defVal];
  }));
  Modal(Object.assign(defaultOptions, INJECTED_OPTIONS));
}

/***/ }),

/***/ "./src/components/utils.js":
/*!*********************************!*\
  !*** ./src/components/utils.js ***!
  \*********************************/
/*! exports provided: TYPES, isNull, isUndefined, camelToKebab, safeParseURL, STRING_TYPE_PARSER_MAP, STRING_TYPE_ENCODER_MAP, hexToRgb, Element, getMaxZIndex, getPixelScaleFactor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPES", function() { return TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNull", function() { return isNull; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUndefined", function() { return isUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "camelToKebab", function() { return camelToKebab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safeParseURL", function() { return safeParseURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STRING_TYPE_PARSER_MAP", function() { return STRING_TYPE_PARSER_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STRING_TYPE_ENCODER_MAP", function() { return STRING_TYPE_ENCODER_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexToRgb", function() { return hexToRgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMaxZIndex", function() { return getMaxZIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPixelScaleFactor", function() { return getPixelScaleFactor; });
var _STRING_TYPE_PARSER_M, _STRING_TYPE_ENCODER_;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
// Generic Utilities
//
// Type sentinals and checkers.
var TYPES = {
  STRING: "string",
  INTEGER: "integer",
  FLOAT: "float",
  BOOLEAN: "boolean",
  HTML: "html",
  URL: "url"
};
var isNull = function isNull(x) {
  return x === null;
};
var isUndefined = function isUndefined(x) {
  return x === undefined;
};

var isString = function isString(x) {
  return typeof x === "string";
};

var isNumber = function isNumber(x) {
  return typeof x === "number";
};

var isBoolean = function isBoolean(x) {
  return typeof x === "boolean";
}; // Simple parsing helpers.


var parseDecInt = function parseDecInt(s) {
  return parseInt(s, 10);
};

var parseHexInt = function parseHexInt(s) {
  return parseInt(s, 16);
}; // Encode/decode a string for inclusion as / from an HTML attribute value.


var htmlAttrEncode = function htmlAttrEncode(s) {
  return "".concat(s).replace(/"/g, "@quot;");
};

var htmlAttrDecode = function htmlAttrDecode(s) {
  return "".concat(s).replace(/@quot;/g, '"');
}; //
// String parsing and conversion helpers.
//


var UPPERCASE = /[A-Z]/;
var isUpper = UPPERCASE.test.bind(UPPERCASE);
function camelToKebab(x) {
  // Convert a camelCase string to kebab-case.
  if (typeof x !== "string") {
    throw new TypeError("Expected a string but got: ".concat(x));
  }

  return Array.from(x).reduce(function (acc, c, i) {
    return acc + (isUpper(c) ? "".concat(i ? "-" : "").concat(c.toLowerCase()) : c);
  }, "");
} // Return a function that applies a specified parser and uses a specified
// failure test function to determine whether to return the parsed value or a
// specified default value.

var safeParser = function safeParser(parserFn, failureTestFn) {
  return function (x, defVal) {
    var v;

    try {
      v = parserFn(x);
    } catch (e) {
      // Return the default value on any exception.
      return defVal;
    }

    return failureTestFn(v) ? defVal : v;
  };
};

var safeParseBool = safeParser(function (s) {
  return isString(s) && (s === "true" || s === "false") ? s === "true" : null;
}, isNull);
var safeParseString = safeParser(function (s) {
  return isString(s) ? s : null;
}, isNull);
var safeParseInt = safeParser(function (s) {
  return parseInt(s, 10);
}, Number.isNaN);
var safeParseFloat = safeParser(function (s) {
  return parseFloat(s);
}, Number.isNaN);
var safeParseHTML = safeParser(function (s) {
  return isString(s) ? htmlAttrDecode(s) : null;
}, isNull);
var safeParseURL = safeParser(function (s) {
  return new URL(s) && s;
}, isNull);
var STRING_TYPE_PARSER_MAP = (_STRING_TYPE_PARSER_M = {}, _defineProperty(_STRING_TYPE_PARSER_M, TYPES.STRING, safeParseString), _defineProperty(_STRING_TYPE_PARSER_M, TYPES.INTEGER, safeParseInt), _defineProperty(_STRING_TYPE_PARSER_M, TYPES.FLOAT, safeParseFloat), _defineProperty(_STRING_TYPE_PARSER_M, TYPES.BOOLEAN, safeParseBool), _defineProperty(_STRING_TYPE_PARSER_M, TYPES.HTML, safeParseHTML), _defineProperty(_STRING_TYPE_PARSER_M, TYPES.URL, safeParseURL), _STRING_TYPE_PARSER_M);

var assertTrue = function assertTrue(x) {
  if (!x) {
    throw new TypeError();
  }

  return true;
};

var toString = function toString(x) {
  return isNull(x) || isUndefined(x) ? "" : "".concat(x);
};

var safeEncodeString = function safeEncodeString(x) {
  return assertTrue(isString(x)) && toString(x);
};

var safeEncodeNumber = function safeEncodeNumber(x) {
  return assertTrue(isNumber(x)) && toString(x);
};

var safeEncodeBoolean = function safeEncodeBoolean(x) {
  return assertTrue(isBoolean(x)) && toString(x);
};

var safeEncodeHTML = function safeEncodeHTML(x) {
  return assertTrue(isString(x)) && htmlAttrEncode(x);
};

var safeEncodeURL = function safeEncodeURL(x) {
  return assertTrue(safeParseURL(x, null) !== null) && x;
};

var STRING_TYPE_ENCODER_MAP = (_STRING_TYPE_ENCODER_ = {}, _defineProperty(_STRING_TYPE_ENCODER_, TYPES.STRING, safeEncodeString), _defineProperty(_STRING_TYPE_ENCODER_, TYPES.INTEGER, safeEncodeNumber), _defineProperty(_STRING_TYPE_ENCODER_, TYPES.FLOAT, safeEncodeNumber), _defineProperty(_STRING_TYPE_ENCODER_, TYPES.BOOLEAN, safeEncodeBoolean), _defineProperty(_STRING_TYPE_ENCODER_, TYPES.HTML, safeEncodeHTML), _defineProperty(_STRING_TYPE_ENCODER_, TYPES.URL, safeEncodeURL), _STRING_TYPE_ENCODER_); //
// HTML / DOM Utilities
//
// Return the specified element attribute, or a defaultValue if the attribute
// is unspecified.

function hexToRgb(hex) {
  // Adapted from: https://stackoverflow.com/a/5624139/2327940
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var v = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(v);
  return !result ? null : {
    r: parseHexInt(result[1]),
    g: parseHexInt(result[2]),
    b: parseHexInt(result[3])
  };
}
function Element(tagNameOrDOMString) {
  var wrapperTag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "div";
  // Return a new Element for a given tag name or DOM string.
  var s = tagNameOrDOMString.trim();

  if (!s.startsWith("<")) {
    return document.createElement(s);
  }

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

  return window.devicePixelRatio || 1;
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
/* harmony import */ var _components_Banner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Banner */ "./src/components/Banner.js");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Modal */ "./src/components/Modal.js");
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
var PREDEFINED_MESSAGES = {
  minorServiceInterruption: "&#9888; We're experiencing a minor service interruption - some features may not work.",
  majorServiceInterruption: "&#9888; We're experiencing a major service outage - many features may not work.",
  scheduledMaintenance: "&#9888; We're currently undergoing scheduled maintenance - some features may not work."
}; //
// Variables
//

var options = INSTALL_OPTIONS;
var product = INSTALL_PRODUCT;
var appElement; //
//  Utility Functions
//

var parseDecInt = function parseDecInt(s) {
  return parseInt(s, 10);
};

function escapeHTML(s) {
  var wrapper = document.createElement("div");
  wrapper.innerText = s;
  return wrapper.innerHTML;
} //
// Options Getters
//


function getMessageContent() {
  var message;

  switch (options.messageType) {
    case "customPlain":
      message = "".concat(escapeHTML(options.customPlainMessage));
      break;

    case "customRich":
      ;
      message = options.customRichMessageGroup.message;
      break;

    case "customHTML":
      message = "".concat(options.customHTMLMessage);
      break;

    default:
      message = "".concat(PREDEFINED_MESSAGES[options.messageType]);
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
} //
// updateElement Function
//


function updateElement() {
  // Remove the element if it shouldn't be displayed.
  if (!options.enabled || !INSTALL.matchPage(options.pages)) {
    if (appElement) {
      appElement.remove();
    }

    return;
  }

  var _options = options,
      bannerUrl = _options.bannerUrl,
      buttonText = _options.buttonText,
      displayMode = _options.displayMode,
      fontSize = _options.fontSize,
      verticalPadding = _options.verticalPadding,
      horizontalPadding = _options.horizontalPadding,
      notDismissible = _options.notDismissible,
      verticalMargin = _options.verticalMargin,
      horizontalMargin = _options.horizontalMargin,
      borderRadius = _options.borderRadius; // Get the message content.

  var message = getMessageContent(); // Get the colors.

  var _getColors = getColors(),
      _getColors2 = _slicedToArray(_getColors, 4),
      bgColor = _getColors2[0],
      color = _getColors2[1],
      buttonBgColor = _getColors2[2],
      buttonColor = _getColors2[3]; // Create the component.


  var componentOptions = {
    borderRadius: borderRadius,
    buttonText: buttonText,
    dismissalContentProp: "message",
    dismissalMinutes: getDismissedUntilMinutes(),
    dismissible: !notDismissible,
    fontSize: fontSize,
    gradientLevel: options.customBackgroundGradientLevel,
    horizontalMargin: horizontalMargin,
    horizontalPadding: horizontalPadding,
    maxImageWidth: options.customRichMessageGroup.maxImageWidth,
    message: message,
    verticalMargin: verticalMargin,
    verticalPadding: verticalPadding
  };
  var componentEl;

  if (displayMode === "banner") {
    componentOptions.colorScheme = "".concat(bgColor, ",").concat(color);
    componentOptions.bannerUrl = bannerUrl;
    componentEl = Object(_components_Banner__WEBPACK_IMPORTED_MODULE_0__["Banner"])(componentOptions, false);
  } else {
    componentOptions.colorScheme = "".concat(bgColor, ",").concat(color, ",").concat(buttonBgColor, ",").concat(buttonColor);
    componentOptions.stealFocus = INSTALL_ID !== "preview" || notDismissible;
    componentEl = Object(_components_Modal__WEBPACK_IMPORTED_MODULE_1__["Modal"])(componentOptions, false);
  } // Create the appElement.


  var location = displayMode === "banner" && notDismissible ? options.location : {
    selector: "body",
    method: "prepend"
  };
  appElement = INSTALL.createElement(location, appElement);
  appElement.setAttribute("app", APP_NAME);
  appElement.appendChild(componentEl);
}

function init() {
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
  }; // This code ensures that the app doesn't run before the page is loaded.

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      return updateElement();
    });
  } else {
    updateElement();
  }
} // Check for IE10+


if (window.addEventListener && document.documentElement.classList) {
  init();
}

/***/ })

/******/ });