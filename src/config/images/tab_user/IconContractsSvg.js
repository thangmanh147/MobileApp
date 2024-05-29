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
      <Circle cx={12.848} cy={12.932} r={12} fill={Color} />
      <G clipPath="url(#prefix__clip0_9031_3505)" fill="#fff">
        <Path d="M15.192 6.37h-1.018a1.408 1.408 0 00-2.652 0h-1.018a.469.469 0 00-.468.468v1.875c0 .259.21.469.468.469h4.688c.259 0 .469-.21.469-.47V6.839a.469.469 0 00-.47-.469z" />
        <Path d="M17.536 7.307h-.938v1.406c0 .775-.63 1.406-1.406 1.406h-4.688c-.775 0-1.406-.63-1.406-1.406V7.307h-.937a.939.939 0 00-.938.937v11.25c0 .526.412.938.938.938h9.375a.927.927 0 00.937-.938V8.244a.927.927 0 00-.937-.937zm-4.825 8.3l-1.875 1.875a.471.471 0 01-.664 0l-.937-.937a.47.47 0 01.663-.663l.606.606 1.543-1.543a.469.469 0 01.664.662zm0-3.75l-1.875 1.875a.471.471 0 01-.664 0l-.937-.937a.47.47 0 01.663-.663l.606.606 1.543-1.543a.469.469 0 01.664.662zm3.418 4.825h-1.875a.469.469 0 010-.938h1.875a.469.469 0 010 .938zm0-3.75h-1.875a.469.469 0 010-.938h1.875a.469.469 0 010 .938z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_9031_3505">
          <Path
            fill="#fff"
            transform="translate(5.348 5.432)"
            d="M0 0h15v15H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
