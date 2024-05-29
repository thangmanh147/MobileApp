import * as React from "react"
import Svg, { Circle, G, Path, Defs, ClipPath } from "react-native-svg"
import { colorIcon } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={25.175} cy={25.377} r={25} fill={colorIcon} />
      <G clipPath="url(#prefix__clip0_7304_6246)" fill="#fff">
        <Path d="M34.824 17.906l-5.449-5.448a.543.543 0 00-.386-.16H17.544c-1.201 0-2.18.977-2.18 2.18v21.8c0 1.202.979 2.18 2.18 2.18h15.26c1.202 0 2.18-.978 2.18-2.18V18.291a.543.543 0 00-.16-.386zm-15.645-.159h6.54a.545.545 0 110 1.09h-6.54a.545.545 0 110-1.09zm8.012 15.104c-2.372 2.336-2.925 2.336-3.107 2.336-.677 0-.92-.777-1.17-1.61-.38.772-.818 1.61-1.555 1.61-.379 0-.832-.25-1.259-.63-.203.203-.406.38-.594.521a.543.543 0 01-.763-.11.546.546 0 01.11-.762c.172-.13.348-.286.52-.459-.433-.597-.739-1.279-.739-1.83 0-1.244.992-2.18 1.635-2.18.633 0 1.635.444 1.635 1.635 0 .694-.482 1.592-1.082 2.367.222.208.424.346.543.358.12-.084.45-.758.61-1.082.326-.661.541-1.098 1.02-1.098.558 0 .732.58.953 1.314.065.217.172.576.267.79.4-.27 1.41-1.159 2.212-1.947a.545.545 0 11.764.777zm3.978-4.204h-7.63a.545.545 0 110-1.09h7.63a.545.545 0 110 1.09zm0-3.27H19.18a.545.545 0 110-1.09h11.99a.545.545 0 110 1.09zm0-3.27H19.18a.545.545 0 110-1.09h11.99a.545.545 0 110 1.09zm-.545-4.36c-.601 0-1.09-.489-1.09-1.09v-2.5l3.59 3.59h-2.5z" />
        <Path d="M20.27 30.827a1.404 1.404 0 00-.546 1.09c0 .279.158.63.38.967.416-.578.71-1.164.71-1.512 0-.519-.454-.545-.545-.545z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_7304_6246">
          <Path
            fill="#fff"
            transform="translate(12.094 12.297)"
            d="M0 0h26.16v26.16H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
