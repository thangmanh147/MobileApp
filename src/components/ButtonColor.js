

import React from 'react';
import {
	Text,
	View ,
	TouchableOpacity,
} from 'react-native';
import {Color, screen, fontNormal, fontBold} from '../config/System'
import TouchableWithoutTwiceClick from '../components/TouchableWithoutTwichClick';
const Button = ({
	label,
	onPress,
	borderRadius = 6,
	width = screen.width/2,
	backgroundColor = Color,
	height = 50,
	color,
	fontWeight = 'bold',
	marginTop = 20,
	marginBottom = 0,
    disabled=false
}) => (
	<View
		style={{
		borderRadius,
		height,
		width,
		marginTop,
		marginBottom,
        backgroundColor,
        marginHorizontal: 5,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
		}}
		 >
			<TouchableWithoutTwiceClick
			disabled={disabled}
			style={{
				borderRadius,
				height,
				width,
				alignItems: 'center',
                justifyContent: 'center',
                flex:1
			}}
			onPress={onPress} >
				<Text style={{
					color: color ? color : '#fff',
					fontSize:17,
                    // fontWeight,
                    alignSelf:'center',
                    textAlign:'center',
					fontFamily: fontBold
				}}>{label}</Text>
			</TouchableWithoutTwiceClick>
	</View>

);

export default Button;
