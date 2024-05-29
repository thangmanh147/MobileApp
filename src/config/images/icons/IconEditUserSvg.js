import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { TxtColor } from "../../System"

const SvgComponent = (props) => (
  <Svg
    width="1em"
    height="1em"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m10.046 3.72-7.15 7.149a.336.336 0 0 0-.093.182l-.55 3.361a.333.333 0 0 0 .382.383l3.377-.532a.336.336 0 0 0 .184-.094l7.15-7.15-3.3-3.3Zm.471-.472 3.3 3.3.56-.56a1.666 1.666 0 0 0 0-2.356l-.943-.943a1.667 1.667 0 0 0-2.357 0l-.56.559Z"
      fill={TxtColor}
    />
  </Svg>
)

export default SvgComponent
