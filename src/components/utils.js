//
// Generic Utilities
//

// Type sentinals and checkers.
export const TYPES = {
  STRING: "string",
  INTEGER: "integer",
  FLOAT: "float",
  BOOLEAN: "boolean",
  HTML: "html",
  URL: "url",
}

export const isNull = x => x === null
export const isUndefined = x => x === undefined
const isString = x => typeof x === "string"
const isNumber = x => typeof x === "number"
const isBoolean = x => typeof x === "boolean"
const isURL = x => x instanceof URL

// Simple parsing helpers.
const parseDecInt = s => parseInt(s, 10)
const parseHexInt = s => parseInt(s, 16)

// Encode/decode a string for inclusion as / from an HTML attribute value.
const htmlAttrEncode = s => `${s}`.replace(/"/g, "@quot;")
const htmlAttrDecode = s => `${s}`.replace(/@quot;/g, '"')

// Return a function that applies a specified parser and uses a specified
// failure test function to determine whether to return the parsed value or a
// specified default value.
const safeParser = (parserFn, failureTestFn) => (x, defVal) => {
  let v
  try {
    v = parserFn(x)
  } catch (e) {
    // Return the default value on any exception.
    return defVal
  }
  return failureTestFn(v) ? defVal : v
}

//
// String parsing and conversion helpers.
//
const UPPERCASE = /[A-Z]/
const isUpper = UPPERCASE.test.bind(UPPERCASE)

export function camelToKebab(x) {
  // Convert a camelCase string to kebab-case.
  if (typeof x !== "string") {
    throw new TypeError(`Expected a string but got: ${x}`)
  }
  return Array.from(x).reduce(
    (acc, c, i) => acc + (isUpper(c) ? `${i ? "-" : ""}${c.toLowerCase()}` : c),
    "",
  )
}

const safeParseBool = safeParser(
  s => (isString(s) && (s === "true" || s === "false") ? s === "true" : null),
  isNull,
)
const safeParseString = safeParser(s => (isString(s) ? s : null), isNull)
const safeParseInt = safeParser(s => parseInt(s, 10), Number.isNaN)
const safeParseFloat = safeParser(s => parseFloat(s), Number.isNaN)
const safeParseHTML = safeParser(
  s => (isString(s) ? htmlAttrDecode(s) : null),
  isNull,
)
const safeParseURL = safeParser(s => new URL(s), isNull)

export const STRING_TYPE_PARSER_MAP = {
  [TYPES.STRING]: safeParseString,
  [TYPES.INTEGER]: safeParseInt,
  [TYPES.FLOAT]: safeParseFloat,
  [TYPES.BOOLEAN]: safeParseBool,
  [TYPES.HTML]: safeParseHTML,
  [TYPES.URL]: safeParseURL,
}

const assertTrue = x => {
  if (!x) {
    throw new TypeError()
  }
  return true
}

const toString = x => (isNull(x) || isUndefined(x) ? "" : `${x}`)
const safeEncodeString = x => assertTrue(isString(x)) && toString(x)
const safeEncodeNumber = x => assertTrue(isNumber(x)) && toString(x)
const safeEncodeBoolean = x => assertTrue(isBoolean(x)) && toString(x)
const safeEncodeHTML = x => assertTrue(isString(x)) && htmlAttrEncode(x)
const safeEncodeURL = x => assertTrue(isURL(x)) && x.href

export const STRING_TYPE_ENCODER_MAP = {
  [TYPES.STRING]: safeEncodeString,
  [TYPES.INTEGER]: safeEncodeNumber,
  [TYPES.FLOAT]: safeEncodeNumber,
  [TYPES.BOOLEAN]: safeEncodeBoolean,
  [TYPES.HTML]: safeEncodeHTML,
  [TYPES.URL]: safeEncodeURL,
}

//
// HTML / DOM Utilities
//

// Return the specified element attribute, or a defaultValue if the attribute
// is unspecified.

export function hexToRgb(hex) {
  // Adapted from: https://stackoverflow.com/a/5624139/2327940
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const v = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(v)
  return !result
    ? null
    : {
        r: parseHexInt(result[1]),
        g: parseHexInt(result[2]),
        b: parseHexInt(result[3]),
      }
}

export function Element(tagNameOrDOMString, wrapperTag = "div") {
  // Return a new Element for a given tag name or DOM string.
  const s = tagNameOrDOMString.trim()
  if (!s.startsWith("<")) {
    return document.createElement(s)
  }
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
    const zIndex = parseDecInt(
      document.defaultView.getComputedStyle(element).zIndex,
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
  return window.devicePixelRatio || 1
}
