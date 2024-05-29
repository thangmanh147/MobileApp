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
    <G clipPath="url(#a)">
      <Path
        d="M12.688 6.5h-.5v-2c0-2.206-1.795-4-4-4-2.207 0-4 1.794-4 4v2h-.5c-.827 0-1.5.673-1.5 1.5v7c0 .827.673 1.5 1.5 1.5h9c.826 0 1.5-.673 1.5-1.5V8c0-.827-.674-1.5-1.5-1.5Zm-7.167-2a2.67 2.67 0 0 1 2.667-2.667A2.67 2.67 0 0 1 10.854 4.5v2H5.521v-2Zm3.333 7.148v1.519a.666.666 0 1 1-1.333 0v-1.519a1.329 1.329 0 0 1 .667-2.481 1.329 1.329 0 0 1 .667 2.481Z"
        fill={Color}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(.188 .5)" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SvgComponent
