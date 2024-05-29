import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Color } from "../../System"

const SvgComponent = (props) => {
    const {color} = props;
    return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          style={{
            enableBackground: "new 0 0 512 512",
          }}
          xmlSpace="preserve"
          width={24}
          height={24}
          {...props}
        >
          <Path
            d="M437 75C388.7 26.6 324.4 0 256 0S123.3 26.6 75 75C26.6 123.3 0 187.6 0 256s26.6 132.7 75 181c48.4 48.4 112.6 75 181 75s132.7-26.6 181-75c48.4-48.4 75-112.6 75-181s-26.6-132.7-75-181zm-181-5c30.3 0 55 24.7 55 55s-24.7 55-55 55-55-24.7-55-55 24.7-55 55-55zm70 350H186v-30h30V240h-30v-30h110v180h30v30z"
            style={{
              fill: color || Color,
            }}
          />
        </Svg>
    );
}

export default SvgComponent
