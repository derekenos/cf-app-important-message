import css from "./styles.css"

//
// Constants
//

const APP_NAME = "important-message"
const DISMISSED_UNTIL_SESSION_KEY = `${APP_NAME}-dismissedUntil`
const DISMISSED_MESSAGE_SESSION_KEY = `${APP_NAME}-dismissedMessage`

const PREDEFINED_MESSAGES = {
  minorServiceInterruption: `&#9888; We're experiencing a minor service interruption - some features may not work.`,
  majorServiceInterruption: `&#9888; We're experiencing a major service outage - many features may not work.`,
  scheduledMaintenance: `&#9888; We're currently undergoing scheduled maintenance - some features may not work.`,
}

//
// Variables
//

let options = INSTALL_OPTIONS
let product = INSTALL_PRODUCT
const listenerRemovers = []
let appElement

//
//  Utility Functions
//

const parseDecInt = s => parseInt(s, 10)

function Element(tagNameOrDOMString, wrapperTag = "div") {
  // Returna new Element for a given tag name or DOM string.
  if (!tagNameOrDOMString.startsWith("<"))
    return document.createElement(tagNameOrDOMString)
  const wrapper = document.createElement(wrapperTag)
  wrapper.innerHTML = tagNameOrDOMString
  const el = wrapper.firstChild
  if (el.nodeName === "#text") {
    throw new Error(
      `Element creation failed. Maybe ${wrapperTag} is not a valid parent for: ${tagNameOrDOMString}`,
    )
  }
  wrapper.removeChild(el)
  return el
}

function getMaxZIndex() {
  // Adapted from: https://dash.cloudflare.com/apps/developer/docs/techniques/styles#z-indexes
  let max = 0
  const elements = document.getElementsByTagName("*")
  Array.prototype.slice.call(elements).forEach(element => {
    const zIndex = parseDecInt(
      document.defaultView.getComputedStyle(element).zIndex,
    )
    max = zIndex ? Math.max(max, zIndex) : max
  })
  return max
}

function getPixelScaleFactor() {
  // Return the factor with which to scale our absolute pixel values for
  // consistent display across varying resolution displays.
  const el = document.querySelector("meta[name=viewport]")
  if (
    el !== null &&
    el.content &&
    el.content.includes("width=device-width") &&
    el.content.includes("initial-scale=1")
  ) {
    return 1
  }
  return window.devicePixelRatio
}

function escapeHTML(s) {
  const wrapper = Element("div")
  wrapper.innerText = s
  return wrapper.innerHTML
}

function hexToRgb(hex) {
  // Adapted from: https://stackoverflow.com/a/5624139/2327940
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const v = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(v)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

function addEventListener(el, event, fn) {
  // Add an event listener and return a function to remove it.
  el.addEventListener(event, fn)
  return () => el.removeEventListener(event, fn)
}

const removeListeners = () => {
  while (listenerRemovers.length > 0) {
    listenerRemovers.shift()()
  }
}

//
// Options Getters
//

function getMessageContent() {
  let message
  switch (options.messageType) {
    case "customPlain":
      // Wrap in <p> for consistency with custom message richtext format and
      // escape HTML to enforce plain-text.
      message = `<p>${escapeHTML(options.customPlainMessage)}</p>`
      break

    case "customRich":
      ;({ message } = options.customRichMessageGroup)
      break

    case "customHTML":
      // Wrap in <p> for consistency with custom message richtext format.
      message = `<p>${options.customHTMLMessage}</p>`
      break

    default:
      // Wrap in <p> for consistency with custom message richtext format.
      message = `<p>${PREDEFINED_MESSAGES[options.messageType]}</p>`
      break
  }
  return message
}

function getColors() {
  if (options.colorScheme !== "custom") {
    return options.colorScheme.split(",")
  }
  return [
    options.customBackgroundColor,
    options.customTextColor,
    options.customButtonBackgroundColor,
    options.customButtonTextColor,
  ]
}

function getDismissedUntilMinutes() {
  if (options.dismissedUntilMinutes !== "custom") {
    return parseDecInt(options.dismissedUntilMinutes)
  }
  return (
    options.customDismissalPeriodGroup.minutes *
    parseDecInt(options.customDismissalPeriodGroup.multiplier)
  )
}

function getBackgroundImageGradient(hex) {
  const finalOpacity =
    options.colorScheme === "custom"
      ? 1 - options.customBackgroundGradientLevel
      : 0.5
  const { r, g, b } = hexToRgb(hex)
  return `linear-gradient(0deg, rgba(${r}, ${g}, ${b}, 1), rgba(${r}, ${g}, ${b}, ${finalOpacity}))`
}

//
//  Dismissal Helper Functions
//

const nowMs = Date.now

const setDismissedUntil = value =>
  localStorage.setItem(DISMISSED_UNTIL_SESSION_KEY, `${value}`)

const getDismissedUntil = () => {
  const dismissedUntil = localStorage.getItem(DISMISSED_UNTIL_SESSION_KEY)
  return dismissedUntil === null ? null : parseDecInt(dismissedUntil)
}

const setDismissedMessage = message =>
  localStorage.setItem(DISMISSED_MESSAGE_SESSION_KEY, message)

const getDismissedMessage = () =>
  localStorage.getItem(DISMISSED_MESSAGE_SESSION_KEY)

const clearDismissalStorage = () => {
  localStorage.removeItem(DISMISSED_UNTIL_SESSION_KEY)
  localStorage.removeItem(DISMISSED_MESSAGE_SESSION_KEY)
}

function dismiss() {
  // Set the dismissedUntil time and remove the element from the DOM.
  if (options.notDismissible) {
    clearDismissalStorage()
  } else {
    const dismissalPeriodMs = getDismissedUntilMinutes() * 60 * 1000
    if (dismissalPeriodMs > 0) {
      setDismissedUntil(nowMs() + dismissalPeriodMs)
      setDismissedMessage(getMessageContent())
    }
  }
  removeListeners()
  appElement.remove()
}

function isDismissed() {
  if (options.notDismissible) {
    return false
  }
  // Return a Boolean indicating whether user dismissal is active.
  const dismissedUntil = getDismissedUntil()
  // Check for any saved dismissedUntil value.
  if (dismissedUntil === null) {
    return false
  }
  // Check whether the dismissal period has expired.
  if (nowMs() >= dismissedUntil) {
    clearDismissalStorage()
    return false
  }
  // Check whether the message content has changed since dismissal.
  if (getMessageContent() !== getDismissedMessage()) {
    clearDismissalStorage()
    return false
  }
  return true
}

//
//  Component Factory Functions
//

function BannerElement(message) {
  const el = Element(
    `<banner class="show">
       <message>${message}</message>
       ${options.notDismissible ? "" : "<button>x</button>"}
     </banner>`,
  )

  el.classList.add(options.notDismissible ? "non-dismissible" : "dismissible")

  if (!options.notDismissible) {
    // Add click and keypress handlers.
    const close = () => {
      listenerRemovers.push(
        addEventListener(el, "animationend", () => {
          removeListeners()
          dismiss()
        }),
      )
      el.classList.remove("show")
      // See here for why I'm reading the offsetWidth:
      // https://stackoverflow.com/a/30072037/2327940
      const _ = el.offsetWidth
      el.classList.add("hide")
    }

    // Bold the X on mouse enter.
    const buttonEl = el.querySelector("button")
    listenerRemovers.push(
      addEventListener(el, "mouseenter", e => {
        buttonEl.style.fontWeight = "bold"
      }),
    )

    // Unbold the X on mouse leave.
    listenerRemovers.push(
      addEventListener(el, "mouseleave", e => {
        buttonEl.style.fontWeight = "normal"
      }),
    )

    // Remove the element on click.
    listenerRemovers.push(
      addEventListener(el, "click", e => {
        close()
      }),
    )

    // Remove the element on Escape.
    listenerRemovers.push(
      addEventListener(window, "keydown", e => {
        if (e.key === "Escape") {
          close()
        }
      }),
    )
  }

  return el
}

function ModalElement(message) {
  const el = Element(
    `<modal>
       <content>
         <message>${message}</message>
         ${
           options.notDismissible
             ? ""
             : `<br><button>${options.buttonText}</button>`
         }
       </content>
     </modal>`,
  )

  el.classList.add(options.notDismissible ? "non-dismissible" : "dismissible")

  if (!options.notDismissible) {
    // Add click and keypress handlers.

    // Close the modal on overlay or button click.
    listenerRemovers.push(
      addEventListener(window, "click", e => {
        if (e.target.tagName === "MODAL" || e.target.tagName === "BUTTON") {
          removeListeners()
          dismiss()
        }
      }),
    )

    // Close the modal if either Escape or Enter was pressed.
    listenerRemovers.push(
      addEventListener(window, "keydown", e => {
        if (e.key === "Escape" || e.key === "Enter") {
          removeListeners()
          dismiss()
        }
      }),
    )
  }

  return el
}

//
// updateElement Function
//

function updateElement() {
  // Remove any existing event listeners.
  removeListeners()

  if (!options.enabled || !INSTALL.matchPage(options.pages) || isDismissed()) {
    if (appElement) {
      appElement.remove()
    }
    return
  }

  let location
  if (options.displayMode === "banner" && options.notDismissible) {
    ;({ location } = options)
  } else {
    location = { selector: "body", method: "prepend" }
  }

  // Get the message content.
  const message = getMessageContent()

  // Get the component.
  let el
  if (options.displayMode === "banner") {
    el = BannerElement(message)
  } else {
    el = ModalElement(message)
  }

  // Set the z-index to max + 1
  const maxZIndex = getMaxZIndex()
  el.style.zIndex = maxZIndex + 1

  // Destructure the options we'll be using.
  const {
    displayMode,
    fontSize,
    verticalPadding,
    horizontalPadding,
    notDismissible,
    verticalMargin,
    horizontalMargin,
    borderRadius,
    messageType,
  } = options

  // Get the content element.
  const contentEl = displayMode === "modal" ? el.querySelector("content") : el

  // Set the font-size and image max-width based on the display pixel density.
  const pixelScaleFactor = getPixelScaleFactor()
  contentEl.style.fontSize = `${16 * pixelScaleFactor}px`

  // Apply the configurable styles.

  // colorScheme
  const [bgColor, color, buttonBgColor, buttonColor] = getColors()
  contentEl.style.backgroundImage = getBackgroundImageGradient(bgColor)
  contentEl.style.color = color
  // Apply style to dismissible modal button.
  if (displayMode === "modal" && !notDismissible) {
    const buttonEl = contentEl.querySelector("button")
    buttonEl.style.backgroundColor = buttonBgColor
    buttonEl.style.color = buttonColor
  }

  // fontSize
  const messageEl = contentEl.querySelector("message")
  messageEl.style.fontSize = `${fontSize}em`

  // padding
  messageEl.style.padding = `${verticalPadding}em ${horizontalPadding}em ${verticalPadding}em ${horizontalPadding}em`

  // margin
  if (displayMode === "banner" && notDismissible) {
    contentEl.style.margin = `${verticalMargin}em ${horizontalMargin}em ${verticalMargin}em ${horizontalMargin}em`
  }

  // borderRadius
  if (displayMode === "banner" && !notDismissible) {
    // Only style bottom edge of dismissible banner.
    contentEl.style.borderRadius = `0 0 ${borderRadius}px ${borderRadius}px`
  } else {
    contentEl.style.borderRadius = `${borderRadius}px`
  }

  // image max-width
  if (messageType === "customRich") {
    contentEl.querySelectorAll("img").forEach(_el => {
      _el.setAttribute(
        "style",
        `max-width: ${options.customRichMessageGroup.maxImageWidth}%`,
      )
    })
  }

  // Create the appElement, set the "app" prop, and append the component.
  appElement = INSTALL.createElement(location, appElement)
  appElement.setAttribute("app", APP_NAME)
  appElement.appendChild(el)
}

function init() {
  // Check for IE10+
  if (!window.addEventListener || !document.documentElement.classList) {
    return
  }

  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptions(nextOptions) {
      options = nextOptions
      clearDismissalStorage()
      updateElement()
    },
    setProduct(nextProduct) {
      product = nextProduct
      updateElement()
    },
  }

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => updateElement())
  } else {
    updateElement()
  }
}

init()
