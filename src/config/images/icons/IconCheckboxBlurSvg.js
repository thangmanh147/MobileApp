import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
import {colorBoxBlur} from '../../System';

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect x={0.026} y={0.916} width={20} height={20} rx={3} fill={colorBoxBlur} />
      <Path
        d="M15.13 4.989l-7.35 7.356-2.857-2.86-2.246 2.25 5.104 5.108 9.596-9.606L15.13 4.99z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
