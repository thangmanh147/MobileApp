import * as React from "react"
import Svg, { Circle, G, Path, Defs, ClipPath } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={12.848} cy={12.805} r={12} fill={Color} />
      <G clipPath="url(#prefix__clip0_9031_3502)" fill="#fff">
        <Path d="M15.723 14.43a.625.625 0 00-.625.625v2.5c0 .344-.28.625-.625.625h-1.875V8.805c0-.534-.34-1.011-.851-1.188l-.185-.062h2.911c.345 0 .625.28.625.625v1.875a.625.625 0 101.25 0V8.18a1.877 1.877 0 00-1.875-1.875H7.754c-.023 0-.043.01-.066.013-.03-.002-.06-.013-.09-.013-.69 0-1.25.56-1.25 1.25v11.25c0 .533.34 1.01.851 1.188l3.762 1.253a1.251 1.251 0 001.637-1.192v-.624h1.875a1.877 1.877 0 001.875-1.875v-2.5a.625.625 0 00-.625-.625z" />
        <Path d="M21.165 12.113l-2.5-2.5a.625.625 0 00-1.067.442v1.875h-2.5a.625.625 0 000 1.25h2.5v1.875a.626.626 0 001.067.442l2.5-2.5a.624.624 0 000-.884z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_9031_3502">
          <Path
            fill="#fff"
            transform="translate(6.348 6.305)"
            d="M0 0h15v15H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
