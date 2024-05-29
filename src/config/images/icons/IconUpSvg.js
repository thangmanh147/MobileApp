import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { colorDown } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3.38.75a.5.5 0 01.866 0l3.301 5.719a.5.5 0 01-.433.75H.511a.5.5 0 01-.433-.75L3.38.75z"
        fill={colorDown}
      />
    </Svg>
  )
}

export default SvgComponent
