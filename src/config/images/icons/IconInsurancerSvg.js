import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="#fff" d="M.722.55h15v15h-15z" />
      <Path
        d="M14.737 2.65a.49.49 0 00-.355-.405L8.354.568a.49.49 0 00-.263 0L2.062 2.245a.49.49 0 00-.354.405C1.673 2.9.875 8.842 2.92 11.797c2.044 2.952 5.059 3.709 5.186 3.74a.487.487 0 00.23 0c.128-.031 3.143-.788 5.186-3.74 2.046-2.955 1.249-8.896 1.214-9.147zM12.11 6.118L7.998 10.23a.49.49 0 01-.693 0L4.762 7.688a.49.49 0 010-.694l.505-.504a.49.49 0 01.693 0l1.691 1.69 3.261-3.26a.49.49 0 01.693 0l.505.505a.49.49 0 010 .693z"
        fill={Color}
      />
    </Svg>
  )
}

export default SvgComponent
