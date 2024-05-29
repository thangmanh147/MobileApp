import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  const {color} = props;
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.341 20.24c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm-1-14a1 1 0 112 0v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3h-3a1 1 0 110-2h3v-3z"
        fill={color || Color}
      />
    </Svg>
  )
}

export default SvgComponent
