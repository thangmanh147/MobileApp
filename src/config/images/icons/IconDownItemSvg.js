import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  const {color} = props;
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.211 5.596a.767.767 0 000 1.084l4.326 4.335c.166.166.387.24.603.222a.763.763 0 00.558-.224l4.329-4.333a.767.767 0 00-1.082-1.083L8.117 9.428 4.293 5.596a.764.764 0 00-1.082 0z"
        fill={color || Color}
      />
    </Svg>
  )
}

export default SvgComponent
