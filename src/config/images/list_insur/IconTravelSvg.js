import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 63 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle opacity={0.9} cx={31.117} cy={31.712} r={31.099} fill={Color} />
      <Path
        d="M34.85 21.981a2.637 2.637 0 10.353-5.262 2.637 2.637 0 00-.352 5.262zM26.703 33.125a1.915 1.915 0 01-.423-.244l-1.711 3.712-1.282-.591a.995.995 0 00-1.32.486l-3.383 7.336a.995.995 0 00.487 1.32l.436.201a.788.788 0 00.208 1.295.79.79 0 001.119-.683l.436.2a.995.995 0 001.32-.486l3.383-7.336a.994.994 0 00-.341-1.235l1.765-3.828a1.912 1.912 0 01-.694-.147z"
        fill="#fff"
      />
      <Path
        d="M42.832 28.034l-3.574-.9-1.614-1.86.032-.488a1.782 1.782 0 00-1.659-1.896l-3.17-.212a1.782 1.782 0 00-1.885 1.552l.724-.208-2.925 1.563c-.245.13-.437.341-.543.597l-1.888 4.514a1.203 1.203 0 102.22.928l1.723-4.118 2.547-1.361-1.869 1.58-.27.644-.34 5.088.017.001.255 5.135-2.813 6.068a1.444 1.444 0 102.62 1.215l2.963-6.391c.099-.212.144-.446.133-.68l-.257-5.153.65.044 1.599 4.751.606 6.947a1.444 1.444 0 102.877-.251l-.621-7.118a1.445 1.445 0 00-.07-.335l-1.273-3.786.04.003.349-5.224.273.315c.16.186.376.318.614.378l3.942.992a1.203 1.203 0 10.587-2.334z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent