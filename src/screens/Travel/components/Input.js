

import React from 'react';
import { Text, View, Image } from 'react-native';
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
	secureTextEntry,
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
	placeholderTextColor = null,
	onBlur,
	error,
	touched,
	disableColor,
	autoCapitalize,
	capitalize,
	currency,
	topCurrency = false,
	marginTop = 0,
}) => (
	<View style={{ justifyContent: 'center', width: width, marginTop: marginTop }}>
		<TextField
			fontSize={14}
			autoCapitalize={autoCapitalize}
			label={label}
			textColor={textColor}
			tintColor={tintColor}
			baseColor={baseColor}
			value={capitalize ? value?.toUpperCase() : value}
			maxLength={maxLength}
			lineWidth={0}
			editable={editable}
			placeholder={placeholder}
			placeholderTextColor={placeholderTextColor}
			secureTextEntry={secureTextEntry}
			keyboardType={keyboardType ? keyboardType : 'default'}
			onFocus={onFocus}
			onChangeText={(text) => onChangeText(text)}
			style={{
				padding: padding,
				width,
				flex: 1,
				backgroundColor: disableColor
			}}
			onBlur={onBlur}
			// error={error}
			multiLine={false}

		/>
		{
			error ?
				<Text style={{ color: 'rgb(213, 0, 0)', fontSize: 12 }}>{error}</Text> : null
		}
		{
			currency ?
				<Text style={[styles.textStyle, { bottom: error ? (topCurrency ? 87 : 28) : 14 }]} >đ</Text> : null
		}
		{
			pathImage ?
				<Image resizeMode="contain" source={pathImage} style={styles.ic_image} /> : null
		}
	</View>
);

const styles = ScaledSheet.create({
	ic_image: {
		position: 'absolute',
		right: 0,
		bottom: 17,
		width: '14@s',
		height: '14@vs'
	},
	textStyle: {
		position: 'absolute',
		right: 0,
	}
})

export default Input;
