import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { colorGetMore, colorNote2 } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="#fff" d="M.108.207h15v15h-15z" />
      <Path
        d="M13.134 3.135l-5.135 5.36a.547.547 0 01-.39.17.533.533 0 01-.392-.17l-5.134-5.36a.858.858 0 01-.234-.592c0-.221.084-.434.234-.592a.795.795 0 01.567-.244.774.774 0 01.566.244l4.393 4.586L12 1.95a.795.795 0 01.566-.244.776.776 0 01.567.244c.15.158.234.37.234.592a.858.858 0 01-.234.592z"
        fill={colorGetMore}
      />
      <Path
        d="M13.134 8.178l-5.135 5.36a.548.548 0 01-.39.169.533.533 0 01-.392-.17l-5.134-5.36a.858.858 0 01-.234-.591c0-.221.084-.434.234-.592a.795.795 0 01.567-.244.774.774 0 01.566.244l4.393 4.586L12 6.994a.795.795 0 01.566-.244.776.776 0 01.567.244c.15.158.234.37.234.592a.858.858 0 01-.234.592z"
        fill={colorNote2}
      />
    </Svg>
  )
}

export default SvgComponent
