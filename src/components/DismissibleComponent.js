import BaseComponent from "./BaseComponent.js"
import { getIntAttr, getStrAttr } from "./utils.js"

// Define the default required HTML element attribute names.
const MINUTES_ATTR_NAME = "dismissal-minutes"
const CONTENT_ATTR_NAME = "content"

const nowMs = Date.now

class DismissibleComponent extends BaseComponent {
  constructor({ ...props }) {
    super()
    // Allow subclass to override the attribute names.
    this.minutesAttrName = props.minutesAttrName || MINUTES_ATTR_NAME
    this.contentAttrName = props.contentAttrName || CONTENT_ATTR_NAME
  }

  connectedCallback() {
    // Generate the local storage keys using the element tagName and id
    // attribute value to allow for multiple unique intances of the same
    // component.
    const tagName = this.tagName.toLowerCase()
    const id = this.getAttribute("id") || ""
    this.dismissedUntilKey = `${tagName}-${id}-dismissedUntil`
    this.dismissedContentKey = `${tagName}-${id}-dismissedContent`
  }

  getDismissalContent() {
    // Return the component's content attribute value.
    return getStrAttr(this, this.contentAttrName, "")
  }

  getDismissalMinutes() {
    // Return the component's dismissal minutes value.
    return getIntAttr(this, this.minutesAttrName, 0)
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

  dismiss() {
    const numMinutes = this.getDismissalMinutes()
    if (numMinutes > 0) {
      // Update local storage with dismissal period expiration time and
      // dismissed content values.
      this.setDismissedUntil(nowMs() + numMinutes * 60 * 1000)
      this.setDismissedContent(this.getDismissalContent())
    } else {
      // Purge any dismissal-related items from local storage.
      this.clearDismissalStorage()
    }
  }

  isDismissed() {
    // Return a Boolean indicating whether user dismissal is active.
    // Check whether the configured period is greater than 0.
    if (!(this.getDismissalMinutes() > 0)) {
      this.clearDismissalStorage()
      return false
    }
    const dismissedUntil = this.getDismissedUntil()
    // Check for any saved dismissedUntil value.
    if (dismissedUntil === null) {
      return false
    }
    // Check whether the dismissal period has expired.
    if (nowMs() >= dismissedUntil) {
      this.clearDismissalStorage()
      return false
    }
    // Check whether the content content has changed since dismissal.
    if (this.getDismissalContent() !== this.getDismissedContent()) {
      this.clearDismissalStorage()
      return false
    }
    return true
  }
}

export default DismissibleComponent
