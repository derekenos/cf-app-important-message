import css from "./styles.css"

//
// Constants
//

const PREDEFINED_MESSAGES = {
  minorServiceInterruption: `&#9888; We're experiencing a minor service interruption - some features may not work.`,
  majorServiceInterruption: `&#9888; We're experiencing a major service outage - many features may not work.`,
  scheduledMaintenance: `&#9888; We're currently undergoing scheduled maintenance - some features may not work.`,
}

//
// Variables
//

let options = INSTALL_OPTIONS
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
//  appElement Mutation Functions
//

function MakeIntoBanner(el, message) {
  // Mutate the App element into a banner.
  el.classList.add("banner")
  if (options.notDismissible) {
    el.classList.add("non-dismissible")
  } else {
    el.classList.add("dismissible")
  }
  el.appendChild(
    Element(
      `<message>
           ${options.notDismissible ? "" : "<closer>x</closer>"}
           ${message}
         </message>`,
    ),
  )

  // If dismissible, add click and keypress handlers.
  if (!options.notDismissible) {
    const closerEl = el.querySelector("closer")

    // Bold the X on mouse enter.
    el.addEventListener("mouseenter", e => {
      closerEl.style.fontWeight = "bold"
    })

    // Unbold the X on mouse leave.
    el.addEventListener("mouseleave", e => {
      closerEl.style.fontWeight = "normal"
    })

    // Remove the element on click.
    el.addEventListener("click", e => el.remove())

    // Remove the element on Escape.
    window.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        el.remove()
      }
    })
  }
}
function MakeIntoModal(el, message) {
  // Mutate the App element into a modal.
  el.classList.add("modal")
  if (options.notDismissible) {
    el.classList.add("non-dismissible")
  } else {
    el.classList.add("dismissible")
  }
  el.appendChild(
    Element(
      `<message>
           ${message}
           ${options.notDismissible ? "" : "<br><closer>OK</closer>"}
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
        el.remove()
      }
    })

    // Close the modal if either Escape or Enter was pressed.
    window.addEventListener("keydown", e => {
      if (e.key === "Escape" || e.key === "Enter") {
        el.remove()
      }
    })
  }
}

//
// updateElement Function
//

function updateElement() {
  // Determine whether app is enabled.
  if (!options.enabled || !INSTALL.matchPage(options.pages)) {
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
  appElement.setAttribute("app", "important-message")

  // Set the font-size based on the display pixel density.
  appElement.style.fontSize = `${16 * getPixelScaleFactor()}px`

  // Get the message content.
  let message
  if (options.messageType === "predefined") {
    // Wrap in <p> for consistency with custom message richtext format.
    message = `<p>${PREDEFINED_MESSAGES[options.predefinedMessage]}</p>`
  } else {
    message = options.customMessage
  }
  // Wrap in a <message-inner> element for padding control.
  message = `<message-inner>${message}</message-inner>`

  // Insert the HTML.
  if (options.displayMode === "banner") {
    MakeIntoBanner(appElement, message)
  } else {
    MakeIntoModal(appElement, message)
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
  messageInnerEl.style.padding = `${options.padding}em`

  // borderRadius
  if (options.displayMode === "modal") {
    messageEl.style.borderRadius = `${options.borderRadius}px`
  }
}

//
//  Physical Switch Functions
//

function requestSwitchState() {
  fetch(`https://iot.resource.name/${options.physicalSwitchId}`, {
    mode: "cors",
  }).then(res => {
    if (!res.ok || res.status !== 200) {
      updateElement()
    } else {
      res.json().then(data => {
        options.enabled = data.enabled
        updateElement()
      })
    }
  })
}

function updateElementWrapper() {
  if (options.usePhysicalSwitch) {
    requestSwitchState()
  } else {
    updateElement()
  }
}

function init() {
  if (!window.addEventListener) return // Check for IE9+

  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptions(nextOptions) {
      options = nextOptions
      updateElementWrapper()
    },
  }

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateElementWrapper)
  } else {
    updateElementWrapper()
  }
}

init()
