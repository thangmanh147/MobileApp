import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { Color } from "../../System"

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
      <G clipPath="url(#prefix__clip0_8179_4310)">
        <Path
          d="M12.27 10.65c-.868 0-1.633.428-2.114 1.077L6 9.6a2.6 2.6 0 00.118-.736c0-.349-.072-.68-.195-.985l4.349-2.617a2.62 2.62 0 001.998.936 2.64 2.64 0 002.637-2.636A2.64 2.64 0 0012.27.924 2.64 2.64 0 009.633 3.56c0 .335.07.652.184.948L5.455 7.133a2.62 2.62 0 00-1.974-.906A2.64 2.64 0 00.844 8.863 2.64 2.64 0 003.481 11.5c.883 0 1.66-.44 2.14-1.108l4.142 2.121c-.077.247-.13.503-.13.774a2.64 2.64 0 002.637 2.637 2.64 2.64 0 002.637-2.637 2.64 2.64 0 00-2.637-2.637z"
          fill={Color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_8179_4310">
          <Path
            fill="#fff"
            transform="translate(.376 .924)"
            d="M0 0h15v15H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
