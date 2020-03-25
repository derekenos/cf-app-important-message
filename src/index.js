import css from "./styles.css"

//
// Constants
//

const APP_NAME = "important-message"
const DISMISSED_UNTIL_SESSION_KEY = `${APP_NAME}-dismissedUntil`

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
    const zIndex = parseInt(
      document.defaultView.getComputedStyle(element).zIndex,
      10,
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

//
//  Dismissal Helper Functions
//

const nowMs = Date.now

const setDismissedUntil = value =>
  localStorage.setItem(DISMISSED_UNTIL_SESSION_KEY, `${value}`)

const getDismissedUntil = () => {
  const dismissedUntil = localStorage.getItem(DISMISSED_UNTIL_SESSION_KEY)
  return dismissedUntil === null ? null : parseInt(dismissedUntil, 10)
}

function dismiss() {
  // Set the dismissedUntil time and remove the element from the DOM.
  if (options.dismissalPeriodMinutes > 0) {
    const dismissedUntil = nowMs() + options.dismissalPeriodMinutes * 1000 * 60
    setDismissedUntil(dismissedUntil)
  }
  appElement.remove()
}

function isDismissed() {
  // Return a Boolean indicating whether user dismissal is active.
  const dismissedUntil = getDismissedUntil()
  if (dismissedUntil === null) {
    return false
  }
  if (nowMs() >= dismissedUntil) {
    localStorage.removeItem(DISMISSED_UNTIL_SESSION_KEY)
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
  let message
  switch (options.messageType) {
    case "predefined":
      // Wrap in <p> for consistency with custom message richtext format.
      message = `<p>${PREDEFINED_MESSAGES[options.predefinedMessage]}</p>`
      break

    case "customPlain":
      // Wrap in <p> for consistency with custom message richtext format.
      message = `<p>${options.customPlainMessage}</p>`
      break

    case "customRich":
      ;({ message } = options.customRichMessageGroup)
      break

    default:
      break
  }

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
  if (options.colorScheme === "predefined") {
    const [
      bgColor,
      color,
      buttonBgColor,
      buttonColor,
    ] = options.predefinedColorScheme.split(",")
    messageEl.style.backgroundColor = bgColor
    messageEl.style.color = color
    // Apply style to dismissible modal button.
    if (options.displayMode === "modal" && !options.notDismissible) {
      const buttonEl = messageEl.querySelector("closer")
      buttonEl.style.backgroundColor = buttonBgColor
      buttonEl.style.color = buttonColor
    }
  } else {
    messageEl.style.backgroundColor = options.customBackgroundColor
    messageEl.style.color = options.customTextColor
    if (options.displayMode === "modal" && !options.notDismissible) {
      const buttonEl = messageEl.querySelector("closer")
      buttonEl.style.backgroundColor = options.customButtonBackgroundColor
      buttonEl.style.color = options.customButtonTextColor
    }
  }

  // fontSize
  messageEl.style.fontSize = `${options.fontSize}em`

  // padding
  const messageInnerEl = messageEl.querySelector("message-inner")
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
