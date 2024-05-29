import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    const {color} = props;
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.618 7.5c2.088 0 3.781-1.679 3.781-3.75C10.4 1.679 8.706 0 6.618 0c-2.09 0-3.782 1.679-3.782 3.75 0 2.071 1.693 3.75 3.782 3.75zm2.647.938H8.77a5.185 5.185 0 01-4.307 0h-.493C1.778 8.438 0 10.2 0 12.374v1.219C0 14.37.635 15 1.418 15h10.4c.782 0 1.417-.63 1.417-1.406v-1.219c0-2.174-1.778-3.938-3.97-3.938z"
        fill={color}
      />
    </Svg>
  )
}

export default SvgComponent
