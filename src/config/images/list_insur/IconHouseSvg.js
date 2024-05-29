import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
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
      <Circle opacity={0.9} cx={31.117} cy={31.553} r={31.099} fill={Color} />
      <Path
        d="M47.02 30.308a1.637 1.637 0 01-2.26.521l-13.642-8.514-13.643 8.515a1.638 1.638 0 11-1.737-2.78l14.511-9.057a1.64 1.64 0 011.737 0l14.513 9.058c.767.48 1 1.49.52 2.257zm-5.279.883l-9.753-6.089a1.64 1.64 0 00-1.737 0l-9.755 6.089c-.48.299-.77.824-.77 1.389v10.144a1.64 1.64 0 001.64 1.638h5.382a1.64 1.64 0 001.639-1.638v-4.618a2.734 2.734 0 012.733-2.73 2.735 2.735 0 012.731 2.73v4.617a1.64 1.64 0 001.64 1.638h5.382a1.64 1.64 0 001.64-1.638V32.58c-.002-.566-.292-1.091-.772-1.39z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
