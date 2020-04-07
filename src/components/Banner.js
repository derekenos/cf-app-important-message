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

const TAG_NAME = "important-message-banner"

const DEFAULTS = {
  BORDER_RADIUS: 16,
  COLOR_SCHEME: "primary",
  DISMISSAL_MINUTES: 0,
  DISMISSIBLE: true,
  FONT_SIZE: 16,
  GRADIENT_LEVEL: 1,
  HORIZONTAL_MARGIN: 0,
  HORIZONTAL_PADDING: 0,
  LOCATION: { selector: "body", method: "prepend" },
  MAX_IMAGE_WIDTH: 20,
  VERTICAL_MARGIN: 0,
  VERTICAL_PADDING: 1,
}

const SCHEME_NAME_COLORS_MAP = {
  primary: "#cce5ff,#004085",
  secondary: "#e2e3e5,#383d41",
  success: "#d4edda,#155724",
  danger: "#f8d7da,#721c24",
  warning: "#fff3cd,#856404",
  info: "#d1ecf1,#0c5460",
  light: "#fefefe,#818182",
  dark: "#d6d8d9,#1b1e21",
}

function getColors(colorScheme) {
  /* Return the colors for the specified scheme as the array:
     [<mainBackgroundColor>, <mainColor>]
   */
  return (SCHEME_NAME_COLORS_MAP[colorScheme] || colorScheme).split(",")
}

//
// CSS
//

const STYLE = document.createElement("style")
STYLE.textContent = `
  .wrapper {
    display: flex;
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    text-align: left;
    color: #000;
    background-color: #fff;
  }

  .wrapper.dismissible {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    cursor: pointer;
    box-shadow: 0 0 1em .2em #444;
  }

  .wrapper.dismissible.show {
    animation-duration: .5s;
    animation-name: slideDown;
    animation-timing-function: linear;
  }

  .wrapper.dismissible.hide {
    animation-duration: .25s;
    animation-name: slideDown;
    animation-timing-function: linear;
    animation-direction: reverse;
  }

  .message {
    padding: .25em 1em;
    display: inline;
    flex-grow: 1;
  }

  .button-wrapper {
    padding: .25em 2em;
    font-weight: normal;
    position: relative;
  }

  .button-wrapper.highlight {
    background-color: rgba(255, 255, 255, .25);
    box-shadow: -1px 0px 8px #888;
    border-radius: 16px 0 16px 16px;
  }

  .button-wrapper:hover {
    font-weight: bold;
  }

  button {
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    font-family: monospace;
    font-size: 16px;
    font-weight: inherit;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }

  @keyframes slideDown {
    from {
      transform: translate(0, -150%);
    }

    to {
      transform: translate(0, 0);
    }
  }

  a {
    text-decoration: underline;
  }

  p {
    margin: 0;
  }
`

export class BannerComponent extends DismissibleComponent {
  constructor() {
    super({ contentAttrName: "message" })
    this.eventListenerRemovers = []

    // Define the shadow DOM and attach the <style> element.
    this.shadow = this.attachShadow({ mode: "open" })
    this.shadow.appendChild(STYLE)

    // Define the accessibility attributes.
    this.setAttribute("role", "banner")
    this.setAttribute("aria-label", "Important Message")
  }

  connectedCallback() {
    super.connectedCallback()
    // Get the configuration attributes.
    // String-type
    const getStr = (...args) => getStrAttr(this, ...args)
    const id = getStr("id", "")
    // Unescape the double-quotes in the message, e.g. HTML attr values.
    const message = htmlAttrDecode(getStr("message", ""))
    const colorScheme = getStr("color-scheme", DEFAULTS.COLOR_SCHEME)
    const bannerUrl = getStr("banner-url", "")

    // Bool-type
    const getBool = (...args) => getBoolAttr(this, ...args)
    const dismissible = getBool("dismissible", DEFAULTS.DISMISSIBLE)

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
    const [bgColor, color] = getColors(colorScheme)
    const bgRGB = hexToRgb(bgColor)
    this.shadow.appendChild(
      Element(`
      ${bannerUrl ? `<a href="${bannerUrl}">` : ""}
      <div class="wrapper show ${dismissible ? "dismissible" : ""}"
           style="margin: ${yMargin}em ${xMargin}em;
                  font-size: ${fontSize}px;
                  color: ${color};
                  border-radius:
                    ${dismissible ? "0" : borderRadius}px
                    ${dismissible ? "0" : borderRadius}px
                    ${borderRadius}px
                    ${borderRadius}px;
                  background-image:
                    linear-gradient(
                      0deg,
                      rgba(${bgRGB.r}, ${bgRGB.g}, ${bgRGB.b}, 1),
                      rgba(${bgRGB.r}, ${bgRGB.g}, ${bgRGB.b}, ${1 -
        gradientLevel})
                    );
                  z-index: ${getMaxZIndex() + 1};"
      >
        <div class="message"
             style="padding: ${yPadding + 0.25}em ${xPadding + 1}em;"
        >
          ${message}
        </div>
      </div>
      ${bannerUrl ? "</a>" : ""}
    `),
    )

    const wrapperEl = this.shadow.querySelector("div.wrapper")

    // Apply max-width to any included images.
    wrapperEl.querySelectorAll("img").forEach(el => {
      const style = el.getAttribute("style") || ""
      el.setAttribute("style", `max-width: ${maxImageWidth}px; ${style}`)
    })

    // Skip adding the button, event listeners, etc. if not dismissible.
    if (!dismissible) {
      return
    }

    // Define the dismiss button element.
    const buttonWrapperEl = Element(`
      <div class="button-wrapper ${bannerUrl ? "highlight" : ""}"
           style="border-radius: ${borderRadius}px 0 ${borderRadius}px ${borderRadius}px">
        <button style="font-size: ${16 * pxScaleFactor}px;">x</button>
      </div>
    `)
    wrapperEl.appendChild(buttonWrapperEl)

    // Add event listeners.

    // If bannerUrl is not defined, bold the X on any mouse hover.
    if (!bannerUrl) {
      this.addEventListener(this, "mouseenter", () => {
        buttonWrapperEl.style.fontWeight = "bold"
      })

      // Unbold the X on mouse leave.
      this.addEventListener(this, "mouseleave", () => {
        buttonWrapperEl.style.fontWeight = "normal"
      })
    }

    // Dismiss on click. If bannerUrl is defined, only listen for clicks on
    // the button, otherwise listen for any click.
    this.addEventListener(bannerUrl ? buttonWrapperEl : this, "click", e => {
      this.dismiss()
      e.preventDefault()
      e.stopPropagation()
    })

    // Remove the element on Escape.
    this.addEventListener(window, "keydown", e => {
      if (e.key === "Escape") {
        this.dismiss()
      }
    })
  }

  dismiss() {
    super.dismiss()
    const el = this.shadow.querySelector("div.wrapper")
    this.addEventListener(el, "animationend", () => this.remove())
    el.classList.remove("show")
    // See here for why I'm reading the offsetWidth:
    // https://stackoverflow.com/a/30072037/2327940
    void el.offsetWidth
    el.classList.add("hide")
  }
}

export function Banner(options, location) {
  /* Create and optionally insert a banner element via JS.
   */
  // Define helper to get option value if set but otherwise return a default.
  const getOpt = (k, defVal) => (options[k] === undefined ? defVal : options[k])
  // Define the element, escaping any double-quotes in the message text, which
  // will occur for HTML messages that specify element attribute values.
  const bannerEl = Element(`
     <${TAG_NAME}
       banner-url="${getOpt("bannerUrl", "")}"
       border-radius="${getOpt("borderRadius", DEFAULTS.BORDER_RADIUS)}"
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
       id="${getOpt("id", "")}"
       max-image-width="${getOpt("maxImageWidth", DEFAULTS.MAX_IMGAGE_WIDTH)}"
       message="${htmlAttrEncode(getOpt("message", ""))}"
       vertical-margin="${getOpt("verticalMargin", DEFAULTS.VERTICAL_MARGIN)}"
       vertical-padding="${getOpt(
         "verticalPadding",
         DEFAULTS.VERTICAL_PADDING,
       )}"
     >
     </${TAG_NAME}>
   `)

  if (!location) {
    return bannerEl
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      insertElementAtLocation(bannerEl, location.selector, location.method)
    })
  } else {
    insertElementAtLocation(bannerEl, location.selector, location.method)
  }
}

try {
  customElements.define(TAG_NAME, BannerComponent)
} catch (e) {
  console.warn(e)
}

// Define a variable into which an external process can inject configuration
// options. If we find at runtime that this has been replaced with an options
// object,use it to extend DEFAULTS, and immediately instantiate a banner.

// Define the injection placeholder and do a runtime mutation to confuse the
// compiler into not optimizing it out.
let INJECTED_OPTIONS = "<INJECT-OPTIONS-HERE>"
INJECTED_OPTIONS = (() => INJECTED_OPTIONS)()

if (typeof INJECTED_OPTIONS === "object") {
  Banner(Object.assign(INJECTED_OPTIONS, DEFAULTS), {
    selector: "body",
    method: "prepend",
  })
}
