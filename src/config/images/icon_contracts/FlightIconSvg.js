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
        d="M37.585 14.627c0 5.94-28.653 12.496-30.822 12.496-1.217 0-2.597-.28-2.597-1.4 0-.375.433-.916 1.192-1.569h-.001l-2.012-3.57a.918.918 0 01.46-1.303l.345-.138a2.298 2.298 0 011.928.102l3.651 1.932a87.521 87.521 0 014.734-2.594L7.348 13.97a.918.918 0 01.011-1.548l.582-.365a4.136 4.136 0 013.253-.497l11.837 3.12c3.691-1.463 7.028-2.463 9.003-2.463.528 0 1.056.014 1.566.05l-3.575 1.614-.086 1.201 5.518-2.535c1.323.316 2.128.904 2.128 2.08zm-14.4 10.254l4.415 5.012a.919.919 0 001.076.226l.592-.274a2.753 2.753 0 001.575-2.817l-.553-4.724a.46.46 0 00-.608-.38l-6.305 2.22a.459.459 0 00-.192.737z"
        fill={color || Color}
      />
    </Svg>
  )
}

export default SvgComponent
