import { isUndefined, insertElementAtLocation } from "./utils.js"

const FINAL_LOCATION_ATTR_NAME = "location-final"

const Insertable = C =>
  class extends C {
    constructor({ locationSelector, locationMethod, ...rest }) {
      super(rest)
      this.locationSelector = locationSelector
      this.locationMethod = locationMethod
    }

    connectedCallback() {
      super.connectedCallback()

      // Abort if element is already in its final location.
      if (this.hasAttribute(FINAL_LOCATION_ATTR_NAME)) {
        return
      }

      if (this.locationSelector && this.locationMethod) {
        const newNode = this.cloneNode(true)
        newNode.setAttribute(FINAL_LOCATION_ATTR_NAME, "")
        this.remove()
        insertElementAtLocation(
          newNode,
          this.locationSelector,
          this.locationMethod,
        )
      } else if (
        !isUndefined(this.locationSelector) &&
        !isUndefined(this.locationMethod)
      ) {
        throw new Error(`Unexpected selector (${this.locationSelector}) or
        method (${this.locationMethod}) value`)
      }
    }
  }

export default Insertable
