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
      <Path d="M1.386 14.906h.938c.258 0 .468-.21.468-.469V9.281H1.386a.469.469 0 0 0-.469.469v4.687c0 .259.21.469.47.469ZM7.633 10.707c.01 0 3.246 1.05 3.246 1.05a.938.938 0 0 0 .582-1.782L7.05 8.532c-.964-.351-2.263-.279-3.321.313v5.247l3.678.833a9.216 9.216 0 0 0 1.972.231h.103a8.693 8.693 0 0 0 4.415-1.272l2.615-1.828a.93.93 0 0 0 .235-1.303.927.927 0 0 0-1.303-.234l-2.513 1.762a3.275 3.275 0 0 1-2.68.272l-2.891-.956a.46.46 0 0 1-.29-.59.458.458 0 0 1 .562-.3ZM13.166.845a3.75 3.75 0 1 0 0 7.499 3.75 3.75 0 0 0 0-7.5Zm-1.172 1.874a.469.469 0 1 1 0 .938.469.469 0 0 1 0-.938Zm.36 3.582a.47.47 0 0 1-.72-.6l2.344-2.813a.47.47 0 0 1 .72.6l-2.343 2.813Zm1.984.168a.469.469 0 1 1 0-.937.469.469 0 0 1 0 .937Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(.917)" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SvgComponent
