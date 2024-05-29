import * as React from "react"
import Svg, { Circle, G, Path, Defs, ClipPath } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 63 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle opacity={0.9} cx={31.538} cy={31.426} r={31.099} fill={Color} />
      <G clipPath="url(#prefix__clip0_8258_3757)" fill="#fff">
        <Path d="M32.788 23.305a9.117 9.117 0 01-4.526 1.183h-2.763c-.39 0-.774-.041-1.148-.12v1.995c0 3.963 3.224 7.188 7.187 7.188s7.188-3.225 7.188-7.188v-1.875h-1.411a9.117 9.117 0 01-4.527-1.183zM28.57 42.113h.174l-5.231-5.95a5.94 5.94 0 00-4.787 5.825v4.5c0 .518.42.938.937.938h5.751a3.571 3.571 0 01-.438-1.719 3.598 3.598 0 013.593-3.594z" />
        <Path d="M30.393 43.988h-1.824a1.72 1.72 0 00-1.718 1.719c0 .947.77 1.718 1.717 1.719h4.847l-3.022-3.438zM37.315 22.613a7.284 7.284 0 01-4.527-1.56 7.284 7.284 0 01-4.527 1.56H25.5c-1.972 0-3.618-1.566-3.648-3.538a3.598 3.598 0 013.593-3.65h9.22a4.062 4.062 0 014.062 4.063v3.125h-1.411zM44.35 41.988a5.937 5.937 0 00-5.937-5.937h-3.75v-1.18a9.021 9.021 0 01-3.125.555 9.02 9.02 0 01-3.125-.556v.825l9.063 5.298v-.255a.937.937 0 111.875 0v1.352l5 2.923v-3.025zM26.552 36.78l9.36 10.646h7.5c.3 0 .566-.14.737-.359L26.552 36.78z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_8258_3757">
          <Path
            fill="#fff"
            transform="translate(15.538 15.426)"
            d="M0 0h32v32H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
