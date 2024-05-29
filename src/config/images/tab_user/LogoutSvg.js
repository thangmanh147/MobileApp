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
      <G clipPath="url(#prefix__clip0_8397_3456)" fill={Color}>
        <Path d="M10.292 8.625a.625.625 0 00-.625.625v2.5c0 .344-.28.625-.625.625H7.167V3c0-.534-.34-1.01-.85-1.188L6.13 1.75h2.911c.345 0 .625.28.625.625V4.25a.625.625 0 101.25 0V2.375A1.877 1.877 0 009.042.5H2.324C2.3.5 2.28.51 2.257.514 2.227.51 2.198.5 2.167.5c-.689 0-1.25.56-1.25 1.25V13c0 .534.34 1.01.852 1.188l3.761 1.254c.127.04.254.058.387.058.69 0 1.25-.56 1.25-1.25v-.625h1.875a1.877 1.877 0 001.875-1.875v-2.5a.625.625 0 00-.625-.625z" />
        <Path d="M15.734 6.308l-2.5-2.5a.625.625 0 00-1.067.442v1.875h-2.5a.625.625 0 000 1.25h2.5V9.25a.626.626 0 001.067.442l2.5-2.5a.624.624 0 000-.884z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_8397_3456">
          <Path fill="#fff" transform="translate(.917 .5)" d="M0 0h15v15H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
