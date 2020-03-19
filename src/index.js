// this import statement tells webpack to include styles.css in the build
import css from "./styles.css"


const PREDEFINED_MESSAGES = {
  "minorServiceInterruption":
  `
We're experiencing a minor service interruption - some features may not work.
`,

  "majorServiceInterruption":
  `
We're experiencing a major service outage - many features may not work.
`,

  "scheduledMaintenance":
  `
We're currently undergoing scheduled maintenance - some features may not work.
`,
}


function MakeIntoBanner (appElement, message, options) {
  /* Mutate the App element into a banner.
   */
  appElement.classList.add('banner')
  appElement.innerHTML = `
    <div class="message">
      ${message}
    </div>
  `
}


function MakeIntoModal (appElement, message, options) {
  /* Mutate the App element into a modal.
   */
  appElement.classList.add('modal')
  appElement.innerHTML = `
    <div class="message">
      ${message}
    </div>
  `
}


function init() {
  if (!window.addEventListener) return // Check for IE9+

  let options = INSTALL_OPTIONS
  let element

  // updateElement runs every time the options are updated.
  // Most of your code will end up inside this function.
  function updateElement() {
    if (!options.enabled || !INSTALL.matchPage(options.pages)) {
      if (element) {
        element.remove()
      }
      return
    }

    const location = {selector: "body", method: "prepend"}
    element = INSTALL.createElement(location, element)

    // Set the app attribute to your app's dash-delimited alias.
    element.setAttribute("app", "important-message")

    // Get the message content.
    const message = options.messageType === "predefined" ?
          PREDEFINED_MESSAGES[options.predefinedMessage] : options.customMessage

    // Insert the HTML.
    if (options.displayMode === "banner") {
      MakeIntoBanner(element, message, options)
    } else {
      MakeIntoModal(element, message, options)
    }

    // Apply the configurable styles.
    const messageEl = element.querySelector('.message')
    if (options.colorScheme === "predefined") {
      const [bgColor, color] = options.predefinedColorScheme.split(',')
      messageEl.style.backgroundColor = bgColor
      messageEl.style.color = color
    } else {
      messageEl.style.backgroundColor = options.customBackgroundColor
      messageEl.style.color = options.customTextColor
    }
    messageEl.style.borderRadius = `
      ${options.displayMode === "banner" ? 0 : options.borderRadius}px
      ${options.displayMode === "banner" ? 0 : options.borderRadius}px
      ${options.borderRadius}px
      ${options.borderRadius}px
    `
  }

  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptions(nextOptions) {
      options = nextOptions

      updateElement()
    },
  }

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateElement)
  } else {
    updateElement()
  }
}

init()
