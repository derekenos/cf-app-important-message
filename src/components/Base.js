import {
  Element,
  STRING_TYPE_PARSER_MAP,
  STRING_TYPE_ENCODER_MAP,
  camelToKebab,
  getAttr,
  getMaxZIndex,
  getPixelScaleFactor,
} from "./utils.js"

class Base extends HTMLElement {
  constructor({ attributeNameTypeDefaults, styleFactory }) {
    super()

    // Create an array to collect event listener remover functions.
    this.eventListenerRemovers = []

    // Attach a shadow DOM.
    this.shadow = this.attachShadow({ mode: "open" })

    // Save some things for later.
    this.attributeNameTypeDefaults = attributeNameTypeDefaults
    this.styleFactory = styleFactory
  }

  connectedCallback() {
    // Parse the configured attributes and assign to this.props
    this.props = this.getParsedAttributes()

    // Use the style factory to generate the style element content by
    // interpolating with this.props augmented with the following helpful
    // values:
    const vars = {
      PX_SCALE_FACTOR: getPixelScaleFactor(),
      MAX_Z_INDEX: getMaxZIndex(),
    }
    const styleEl = document.createElement("style")
    styleEl.textContent = this.styleFactory(Object.assign(vars, this.props))
    this.shadow.appendChild(styleEl)
  }

  disconnectedCallback() {
    // Remove all added event listeners.
    this.removeEventListeners()
  }

  getParsedAttributes() {
    // Use the attribute configuration to parse and return the specified element
    // attribute values.
    return Object.fromEntries(
      this.attributeNameTypeDefaults.map(([attr, type, defVal]) => {
        const parser = STRING_TYPE_PARSER_MAP[type]
        const value = parser(getAttr(this, camelToKebab(attr)), defVal)
        return [attr, value]
      }),
    )
  }

  addEventListener(el, event, fn) {
    // Override the default addEventListener method to allow non-this elements
    // to be specified and to generate and collect listener remover functions.
    if (el instanceof Base) {
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

export default Base

export function ComponentCreator(
  tagName,
  component,
  attributeNameTypeDefaults,
) {
  // Return a function that will create and optionally mount a component.
  // Register the element if necessary.
  try {
    customElements.define(tagName, component)
  } catch (e) {
    console.info(e)
  }

  return (attributes, autoMount = true) => {
    // Generate an array for formatted element name/value pairs.
    const nameValuePairs = []
    attributeNameTypeDefaults.forEach(([attr, type, defVal]) => {
      const name = camelToKebab(attr)
      const attrsValue = attributes[attr]
      const value =
        attrsValue === undefined
          ? defVal
          : STRING_TYPE_ENCODER_MAP[type](attrsValue)
      // Only include non-empty values.
      if (value) {
        nameValuePairs.push([name, value])
      }
    })

    // Create the element.
    const el = Element(`
      <${tagName} ${nameValuePairs.map(([k, v]) => `${k}="${v}"`).join(" ")}>
      </${tagName}>
      `)

    // If autoMount is specified, append the newly-created element to the body.
    // A reasonable assumption is that either:
    //   - The element is absolutely positioned and thus it's placement in
    //     the DOM doesn't matter
    //   - It implements the Insertable class and will be automatically
    //     relocated
    if (autoMount) {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () =>
          document.body.appendChild(el),
        )
      } else {
        document.body.appendChild(el)
      }
    }

    // Return the element for fun.
    return el
  }
}
