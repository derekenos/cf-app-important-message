import css from "./styles.css"

import { Banner } from "./components/Banner"
import { Modal } from "./components/Modal"

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
let appElement

//
//  Utility Functions
//

const parseDecInt = s => parseInt(s, 10)

function escapeHTML(s) {
  const wrapper = document.createElement("div")
  wrapper.innerText = s
  return wrapper.innerHTML
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
// updateElement Function
//

function updateElement() {
  // Remove the element if it shouldn't be displayed.
  if (!options.enabled || !INSTALL.matchPage(options.pages) || isDismissed()) {
    if (appElement) {
      appElement.remove()
    }
    return
  }

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

  // Get the message content.
  const message = getMessageContent()

  // Get the colors.
  const [bgColor, color, buttonBgColor, buttonColor] = getColors()

  // Create the component.
  const componentOptions = {
    borderRadius,
    dismissible: !notDismissible,
    fontSize: fontSize * 16,
    horizontalMargin,
    horizontalPadding,
    message,
    verticalMargin,
    verticalPadding,
    gradientLevel: options.customBackgroundGradientLevel,
    maxImageWidth: options.customRichMessageGroup.maxImageWidth,
  }
  let componentEl
  if (displayMode === "banner") {
    componentOptions.colorScheme = `${bgColor},${color}`
    componentEl = Banner(componentOptions)
  } else {
    componentOptions.colorScheme = `${bgColor},${color},${buttonBgColor},${buttonColor}`
    componentOptions.stealFocus = INSTALL_ID !== "preview" || notDismissible
    componentEl = Modal(componentOptions)
  }

  // Create the appElement.
  const location =
    displayMode === "banner" && notDismissible
      ? options.location
      : { selector: "body", method: "prepend" }
  appElement = INSTALL.createElement(location, appElement)
  appElement.setAttribute("app", APP_NAME)
  appElement.appendChild(componentEl)
}

function init() {
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

// Check for IE10+
if (window.addEventListener && document.documentElement.classList) {
  init()
}
