export function Element(tagNameOrDOMString, wrapperTag = "div") {
  // Return a new Element for a given tag name or DOM string.
  const s = tagNameOrDOMString.trim()
  if (!s.startsWith("<")) return document.createElement(s)
  const wrapper = document.createElement(wrapperTag)
  wrapper.innerHTML = s.trim()
  const el = wrapper.firstChild
  if (el.nodeName === "#text") {
    throw new Error(
      `Element creation failed. Maybe ${wrapperTag} is not a valid parent for: ${s}`,
    )
  }
  wrapper.removeChild(el)
  return el
}

export function getMaxZIndex() {
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

export function getPixelScaleFactor() {
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

function escapeHTML(s) {
  const wrapper = Element("div")
  wrapper.innerText = s
  return wrapper.innerHTML
}

export function hexToRgb(hex) {
  // Adapted from: https://stackoverflow.com/a/5624139/2327940
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const v = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(v)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/* Return the specified element attribute, or defaultValue if attribute
   is unspecified.
 */
export const getAttr = (el, attr, defaultValue) =>
  el.hasAttribute(attr) ? el.getAttribute(attr) : defaultValue
export const getStrAttr = getAttr
export const getBoolAttr = (...args) => getStrAttr(...args) === "true"
export const getIntAttr = (...args) => parseInt(getStrAttr(...args), 10)
export const getFloatAttr = (...args) => parseFloat(getStrAttr(...args))

export function insertElementAtLocation(element, selector, method) {
  /* Relocate an element to the location specified by selector and method.
   */
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
