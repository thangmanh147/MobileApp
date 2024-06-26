import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
import { NewColor } from "../../System"

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
      <Circle
        cx={32.275}
        cy={32.848}
        r={30}
        fill={NewColor}
        stroke="#fff"
        strokeWidth={4}
      />
      <Path
        d="M18.235 23.895c.787-.762 1.736-1.144 2.848-1.144h3.526l.803-2.073c.2-.498.564-.928 1.094-1.289.53-.36 1.073-.541 1.63-.541h8.058c.556 0 1.1.18 1.63.541.53.361.894.79 1.093 1.289l.803 2.073h3.526c1.112 0 2.062.382 2.849 1.144.787.762 1.18 1.682 1.18 2.76v13.663c0 1.077-.393 1.997-1.18 2.76-.787.762-1.737 1.143-2.85 1.143H21.085c-1.113 0-2.062-.381-2.85-1.144-.786-.762-1.18-1.682-1.18-2.76V26.656c0-1.078.394-1.998 1.18-2.76zm8.948 14.418c1.38 1.336 3.04 2.005 4.982 2.005 1.941 0 3.602-.669 4.982-2.005 1.38-1.337 2.07-2.946 2.07-4.826 0-1.881-.69-3.49-2.07-4.827-1.38-1.336-3.04-2.005-4.982-2.005-1.942 0-3.602.669-4.982 2.005-1.38 1.337-2.07 2.946-2.07 4.827 0 1.88.69 3.489 2.07 4.825z"
        fill="#fff"
      />
      <Path
        d="M32.165 29.095c1.249 0 2.316.43 3.203 1.288.887.86 1.33 1.894 1.33 3.104 0 1.21-.443 2.243-1.33 3.102-.887.86-1.954 1.289-3.203 1.289-1.249 0-2.316-.43-3.203-1.288-.887-.86-1.33-1.894-1.33-3.103 0-1.21.443-2.245 1.33-3.104.886-.859 1.954-1.288 3.203-1.288z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
