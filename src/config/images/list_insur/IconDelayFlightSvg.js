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
      <Circle opacity={0.9} cx={31.462} cy={31.504} r={31.099} fill={Color} />
      <Path
        d="M46.462 26.102c0 5.186-25.019 10.911-26.913 10.911-1.062 0-2.267-.245-2.267-1.223 0-.327.378-.8 1.04-1.37v.001l-1.757-3.118a.801.801 0 01.4-1.138l.303-.12a2.006 2.006 0 011.683.089l3.188 1.687a76.419 76.419 0 014.134-2.265l-6.213-4.028a.801.801 0 01.01-1.351l.508-.32a3.61 3.61 0 012.84-.433l10.336 2.725c3.223-1.279 6.136-2.151 7.86-2.151.461 0 .923.012 1.368.044L39.86 25.45l-.075 1.05 4.818-2.214c1.155.275 1.858.789 1.858 1.816zm-12.574 8.953l3.855 4.377a.802.802 0 00.94.197l.517-.24a2.404 2.404 0 001.375-2.46l-.483-4.124a.401.401 0 00-.531-.331l-5.505 1.938a.4.4 0 00-.168.643z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent