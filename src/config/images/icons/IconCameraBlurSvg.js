import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 65 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G opacity={0.2}>
        <Circle
          cx={32.85}
          cy={32.733}
          r={30}
          fill={Color}
          stroke="#fff"
          strokeWidth={4}
        />
        <Path
          d="M18.809 23.78c.787-.762 1.736-1.143 2.849-1.143h3.525l.803-2.073c.2-.498.564-.928 1.094-1.29.53-.36 1.073-.54 1.63-.54h8.059c.556 0 1.099.18 1.629.54.53.362.894.791 1.094 1.29l.802 2.073h3.526c1.113 0 2.062.381 2.85 1.144.786.762 1.18 1.682 1.18 2.76v13.662c0 1.078-.394 1.998-1.18 2.76-.788.763-1.737 1.144-2.85 1.144H21.658c-1.112 0-2.062-.381-2.849-1.144-.787-.762-1.18-1.682-1.18-2.76V26.541c0-1.078.393-1.998 1.18-2.76zm8.948 14.418c1.38 1.337 3.04 2.006 4.982 2.006 1.942 0 3.602-.669 4.982-2.006 1.38-1.336 2.07-2.945 2.07-4.826 0-1.88-.69-3.489-2.07-4.826-1.38-1.337-3.04-2.005-4.982-2.005-1.941 0-3.602.668-4.982 2.005-1.38 1.337-2.07 2.945-2.07 4.826 0 1.88.69 3.49 2.07 4.826z"
          fill="#fff"
        />
        <Path
          d="M32.74 28.98c1.248 0 2.316.43 3.202 1.29.887.858 1.33 1.892 1.33 3.102s-.443 2.244-1.33 3.103c-.886.86-1.954 1.289-3.203 1.289-1.248 0-2.316-.43-3.203-1.289s-1.33-1.893-1.33-3.103c0-1.21.443-2.244 1.33-3.103s1.954-1.288 3.203-1.288z"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
