import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    const {color} = props;
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M19.463 9.57l-.002-.002-8.159-8.158A1.829 1.829 0 0010 .87a1.83 1.83 0 00-1.302.54L.543 9.564l-.008.008a1.843 1.843 0 00.003 2.6 1.83 1.83 0 001.279.54h.325v6.004c0 1.188.967 2.155 2.155 2.155H7.49a.586.586 0 00.586-.586v-4.707c0-.542.442-.983.984-.983h1.883c.542 0 .983.44.983.983v4.707c0 .323.262.586.586.586h3.192a2.157 2.157 0 002.155-2.155v-6.004h.302a1.83 1.83 0 001.302-.54 1.844 1.844 0 000-2.602z"
        fill={color}
      />
    </Svg>
  )
}

export default SvgComponent
