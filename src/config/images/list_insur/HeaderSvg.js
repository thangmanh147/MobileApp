import * as React from "react"
import Svg, { Ellipse } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  const {color} = props;
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 375 98"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Ellipse
        cx={187.826}
        cy={-276.568}
        rx={709.219}
        ry={374.536}
        fill={color || Color}
      />
    </Svg>
  )
}

export default SvgComponent
