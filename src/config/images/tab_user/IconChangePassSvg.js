import * as React from "react"
import Svg, { Circle, G, Path, Defs, ClipPath } from "react-native-svg"
import {Color} from '../../System';

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
      <Circle cx={12.848} cy={12.471} r={12} fill={Color} />
      <G clipPath="url(#prefix__clip0_9031_3504)">
        <Path
          d="M16.719 10.125h-.469V8.25A3.754 3.754 0 0012.5 4.5a3.754 3.754 0 00-3.75 3.75v1.875h-.469c-.775 0-1.406.63-1.406 1.406v6.563c0 .775.631 1.406 1.406 1.406h8.438c.775 0 1.406-.63 1.406-1.406V11.53c0-.775-.631-1.406-1.406-1.406zM10 8.25c0-1.379 1.121-2.5 2.5-2.5S15 6.871 15 8.25v1.875h-5V8.25zm3.125 6.701v1.424a.625.625 0 11-1.25 0v-1.424a1.246 1.246 0 01.625-2.326 1.246 1.246 0 01.625 2.326z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_9031_3504">
          <Path fill="#fff" transform="translate(5 4.5)" d="M0 0h15v15H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
