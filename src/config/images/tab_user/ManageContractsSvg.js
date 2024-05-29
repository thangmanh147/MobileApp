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
      <G clipPath="url(#prefix__clip0_7356_8547)" fill={Color}>
        <Path d="M10.761 1.438H9.743a1.408 1.408 0 00-2.652 0H6.074a.469.469 0 00-.469.468v1.875c0 .259.21.469.469.469h4.687c.259 0 .469-.21.469-.469V1.906a.469.469 0 00-.469-.468z" />
        <Path d="M13.105 2.375h-.938v1.406c0 .776-.63 1.406-1.406 1.406H6.074c-.776 0-1.407-.63-1.407-1.406V2.375H3.73a.939.939 0 00-.938.938v11.25c0 .525.412.937.938.937h9.375a.927.927 0 00.938-.938V3.313a.927.927 0 00-.938-.937zm-4.824 8.3l-1.875 1.876a.47.47 0 01-.664 0l-.938-.938a.469.469 0 01.663-.663l.607.606 1.543-1.543a.47.47 0 01.664.663zm0-3.75L6.406 8.802a.47.47 0 01-.664 0l-.938-.938a.47.47 0 01.663-.663l.607.606 1.543-1.543a.47.47 0 01.664.663zm3.418 4.825H9.824a.469.469 0 010-.938h1.875a.469.469 0 010 .938zm0-3.75H9.824a.469.469 0 010-.938h1.875a.469.469 0 010 .938z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_7356_8547">
          <Path fill="#fff" transform="translate(.917 .5)" d="M0 0h15v15H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
