import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Color, colorIconCar } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 45 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M22.16 38.494c12.15 0 21.998-.698 21.998-1.558 0-.86-9.849-1.557-21.998-1.557-12.148 0-21.997.697-21.997 1.557s9.849 1.558 21.997 1.558z"
        fill="#D9D9D9"
      />
      <Path
        d="M11.91 19.221s-3.18.195-3.05-1.363c.064-.973 1.686-1.233 2.27-.973.325.13.909.454.584.973-.389.52.455.779.455.779l-.26.584z"
        fill={colorIconCar}
      />
      <Path
        d="M31.83 19.221s3.18.195 3.05-1.363c-.065-.973-1.688-1.233-2.272-.973-.324.13-.908.454-.583.973.389.52-.455.779-.455.779l.26.584z"
        fill="#004464"
      />
      <Path
        d="M12.428 36.287h-1.622a1.094 1.094 0 01-1.103-1.103V31.81h3.764v3.374c0 .584-.455 1.103-1.039 1.103zM32.867 36.287h-1.622a1.094 1.094 0 01-1.103-1.103V31.81h3.763v3.374c.065.584-.454 1.103-1.038 1.103z"
        fill="#595552"
      />
      <Path
        d="M9.378 27.592v2.92c0 1.817 1.428 2.4 3.244 2.4h18.494c1.817 0 3.244-.583 3.244-2.4v-2.92c-3.893.454-8.046.714-12.459.714-4.477.064-8.695-.195-12.523-.714z"
        fill={Color}
      />
      <Path
        d="M34.036 23.31c-.454-.844-1.233-2.272-1.687-2.791-.649-.779-.52-2.076-.843-2.466-.325-.454-1.623-5.645-2.596-5.775-7.073-.844-13.108-.13-14.146 0-.973.13-2.271 5.32-2.595 5.775-.325.454-.195 1.752-.844 2.466-.454.519-1.233 1.947-1.687 2.79-.195.325-.325.844-.325 1.233v3.05c3.894.454 8.047.714 12.46.714 4.412 0 8.63-.26 12.458-.714v-3.05c.13-.324 0-.908-.195-1.233z"
        fill={Color}
      />
      <Path
        d="M21.837 19.286c-2.011 0-8.24-.194-8.306-.194-.26 0-.454-.065-.584-.26-.13-.13-.13-.39-.064-.584l1.232-3.958c.844 0 5.97-.195 7.787-.195 1.817 0 6.943.195 7.787.195l1.233 3.958c.064.195 0 .454-.065.584-.13.195-.325.26-.584.26-.195 0-6.424.194-8.436.194z"
        fill="#262529"
      />
      <Path
        d="M21.838 14.225c1.752 0 6.553.194 7.657.194l1.168 3.829c.064.195 0 .324-.065.454s-.26.195-.454.195c-.065 0-6.295.195-8.306.195-2.012 0-8.241-.195-8.306-.195-.195 0-.39-.065-.454-.195-.065-.13-.13-.26-.065-.454l1.168-3.829c1.168 0 5.97-.194 7.657-.194zm0-.325c-1.947 0-7.917.195-7.917.195l-1.233 4.088c-.13.584.195 1.038.844 1.038 0 0 6.294.195 8.306.195 2.011 0 8.305-.195 8.305-.195.584 0 .974-.454.844-1.038l-1.233-4.088c0 .065-5.905-.195-7.916-.195z"
        fill="#212121"
      />
      <Path
        d="M21.836 29.409H11.584s.13 2.4 2.66 2.4h15.184c2.466 0 2.66-2.4 2.66-2.4H21.837zM11.585 22.79s3.764.195 4.088 1.428c.325 1.168-.973 1.427-.973 1.427s-3.893 1.103-4.218-1.427c-.26-1.623 1.103-1.428 1.103-1.428z"
        fill={colorIconCar}
      />
      <Path
        d="M32.09 22.79s-3.764.195-4.089 1.428c-.324 1.168.974 1.427.974 1.427s3.893 1.103 4.217-1.427c.26-1.623-1.103-1.428-1.103-1.428z"
        fill="#004464"
      />
      <Path
        d="M25.212 29.928H18.53c-.39 0-.65-.26-.65-.65v-1.037a.65.65 0 01.65-.65h6.683c.39 0 .65.26.65.65v1.038a.65.65 0 01-.65.649z"
        fill="#fff"
      />
      <Path
        d="M25.212 30.122h-6.684a.859.859 0 01-.843-.843V28.24c0-.455.389-.844.843-.844h6.684c.454 0 .843.39.843.844v1.038c0 .519-.39.843-.843.843zm-6.684-2.336a.444.444 0 00-.454.454v1.039c0 .26.195.454.454.454h6.684c.26 0 .454-.195.454-.454V28.24a.444.444 0 00-.454-.455h-6.684z"
        fill={colorIconCar}
      />
      <Path
        d="M14.245 25.58a.908.908 0 100-1.817.908.908 0 000 1.817z"
        fill="#FFF200"
      />
      <Path
        d="M12.04 25.45a1.233 1.233 0 100-2.465 1.233 1.233 0 000 2.466zM29.429 25.58a.908.908 0 100-1.817.908.908 0 000 1.817z"
        fill="#FFF200"
      />
      <Path
        d="M31.7 25.45a1.233 1.233 0 100-2.465 1.233 1.233 0 000 2.466z"
        fill="#FFD630"
      />
      <Path
        d="M28.586 25.45c-4.478.65-9.02.65-13.497 0 .065-.389.13-.778.194-1.232a44.81 44.81 0 0013.173 0c.065.454.065.843.13 1.233z"
        fill={colorIconCar}
      />
      <Path
        d="M7.562 3.713c.389.26.713.454 1.038.714.194.13.324.26.454.389.13.13.324.26.454.39.325.259.584.583.909.843.324.26.584.584.843.908l-1.103.13a40.082 40.082 0 011.882-3.31c.39-.518.714-1.037 1.103-1.557.39-.519.779-1.038 1.233-1.492-.13.649-.325 1.233-.584 1.882-.195.584-.454 1.168-.714 1.752a33.235 33.235 0 01-1.752 3.374l-.519.908-.649-.778-.779-.974c-.26-.324-.454-.648-.713-1.038-.13-.194-.195-.324-.325-.519s-.194-.324-.324-.519c-.065-.324-.26-.714-.454-1.103zM32.804 26.619c-4.088 0-7.462-4.348-7.462-9.669 0-5.126 3.244-9.02 7.462-9.02 4.283 0 7.462 3.894 7.462 9.02.065 5.386-3.31 9.669-7.462 9.669z"
        fill="#fff"
      />
      <Path
        d="M35.4 18.897c1.218 0 2.206-.784 2.206-1.752s-.988-1.752-2.206-1.752c-1.219 0-2.207.784-2.207 1.752s.988 1.752 2.207 1.752zM33.064 22.79c1.72 0 3.115-.784 3.115-1.752s-1.395-1.752-3.115-1.752c-1.72 0-3.115.784-3.115 1.752s1.395 1.752 3.115 1.752zM30.533 18.897c1.29 0 2.336-.784 2.336-1.752s-1.046-1.752-2.336-1.752c-1.29 0-2.336.784-2.336 1.752s1.046 1.752 2.336 1.752z"
        fill="#FFE2C2"
      />
      <Path
        d="M35.335 17.988c.573 0 1.038-.377 1.038-.843 0-.466-.465-.844-1.038-.844s-1.038.378-1.038.844c0 .466.465.843 1.038.843z"
        fill="#fff"
      />
      <Path
        d="M35.334 17.794c.43 0 .779-.29.779-.649 0-.358-.349-.649-.779-.649-.43 0-.778.29-.778.649 0 .358.348.649.778.649z"
        fill="#9C7B62"
      />
      <Path
        d="M35.336 17.47c.215 0 .389-.146.389-.325 0-.179-.174-.324-.39-.324-.214 0-.389.145-.389.324 0 .18.175.325.39.325z"
        fill="#333"
      />
      <Path
        d="M35.4 17.275c.143 0 .259-.088.259-.195 0-.108-.116-.195-.26-.195-.143 0-.26.087-.26.195 0 .107.117.195.26.195z"
        fill="#878787"
      />
      <Path
        d="M30.274 17.988c.573 0 1.038-.377 1.038-.843 0-.466-.465-.844-1.038-.844-.574 0-1.039.378-1.039.844 0 .466.465.843 1.039.843z"
        fill="#fff"
      />
      <Path
        d="M30.274 17.794c.43 0 .778-.29.778-.649 0-.358-.348-.649-.778-.649-.43 0-.779.29-.779.649 0 .358.349.649.779.649z"
        fill="#9C7B62"
      />
      <Path
        d="M30.274 17.47c.215 0 .39-.146.39-.325 0-.179-.175-.324-.39-.324-.215 0-.39.145-.39.324 0 .18.175.325.39.325z"
        fill="#333"
      />
      <Path
        d="M31.312 21.558l-.325.778 1.817.714 1.882-.779-.325-.778-3.05.065z"
        fill="#E0C6A9"
      />
      <Path
        d="M34.62 22.66c.26.13.39 0 .39 0v-.13c-.065-.194-.195-1.167-1.298-1.687-.26-.13-.844-.064-.844 0 0 0-.713-.13-1.038.13-.973.65-1.103 1.428-1.168 1.623v.13s.13.129.39 0c.324-.585 1.038-1.234 1.751-1.234.78-.065 1.428.52 1.817 1.168z"
        fill="#D9C1C1"
      />
      <Path
        d="M32.804 22.076s.584 0 .778.13c.455.13.78.39.974.454-.325-.584-1.038-1.233-1.752-1.168-.779 0-1.428.584-1.752 1.233.194-.065.519-.324 1.038-.454.195-.195.714-.195.714-.195z"
        fill="#CCA4A4"
      />
      <Path
        d="M30.403 17.275c.144 0 .26-.088.26-.195 0-.108-.116-.195-.26-.195-.143 0-.26.087-.26.195 0 .107.117.195.26.195z"
        fill="#878787"
      />
      <Path
        d="M34.23 17.47s1.039.194 2.142 0c.454-.065 0 .454-.714.584-.52.064-1.233-.195-1.428-.584z"
        fill="#FFE2C2"
      />
      <Path
        d="M34.101 17.34c-.194 0 1.103-1.233 2.206-.13.325.519.455-.454-.584-.844-.843-.39-1.816.52-1.622.974z"
        fill="#FFE2C2"
      />
      <Path
        d="M33.323 16.171s.065 0 .13-.064c.065-.065.195-.065.325-.13.064 0 .13-.065.26-.065.064 0 .194-.065.259-.065s.194-.065.26-.065c.064 0 .194-.065.324-.065s.194 0 .324-.065h.779c.324 0 .519.065.519.065.065 0 .13.065.13.195 0 .065-.065.13-.195.13h-.909c-.064 0-.194 0-.259.064-.065 0-.195.065-.26.065-.064 0-.194.065-.26.065-.064 0-.194.065-.259.065s-.13.065-.26.065c-.064 0-.129.065-.194.065-.13.065-.195.13-.26.13-.064.065-.13.065-.13.065-.129.064-.324.064-.389-.065-.13-.13-.13-.325.065-.39-.065 0-.065 0 0 0zM32.09 16.626s-.065 0-.13-.065c-.064-.065-.13-.065-.259-.13-.065-.064-.13-.064-.195-.064-.064 0-.13-.065-.26-.065-.064 0-.194-.065-.259-.065s-.194-.065-.26-.065c-.064 0-.194-.065-.259-.065s-.195 0-.26-.065H29.3c-.065 0-.195-.065-.195-.195 0-.064.065-.194.13-.194 0 0 .195 0 .52-.065h.778c.13 0 .195 0 .325.065.13 0 .194 0 .324.065.065 0 .195.065.26.065.064 0 .194.064.259.064s.13.065.26.065c.13.065.26.13.324.13.065.065.13.065.13.065.13.065.194.26.065.39-.13.194-.26.194-.39.13z"
        fill="#9C7B62"
      />
      <Path
        d="M29.17 17.47s1.04.194 2.142 0c.454-.065 0 .454-.713.584-.52.064-1.233-.195-1.428-.584z"
        fill="#FFE2C2"
      />
      <Path
        d="M29.04 17.34c-.194 0 1.104-1.233 2.207-.13.324.519.454-.454-.584-.844-.844-.39-1.817.52-1.622.974z"
        fill="#FFE2C2"
      />
      <Path
        d="M30.663 20.974c0-.714.973-.78 2.141-.78v-10.9c-3.439 0-6.164 3.114-6.164 7.721s2.79 8.37 6.164 8.37v-2.724c-1.168-.065-2.141-.909-2.141-1.688zm-2.466-3.764c0-.714 1.428-1.363 2.271-1.363.844 0 2.206.584 2.206 1.363 0 .714-1.362 1.363-2.206 1.363-.843-.065-2.271-.65-2.271-1.363z"
        fill="#2E2F31"
      />
      <Path
        d="M32.804 9.293v10.902c1.168 0 2.141.065 2.141.779 0 .713-.973 1.622-2.141 1.622v2.725c3.439 0 6.164-3.764 6.164-8.37.065-4.543-2.725-7.658-6.164-7.658zm2.4 9.215c-.843 0-2.011-.584-2.011-1.363 0-.714 1.168-1.363 2.012-1.363.843 0 2.27.584 2.27 1.363s-1.362 1.363-2.27 1.363z"
        fill="#1A1B1C"
      />
      <Path
        d="M34.816 10.072s2.336 1.039 2.92 3.504h-1.752c.13-2.011-1.297-3.439-1.297-3.439h.13v-.065z"
        fill="#2E2F31"
      />
    </Svg>
  )
}

export default SvgComponent
