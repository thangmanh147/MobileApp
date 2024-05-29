



import React from 'react';
import {
	Text,
	View ,
	TouchableOpacity,
} from 'react-native';
import {screen, TxtGrey} from '../config/System'

const ButtonNotColor = ({
	label,
	onPress,
	borderRadius = 5,
	width = screen.width-40,
	backgroundColor = '#fff',
	height = 46,
	borderColor='#0cc6b6',
	borderWidth= 0,
	color = TxtGrey,
	fontWeight = 'bold',
	marginTop =5,
	fontSize = 14,
	disabled=false
}) => (
    <TouchableOpacity
		disabled={disabled}
		style={{
			borderRadius,
			height,
			marginTop,
			borderWidth,
			borderColor,
			width,
			backgroundColor,
			alignItems: 'center',
			justifyContent: 'center',

		}}
      onPress={onPress} >
		<Text style={{
			color,
			fontSize,
			fontWeight
		}}>{label}</Text>
    </TouchableOpacity>

);

export default ButtonNotColor;
