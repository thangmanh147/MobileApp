import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.114 12.865a6.976 6.976 0 01-4.192 1.391c-3.866 0-7-3.129-7-6.99 0-3.86 3.134-6.989 7-6.989s7 3.13 7 6.99c0 1.57-.519 3.019-1.394 4.186l5.172 5.164a.997.997 0 010 1.412c-.39.39-1.024.39-1.414 0l-5.172-5.164zm.808-5.598a4.996 4.996 0 01-5 4.992c-2.762 0-5-2.235-5-4.992a4.996 4.996 0 015-4.993c2.761 0 5 2.236 5 4.993z"
        fill={Color}
      />
    </Svg>
  )
}

export default SvgComponent
