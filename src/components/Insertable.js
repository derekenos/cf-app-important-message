import { TYPES, isNull } from "./utils.js"

const FINAL_LOCATION_ATTR_NAME = "location-final"

export const propNameTypeDefaults = [
  ["locationSelector", TYPES.STRING, null],
  ["locationMethod", TYPES.STRING, null],
]

function insertElementAtLocation(element, selector, method) {
  // Relocate an element to the location specified by selector and method.
  const target = document.querySelector(selector)
  if (target === null) {
    throw new Error(`No location found for selector: ${selector}`)
  }
  const children = target.childNodes
  const hasChildren = children.length > 0
  const { nextSibling } = target
  switch (method) {
    case "before":
      target.parentNode.insertBefore(element, target)
      break
    case "after":
      if (nextSibling === null) {
        target.parentNode.appendChild(element)
      } else {
        target.parentNode.insertBefore(element, nextSibling)
      }
      break
    case "prepend":
      target.insertBefore(element, hasChildren ? children[0] : null)
      break
    case "append":
      target.appendChild(element)
      break
    case "replace":
      target.replaceWith(element)
      break
    default:
      throw new Error(`method "${method}" not implemented`)
  }
}

const Insertable = C =>
  class extends C {
    constructor(propNameTypeDefaultsArr, options) {
      // Add this class's props to the array.
      propNameTypeDefaultsArr.push(propNameTypeDefaults)
      super(propNameTypeDefaultsArr, options)
    }

    connectedCallback() {
      super.connectedCallback()

      // Abort if element is already in its final location.
      if (this.hasAttribute(FINAL_LOCATION_ATTR_NAME)) {
        return
      }

      const { locationSelector, locationMethod } = this.props
      if (locationSelector && locationMethod) {
        const newNode = this.cloneNode(true)
        newNode.setAttribute(FINAL_LOCATION_ATTR_NAME, "")
        this.remove()
        insertElementAtLocation(newNode, locationSelector, locationMethod)
      } else if (!isNull(locationSelector) && !isNull(locationMethod)) {
        throw new Error(`Unexpected selector (${locationSelector}) or
        method (${locationMethod}) value`)
      }
    }
  }

export default Insertable
