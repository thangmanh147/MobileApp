import * as React from "react"
import Svg, { Path } from "react-native-svg"

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
        d="M10.5.87c-5.514 0-10 4.486-10 10 0 5.515 4.486 10 10 10s10-4.485 10-10c0-5.514-4.486-10-10-10zm0 15.834a.833.833 0 110-1.667.833.833 0 010 1.667zm1.32-5.298a.837.837 0 00-.487.757v.374a.833.833 0 11-1.666 0v-.374a2.51 2.51 0 011.454-2.272c.849-.39 1.462-1.428 1.462-1.937A2.086 2.086 0 0010.5 5.87c-1.15 0-2.083.935-2.083 2.083a.833.833 0 11-1.667 0 3.755 3.755 0 013.75-3.75 3.755 3.755 0 013.75 3.75c0 1.126-.977 2.78-2.43 3.452z"
        fill={color}
      />
    </Svg>
  )
}

export default SvgComponent
