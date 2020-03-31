
import {
  Element,
  getBoolAttr,
  getFloatAttr,
  getIntAttr,
  getMaxZIndex,
  getStrAttr,
  hexToRgb,
  insertElementAtLocation,
} from "./utils.jsm"

const DEFAULTS = {
  BORDER_RADIUS: 16,
  COLOR_SCHEME: "primary",
  DISMISSIBLE: true,
  FONT_SIZE: 16,
  GRADIENT_LEVEL: 1,
  HORIZONTAL_MARGIN: 0,
  HORIZONTAL_PADDING: 0,
  VERTICAL_MARGIN: 0,
  VERTICAL_PADDING: 0,
  LOCATION: {selector: "body", method: "prepend"},
  MAX_IMAGE_WIDTH: 20,
}

const SCHEME_NAME_COLORS_MAP = {
  "primary": "#cce5ff,#004085",
  "secondary": "#e2e3e5,#383d41",
  "success": "#d4edda,#155724",
  "danger": "#f8d7da,#721c24",
  "warning": "#fff3cd,#856404",
  "info": "#d1ecf1,#0c5460",
  "light": "#fefefe,#818182",
  "dark": "#d6d8d9,#1b1e21",
}


function getColors (colorScheme) {
  /* Return the colors for the specified scheme as the array:
     [<mainBackgroundColor>, <mainColor>]
   */
  if (SCHEME_NAME_COLORS_MAP.hasOwnProperty(colorScheme)) {
    // Get predefined color scheme.
    colorScheme =  SCHEME_NAME_COLORS_MAP[colorScheme]
  }
  return colorScheme.split(",")
}


export class BannerElement extends HTMLElement {
  constructor () {
    super()
    this.eventListenerRemovers = []

    // Define the shadow DOM and attach the <style> element.
    this.shadow = this.attachShadow({ mode: "open" })
    this.shadow.appendChild(STYLE)

    // Define the accessibility attributes.
    this.setAttribute("role", "banner")
    this.setAttribute("aria-label", "Important Message")
  }

  connectedCallback () {
    // Get the configuration attributes.
    // String-type
    const getStr = (...args) => getStrAttr(this, ...args)
    const message = getStr("message").replace(/@quot;/g, '"')
    const colorScheme = getStr("color-scheme", DEFAULTS.COLOR_SCHEME)

    // Bool-type
    const getBool = (...args) => getBoolAttr(this, ...args)
    const dismissible = getBool("dismissible", DEFAULTS.DISMISSIBLE)

    // Int-type
    const getInt = (...args) => getIntAttr(this, ...args)
    const borderRadius = getInt("border-radius", DEFAULTS.BORDER_RADIUS)
    const maxImageWidth = getInt("max-image-width", DEFAULTS.MAX_IMAGE_WIDTH)

    // Float-type
    const getFloat = (...args) => getFloatAttr(this, ...args)
    const fontSize = getFloat("font-size", DEFAULTS.FONT_SIZE)
    const xMargin = getFloat("horizontal-margin", DEFAULTS.HORIZONTAL_MARGIN)
    const yMargin = getFloat("vertical-margin", DEFAULTS.VERTICAL_MARGIN)
    const xPadding = getFloat("horizontal-padding", DEFAULTS.HORIZONTAL_PADDING)
    const yPadding = getFloat("vertical-padding", DEFAULTS.VERTICAL_PADDING)
    const gradientLevel = getFloat("gradient-level", DEFAULTS.GRADIENT_LEVEL)

    // Define the main wrapper element.
    const [bgColor, color] = getColors(colorScheme)
    const bgRGB = hexToRgb(bgColor)
    this.wrapperEl = Element(`
      <div class="wrapper show ${dismissible ? "dismissible" : ""}"
           style="margin: ${yMargin}em ${xMargin}em;
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
                      rgba(${bgRGB.r}, ${bgRGB.g}, ${bgRGB.b}, ${1 - gradientLevel})
                    );
                  z-index: ${getMaxZIndex() + 1};"
      >
      </div>
    `)
    this.shadow.appendChild(this.wrapperEl)

    // Define the message container element.
    const messageEl = Element(`
      <div class="message"
         style="font-size: ${fontSize}px;
                padding: ${yPadding}em ${xPadding}em;"
      >
        ${message}
      </div>
    `)
    // Apply max-width to any included images.
    messageEl.querySelectorAll("img").forEach(el => {
      const style = el.getAttribute("style") || ""
      el.setAttribute('style', `max-width: ${maxImageWidth}px; ${style}`)
    })
    this.wrapperEl.appendChild(messageEl)

    // Skip adding the button, event listeners, etc. if not dismissible.
    if (!dismissible) {
      return
    }

    // Define the dismiss button element.
    const buttonEl = Element("<button>x</button>")
    this.wrapperEl.appendChild(buttonEl)

    // Add event listeners.
    // Bold the X on mouse enter.
    this.addEventListener(this, "mouseenter", e => {
      buttonEl.style.fontWeight = "bold"
    })

    // Unbold the X on mouse leave.
    this.addEventListener(this, "mouseleave", e => {
      buttonEl.style.fontWeight = "normal"
    })

    // Remove the element on click.
    this.addEventListener(this, "click", () => this.dismiss())

    // Remove the element on Escape.
    this.addEventListener(window, "keydown", e => {
      if (e.key === "Escape") {
        this.dismiss()
      }
    })

  }

  disconnectedCallback () {
    this.removeEventListeners()
  }

  addEventListener (el, event, fn) {
    if (el instanceof BannerElement) {
      super.addEventListener(event, fn)
      this.eventListenerRemovers.push(
        () => super.removeEventListener(event, fn)
      )
    } else {
      el.addEventListener(event, fn)
      this.eventListenerRemovers.push(() => el.removeEventListener(event, fn))
    }
  }

  removeEventListeners () {
    while (this.eventListenerRemovers.length > 0) {
      this.eventListenerRemovers.shift()()
    }
  }

  dismiss () {
    const el = this.wrapperEl
    this.addEventListener(el, "animationend", () => this.remove())
    el.classList.remove("show")
    // See here for why I'm reading the offsetWidth:
    // https://stackoverflow.com/a/30072037/2327940
    const _ = el.offsetWidth
    el.classList.add("hide")
  }
}


const STYLE = document.createElement("style")
STYLE.textContent = `
  .wrapper {
    display: flex;
    padding: 1.5em; 1em;
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
    display: inline;
    flex-grow: 1;
  }

  button {
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    font-family: arial;
    font-size: inherit;
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


export function Banner (options, location) {
  /* Helper to instantiate and optionally insert a banner element via
     Javascript.
   */

  // Define helper to get option value if set but otherwise return a default.
  const getOpt = (k, v) => options.hasOwnProperty(k) ? options[k] : v

  const bannerEl = Element(`
     <x-banner
       message="${getOpt('message', '').replace(/"/g, "@quot;")}"
       dismissible="${getOpt('dismissible', DEFAULTS.DISMISSIBLE)}"
       color-scheme="${getOpt('colorScheme', DEFAULTS.COLOR_SCHEME)}"
       font-size="${getOpt('fontSize', DEFAULTS.FONT_SIZE)}"
       horizontal-padding="${getOpt('horizontalPadding', DEFAULTS.HORIZONTAL_PADDING)}"
       vertical-padding="${getOpt('verticalPadding', DEFAULTS.VERTICAL_PADDING)}"
       horizontal-margin="${getOpt('horizontalMargin', DEFAULTS.HORIZONTAL_MARGIN)}"
       vertical-margin="${getOpt('verticalMargin', DEFAULTS.VERTICAL_MARGIN)}"
       border-radius="${getOpt('borderRadius', DEFAULTS.BORDER_RADIUS)}"
       gradient-level="${getOpt('gradientLevel', DEFAULTS.GRADIENT_LEVEL)}"
       max-image-width="${getOpt('maxImageWidth', DEFAULTS.MAX_IMGAGE_WIDTH)}"
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
