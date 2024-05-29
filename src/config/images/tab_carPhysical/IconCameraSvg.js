import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { colorIcon } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 59 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={0.363}
        y={0.754}
        width={58.222}
        height={40}
        rx={10}
        fill={colorIcon}
      />
      <Path
        d="M16.49 13.634c.735-.71 1.62-1.066 2.656-1.066h3.286l.748-1.932c.186-.464.526-.865 1.02-1.201.494-.337 1-.505 1.518-.505h7.512c.518 0 1.024.168 1.518.505.494.336.834.737 1.02 1.2l.748 1.934h3.286c1.037 0 1.921.355 2.655 1.065.733.71 1.1 1.568 1.1 2.573V28.94c0 1.005-.367 1.862-1.1 2.572-.734.711-1.619 1.066-2.655 1.066H19.146c-1.036 0-1.921-.355-2.655-1.066-.733-.71-1.1-1.567-1.1-2.572V16.207c0-1.005.367-1.862 1.1-2.573zm8.341 13.438c1.286 1.245 2.834 1.869 4.643 1.869 1.81 0 3.357-.624 4.643-1.87 1.286-1.245 1.93-2.745 1.93-4.497 0-1.753-.644-3.252-1.93-4.498-1.286-1.246-2.834-1.87-4.643-1.87-1.81 0-3.357.624-4.643 1.87-1.286 1.245-1.93 2.745-1.93 4.498 0 1.752.644 3.252 1.93 4.497z"
        fill="#fff"
      />
      <Path
        d="M29.474 18.48c1.164 0 2.16.4 2.986 1.201.826.801 1.24 1.765 1.24 2.893 0 1.127-.414 2.091-1.24 2.892-.827.8-1.822 1.2-2.986 1.2-1.164 0-2.159-.4-2.985-1.2-.827-.801-1.24-1.765-1.24-2.892 0-1.128.413-2.092 1.24-2.893.826-.8 1.821-1.2 2.985-1.2z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
