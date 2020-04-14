import Base, { ComponentCreator } from "./Base.js"

import Dismissible, {
  propNameTypeDefaults as dismissiblePropNameTypeDefaults,
} from "./Dismissible.js"

import { TYPES, Element, hexToRgb } from "./utils.js"

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

const styleFactory = vars => `
  .wrapper {
    display: flex;
    font-size: ${vars.fontSize * vars.PX_SCALE_FACTOR}px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    text-align: left;
    color: #000;
    background-color: #fff;
    margin: ${vars.verticalMargin * vars.PX_SCALE_FACTOR}px
            ${vars.horizontalMargin * vars.PX_SCALE_FACTOR}px;
    border-radius: ${vars.borderRadius * vars.PX_SCALE_FACTOR}px;
    z-index: ${vars.MAX_Z_INDEX + 1};
  }

  .wrapper.dismissible {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    cursor: pointer;
    box-shadow: 0 0 16px 4px #444;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    margin: 0;
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
    padding: ${vars.verticalPadding * vars.PX_SCALE_FACTOR}px
             ${vars.horizontalPadding * vars.PX_SCALE_FACTOR}px;
  }

  .wrapper.dismissible .message {
    padding: ${(vars.verticalPadding + 4) * vars.PX_SCALE_FACTOR}px
             ${(vars.horizontalPadding + 16) * vars.PX_SCALE_FACTOR}px;
  }

  .message img {
    max-width: ${vars.maxImageWidth * vars.PX_SCALE_FACTOR}px;
  }

  .button-wrapper {
    padding: ${4 * vars.PX_SCALE_FACTOR}px ${32 * vars.PX_SCALE_FACTOR}px;
    font-weight: normal;
    position: relative;
  }

  .button-wrapper.highlight {
    background-color: rgba(255, 255, 255, .25);
    box-shadow: -1px 0px 8px #888;
    border-radius: ${vars.borderRadius}px;
    border-top-right-radius: 0;
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
    font-size: ${16 * vars.PX_SCALE_FACTOR}px;
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
    text-decoration: none;
  }

  p {
    margin: 0;
  }
`

const propNameTypeDefaults = [
  ["bannerUrl", TYPES.STRING, ""],
  ["borderRadius", TYPES.INTEGER, 16],
  ["colorScheme", TYPES.STRING, "primary"],
  ["dismissible", TYPES.BOOLEAN, true],
  ["fontSize", TYPES.INTEGER, 16],
  ["gradientLevel", TYPES.FLOAT, 1.0],
  ["horizontalMargin", TYPES.FLOAT, 0],
  ["horizontalPadding", TYPES.FLOAT, 0],
  ["id", TYPES.STRING, ""],
  ["maxImageWidth", TYPES.INTEGER, 20],
  ["message", TYPES.HTML, "A default message"],
  ["verticalMargin", TYPES.FLOAT, 0],
  ["verticalPadding", TYPES.FLOAT, 16],
]

export class BannerComponent extends Dismissible(Base) {
  constructor() {
    super([propNameTypeDefaults], { styleFactory })
  }

  connectedCallback() {
    super.connectedCallback()

    // If dismissal is active, remove the component.
    if (this.isDismissed()) {
      this.remove()
      return
    }

    // Define the accessibility attributes.
    this.setAttribute("role", "banner")
    this.setAttribute("aria-label", "Important Message")

    // Get the configuration properties.
    const { colorScheme, dismissible, gradientLevel, message } = this.props
    let { bannerUrl } = this.props

    // Since <a>'s can't be nested, check for the condition where both
    // bannerUrl is specified and the message contains an <a> tag. When this
    // happens, give priority to the message by removing bannerUrl and emit a
    // warning.
    if (bannerUrl && message.includes("</a>")) {
      bannerUrl = ""
      console.warn("Banner URL disabled because message includes an <a> tag")
    }

    // Define the main wrapper element.
    const [bgColor, color] = (
      SCHEME_NAME_COLORS_MAP[colorScheme] || colorScheme
    ).split(",")
    const bgRGB = hexToRgb(bgColor)
    this.shadow.appendChild(
      Element(`
      ${bannerUrl ? `<a href="${bannerUrl}">` : ""}
      <div class="wrapper show ${dismissible ? "dismissible" : ""}"
           style="color: ${color};
                  background-image:
                    linear-gradient(
                      0deg,
                      rgba(${bgRGB.r}, ${bgRGB.g}, ${bgRGB.b}, 1),
                      rgba(${bgRGB.r}, ${bgRGB.g}, ${bgRGB.b}, ${1 -
        gradientLevel})
                    );"
      >
        <div class="message">
          ${message}
        </div>

        ${
          dismissible
            ? `
        <div class="button-wrapper ${bannerUrl ? "highlight" : ""}">
          <button>x</button>
        </div>
        `
            : ""
        }

      </div>
      ${bannerUrl ? "</a>" : ""}
    `),
    )

    const wrapperEl = this.shadow.querySelector("div.wrapper")

    // Skip adding the button, event listeners, etc. if not dismissible.
    if (!dismissible) {
      return
    }

    // Add event listeners.
    const buttonWrapperEl = wrapperEl.querySelector(".button-wrapper")

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

export const Banner = ComponentCreator(
  "important-message-banner",
  BannerComponent,
  [propNameTypeDefaults, dismissiblePropNameTypeDefaults],
)

// Define a variable into which an external process can inject configuration
// options. If we find at runtime that this has been replaced with an options
// object,use it to extend DEFAULTS, and immediately instantiate a banner.

// Define the injection placeholder and do a runtime mutation to confuse the
// compiler into not optimizing it out.
let INJECTED_OPTIONS = "<INJECT-OPTIONS-HERE>"
INJECTED_OPTIONS = (() => INJECTED_OPTIONS)()

if (typeof INJECTED_OPTIONS === "object") {
  const defaultOptions = Object.fromEntries(
    propNameTypeDefaults.map(([attr, , defVal]) => [attr, defVal]),
  )
  Banner(Object.assign(defaultOptions, INJECTED_OPTIONS))
}
