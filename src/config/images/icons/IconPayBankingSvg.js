import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  const {color} = props;
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M24.78 24.355H6.08a.935.935 0 000 1.87h18.7a.935.935 0 000-1.87zM7.248 21.924a.936.936 0 000 1.871h16.364a.936.936 0 000-1.87h-.234v-8.417h.233a.467.467 0 100-.934H7.248a.467.467 0 000 .934h.233v8.416h-.233zm14.26-8.416v8.416h-2.806v-8.416h2.805zm-4.676 0v8.416h-2.805v-8.416h2.805zm-7.48 0h2.804v8.416H9.351v-8.416zM6.08 11.732h18.71a.935.935 0 00.302-1.82l-9.277-4.175a.937.937 0 00-.768 0l-9.35 4.207a.935.935 0 00.383 1.788z"
        fill={color}
      />
    </Svg>
  )
}

export default SvgComponent
