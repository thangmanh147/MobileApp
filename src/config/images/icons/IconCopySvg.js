import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { Color } from "../../System"

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
      <G clipPath="url(#prefix__clip0_8179_4509)">
        <Path
          d="M10.844.337H5.219c-.992 0-1.875.91-1.875 1.875l-.542.013C1.81 2.225 1 3.122 1 4.087v9.375c0 .965.883 1.875 1.875 1.875h7.031c.992 0 1.875-.91 1.875-1.875h.469c.992 0 1.875-.91 1.875-1.875V4.098L10.844.337zm-.938 14.062H2.875c-.492 0-.937-.46-.937-.937V4.087c0-.478.4-.922.892-.922l.514-.016v8.438c0 .965.883 1.875 1.875 1.875h5.625c0 .478-.446.937-.938.937zm3.281-2.812c0 .478-.445.937-.937.937H5.219c-.492 0-.938-.46-.938-.937V2.212c0-.478.446-.938.938-.938h4.687c-.007 1.08 0 1.887 0 1.887 0 .974.877 1.863 1.875 1.863h1.406v6.563zm-1.406-7.5c-.499 0-.937-.907-.937-1.394V1.288l2.344 2.799H11.78zm-.937 2.82H6.625a.469.469 0 100 .937h4.219a.469.469 0 100-.936zm0 2.342H6.625a.469.469 0 100 .937h4.219a.469.469 0 100-.937z"
          fill={color || Color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_8179_4509">
          <Path
            fill="#fff"
            transform="translate(.063 .337)"
            d="M0 0h15v15H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
