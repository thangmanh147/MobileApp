import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 55 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M27.647 61.766c4.278 0 7.748-3.414 7.748-7.625H19.9c0 4.211 3.47 7.625 7.747 7.625zm26.087-17.837c-2.34-2.473-6.719-6.194-6.719-18.382 0-9.257-6.598-16.668-15.495-18.486V4.578c0-2.105-1.734-3.812-3.873-3.812-2.138 0-3.873 1.707-3.873 3.812v2.483C14.877 8.879 8.28 16.29 8.28 25.547c0 12.188-4.378 15.909-6.718 18.382-.726.768-1.048 1.687-1.042 2.587a3.847 3.847 0 003.887 3.812H50.89a3.846 3.846 0 003.887-3.812c.006-.9-.316-1.82-1.043-2.587z"
        fill={Color}
      />
    </Svg>
  )
}

export default SvgComponent
