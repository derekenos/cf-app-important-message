// this import statement tells webpack to include styles.css in the build
import css from "./styles.css"


const PREDEFINED_MESSAGES = {
  "minorServiceInterruption":
  `
&#9888; We're experiencing a minor service interruption - some features may not work.
`,

  "majorServiceInterruption":
  `
&#9888; We're experiencing a major service outage - many features may not work.
`,

  "scheduledMaintenance":
  `
&#9888; We're currently undergoing scheduled maintenance - some features may not work.
`,
}


function MakeIntoBanner (appElement, message, options) {
  /* Mutate the App element into a banner.
   */
  appElement.classList.add('banner')
  if (options.alwaysDisplay) {
    appElement.classList.add('non-dismissible')
  } else {
    appElement.classList.add('dismissible')
  }
  appElement.innerHTML = `
    <div class="message">
      ${message}
      ${options.alwaysDisplay ? '' : '<span class="close">x</span>'}
    </div>
  `
  // If dismissible, add click and keypress handlers.
  if (!options.alwaysDisplay) {
    const clickHandler = e => {
      // Close the modal on any click.
      appElement.removeEventListener('click', clickHandler)
      appElement.remove()
    }
    appElement.addEventListener('click', clickHandler)

    const keyHandler = e => {
      // Close the modal if either Escape or Enter was pressed.
      if (e.key === "Escape") {
        appElement.remove()
        window.removeEventListener('keydown', keyHandler)
      }
    }
    window.addEventListener('keydown', keyHandler)
  }

}


function MakeIntoModal (appElement, message, options) {
  /* Mutate the App element into a modal.
   */
  appElement.classList.add('modal')
  if (options.alwaysDisplay) {
    appElement.classList.add('non-dismissible')
  } else {
    appElement.classList.add('dismissible')
  }
  appElement.innerHTML = `
    <div class="message">
      ${message}
      ${options.alwaysDisplay ? '' : '<p><button>OK</button></p>'}
    </div>
  `

  // If dismissible, add click and keypress handlers.
  if (!options.alwaysDisplay) {
    const clickHandler = e => {
      // Close the modal on any click.
      appElement.remove()
      window.removeEventListener('click', clickHandler)
    }
    window.addEventListener('click', clickHandler)

    const keyHandler = e => {
      // Close the modal if either Escape or Enter was pressed.
      if (e.key === "Escape" || e.key === "Enter") {
        appElement.remove()
        window.removeEventListener('keydown', keyHandler)
      }
    }
    window.addEventListener('keydown', keyHandler)
  }
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
    let message
    if (options.messageType === "predefined") {
      // Wrap in <p> for consistency with custom message richtext format.
      message = `<p>${PREDEFINED_MESSAGES[options.predefinedMessage]}</p>`
    } else {
      message = options.customMessage
    }

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
    if (options.displayMode === "modal") {
      messageEl.style.borderRadius = `${options.borderRadius}px`
    }
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
