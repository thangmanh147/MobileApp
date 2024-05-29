import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 25 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.143 4.286L14.553 0h-3.627L8.571 4.286h8.572zM8.571 5.714l3.99 11.429 4.582-11.429H8.57zM0 5.714l11.42 12.858.009-.019-4.77-12.839H0zM9.286 0H3.377L0 4.286h6.957L9.286 0zM18.31 4.286H25L21.58 0h-5.865l2.596 4.286zM12.857 18.487l.035.085L25 5.713h-6.366l-5.777 12.773z"
        fill={Color}
      />
    </Svg>
  )
}

export default SvgComponent
