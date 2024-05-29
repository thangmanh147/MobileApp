

import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { colorText, TxtColor, errValidColor, tintColorInput, nameApp, textDisable, Color } from '../../../config/System';
import { ScaledSheet } from 'react-native-size-matters';
import ShowPassSvg from '../../../config/images/login/ShowPassSvg'
import HidePassSvg from '../../../config/images/login/HidePassSvg'
import IconSuccessSvg from '../../../config/images/icons/IconSuccessSvg';
import TimeCount from '../components/TimeCount';

const Input = ({
	label,
	value,
	editable,
	textColor = TxtColor,
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
	showOTP = false,
	onPressOtp,
	disabledOtp,
	autoCapitalize,
	showTime = false,
	timer,
	showSuccess = false
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
			lineWidth={nameApp.includes('YCHI') ? 0 : 0.5}
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
			inputContainerStyle={{paddingRight: showOTP ? 60 : (pathImage ? 25 : 0)}}
		/>
		{
			nameApp.includes('YCHI') ? (
				<View style={{
					marginTop: -10,
					marginBottom: 10,
					height: 1,
					backgroundColor: textDisable,
				}} />
			) : null
		}
		{
			pathImage ? (
				<TouchableOpacity onPress={()=> onPress()} style={{paddingLeft: 12, paddingTop: 20, position: 'absolute',right:0, top: 17}}>
					{
						pathImage === 'hide_pass' ?
							<HidePassSvg width={16} height={16} /> :
							<ShowPassSvg width={16} height={16} />
					}
				</TouchableOpacity>
			) : null
		}
		{
			showSuccess ? (
				<View style={{paddingLeft: 12, paddingTop: 20, position: 'absolute',right:0, top: 17}}>
					<IconSuccessSvg width={15} height={15} />
				</View>
			) : null
		}
		{
			error ?
				<Text style={{color: errValidColor,fontSize:14}}>{error}</Text> : null
		}
		{
			showOTP ? (
				<TouchableOpacity onPress={()=>onPressOtp()} style={{position: 'absolute', right: 0, top: 36}}>
					<Text style={{color:Color, fontSize: 12}}>
						Nhận OTP
					</Text>
				</TouchableOpacity>
			) : null
		}
		{
			showTime ? (
				<View style={{position: 'absolute', right: 0, top: 36}}>
					<TimeCount timeCountDown={timer || 60} align />
				</View>
			) : null
		}
	</View>
);

const styles = ScaledSheet.create({
})

export default Input;
