import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.625 12.31H.375a.37.37 0 00-.375.368v.733a.37.37 0 00.375.367h14.25A.37.37 0 0015 13.41v-.733a.37.37 0 00-.375-.367zM1.888 9.866a.781.781 0 00.57.245l3.06-.004c.241 0 .479-.056.694-.163l6.82-3.383c.626-.311 1.188-.755 1.57-1.337.43-.652.476-1.125.307-1.458-.17-.334-.58-.58-1.366-.63-.7-.044-1.395.136-2.022.447L9.212 4.728l-5.125-1.88a.424.424 0 00-.422-.026l-1.541.764a.414.414 0 00-.121.654l3.661 2.248-2.419 1.2-1.696-.835a.425.425 0 00-.376 0l-.94.467a.414.414 0 00-.131.644l1.786 1.901z"
        fill={Color}
      />
    </Svg>
  )
}

export default SvgComponent
