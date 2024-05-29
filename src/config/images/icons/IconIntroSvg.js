import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => {
  const {color} = props;
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M34.226 21.756h-3.094c.316.864.488 1.795.488 2.766v11.692c0 .405-.07.793-.199 1.155h5.114A3.468 3.468 0 0 0 40 33.904V27.53a5.78 5.78 0 0 0-5.774-5.774ZM8.38 24.522c0-.97.172-1.902.488-2.766H5.774A5.78 5.78 0 0 0 0 27.531v6.373a3.468 3.468 0 0 0 3.465 3.465h5.114a3.448 3.448 0 0 1-.199-1.155V24.522ZM23.536 18.748h-7.072a5.78 5.78 0 0 0-5.774 5.774v11.692c0 .637.517 1.155 1.155 1.155h16.31c.638 0 1.155-.517 1.155-1.155V24.522a5.78 5.78 0 0 0-5.774-5.774ZM20 3.438a6.952 6.952 0 0 0-6.944 6.944A6.949 6.949 0 0 0 20 17.326a6.95 6.95 0 0 0 6.944-6.944A6.952 6.952 0 0 0 20 3.438ZM7.806 9.91a5.2 5.2 0 0 0-5.193 5.194 5.2 5.2 0 0 0 5.193 5.193c.727 0 1.418-.15 2.047-.421a5.226 5.226 0 0 0 2.536-2.333 5.16 5.16 0 0 0 .61-2.44A5.2 5.2 0 0 0 7.806 9.91ZM32.194 9.91A5.2 5.2 0 0 0 27 15.104c0 .88.222 1.711.61 2.44a5.226 5.226 0 0 0 2.537 2.332 5.2 5.2 0 0 0 7.24-4.773 5.2 5.2 0 0 0-5.193-5.193Z"
        fill={color || '#fff'}
      />
    </Svg>
  );
}

export default SvgComponent
