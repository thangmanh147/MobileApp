import * as React from "react"
import Svg, { Circle, Rect } from "react-native-svg"

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
      <Circle cx={10.5} cy={10.22} r={10} fill={color} />
      <Rect
        x={5.206}
        y={9.632}
        width={10.588}
        height={2.353}
        rx={1.176}
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
