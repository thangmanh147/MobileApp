import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  const {color} = props;
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M36.176 19.67a1.583 1.583 0 01-2.183.504l-13.188-8.23-13.188 8.23a1.584 1.584 0 11-1.679-2.687l14.028-8.754a1.585 1.585 0 011.678 0l14.03 8.755c.74.464.967 1.44.502 2.181zm-5.102.853l-9.428-5.885a1.585 1.585 0 00-1.679 0l-9.43 5.885a1.581 1.581 0 00-.743 1.343v9.805c0 .874.71 1.584 1.584 1.584h5.203c.875 0 1.585-.71 1.585-1.584v-4.464a2.643 2.643 0 012.641-2.638 2.644 2.644 0 012.64 2.638v4.463c0 .875.71 1.584 1.585 1.584h5.203c.875 0 1.585-.71 1.585-1.583v-9.805c-.001-.547-.282-1.055-.746-1.343z"
        fill={color || Color}
      />
    </Svg>
  )
}

export default SvgComponent
