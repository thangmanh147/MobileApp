import * as React from "react"
import Svg, { Circle, G, Path, Defs, ClipPath } from "react-native-svg"
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
      <Circle cx={25.12} cy={25.716} r={25} fill={colorIcon} />
      <G clipPath="url(#prefix__clip0_7307_6271)" fill="#fff">
        <Path d="M38.12 31.674v.813a.812.812 0 01-.239.574l-5.416 5.417a.812.812 0 01-.574.238h-.813v-6.23c0-.443.369-.812.813-.812h6.229z" />
        <Path d="M35.141 18.133h-8.125v2.438c0 1.045-.85 1.896-1.896 1.896a1.898 1.898 0 01-1.896-1.896v-2.438H15.1a2.977 2.977 0 00-2.979 2.98v14.624a2.977 2.977 0 002.98 2.98h14.895v-6.23c0-1.045.85-1.895 1.896-1.895h6.23v-9.48a2.977 2.977 0 00-2.98-2.979zm-7.854 15.709H17.266a.813.813 0 010-1.625h10.02a.813.813 0 010 1.625zm5.687-4.334H17.266a.813.813 0 010-1.625h15.708a.813.813 0 010 1.625zm0-4.333H17.266a.813.813 0 010-1.625h15.708a.813.813 0 010 1.625z" />
        <Path d="M25.12 21.383a.813.813 0 01-.812-.812v-4.063a.813.813 0 011.625 0v4.063a.813.813 0 01-.813.812z" />
        <Path d="M25.12 17.05a2.169 2.169 0 01-2.167-2.167c0-1.195.972-2.167 2.167-2.167 1.195 0 2.166.972 2.166 2.167a2.169 2.169 0 01-2.166 2.167z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_7307_6271">
          <Path
            fill="#fff"
            transform="translate(12.12 12.716)"
            d="M0 0h26v26H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
