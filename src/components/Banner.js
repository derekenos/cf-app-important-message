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

const DEFAULTS = {
  BORDER_RADIUS: 16,
  COLOR_SCHEME: "primary",
  DISMISSIBLE: true,
  FONT_SIZE: 16,
  GRADIENT_LEVEL: 1,
  HORIZONTAL_MARGIN: 0,
  HORIZONTAL_PADDING: 0,
  VERTICAL_MARGIN: 0,
  VERTICAL_PADDING: 1,
  LOCATION: { selector: "body", method: "prepend" },
  MAX_IMAGE_WIDTH: 20,
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
    padding: .25em 1em;
    font-weight: normal;
    position: relative;
  }

  .button-wrapper.highlight {
    border-left: dashed rgba(0, 0, 0, .2) 2px;
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
  }

  @keyframes slideDown {
    from {
      transform: translate(0, -150%);
    }

    to {
      transform: translate(0, 0);
    }
  }

  p {
    margin: 0;
  }
`

export class BannerElement extends HTMLElement {
  constructor() {
    super()
    this.eventListenerRemovers = []

    // Define the shadow DOM and attach the <style> element.
    this.shadow = this.attachShadow({ mode: "open" })
    this.shadow.appendChild(STYLE)

    // Define the accessibility attributes.
    this.setAttribute("role", "banner")
    this.setAttribute("aria-label", "Important Message")
  }

  connectedCallback() {
    // Get the configuration attributes.
    // String-type
    const getStr = (...args) => getStrAttr(this, ...args)
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

    // Get the pixel scale factor and scale the values expressed in px.
    const pxScaleFactor = getPixelScaleFactor()
    borderRadius *= pxScaleFactor
    fontSize *= pxScaleFactor
    maxImageWidth *= pxScaleFactor

    // Define the main wrapper element.
    const [bgColor, color] = getColors(colorScheme)
    const bgRGB = hexToRgb(bgColor)
    this.wrapperEl = Element(`
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
      </div>
    `)
    this.shadow.appendChild(this.wrapperEl)

    // Define the message container element.
    const messageEl = Element(`
      <div class="message" style="padding: ${yPadding + 0.25}em ${xPadding +
      1}em;">
        ${message}
      </div>
    `)
    // Apply max-width to any included images.
    messageEl.querySelectorAll("img").forEach(el => {
      const style = el.getAttribute("style") || ""
      el.setAttribute("style", `max-width: ${maxImageWidth}px; ${style}`)
    })
    this.wrapperEl.appendChild(messageEl)

    // Make the non-dismissible cursor a pointer if bannerUrl is defined.
    if (!dismissible && bannerUrl) {
      this.style.cursor = "pointer"
    }

    // Dismiss the banner or redirect to bannerUrl on main banner click.
    this.addEventListener(this, "click", () => {
      if (bannerUrl) {
        window.location = bannerUrl
      } else if (dismissible) {
        this.dismiss()
      }
    })

    // Skip adding the button, event listeners, etc. if not dismissible.
    if (!dismissible) {
      return
    }

    // Define the dismiss button element.
    const buttonWrapperEl = Element(`
      <div class="button-wrapper ${bannerUrl ? "highlight" : ""}">
        <button style="font-size: ${16 * pxScaleFactor}px;">x</button>
      </div>
    `)
    this.wrapperEl.appendChild(buttonWrapperEl)

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

    // Handle clicks events.
    // Dismiss the banner on button wrapper.
    this.addEventListener(buttonWrapperEl, "click", e => {
      this.dismiss()
      e.stopPropagation()
    })

    // Remove the element on Escape.
    this.addEventListener(window, "keydown", e => {
      if (e.key === "Escape") {
        this.dismiss()
      }
    })
  }

  disconnectedCallback() {
    this.removeEventListeners()
  }

  addEventListener(el, event, fn) {
    if (el instanceof BannerElement) {
      super.addEventListener(event, fn)
      this.eventListenerRemovers.push(() =>
        super.removeEventListener(event, fn),
      )
    } else {
      el.addEventListener(event, fn)
      this.eventListenerRemovers.push(() => el.removeEventListener(event, fn))
    }
  }

  removeEventListeners() {
    while (this.eventListenerRemovers.length > 0) {
      this.eventListenerRemovers.shift()()
    }
  }

  dismiss() {
    const el = this.wrapperEl
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
     <x-banner
       message="${htmlAttrEncode(getOpt("message", ""))}"
       dismissible="${getOpt("dismissible", DEFAULTS.DISMISSIBLE)}"
       color-scheme="${getOpt("colorScheme", DEFAULTS.COLOR_SCHEME)}"
       font-size="${getOpt("fontSize", DEFAULTS.FONT_SIZE)}"
       horizontal-padding="${getOpt(
         "horizontalPadding",
         DEFAULTS.HORIZONTAL_PADDING,
       )}"
       vertical-padding="${getOpt(
         "verticalPadding",
         DEFAULTS.VERTICAL_PADDING,
       )}"
       horizontal-margin="${getOpt(
         "horizontalMargin",
         DEFAULTS.HORIZONTAL_MARGIN,
       )}"
       vertical-margin="${getOpt("verticalMargin", DEFAULTS.VERTICAL_MARGIN)}"
       border-radius="${getOpt("borderRadius", DEFAULTS.BORDER_RADIUS)}"
       gradient-level="${getOpt("gradientLevel", DEFAULTS.GRADIENT_LEVEL)}"
       max-image-width="${getOpt("maxImageWidth", DEFAULTS.MAX_IMGAGE_WIDTH)}"
       banner-url="${getOpt("bannerUrl", "")}""
     >
     </x-banner>
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

customElements.define("x-banner", BannerElement)
