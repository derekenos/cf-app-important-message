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
  appElement.classList.add("banner")
  if (options.notDismissible) {
    appElement.classList.add("non-dismissible")
  } else {
    appElement.classList.add("dismissible")
  }
  appElement.appendChild(
    Element(
      `<message>
           ${options.notDismissible ? "" : "<closer>x</closer>"}
           ${message}
         </message>`,
    ),
  )

  // If dismissible, add click and keypress handlers.
  if (!options.notDismissible) {
    const closerEl = appElement.querySelector("closer")

    // Bold the X on mouse enter.
    appElement.addEventListener("mouseenter", e => {
      closerEl.style.fontWeight = "bold"
    })

    // Unbold the X on mouse leave.
    appElement.addEventListener("mouseleave", e => {
      closerEl.style.fontWeight = "normal"
    })

    // Remove the element on click.
    appElement.addEventListener("click", e => dismiss())

    // Remove the element on Escape.
    window.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        dismiss()
      }
    })
  }
}

function configureAppElementAsModal(message) {
  // Mutate the App element into a modal.
  appElement.classList.add("modal")
  if (options.notDismissible) {
    appElement.classList.add("non-dismissible")
  } else {
    appElement.classList.add("dismissible")
  }
  appElement.appendChild(
    Element(
      `<message>
           ${message}
           ${
             options.notDismissible
               ? ""
               : `<br><closer>${options.buttonText}</closer>`
           }
         </message>`,
    ),
  )

  // If dismissible, add click and keypress handlers.
  if (!options.notDismissible) {
    // Close the modal on overlay or button click.
    window.addEventListener("click", e => {
      if (
        e.target.tagName === "CLOUDFLARE-APP" ||
        e.target.tagName === "CLOSER"
      ) {
        dismiss()
      }
    })

    // Close the modal if either Escape or Enter was pressed.
    window.addEventListener("keydown", e => {
      if (e.key === "Escape" || e.key === "Enter") {
        dismiss()
      }
    })
  }
}

//
// updateElement Function
//

function updateElement() {
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

  // Wrap in a <message-inner> element for padding control.
  message = `<message-inner>${message}</message-inner>`

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
  const messageEl = appElement.querySelector("message")

  // colorScheme
  const [bgColor, color, buttonBgColor, buttonColor] = getColors()
  messageEl.style.backgroundImage = getBackgroundImageGradient(bgColor)
  messageEl.style.color = color
  // Apply style to dismissible modal button.
  if (options.displayMode === "modal" && !options.notDismissible) {
    const buttonEl = messageEl.querySelector("closer")
    buttonEl.style.backgroundColor = buttonBgColor
    buttonEl.style.color = buttonColor
  }

  // fontSize
  const messageInnerEl = messageEl.querySelector("message-inner")
  messageInnerEl.style.fontSize = `${options.fontSize}em`

  // padding
  messageInnerEl.style.padding = `${options.verticalPadding}em ${options.horizontalPadding}em ${options.verticalPadding}em ${options.horizontalPadding}em`

  // borderRadius
  if (options.displayMode === "modal") {
    messageEl.style.borderRadius = `${options.borderRadius}px`
  }

  // image max-width
  if (options.messageType === "customRich") {
    messageEl.querySelectorAll("img").forEach(el => {
      el.setAttribute(
        "style",
        `max-width: ${options.customRichMessageGroup.maxImageWidth *
          pixelScaleFactor}px`,
      )
    })
  }
}

function init() {
  if (!window.addEventListener) return // Check for IE9+

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
