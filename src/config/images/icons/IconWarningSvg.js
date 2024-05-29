import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { Color } from "../../System"

function SvgComponent(props) {
  const {color} = props;
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 61 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#prefix__clip0_8287_4349)">
        <Path
          d="M59.625 45.249L38.43 6.287c-3.405-5.733-11.706-5.74-15.116 0L2.12 45.249c-3.481 5.858.733 13.276 7.556 13.276h42.391c6.817 0 11.04-7.412 7.558-13.276zm-28.753 6.245a3.52 3.52 0 01-3.516-3.516 3.52 3.52 0 013.516-3.515 3.52 3.52 0 013.516 3.515 3.52 3.52 0 01-3.516 3.516zm3.516-14.063a3.52 3.52 0 01-3.516 3.516 3.52 3.52 0 01-3.516-3.516V19.854a3.52 3.52 0 013.516-3.515 3.52 3.52 0 013.516 3.515v17.578z"
          fill={color || Color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_8287_4349">
          <Path
            fill="#fff"
            transform="translate(.872 .255)"
            d="M0 0h60v60H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
