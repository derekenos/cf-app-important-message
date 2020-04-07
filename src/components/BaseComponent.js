class BaseComponent extends HTMLElement {
  disconnectedCallback() {
    // Remove all added event listeners.
    this.removeEventListeners()
  }

  addEventListener(el, event, fn) {
    // Override the default addEventListener method to allow non-this elements
    // to be specified and to generate and collect listener remover functions.
    if (el instanceof BaseComponent) {
      super.addEventListener(event, fn)
      this.eventListenerRemovers.push(() =>
        super.removeEventListener(event, fn),
      )
    } else {
      el.addEventListener(event, fn)
      this.eventListenerRemovers.push(() => el.removeEventListener(event, fn))
    }
  }

  removeEventListeners() {
    // Call and remove all eventListenerRemovers functions.
    while (this.eventListenerRemovers.length > 0) {
      this.eventListenerRemovers.shift()()
    }
  }
}

export default BaseComponent
