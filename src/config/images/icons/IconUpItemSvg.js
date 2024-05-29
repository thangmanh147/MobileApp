import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  const {color} = props;
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.763 10.605a.72.72 0 000-1.016L8.707 5.525a.714.714 0 00-.565-.208.715.715 0 00-.523.21L3.56 9.59a.719.719 0 001.014 1.015l3.589-3.592 3.585 3.592c.28.281.734.281 1.014 0z"
        fill={color || Color}
      />
    </Svg>
  )
}

export default SvgComponent
