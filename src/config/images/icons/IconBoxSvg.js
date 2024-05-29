import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

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
        y={1.136}
        width={19}
        height={19}
        rx={2.5}
        fill="#fff"
        stroke={color}
      />
      <Path
        d="M16.081 4.636L8.364 12.36l-3-3.003-2.36 2.362 5.36 5.364L18.44 6.997l-2.359-2.361z"
        fill="#fff"
      />
      <Path
        d="M16.081 4.636L8.364 12.36l-3-3.003-2.36 2.362 5.36 5.364L18.44 6.997l-2.359-2.361z"
        fill="#fff"
      />
      <Path
        d="M16.081 4.636L8.364 12.36l-3-3.003-2.36 2.362 5.36 5.364L18.44 6.997l-2.359-2.361z"
        fill="#fff"
      />
      <Path
        d="M16.081 4.636L8.364 12.36l-3-3.003-2.36 2.362 5.36 5.364L18.44 6.997l-2.359-2.361z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
