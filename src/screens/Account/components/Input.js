

import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { colorText, tintColorInput } from '../../../config/System';
import { ScaledSheet } from 'react-native-size-matters';
const Input = ({
	label,
	value,
	editable,
	textColor,
	tintColor = tintColorInput,
	baseColor = colorText,
	keyboardType,
	onChangeText,
	secureTextEntry = false,
	width,
	padding = 0,
	autoUpperCase,
	onFocus,
	errorText,
	errorCode,
	colorSubText,
	erroCodeValidate,
	keyboardEmail,
	pathImage,
	maxLength,
	placeholder,
	onBlur,
	error,
	touched,
   	onPress,
	otp,
	onPressOtp,
				   disabledOtp,
				   autoCapitalize
}) => (
	<View style={{ justifyContent: 'center', width: width }}>
		<TextField
			fontSize={14}
			autoCapitalize={autoCapitalize}
			label={label}
			textColor={textColor}
			tintColor={tintColor}
			baseColor={baseColor}
			value={value}
			maxLength={maxLength}
			lineWidth={0.5}
			editable={editable}
			placeholder={placeholder}
			secureTextEntry={secureTextEntry}
			keyboardType={keyboardType ? keyboardType : 'default'}
			onFocus={onFocus}
			onChangeText={(text) => onChangeText(text)}
			style={{
				padding: padding,
				width,
				flex: 1,
			}}
			onBlur={onBlur}


		/>
		{
			pathImage ? <View style={{position: 'absolute',alignSelf:'flex-end',bottom:error ? 17 : 0,right:0}}>
				<TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={()=>onPress()} style={{ paddingVertical:10}}>
					<Image resizeMode="contain" source={pathImage} style={styles.ic_image} />
				</TouchableOpacity>
			</View> : null
		}
		{
			error ?
				<Text style={{color:'rgb(213, 0, 0)',fontSize:12}}>{error}</Text> : null
		}
		{/*{*/}
		{/*	otp ? <TouchableOpacity onPress={()=>onPressOtp()} disabledOtp={disabledOtp} style={{justifyContent:'center',backgroundColor:'red'}}>*/}
		{/*		<Text style={{textDecorationLine:'underline',color:'#30bebc',position: 'absolute', right: 0, bottom: 17,}}>Nhận OTP</Text>*/}
		{/*	</TouchableOpacity>: null*/}
		{/*}*/}
	</View>
);

const styles = ScaledSheet.create({
	ic_image: {

		// right: 0,
		bottom: 0,
		width: 20,
		height: 20
	}
})

export default Input;
