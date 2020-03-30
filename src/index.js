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
//  appElement Mutation Functions
//

function configureAppElementAsBanner(message) {
  // Mutate the App element into a banner.
  appElement.classList.add(
    options.notDismissible ? "non-dismissible" : "dismissible",
  )

  appElement.appendChild(
    Element(
      `<banner>
           ${message}
           ${options.notDismissible ? "" : "<button>x</button>"}
         </banner>`,
    ),
  )

  if (options.notDismissible) {
    return
  }

  // Add click and keypress handlers.

  // Bold the X on mouse enter.
  const buttonEl = appElement.querySelector("button")
  listenerRemovers.push(
    addEventListener(appElement, "mouseenter", e => {
      buttonEl.style.fontWeight = "bold"
    }),
  )

  // Unbold the X on mouse leave.
  listenerRemovers.push(
    addEventListener(appElement, "mouseleave", e => {
      buttonEl.style.fontWeight = "normal"
    }),
  )

  // Remove the element on click.
  listenerRemovers.push(
    addEventListener(appElement, "click", e => {
      removeListeners()
      dismiss()
    }),
  )

  // Remove the element on Escape.
  listenerRemovers.push(
    addEventListener(window, "keydown", e => {
      if (e.key === "Escape") {
        removeListeners()
        dismiss()
      }
    }),
  )
}

function configureAppElementAsModal(message) {
  // Mutate the App element into a modal.
  appElement.classList.add(
    options.notDismissible ? "non-dismissible" : "dismissible",
  )

  appElement.appendChild(
    Element(
      `<overlay>
         <modal>
           ${message}
           ${
             options.notDismissible
               ? ""
               : `<br><button>${options.buttonText}</button>`
           }
         </modal>
       </overlay>`,
    ),
  )

  if (options.notDismissible) {
    return
  }

  // Add click and keypress handlers.

  // Close the modal on overlay or button click.
  listenerRemovers.push(
    addEventListener(window, "click", e => {
      if (e.target.tagName === "OVERLAY" || e.target.tagName === "BUTTON") {
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
  appElement = INSTALL.createElement(location, appElement)

  // Set the app attribute to your app's dash-delimited alias.
  appElement.setAttribute("app", APP_NAME)

  // Set the font-size and image max-width based on the display pixel density.
  const pixelScaleFactor = getPixelScaleFactor()
  appElement.style.fontSize = `${16 * pixelScaleFactor}px`

  // Get the message content.
  let message = getMessageContent()

  // Wrap in a <message> element for padding control.
  message = `<message>${message}</message>`

  // Insert the HTML.
  if (options.displayMode === "banner") {
    configureAppElementAsBanner(message)
  } else {
    configureAppElementAsModal(message)
  }

  // Set the z-index to max + 1
  const maxZIndex = getMaxZIndex()
  appElement.style.zIndex = maxZIndex + 1

  // Apply the configurable styles.
  // Get the element with the tag name that's the same as the displayMode.
  const el = appElement.querySelector(options.displayMode)

  // colorScheme
  const [bgColor, color, buttonBgColor, buttonColor] = getColors()
  el.style.backgroundImage = getBackgroundImageGradient(bgColor)
  el.style.color = color
  // Apply style to dismissible modal button.
  if (options.displayMode === "modal" && !options.notDismissible) {
    const buttonEl = el.querySelector("button")
    buttonEl.style.backgroundColor = buttonBgColor
    buttonEl.style.color = buttonColor
  }

  // fontSize
  const messageEl = el.querySelector("message")
  messageEl.style.fontSize = `${options.fontSize}em`

  // padding
  messageEl.style.padding = `${options.verticalPadding}em ${options.horizontalPadding}em ${options.verticalPadding}em ${options.horizontalPadding}em`

  // margin
  if (options.displayMode === "banner" && options.notDismissible) {
    el.style.margin = `${options.verticalMargin}em ${options.horizontalMargin}em ${options.verticalMargin}em ${options.horizontalMargin}em`
  }

  // borderRadius
  if (options.displayMode === "banner" && !options.notDismissible) {
    // Only style bottom edge of dismissible banner.
    el.style.borderRadius = `0 0 ${options.borderRadius}px ${options.borderRadius}px`
  } else {
    el.style.borderRadius = `${options.borderRadius}px`
  }

  // image max-width
  if (options.messageType === "customRich") {
    el.querySelectorAll("img").forEach(_el => {
      _el.setAttribute(
        "style",
        `max-width: ${options.customRichMessageGroup.maxImageWidth}%`,
      )
    })
  }
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
