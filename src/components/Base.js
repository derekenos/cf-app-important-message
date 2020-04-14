import {
  STRING_TYPE_PARSER_MAP,
  STRING_TYPE_ENCODER_MAP,
  camelToKebab,
  getMaxZIndex,
  getPixelScaleFactor,
  isUndefined,
} from "./utils.js"

function flattenPropNameTypeDefaults(propNameTypeDefaultsArr) {
  // Flatten propNameTypeDefaultsArr into a single object, asserting
  // that no name is specified multiple times with different types.
  const seenNameTypeMap = {}
  const flattenedPropNameTypeDefaults = []
  propNameTypeDefaultsArr.forEach(propNameTypeDefaults =>
    propNameTypeDefaults.forEach(([name, type, defVal]) => {
      const seenType = seenNameTypeMap[name]
      if (!seenType || seenType === type) {
        // Name hasn't been seen or has and type is the same.
        flattenedPropNameTypeDefaults.push([name, type, defVal])
        seenNameTypeMap[name] = type
      } else {
        // Name has been seen before as a different type.
        throw new Error(
          `Prop name (${name}) specified as both types (${seenType}) and (${type})`,
        )
      }
    }),
  )
  return flattenedPropNameTypeDefaults
}

class Base extends HTMLElement {
  constructor(propNameTypeDefaultsArr, options) {
    super()

    // Create an array to collect event listener remover functions.
    this.eventListenerRemovers = []

    // Attach a shadow DOM.
    this.shadow = this.attachShadow({ mode: "open" })

    // Save some things for later.
    this.propNameTypeDefaults = flattenPropNameTypeDefaults(
      propNameTypeDefaultsArr,
    )
    this.styleFactory = options.styleFactory
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

  getAttribute(name, defVal) {
    // Override getAttribute() to allow the specification of a default value.
    return this.hasAttribute(name) ? super.getAttribute(name) : defVal
  }

  getParsedAttributes() {
    // Use the attribute configuration to parse and return the specified element
    // attribute values.
    const undefinedAttrNames = []
    const props = Object.fromEntries(
      this.propNameTypeDefaults.map(([name, type, defVal]) => {
        const parser = STRING_TYPE_PARSER_MAP[type]
        const attrName = camelToKebab(name)
        const value = parser(this.getAttribute(attrName), defVal)
        if (isUndefined(value)) {
          undefinedAttrNames.push(attrName)
        }
        return [name, value]
      }),
    )
    // Check for undefined values.
    if (undefinedAttrNames.length) {
      throw new Error(
        `Undefined required attributes: ${undefinedAttrNames.join(", ")}`,
      )
    }
    return props
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

export function ComponentCreator(tagName, component, propNameTypeDefaultsArr) {
  // Return a function that will create and optionally mount a component.
  // Register the element if necessary.
  try {
    customElements.define(tagName, component)
  } catch (e) {
    console.info(e)
  }

  const propNameTypeDefaults = flattenPropNameTypeDefaults(
    propNameTypeDefaultsArr,
  )

  return (attributes, autoMount = true) => {
    // Generate an array for formatted element name/value pairs.
    const nameValuePairs = []
    propNameTypeDefaults.forEach(([attr, type, defVal]) => {
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

    // Create the element and use setAttribute() instead of setting innerHTML
    // to ensure that attribute values containing HTML entities are properly
    // escaped.
    // E.g. if you set innerHTML to something like:
    //   `<div a="&lt;br&gt;"></div>`
    // When you then read back innerHTML, you get:
    //   `<div a="<br>"></div>`
    // The properly escaped attribute value is:
    //   `<div a="&amp;lt;br&amp;gt;"></div>`
    // which setAttribute() will take care of for you.
    const el = document.createElement(`${tagName}`)
    nameValuePairs.forEach(([k, v]) => el.setAttribute(k, v))

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
