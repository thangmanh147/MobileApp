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
      <G clipPath="url(#prefix__clip0_7356_8583)">
        <Path
          d="M12.636 6.125h-.468V4.25A3.754 3.754 0 008.418.5a3.754 3.754 0 00-3.75 3.75v1.875h-.47c-.774 0-1.406.63-1.406 1.406v6.563c0 .775.632 1.406 1.407 1.406h8.437c.775 0 1.407-.63 1.407-1.406V7.53c0-.775-.632-1.406-1.407-1.406zM5.917 4.25c0-1.379 1.122-2.5 2.5-2.5 1.38 0 2.5 1.121 2.5 2.5v1.875h-5V4.25zm3.125 6.701v1.424a.625.625 0 11-1.25 0v-1.424a1.246 1.246 0 01.625-2.326 1.246 1.246 0 01.625 2.326z"
          fill={Color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_7356_8583">
          <Path fill="#fff" transform="translate(.917 .5)" d="M0 0h15v15H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
