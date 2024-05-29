import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.793 13.124l-2.92-2.92a.703.703 0 00-.498-.205h-.478a6.063 6.063 0 001.29-3.75A6.092 6.092 0 006.092.156 6.092 6.092 0 000 6.249a6.092 6.092 0 006.093 6.093c1.415 0 2.716-.48 3.75-1.289v.478c0 .187.073.366.205.498l2.92 2.92a.7.7 0 00.993 0l.83-.829a.706.706 0 00.002-.995zM6.094 10a3.747 3.747 0 01-3.75-3.75 3.747 3.747 0 013.75-3.75 3.747 3.747 0 013.75 3.75A3.747 3.747 0 016.093 10z"
        fill={Color}
      />
    </Svg>
  )
}

export default SvgComponent
