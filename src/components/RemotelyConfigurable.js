import { TYPES } from "./utils.js"

export const propNameTypeDefaults = [
  ["remoteConfigurationUrl", TYPES.URL, null],
]

const RemotelyConfigurable = C =>
  class extends C {
    constructor(propNameTypeDefaultsArr, options) {
      // Add this class's props to the array.
      propNameTypeDefaultsArr.push(propNameTypeDefaults)
      super(propNameTypeDefaultsArr, options)
    }

    connectedCallback() {
      super.connectedCallback()

      const { remoteConfigurationUrl } = this.props
      if (remoteConfigurationUrl) {
        fetch(remoteConfigurationUrl, { mode: "cors" }).then(res =>
          res.json().then(props => {
            console.log(props)
          }),
        )
      }
    }
  }

export default RemotelyConfigurable
