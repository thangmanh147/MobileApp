import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { colorDown } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 7 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3.59 5.478a.5.5 0 01-.866 0L.126.978a.5.5 0 01.433-.75h5.196a.5.5 0 01.433.75l-2.598 4.5z"
        fill={colorDown}
      />
    </Svg>
  )
}

export default SvgComponent
