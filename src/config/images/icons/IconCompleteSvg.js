import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20 .085c-11.028 0-20 8.973-20 20 0 11.028 8.972 20 20 20s20-8.972 20-20c0-11.027-8.972-20-20-20zm11.178 14.737L18.396 27.504a1.967 1.967 0 01-2.757.05l-6.767-6.165a2.033 2.033 0 01-.15-2.808 1.983 1.983 0 012.807-.1l5.363 4.912 11.429-11.428a1.997 1.997 0 012.857 0 1.997 1.997 0 010 2.857z"
        fill="#00A651"
      />
    </Svg>
  )
}

export default SvgComponent
