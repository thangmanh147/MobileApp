import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25.88 7.003h6.818c2.51 0 4.546 1.885 4.546 4.21v25.264c0 2.325-2.035 4.21-4.546 4.21H5.424c-2.51 0-4.546-1.885-4.546-4.21V11.213c0-2.325 2.036-4.21 4.546-4.21h6.818c0-3.488 3.053-6.316 6.819-6.316s6.819 2.828 6.819 6.316Zm-4.546 0c0 1.162-1.018 2.105-2.273 2.105-1.255 0-2.273-.943-2.273-2.105 0-1.163 1.018-2.105 2.273-2.105 1.255 0 2.273.942 2.273 2.105Zm-15.91 8.42c0-1.162 1.018-2.104 2.273-2.104h22.728c1.255 0 2.273.942 2.273 2.105s-1.018 2.105-2.273 2.105H7.697c-1.255 0-2.273-.942-2.273-2.105Zm2.273 6.317c-1.255 0-2.273.942-2.273 2.105s1.018 2.105 2.273 2.105h22.728c1.255 0 2.273-.942 2.273-2.105s-1.018-2.105-2.273-2.105H7.697Zm0 8.42c-1.255 0-2.273.943-2.273 2.106 0 1.163 1.018 2.105 2.273 2.105h6.818c1.256 0 2.273-.942 2.273-2.105s-1.017-2.105-2.273-2.105H7.697Z"
      fill="#fff"
    />
  </Svg>
)

export default SvgComponent
