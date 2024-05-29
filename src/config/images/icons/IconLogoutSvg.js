import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { Color } from "../../System"

const SvgComponent = (props) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)" fill={Color}>
      <Path d="M10.388 9.167a.666.666 0 0 0-.667.667V12.5a.667.667 0 0 1-.667.666h-2v-10c0-.569-.362-1.078-.908-1.267l-.197-.066h3.105c.368 0 .667.3.667.667v2a.666.666 0 1 0 1.333 0v-2c0-1.103-.897-2-2-2H1.888c-.026 0-.047.011-.072.014-.032-.002-.062-.014-.095-.014C.986.5.388 1.099.388 1.834v12c0 .57.362 1.078.908 1.267l4.012 1.338c.136.042.27.062.413.062.735 0 1.333-.598 1.333-1.334v-.666h2c1.103 0 2-.898 2-2V9.834a.666.666 0 0 0-.666-.667Z" />
      <Path d="M16.192 6.696 13.525 4.03a.667.667 0 0 0-1.138.47v2H9.721a.667.667 0 0 0 0 1.334h2.666v2a.668.668 0 0 0 1.138.472l2.667-2.667a.666.666 0 0 0 0-.943Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(.388 .5)" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SvgComponent
