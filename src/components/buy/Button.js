

import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import { Color, screen } from '../../config/System'
import TouchableWithoutTwiceClick from '../../../src/components/TouchableWithoutTwichClick'
const Button = ({
	label,
	onPress,
	borderRadius = 6,
	width = screen.width - 48,
	height = 49,
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
				borderRadius:10,
				height,
				width,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: color ? color : Color,
			}}
			onPress={onPress} >
			<Text style={{
				color: 'white',
				fontSize: 14,
				fontWeight:'bold',
			}}>{label}</Text>
		</TouchableWithoutTwiceClick>

	);

export default Button;
