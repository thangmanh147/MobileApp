import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import {errValidColor} from '../../System';

function SvgComponent(props) {
  const {color} = props;
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#prefix__clip0_7996_3502)">
        <Path
          d="M12.5.672C5.598.672.002 6.269.002 13.172s5.596 12.5 12.5 12.5c6.903 0 12.5-5.597 12.5-12.5S19.404.672 12.5.672zm4.716 17.264c-.499.499-1.308.499-1.806 0l-2.845-2.844-2.973 2.974a1.277 1.277 0 11-1.806-1.807l2.973-2.974-2.768-2.768A1.278 1.278 0 019.797 8.71l2.769 2.769 2.639-2.64a1.277 1.277 0 011.806 1.807l-2.639 2.64 2.844 2.844a1.278 1.278 0 010 1.806z"
          fill={color || errValidColor}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_7996_3502">
          <Path fill="#fff" transform="translate(0 .672)" d="M0 0h25v25H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
