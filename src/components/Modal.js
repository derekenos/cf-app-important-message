import Base, { ComponentCreator } from "./Base.js"

import Dismissible, {
  propNameTypeDefaults as dismissiblePropNameTypeDefaults,
} from "./Dismissible.js"

import { TYPES, Element, hexToRgb } from "./utils.js"

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

const styleFactory = vars => `
  .wrapper {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
    cursor: pointer;
    z-index: ${vars.MAX_Z_INDEX + 1};
  }

  .content {
    display: inline-block;
    width: fit-content;
    max-width: 85%;
    max-height: 85%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: solid #000 2px;
    overflow: auto;
    cursor: default;
    text-align: right;
    padding: ${16 * vars.PX_SCALE_FACTOR}px;
    background-color: #fff;
    font-size: ${vars.fontSize * vars.PX_SCALE_FACTOR}px;
    border-radius: ${vars.borderRadius}px;
  }

  @media screen and (min-width: 800px) {
    .content {
      max-width: 680px;
    }
  }

  .message {
    text-align: left;
    display: block;
    cursor: text;
    padding: ${vars.verticalPadding * vars.PX_SCALE_FACTOR}px
             ${vars.horizontalPadding * vars.PX_SCALE_FACTOR}px;
  }

  .message img {
    max-width: ${vars.maxImageWidth * vars.PX_SCALE_FACTOR}px;
  }

  button {
    display: inline;
    padding: ${8 * vars.PX_SCALE_FACTOR}px ${12 * vars.PX_SCALE_FACTOR}px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    margin-top: ${24 * vars.PX_SCALE_FACTOR}px;
    font-size: ${16 * vars.PX_SCALE_FACTOR}px;
  }

  p {
    margin: 0;
  }
`

const propNameTypeDefaults = [
  ["borderRadius", TYPES.INTEGER, 16],
  ["buttonText", TYPES.STRING, "OK"],
  ["colorScheme", TYPES.STRING, "primary"],
  ["customStyles", TYPES.STRING, ""],
  ["dismissible", TYPES.BOOLEAN, true],
  ["fontSize", TYPES.INTEGER, 16],
  ["gradientLevel", TYPES.FLOAT, 1.0],
  ["horizontalPadding", TYPES.FLOAT, 0],
  ["id", TYPES.STRING, ""],
  ["maxImageWidth", TYPES.INTEGER, 20],
  ["message", TYPES.HTML, "A default message"],
  ["stealFocus", TYPES.BOOLEAN, true],
  ["verticalPadding", TYPES.FLOAT, 1],
]

export class ModalComponent extends Dismissible(Base) {
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
    this.setAttribute("role", "dialog")
    this.setAttribute("aria-label", "Important Message")
    this.setAttribute("aria-modal", "true")

    // Get the configuration properties.
    const {
      buttonText,
      colorScheme,
      customStyles,
      dismissible,
      gradientLevel,
      message,
      stealFocus,
    } = this.props

    // Added any custom styles to the stylesheet.
    if (customStyles) {
      this.shadow.querySelector(
        "style",
      ).textContent += `\n\n/* Custom Styles Begin */\n${customStyles}`
    }

    // Define the main wrapper element.
    const [bgColor, color, buttonBgColor, buttonColor] = (
      SCHEME_NAME_COLORS_MAP[colorScheme] || colorScheme
    ).split(",")
    const bgRGB = hexToRgb(bgColor)

    this.shadow.appendChild(
      Element(`
      <div class="wrapper">
        <div class="content"
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
        </div>
      </div>
    `),
    )

    // Skip adding the button, event listeners, etc. if not dismissible.
    if (!dismissible) {
      return
    }

    // Define the dismiss button element.
    const contentEl = this.shadow.querySelector(".content")
    const buttonEl = Element(`
      <button style="background-color: ${buttonBgColor};
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

export const Modal = ComponentCreator(
  "important-message-modal",
  ModalComponent,
  [propNameTypeDefaults, dismissiblePropNameTypeDefaults],
)

// Define a variable into which an external process can inject configuration
// options. If we find at runtime that this has been replaced with an options
// object,use it to extend DEFAULTS, and immediately instantiate a modal.

// Define the injection placeholder and do a runtime mutation to confuse the
// compiler into not optimizing it out.
let INJECTED_OPTIONS = "<INJECT-OPTIONS-HERE>"
INJECTED_OPTIONS = (() => INJECTED_OPTIONS)()

if (typeof INJECTED_OPTIONS === "object") {
  const defaultOptions = Object.fromEntries(
    propNameTypeDefaults.map(([attr, , defVal]) => [attr, defVal]),
  )
  Modal(Object.assign(defaultOptions, INJECTED_OPTIONS))
}
