import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { colorNote2 } from "../../System"

function SvgComponent(props) {
  const {color} = props;
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.78 4.463h-1.17a3.001 3.001 0 00-5.659 0h-9.17a1 1 0 000 2h9.17a3.001 3.001 0 005.659 0h1.17a1 1 0 100-2zm-4 2a1 1 0 100-2 1 1 0 000 2zM1.78 11.463a1 1 0 011-1h1.171a3.001 3.001 0 015.659 0h9.17a1 1 0 110 2H9.61a3.001 3.001 0 01-5.659 0h-1.17a1 1 0 01-1-1zm5 1a1 1 0 100-2 1 1 0 000 2zM2.78 16.463a1 1 0 100 2h9.171a3.001 3.001 0 005.659 0h1.17a1 1 0 100-2h-1.17a3.001 3.001 0 00-5.659 0h-9.17zm13 1a1 1 0 11-2 0 1 1 0 012 0z"
        fill={color || colorNote2}
      />
    </Svg>
  )
}

export default SvgComponent
