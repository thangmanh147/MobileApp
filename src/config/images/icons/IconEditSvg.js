import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.043 2.792l2.546 2.581a.283.283 0 010 .395l-6.163 6.25-2.619.294a.553.553 0 01-.606-.615l.29-2.655 6.163-6.25a.273.273 0 01.39 0zm4.572-.655L15.238.74a1.093 1.093 0 00-1.558 0l-.999 1.013a.283.283 0 000 .395l2.545 2.581a.273.273 0 00.39 0l.999-1.013a1.13 1.13 0 000-1.58zm-5.096 8.18v2.914h-9.03V4.074h6.484c.09 0 .175-.037.24-.1l1.129-1.145c.214-.217.062-.586-.24-.586H2.038c-.748 0-1.355.615-1.355 1.373V13.69c0 .758.607 1.373 1.355 1.373h9.932c.748 0 1.354-.615 1.354-1.373V9.173a.339.339 0 00-.578-.243l-1.129 1.145a.354.354 0 00-.098.243z"
        fill={Color}
      />
    </Svg>
  )
}

export default SvgComponent
