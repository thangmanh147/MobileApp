import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
import { colorIcon } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={25.12} cy={25.236} r={25} fill={colorIcon} />
      <Path fill={colorIcon} d="M12.12 12.236h26v26h-26z" />
      <Path
        d="M17.733 26.671a3.08 3.08 0 00-3.02 3.677 3.076 3.076 0 004.198 2.242 3.078 3.078 0 001.9-2.842 3.078 3.078 0 00-3.078-3.077zm0 4.717a1.642 1.642 0 01-1.61-1.96 1.64 1.64 0 012.238-1.196 1.642 1.642 0 01-.628 3.156zM33.328 26.671a3.08 3.08 0 00-3.019 3.677 3.076 3.076 0 004.197 2.242 3.078 3.078 0 001.9-2.842 3.078 3.078 0 00-3.078-3.077zm0 4.717a1.642 1.642 0 110-3.283 1.642 1.642 0 010 3.283z"
        fill="#fff"
      />
      <Path
        d="M37.668 24.652c-2.038-.84-5.16-2.287-5.16-2.287L30.02 18.33a1.839 1.839 0 00-1.433-.682H16.285a2.246 2.246 0 00-2.02 1.247l-1.835 3.669a2.255 2.255 0 00-.238 1.008v4.945a1.845 1.845 0 001.847 1.846h.052a3.689 3.689 0 012.086-3.967 3.696 3.696 0 015.119 2.376 3.69 3.69 0 01.078 1.59h8.313a3.69 3.69 0 013.55-4.312 3.695 3.695 0 013.758 4.134 1.847 1.847 0 001.053-1.667v-3.296a.615.615 0 00-.38-.569zm-22.583-2.736a.82.82 0 01-.731.449h-.798s1.303-2.581 1.793-3.515a.615.615 0 01.545-.33h.504a.257.257 0 01.23.37l-.003.005-1.54 3.02zm2.648 2.705h-.821a.616.616 0 110-1.23h.82a.616.616 0 010 1.23zm5.54-2.871a.615.615 0 01-.615.615h-5.51a.616.616 0 01-.548-.897c.432-.839 1.058-2.047 1.365-2.622a.616.616 0 01.543-.326h4.15a.616.616 0 01.615.615v2.614zm3.489 2.87h-.77a.616.616 0 110-1.23h.77a.616.616 0 010 1.23zm-1.026-2.255a.616.616 0 01-.616-.615v-2.615a.615.615 0 01.616-.616h3.375l2.37 3.846h-5.745z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent