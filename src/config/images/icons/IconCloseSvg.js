import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Color } from "../../System"

const SvgComponent = (props) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M.885 15.526c.559.56 1.465.56 2.023 0l5.058-5.074 5.058 5.074c.559.56 1.464.56 2.023 0 .559-.56.559-1.469 0-2.03L9.99 8.424l5.058-5.074c.559-.56.559-1.469 0-2.03a1.427 1.427 0 0 0-2.023 0L7.966 6.394 2.908 1.32a1.427 1.427 0 0 0-2.023 0 1.438 1.438 0 0 0 0 2.03l5.058 5.073-5.058 5.074a1.438 1.438 0 0 0 0 2.03Z"
      fill={Color}
    />
  </Svg>
)

export default SvgComponent
