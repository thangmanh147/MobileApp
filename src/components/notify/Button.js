

import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import { Color, screen, fontNormal, fontBold } from '../../config/System'
import TouchableWithoutTwiceClick from '../../../src/components/TouchableWithoutTwichClick'
const Button = ({
	label,
	onPress,
	borderRadius = 6,
	width = screen.width - 40,
	height = 46,
	color,
	fontWeight = 'bold',
	marginTop,
	marginBottom,
	disable
}) => (
		<TouchableWithoutTwiceClick
			disabled={ disable ? disable : false}
			style={{
				marginTop,
				marginBottom,
				borderRadius,
				height,
				width,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: color ? color : Color
			}}
			onPress={onPress} >
			<Text style={{
				color: 'white',
				fontSize: 19,
				// fontWeight,
				fontFamily: fontBold
			}}>{label}</Text>
		</TouchableWithoutTwiceClick>

	);

export default Button;
