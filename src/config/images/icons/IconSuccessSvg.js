import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Color } from "../../System"

const SvgComponent = (props) => (
  <Svg
    width="1em"
    height="1em"
    viewBox="0 0 61 62"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M30.093 61.63c16.62 0 30.094-13.655 30.094-30.5 0-16.844-13.474-30.5-30.094-30.5S0 14.286 0 31.13c0 16.845 13.473 30.5 30.093 30.5Zm10.64-41.283a2.981 2.981 0 0 1 4.256 0 3.08 3.08 0 0 1 0 4.313L27.977 41.902l-.012.012a2.984 2.984 0 0 1-4.256 0l-.01-.012-8.501-8.615a3.079 3.079 0 0 1 0-4.313 2.981 2.981 0 0 1 4.256 0l6.383 6.47 14.896-15.097Z"
      fill={Color}
    />
  </Svg>
)

export default SvgComponent
