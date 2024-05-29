import * as React from "react"
import Svg, { Path } from "react-native-svg"
import {NewColor} from '../../System';

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.5 14.75a7.25 7.25 0 100-14.5 7.25 7.25 0 000 14.5z"
        stroke={NewColor}
        strokeWidth={0.5}
      />
      <Path
        d="M7.5 2.144a5.357 5.357 0 110 10.714 5.357 5.357 0 010-10.714z"
        fill={NewColor}
      />
    </Svg>
  )
}

export default SvgComponent
