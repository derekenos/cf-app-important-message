import { Banner } from "./components/Banner"
import { Modal } from "./components/Modal"

//
// Constants
//

const APP_NAME = "important-message"

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
      message = `${escapeHTML(options.customPlainMessage)}`
      break

    case "customRich":
      ;({ message } = options.customRichMessageGroup)
      break

    case "customHTML":
      message = `${options.customHTMLMessage}`
      break

    default:
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
// updateElement Function
//

function updateElement() {
  // Remove the element if it shouldn't be displayed.
  if (!options.enabled || !INSTALL.matchPage(options.pages)) {
    if (appElement) {
      appElement.remove()
    }
    return
  }

  const {
    bannerUrl,
    borderRadius,
    buttonText,
    customStyles,
    displayMode,
    fontSize,
    horizontalMargin,
    horizontalPadding,
    notDismissible,
    verticalMargin,
    verticalPadding,
  } = options

  // Get the message content.
  const message = getMessageContent()

  // Get the colors.
  const [bgColor, color, buttonBgColor, buttonColor] = getColors()

  // Create the component.
  const componentOptions = {
    borderRadius,
    buttonText,
    customStyles,
    dismissalContentProp: "message",
    dismissalMinutes: getDismissedUntilMinutes(),
    dismissible: !notDismissible,
    fontSize,
    gradientLevel: options.customBackgroundGradientLevel,
    horizontalMargin,
    horizontalPadding,
    maxImageWidth: options.customRichMessageGroup.maxImageWidth,
    message,
    verticalMargin,
    verticalPadding,
  }
  let componentEl
  if (displayMode === "banner") {
    componentOptions.colorScheme = `${bgColor},${color}`
    componentOptions.bannerUrl = bannerUrl
    componentEl = Banner(componentOptions, false)
  } else {
    componentOptions.colorScheme = `${bgColor},${color},${buttonBgColor},${buttonColor}`
    componentOptions.stealFocus = INSTALL_ID !== "preview" || notDismissible
    componentEl = Modal(componentOptions, false)
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
