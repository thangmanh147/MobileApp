import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { colorBoxBorder } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8.328 15.3a7.25 7.25 0 100-14.5 7.25 7.25 0 000 14.5z"
        stroke={colorBoxBorder}
        strokeWidth={0.5}
      />
    </Svg>
  )
}

export default SvgComponent
