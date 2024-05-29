

import React from 'react';
import {
	Text,
	View ,
	TouchableOpacity,
} from 'react-native';
import {Color, screen,NewColor,NewColorDisable } from '../config/System'
import TouchableWithoutTwiceClick from '../../src/components/TouchableWithoutTwichClick'
const Button = ({
	style,
	label,
	onPress,
	borderRadius = 10,
	width = screen.width-48,
	backgroundColor =  NewColor,
	height = 49,
	color = '#fff',
	fontWeight = 'bold',
	marginTop,
	marginBottom = 10,
	disabled=false,
	paddingBottom
}) => (
	<View
		style={[{
		borderRadius : 10,
		height,
		width,
		marginTop,
		marginBottom,
		backgroundColor:disabled == true ? NewColorDisable : backgroundColor,
		alignItems: 'center',
		justifyContent: 'center'
		}, style]}
		 >
			<TouchableWithoutTwiceClick
			disabled={disabled}
			style={{
				borderRadius,
				height,
				width,
				alignItems: 'center',
				justifyContent: 'center',
				paddingBottom: paddingBottom ? paddingBottom : 0,
			}}
			onPress={onPress} >
				<Text style={{
					color,
					fontSize:14,
					// // fontWeight,
					fontWeight: 'bold',
				}}>{label}</Text>
			</TouchableWithoutTwiceClick>
	</View>

);

export default Button;
