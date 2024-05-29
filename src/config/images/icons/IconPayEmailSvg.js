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
        d="M7 14.55l6.173 4.683 1.723-1.308a.369.369 0 01.446 0l1.722 1.306 6.172-4.681V7.519H7v7.031zm8.118-5.186a3.325 3.325 0 013.321 3.32v.739a1.105 1.105 0 01-2.042.587 1.841 1.841 0 11.566-1.325v.738a.369.369 0 00.738 0v-.738a2.583 2.583 0 10-2.583 2.583h1.107a.37.37 0 010 .738h-1.107a3.321 3.321 0 110-6.642z"
        fill={color}
      />
      <Path
        d="M15.118 13.792a1.107 1.107 0 100-2.214 1.107 1.107 0 000 2.214zM5.027 13.054l1.234.936v-1.872l-1.234.936zM4.785 25.596l7.777-5.9-7.777-5.899v11.799zM23.975 13.99l1.234-.936-1.234-.936v1.872zM25.45 13.797l-7.776 5.899 7.777 5.9V13.797zM15.118 18.683L5.513 25.97h19.21l-9.605-7.287zM13.296 6.78h3.644l-1.822-1.382-1.822 1.382z"
        fill={color}
      />
    </Svg>
  )
}

export default SvgComponent
