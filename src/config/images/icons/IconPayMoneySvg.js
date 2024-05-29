import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  const {color} = props;
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 32 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16.407 19.968v-.095a19.813 19.813 0 01-1.406-.069 6.355 6.355 0 01-1.02 1.735c.813.132 1.636.206 2.458.216l-.032-1.787zM14.257 16.478a5.307 5.307 0 00-3.62-3.96 5.36 5.36 0 00-5.128 1.133 5.233 5.233 0 00-.35 7.424c1.964 2.146 5.314 2.299 7.474.348a5.208 5.208 0 001.73-3.886c0-.353-.037-.711-.106-1.06zm-5.186.353c.897 0 1.688.59 1.933 1.45a1.99 1.99 0 01-1.391 2.457v.463a.53.53 0 01-1.062 0v-.458a2.005 2.005 0 01-1.486-1.924.53.53 0 011.061 0 .94.94 0 00.945.933.94.94 0 00.94-.939.94.94 0 00-.945-.933 1.997 1.997 0 01-1.932-1.476 2 2 0 011.422-2.436v-.227a.53.53 0 011.062 0v.238a1.995 1.995 0 011.46 1.919.53.53 0 01-1.062 0 .944.944 0 00-1.89 0 .94.94 0 00.945.933zM16.391 18.813l-.031-1.866c-.33-.005-.653-.016-.961-.037.016.21.026.416.026.622 0 .411-.042.828-.122 1.234.35.031.717.047 1.088.047zM22.204 10.088a6.39 6.39 0 01-1.152.458c-1.194.359-2.76.554-4.395.554-1.566 0-3.058-.18-4.21-.511a5.906 5.906 0 01-1.146-.438l.037 1.487c.6.221 1.157.537 1.662.933.016.005.026.005.042.01 1.02.259 2.304.396 3.615.396 1.518 0 3.01-.19 4.087-.512 1.152-.348 1.407-.711 1.407-.78 0-.074-.006-.142.053-.216v-1.381zM20.739 7.995c-1.078-.327-2.57-.512-4.087-.512-1.529 0-2.962.185-4.035.512-1.12.337-1.364.67-1.369.775 0 0 .005 0 .005.01.027.116.345.475 1.487.802 1.056.305 2.447.474 3.912.474 1.518 0 3.004-.185 4.082-.506 1.151-.343 1.412-.707 1.412-.78 0-.069-.255-.427-1.407-.775zM28.298 22.583V21c-.356.18-.728.332-1.115.448-1.19.359-2.744.554-4.385.554-1.454 0-2.871-.164-3.986-.454a6.95 6.95 0 01-1.322-.48l.027 1.53v.01c0 .08.233.432 1.353.775 1.062.322 2.495.5 4.03.5 1.528 0 2.966-.184 4.039-.516 1.12-.348 1.364-.711 1.364-.785h-.005zM22.193 13.03a6.728 6.728 0 01-1.146.453c-1.195.358-2.76.553-4.4.553a19.24 19.24 0 01-2.405-.152c.43.59.748 1.255.95 1.96.456.033.95.054 1.46.054h.053c.87-.95 3.211-1.424 5.488-1.487V13.03zM27.146 18.534c-1.184.348-2.723.538-4.337.538-1.566 0-3.058-.18-4.21-.512a6.532 6.532 0 01-1.157-.443l.022 1.213.005.443c.414.511 2.394 1.17 5.335 1.17 1.534 0 2.983-.179 4.07-.506 1.148-.348 1.397-.706 1.397-.78 0-.058.032-.121.032-.174h.005v-1.397a6.08 6.08 0 01-1.162.448zM26.896 15.977c-1.083-.327-2.569-.501-4.087-.501h-.09c-1.412 0-2.755.158-3.785.448-1.099.306-1.476.654-1.523.796-.006.01-.006.016-.006.021l.01.021c.033.111.346.47 1.487.802 1.056.3 2.447.469 3.912.469 1.513 0 2.946-.174 4.034-.496 1.179-.348 1.444-.711 1.45-.79v-.006c-.006-.079-.271-.427-1.402-.764z"
        fill={color}
      />
    </Svg>
  )
}

export default SvgComponent