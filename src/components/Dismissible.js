import { TYPES } from "./utils.js"

const FOREVER = -1
const nowMs = Date.now

export const propNameTypeDefaults = [
  ["dismissalMinutes", TYPES.INTEGER, 0],
  ["dismissalContentProp", TYPES.STRING, undefined],
  ["id", TYPES.STRING, ""],
]

const Dismissible = C =>
  class extends C {
    constructor(propNameTypeDefaultsArr, options) {
      // Add this class's props to the array.
      propNameTypeDefaultsArr.push(propNameTypeDefaults)
      super(propNameTypeDefaultsArr, options)
    }

    connectedCallback() {
      super.connectedCallback()

      // Generate the local storage keys using the element tagName and id
      // attribute value to allow for multiple unique intances of the same
      // component.
      const tagName = this.tagName.toLowerCase()
      const { id } = this.props
      this.dismissedUntilKey = `${tagName}-${id}-dismissedUntil`
      this.dismissedContentKey = `${tagName}-${id}-dismissedContent`
    }

    setDismissedUntil(value) {
      // Set the dismissedUntil value in local storage.
      localStorage.setItem(this.dismissedUntilKey, `${value}`)
    }

    getDismissedUntil() {
      // Return the dismissedUntil value from local storage.
      const dismissedUntil = localStorage.getItem(this.dismissedUntilKey)
      return dismissedUntil === null ? null : parseInt(dismissedUntil, 10)
    }

    setDismissedContent(content) {
      // Set the dismissedContent value in local storage.
      localStorage.setItem(this.dismissedContentKey, content)
    }

    getDismissedContent() {
      // Return the dismissedContent value from local storage.
      return localStorage.getItem(this.dismissedContentKey)
    }

    clearDismissalStorage() {
      // Remove all dismissal-related items from local storage.
      localStorage.removeItem(this.dismissedUntilKey)
      localStorage.removeItem(this.dismissedContentKey)
    }

    getDismissalContent() {
      // Return the value of the property indicated by dismissalContentProp.
      // Note that this expects dismissalContentProp to be specified in
      // property-style camelCase format, which is easy to remember when
      // instantiating the component via JS, but less so when hand-crafting
      // the component via HTML, e.g. <... dismissal-content-prop="messageText">
      return this.props[this.props.dismissalContentProp]
    }

    dismiss() {
      const numMinutes = this.props.dismissalMinutes
      if (numMinutes === FOREVER || numMinutes > 0) {
        // Update local storage with dismissal period expiration time and
        // dismissed content values. A numMinutes time of -1 indicates "forever",
        // which we'll save to local storage to indicate the same.
        this.setDismissedUntil(
          numMinutes === FOREVER ? FOREVER : nowMs() + numMinutes * 60 * 1000,
        )
        this.setDismissedContent(this.getDismissalContent())
      } else {
        // Purge any dismissal-related items from local storage.
        this.clearDismissalStorage()
      }
    }

    isDismissed() {
      // Return a Boolean indicating whether this component is dismissed.
      const dismissedUntil = this.getDismissedUntil()
      // If there's no saved dismissal, return false.
      if (dismissedUntil === null) {
        return false
      }
      // If the currently configured dismissal period = 0, clear any existing
      // saved dismissal and return false.
      if (this.props.dismissalMinutes === 0) {
        this.clearDismissalStorage()
        return false
      }
      // If the saved dismissal period != FOREVER and the period has lapsed,
      // clear the saved dismissal and return false.
      if (dismissedUntil !== FOREVER && nowMs() >= dismissedUntil) {
        this.clearDismissalStorage()
        return false
      }
      // The dismissal period is either FOREVER or the period has not yet
      // lapsed, but if the message has changed, clear the saved dismissal and
      // return false.
      if (this.getDismissalContent() !== this.getDismissedContent()) {
        this.clearDismissalStorage()
        return false
      }
      // The component is dismissed.
      return true
    }
  }

export default Dismissible
