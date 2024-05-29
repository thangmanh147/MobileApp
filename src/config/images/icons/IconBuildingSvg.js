import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent(props) {
    const {color} = props;
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#prefix__clip0_7328_2956)">
        <Path
          d="M13.275 14.486V.366h-7.91v3.153h-3.34v10.966H.15v.88h15v-.88h-1.875zM4.574 12.95h-.88V11.7h.88v1.252zm0-2.132h-.88V9.566h.88v1.253zm0-2.132h-.88V7.434h.88v1.253zm0-2.133h-.88V5.302h.88v1.252zM8 13.415h-.879V11.89h.88v1.525zm0-2.404h-.879V9.486h.88v1.524zm0-2.405h-.879V7.08h.88v1.525zm0-2.405h-.879V4.676h.88v1.525zm0-2.405h-.879V2.271h.88v1.525zm1.758 11.13H8.88V11.89h.88v3.035zm0-3.915H8.88V9.486h.88v1.524zm0-2.405H8.88V7.08h.88v1.525zm0-2.405H8.88V4.676h.88v1.525zm0-2.405H8.88V2.271h.88v1.525zm1.758 9.62h-.879V11.89h.88v1.525zm0-2.405h-.879V9.486h.88v1.524zm0-2.405h-.879V7.08h.88v1.525zm0-2.405h-.879V4.676h.88v1.525zm0-2.405h-.879V2.271h.88v1.525z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_7328_2956">
          <Path fill="#fff" transform="translate(.15 .357)" d="M0 0h15v15H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
