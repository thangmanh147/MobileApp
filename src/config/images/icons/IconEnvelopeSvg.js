import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#prefix__clip0_6940_4338)">
        <Path
          d="M5.156 6.426h4.688c.259 0 .469-.21.469-.468v-.47a.469.469 0 00-.47-.468H5.157a.469.469 0 00-.468.469v.469c0 .259.21.468.468.468zM4.688 8.77c0 .26.21.469.468.469h4.688c.259 0 .469-.21.469-.469v-.469a.469.469 0 00-.47-.468H5.157a.469.469 0 00-.468.468v.47zM7.5 12.32a2.34 2.34 0 01-1.373-.445L0 7.448v6.244c0 .777.63 1.406 1.406 1.406h12.188c.776 0 1.406-.63 1.406-1.406V7.448l-6.127 4.426c-.41.296-.892.445-1.373.445zm6.961-7.447c-.259-.203-.505-.394-.867-.668V2.91c0-.777-.63-1.407-1.406-1.407H9.915l-.265-.192C9.158.952 8.18.088 7.5.098c-.68-.01-1.658.855-2.15 1.214l-.266.192H2.813c-.777 0-1.407.63-1.407 1.407v1.293c-.362.273-.608.465-.867.668A1.406 1.406 0 000 5.98v.312l2.813 2.031V2.911h9.374v5.411L15 6.291v-.312c0-.432-.199-.84-.539-1.107z"
          fill={Color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_6940_4338">
          <Path fill="#fff" transform="translate(0 .1)" d="M0 0h15v15H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
