import DismissibleComponent from "./DismissibleComponent.js"

import {
  Element,
  getBoolAttr,
  getFloatAttr,
  getIntAttr,
  getMaxZIndex,
  getPixelScaleFactor,
  getStrAttr,
  hexToRgb,
  htmlAttrEncode,
  htmlAttrDecode,
  insertElementAtLocation,
} from "./utils.js"

const TAG_NAME = "important-message-modal"

const DEFAULTS = {
  BORDER_RADIUS: 16,
  BUTTON_TEXT: "OK",
  COLOR_SCHEME: "primary",
  DISMISSAL_MINUTES: 0,
  DISMISSIBLE: true,
  FONT_SIZE: 16,
  GRADIENT_LEVEL: 1,
  HORIZONTAL_MARGIN: 0,
  HORIZONTAL_PADDING: 0,
  LOCATION: { selector: "body", method: "prepend" },
  MAX_IMAGE_WIDTH: 20,
  STEAL_FOCUS: true,
  VERTICAL_MARGIN: 0,
  VERTICAL_PADDING: 0,
}

const SCHEME_NAME_COLORS_MAP = {
  primary: "#cce5ff,#004085,#007bff,#ffffff",
  secondary: "#e2e3e5,#383d41,#6c757d,#ffffff",
  success: "#d4edda,#155724,#28a745,#ffffff",
  danger: "#f8d7da,#721c24,#dc3545,#ffffff",
  warning: "#fff3cd,#856404,#ffc107,#212529",
  info: "#d1ecf1,#0c5460,#17a2b8,#ffffff",
  light: "#fefefe,#818182,#f8f9fa,#212529",
  dark: "#d6d8d9,#1b1e21,#343a40,#ffffff",
}

function getColors(colorScheme) {
  /* Return the colors for the specified scheme as the array:
     [<mainBgColor>, <mainColor>, <buttonBgColor>, <buttonColor>]
   */
  return (SCHEME_NAME_COLORS_MAP[colorScheme] || colorScheme).split(",")
}

const STYLE = document.createElement("style")
STYLE.textContent = `
  .wrapper {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
    cursor: pointer;
  }

  .content {
    display: inline-block;
    width: fit-content;
    max-width: min(85%, 700px);
    max-height: 85%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: solid #000 2px;
    overflow: auto;
    cursor: default;
    text-align: right;
    padding: 1em;
    background-color: #fff;
  }

  .message {
    text-align: left;
    display: block;
    cursor: text;
    padding: 0;
  }

  button {
    display: inline;
    padding: .4em .75em;
    cursor: pointer;
    font-size: 1em;
    border: none;
    border-radius: .25em;
    margin-top: 1.5em;
  }

  p {
    margin: 0;
  }
`

export class ModalComponent extends DismissibleComponent {
  constructor() {
    super({ contentAttrName: "message" })
    this.eventListenerRemovers = []

    // Define the shadow DOM and attach the <style> element.
    this.shadow = this.attachShadow({ mode: "open" })
    this.shadow.appendChild(STYLE)

    // Define the accessibility attributes.
    this.setAttribute("role", "dialog")
    this.setAttribute("aria-label", "Important Message")
    this.setAttribute("aria-modal", "true")
  }

  connectedCallback() {
    super.connectedCallback()
    // Get the configuration attributes.
    // String-type
    const getStr = (...args) => getStrAttr(this, ...args)
    const id = getStr("id", "")
    // Unescape the double-quotes in the message, e.g. HTML attr values.
    const message = htmlAttrDecode(getStr("message"))
    const colorScheme = getStr("color-scheme", DEFAULTS.COLOR_SCHEME)
    const buttonText = getStr("button-text", DEFAULTS.BUTTON_TEXT)

    // Bool-type
    const getBool = (...args) => getBoolAttr(this, ...args)
    const dismissible = getBool("dismissible", DEFAULTS.DISMISSIBLE)
    const stealFocus = getBool("steal-focus", DEFAULTS.STEAL_FOCUS)

    // Int-type
    const getInt = (...args) => getIntAttr(this, ...args)
    let borderRadius = getInt("border-radius", DEFAULTS.BORDER_RADIUS)
    let maxImageWidth = getInt("max-image-width", DEFAULTS.MAX_IMAGE_WIDTH)

    // Float-type
    const getFloat = (...args) => getFloatAttr(this, ...args)
    let fontSize = getFloat("font-size", DEFAULTS.FONT_SIZE)
    const xMargin = getFloat("horizontal-margin", DEFAULTS.HORIZONTAL_MARGIN)
    const yMargin = getFloat("vertical-margin", DEFAULTS.VERTICAL_MARGIN)
    const xPadding = getFloat("horizontal-padding", DEFAULTS.HORIZONTAL_PADDING)
    const yPadding = getFloat("vertical-padding", DEFAULTS.VERTICAL_PADDING)
    const gradientLevel = getFloat("gradient-level", DEFAULTS.GRADIENT_LEVEL)

    // If dismissal is active, remove the component.
    if (this.isDismissed()) {
      this.remove()
      return
    }

    // Get the pixel scale factor and scale the values expressed in px.
    const pxScaleFactor = getPixelScaleFactor()
    borderRadius *= pxScaleFactor
    fontSize *= pxScaleFactor
    maxImageWidth *= pxScaleFactor

    // Set the element id if specified.
    if (id) {
      this.setAttribute("id", id)
    }

    // Define the main wrapper element.
    const [bgColor, color, buttonBgColor, buttonColor] = getColors(colorScheme)
    const bgRGB = hexToRgb(bgColor)

    this.shadow.appendChild(
      Element(`
      <div class="wrapper" style="z-index: ${getMaxZIndex() + 1};">
        <div class="content"
             style="margin: ${yMargin}em ${xMargin}em;
                    font-size: ${fontSize}px;
                    color: ${color};
                    border-radius: ${borderRadius}px;
                    background-image:
                      linear-gradient(
                        0deg,
                        rgba(${bgRGB.r}, ${bgRGB.g}, ${bgRGB.b}, 1),
                        rgba(${bgRGB.r}, ${bgRGB.g}, ${bgRGB.b}, ${1 -
        gradientLevel})
                      );"
        >
          <div class="message"
               style="padding: ${yPadding}em ${xPadding}em;">
            ${message}
          </div>
        </div>
      </div>
    `),
    )

    // Apply max-width to any included images.
    this.shadow
      .querySelector(".message")
      .querySelectorAll("img")
      .forEach(el => {
        const style = el.getAttribute("style") || ""
        el.setAttribute("style", `max-width: ${maxImageWidth}px; ${style}`)
      })

    // Skip adding the button, event listeners, etc. if not dismissible.
    if (!dismissible) {
      return
    }

    // Define the dismiss button element.
    const contentEl = this.shadow.querySelector(".content")
    const buttonEl = Element(`
      <button style="font-size: ${16 * pxScaleFactor}px;
                     background-color: ${buttonBgColor};
                     color: ${buttonColor};"
      >
        ${buttonText}
      </button>
    `)
    contentEl.appendChild(buttonEl)

    // Add event listeners.
    // Dismiss the modal on wrapper or button click.
    // It seems as though it's complicated to determine the original event
    // target within the shadow DOM, so we'll simplify things by adding all the
    // click handlers we need to control what's happening.
    this.addEventListener(this.shadow, "click", () => this.dismiss())
    this.addEventListener(contentEl, "click", e => e.stopPropagation())
    this.addEventListener(buttonEl, "click", () => this.dismiss())

    // Remove the element on Escape.
    this.addEventListener(window, "keydown", e => {
      if (e.key === "Escape") {
        this.dismiss()
      }
    })

    // Save the currently focused element and focus the dismiss button.
    if (stealFocus) {
      this.previousFocusEl = document.activeElement
      buttonEl.focus()
    }
  }

  dismiss() {
    // Remove the element and restore focus.
    super.dismiss()
    this.remove()
    if (this.previousFocusEl) {
      this.previousFocusEl.focus()
    }
  }
}

export function Modal(options, location) {
  /* Create and optionally insert a modal element via JS.
   */
  // Define helper to get option value if set but otherwise return a default.
  const getOpt = (k, defVal) => (options[k] === undefined ? defVal : options[k])
  // Define the element, escaping any double-quotes in the message text, which
  // will occur for HTML messages that specify element attribute values.
  const modalEl = Element(`
     <${TAG_NAME}
       border-radius="${getOpt("borderRadius", DEFAULTS.BORDER_RADIUS)}"
       button-text="${getOpt("buttonText", DEFAULTS.BUTTON_TEXT)}"
       color-scheme="${getOpt("colorScheme", DEFAULTS.COLOR_SCHEME)}"
       dismissal-minutes="${getOpt(
         "dismissalMinutes",
         DEFAULTS.DISMISSAL_MINUTES,
       )}"
       dismissible="${getOpt("dismissible", DEFAULTS.DISMISSIBLE)}"
       font-size="${getOpt("fontSize", DEFAULTS.FONT_SIZE)}"
       gradient-level="${getOpt("gradientLevel", DEFAULTS.GRADIENT_LEVEL)}"
       horizontal-margin="${getOpt(
         "horizontalMargin",
         DEFAULTS.HORIZONTAL_MARGIN,
       )}"
       horizontal-padding="${getOpt(
         "horizontalPadding",
         DEFAULTS.HORIZONTAL_PADDING,
       )}"
       max-image-width="${getOpt("maxImageWidth", DEFAULTS.MAX_IMGAGE_WIDTH)}"
       message="${htmlAttrEncode(getOpt("message", ""))}"
       steal-focus="${getOpt("stealFocus", DEFAULTS.STEAL_FOCUS)}"
       vertical-margin="${getOpt("verticalMargin", DEFAULTS.VERTICAL_MARGIN)}"
       vertical-padding="${getOpt(
         "verticalPadding",
         DEFAULTS.VERTICAL_PADDING,
       )}"
     >
     </${TAG_NAME}>
   `)

  if (!location) {
    return modalEl
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      insertElementAtLocation(modalEl, location.selector, location.method)
    })
  } else {
    insertElementAtLocation(modalEl, location.selector, location.method)
  }
}

try {
  customElements.define(TAG_NAME, ModalComponent)
} catch (e) {
  console.warn(e)
}

// Define a variable into which an external process can inject configuration
// options. If we find at runtime that this has been replaced with an options
// object,use it to extend DEFAULTS, and immediately instantiate a modal.

// Define the injection placeholder and do a runtime mutation to confuse the
// compiler into not optimizing it out.
let INJECTED_OPTIONS = "<INJECT-OPTIONS-HERE>"
INJECTED_OPTIONS = (() => INJECTED_OPTIONS)()

if (typeof INJECTED_OPTIONS === "object") {
  Modal(Object.assign(INJECTED_OPTIONS, DEFAULTS), {
    selector: "body",
    method: "prepend",
  })
}
