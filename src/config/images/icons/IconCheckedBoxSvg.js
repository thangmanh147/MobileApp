import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { NewColor } from "../../System";

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
      <Rect
        x={0.505}
        y={1.118}
        width={19}
        height={19}
        rx={2.5}
        fill={NewColor}
        stroke={color}
      />
      <Path
        d="M15.864 4.895l-7.718 7.724-3-3.003-2.359 2.362 5.36 5.364L18.221 7.256l-2.358-2.361z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
