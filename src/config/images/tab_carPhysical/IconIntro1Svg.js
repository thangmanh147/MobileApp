import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Color, colorIconCar } from "../../System"

function SvgComponent(props) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 31 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M30.153 34.45H4.133V.771H26.52l3.633 2.92v30.757z"
        fill="#E3E0D7"
      />
      <Path
        d="M27.104 6.028h-3.699v.778h3.699v-.778zM27.104 9.078h-3.699v.778h3.699v-.778zM27.104 12.127h-3.699v.78h3.699v-.78zM11.011 6.028H7.313v.778h3.698v-.778zM11.011 9.078H7.313v.778h3.698v-.778zM11.011 12.127H7.313v.78h3.698v-.78zM27.103 15.177H7.44v.779h19.662v-.779zM27.103 18.227H7.44v.779h19.662v-.779zM27.103 21.277H7.44v.778h19.662v-.778zM27.103 24.327H7.44v.778h19.662v-.778zM27.103 27.377H7.44v.778h19.662v-.779zM27.103 30.361H7.44v.779h19.662v-.779z"
        fill="#A8A291"
      />
      <Path
        d="M26.26.772l1.103 3.18 2.79-.325c0 .065-.324-2.66-3.893-2.855z"
        fill="#C9C9C9"
      />
      <Path
        d="M7.247 29.193l-2.595-2.141-2.66 2.141V15.761h5.255v13.432z"
        fill={colorIconCar}
      />
      <Path
        d="M5.3 17.968c-.389-.26-.973-.26-1.297 0-.39.26-.779.13-.974-.26-.194-.39-.649-.714-1.103-.649-.454.065-.778-.26-.714-.714.065-.454-.26-.973-.648-1.103-.39-.195-.52-.584-.26-.973.26-.39.26-.973 0-1.298-.26-.39-.13-.779.26-.973.389-.195.713-.65.648-1.103-.064-.455.26-.779.714-.714.454.065.974-.26 1.103-.649.195-.39.584-.52.974-.26.389.26.973.26 1.297 0 .39-.26.78-.194.974.26.194.39.714.714 1.103.649.39-.065.779.26.714.714-.065.454.26.973.649 1.103.389.194.519.584.26.973-.26.39-.26.973 0 1.298.259.39.194.778-.26.973-.39.195-.714.65-.65 1.103.066.454-.259.779-.713.714-.454-.065-.973.26-1.103.649-.195.454-.584.52-.974.26z"
        fill="#FE5C14"
      />
      <Path
        d="M4.003 16.15c-.324-.324-.713-.518-1.168-.648-.13-.454-.389-.844-.648-1.168.13-.454.13-.909 0-1.363.324-.324.519-.714.648-1.168.455-.13.844-.39 1.168-.649.195.065.455.065.65.065.259 0 .454 0 .648-.065.325.325.714.52 1.168.65.13.453.39.843.65 1.167-.13.454-.13.909 0 1.363-.325.324-.52.714-.65 1.168-.454.13-.843.39-1.168.649-.194-.065-.454-.065-.649-.065-.194 0-.454 0-.649.065z"
        fill="#B72200"
      />
      <Path
        d="M4.652 12.127l.648.78.909.388-.52.844-.064 1.038-.973-.324-.974.324-.065-1.038-.584-.844.974-.389.649-.779z"
        fill="#fff"
      />
      <Path
        d="M13.022 6.547s-1.363.065-1.298-.584c.065-.39.714-.52.973-.39.13.065.39.195.26.39s.194.324.194.324l-.13.26zM21.458 6.547s1.363.065 1.298-.584c-.065-.39-.714-.52-.974-.39-.13.065-.389.195-.26.39.13.195-.194.324-.194.324l.13.26z"
        fill={colorIconCar}
      />
      <Path
        d="M13.282 13.75h-.65a.444.444 0 01-.453-.455v-1.427H13.8v1.427c-.065.195-.26.454-.52.454zM21.912 13.75h-.65a.444.444 0 01-.453-.455v-1.427h1.622v1.427c-.065.195-.26.454-.52.454z"
        fill="#595552"
      />
      <Path
        d="M11.983 10.05v1.234c0 .778.584 1.038 1.363 1.038h7.787c.778 0 1.362-.26 1.362-1.038V10.05c-1.622.194-3.439.324-5.256.324-1.881 0-3.633-.13-5.256-.324z"
        fill={Color}
      />
      <Path
        d="M22.366 8.234c-.195-.324-.52-.973-.714-1.168-.26-.324-.26-.844-.39-1.038-.13-.195-.713-2.401-1.103-2.401-2.985-.39-5.58-.065-5.97 0-.389.065-.973 2.271-1.103 2.4-.13.195-.065.715-.389 1.039-.195.195-.52.844-.714 1.168-.065.13-.13.39-.13.52v1.297c1.623.194 3.44.324 5.257.324 1.881 0 3.633-.13 5.256-.324V8.753c.13-.13.13-.39 0-.519z"
        fill={Color}
      />
      <Path
        d="M17.24 6.547c-.844 0-3.504-.065-3.504-.065-.13 0-.195-.065-.26-.13s-.065-.13-.065-.26l.52-1.686c.324 0 2.53-.065 3.309-.065.778 0 2.92.065 3.309.065l.52 1.687c0 .065 0 .194-.066.26-.065.064-.13.13-.26.13 0 0-2.66.064-3.503.064z"
        fill="#262529"
      />
      <Path
        d="M17.24 4.406c.713 0 2.79.065 3.244.065l.52 1.622v.194c-.066.065-.13.065-.196.065 0 0-2.66.065-3.504.065-.843 0-3.504-.065-3.504-.065-.065 0-.13 0-.194-.065-.065-.064-.065-.13 0-.194l.519-1.622c.39 0 2.4-.065 3.114-.065zm0-.13c-.844 0-3.31.065-3.31.065l-.519 1.687c-.065.26.065.454.325.454 0 0 2.66.065 3.503.065.844 0 3.505-.065 3.505-.065.26 0 .389-.195.324-.454l-.52-1.687s-2.465-.065-3.308-.065z"
        fill="#212121"
      />
      <Path
        d="M17.24 10.83h-4.347s.064.973 1.103.973h6.359c1.038 0 1.103-.973 1.103-.973H17.24zM12.892 8.04s1.558.064 1.687.584c.13.519-.389.583-.389.583s-1.622.455-1.817-.584c-.065-.713.52-.583.52-.583zM21.587 8.04s-1.558.064-1.687.584c-.13.519.39.583.39.583s1.621.455 1.816-.584c.065-.713-.52-.583-.52-.583z"
        fill={colorIconCar}
      />
      <Path
        d="M18.668 11.024h-2.79a.28.28 0 01-.26-.26v-.454c0-.13.13-.26.26-.26h2.79c.13 0 .26.13.26.26v.455c0 .13-.13.26-.26.26z"
        fill="#fff"
      />
      <Path
        d="M18.668 11.154h-2.79c-.195 0-.39-.13-.39-.39v-.454c0-.194.13-.39.39-.39h2.79c.195 0 .39.13.39.39v.454c-.066.195-.195.39-.39.39zm-2.855-1.038c-.13 0-.195.064-.195.194v.454c0 .13.065.195.195.195h2.79c.13 0 .195-.065.195-.194v-.455c0-.13-.065-.194-.195-.194h-2.79z"
        fill={colorIconCar}
      />
      <Path
        d="M14.06 9.207a.39.39 0 100-.778.39.39 0 000 .778zM13.088 9.142a.52.52 0 100-1.038.52.52 0 000 1.038zM20.484 9.207a.39.39 0 100-.778.39.39 0 000 .778z"
        fill="#FFF200"
      />
      <Path
        d="M21.392 9.142a.52.52 0 100-1.038.52.52 0 000 1.038z"
        fill="#FFF200"
      />
      <Path
        d="M20.095 9.143c-1.882.26-3.828.26-5.71 0 0-.195.065-.325.065-.52 1.817.26 3.698.26 5.58 0 0 .195.065.325.065.52z"
        fill={colorIconCar}
      />
    </Svg>
  )
}

export default SvgComponent
