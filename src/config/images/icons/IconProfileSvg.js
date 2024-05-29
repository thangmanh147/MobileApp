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
      <Path d="M13.608 5.775H7.835L6.687 4.41a.196.196 0 0 0-.157-.07H1.873A1.294 1.294 0 0 0 .588 5.634v8.393c.001.714.58 1.292 1.293 1.293h11.727c.713 0 1.292-.58 1.292-1.293v-6.96c0-.713-.579-1.291-1.292-1.292Z" />
      <Path d="M15.304 4.103H9.53L8.382 2.738a.196.196 0 0 0-.157-.07H3.569a1.293 1.293 0 0 0-1.278 1.116h4.246c.222 0 .434.098.577.268l.98 1.166h5.514a1.851 1.851 0 0 1 1.848 1.848v6.57a1.292 1.292 0 0 0 1.133-1.282v-6.96a1.294 1.294 0 0 0-1.285-1.291Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(.588 .994)" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SvgComponent
