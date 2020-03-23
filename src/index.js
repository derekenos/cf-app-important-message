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

//
//  appElement Mutation Functions
//

function MakeIntoBanner(el, message, options) {
  // Mutate the App element into a banner.
  el.classList.add("banner")
  if (options.notDismissible) {
    el.classList.add("non-dismissible")
  } else {
    el.classList.add("dismissible")
  }
  el.appendChild(
    Element(
      `<div class="message">
           ${message}
           ${options.notDismissible ? "" : '<span class="close">x</span>'}
         </div>`,
    ),
  )

  // If dismissible, add click and keypress handlers.
  if (!options.notDismissible) {
    const clickHandler = e => {
      // Close the modal on any click.
      el.removeEventListener("click", clickHandler)
      el.remove()
    }
    el.addEventListener("click", clickHandler)

    const keyHandler = e => {
      // Close the modal if either Escape or Enter was pressed.
      if (e.key === "Escape") {
        el.remove()
        window.removeEventListener("keydown", keyHandler)
      }
    }
    window.addEventListener("keydown", keyHandler)
  }
}
function MakeIntoModal(el, message, options) {
  // Mutate the App element into a modal.
  el.classList.add("modal")
  if (options.notDismissible) {
    el.classList.add("non-dismissible")
  } else {
    el.classList.add("dismissible")
  }
  el.appendChild(
    Element(
      `<div class="message">
           ${message}
           ${options.notDismissible ? "" : "<p><button>OK</button></p>"}
         </div>`,
    ),
  )

  // If dismissible, add click and keypress handlers.
  if (!options.notDismissible) {
    const clickHandler = e => {
      // Close the modal on any click.
      el.remove()
      window.removeEventListener("click", clickHandler)
    }
    window.addEventListener("click", clickHandler)

    const keyHandler = e => {
      // Close the modal if either Escape or Enter was pressed.
      if (e.key === "Escape" || e.key === "Enter") {
        el.remove()
        window.removeEventListener("keydown", keyHandler)
      }
    }
    window.addEventListener("keydown", keyHandler)
  }
}

//
// updateElement Function
//

function updateElement(options) {
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

  // Get the message content.
  let message
  if (options.messageType === "predefined") {
    // Wrap in <p> for consistency with custom message richtext format.
    message = `<p>${PREDEFINED_MESSAGES[options.predefinedMessage]}</p>`
  } else {
    message = options.customMessage
  }

  // Insert the HTML.
  if (options.displayMode === "banner") {
    MakeIntoBanner(appElement, message, options)
  } else {
    MakeIntoModal(appElement, message, options)
  }

  // Set the z-index to max + 1
  const maxZIndex = getMaxZIndex()
  appElement.style.zIndex = maxZIndex + 1

  // Apply the configurable styles.
  const messageEl = appElement.querySelector(".message")

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
      const buttonEl = messageEl.querySelector("button")
      buttonEl.style.backgroundColor = buttonBgColor
      buttonEl.style.color = buttonColor
    }
  } else {
    messageEl.style.backgroundColor = options.customBackgroundColor
    messageEl.style.color = options.customTextColor
  }

  if (options.displayMode === "modal") {
    messageEl.style.borderRadius = `${options.borderRadius}px`
  }
}

function init() {
  if (!window.addEventListener) return // Check for IE9+

  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptions(options) {
      updateElement(options)
    },
  }

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      updateElement(INSTALL_OPTIONS),
    )
  } else {
    updateElement(INSTALL_OPTIONS)
  }
}

init()
