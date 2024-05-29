

import React from 'react';
import { Text, View, Image } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { tintColorInput, Color, colorText, textDisable, TxtColor, errValidColor, nameApp } from '../../../config/System';
import { ScaledSheet } from 'react-native-size-matters';
const Input = ({
	label,
	value,
	editable = true,
	textColor = TxtColor,
	textUnableColor,
    multiline = false,
	tintColor = tintColorInput,
	baseColor = colorText,
	keyboardType,
	onChangeText = '',
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
	placeholderTextColor = null,
	onBlur,
	error,
	textAlignStyle,
	hideLine,
	showTitle = null
}) => (
	<View style={{ justifyContent: 'center', width: width }}>
		{
			showTitle ? (
				<Text
					style={{marginRight: 4, fontSize: 14, color: '#B3B2B3', position: 'absolute', left: 0, top: 4}}
				>
					{showTitle}
				</Text>
			) : null
		}
		<TextField
			fontSize={14}
			autoCapitalize={autoUpperCase ? 'characters' : keyboardEmail ? 'none' : 'words'}
			label={label}
			textColor={editable ? textColor : (textUnableColor || textDisable)}
			tintColor={tintColor}
			baseColor={baseColor ? baseColor : (editable ? Color : textDisable)}
			value={value}
			maxLength={maxLength}
			lineWidth={nameApp.includes('YCHI') || hideLine ? 0 : 0.5}
			activeLineWidth={hideLine ? 0 : undefined}
			editable={editable}
			placeholder={placeholder}
			placeholderTextColor={placeholderTextColor}
			secureTextEntry={secureTextEntry}
			keyboardType={keyboardType ? keyboardType : 'default'}
			onFocus={onFocus}
			onChangeText={(text) => onChangeText(text)}
			style={[{
				padding: padding,
				width,
				flex: 1,
			}, textAlignStyle ? {textAlign: 'right'} : {}]}
			onBlur={onBlur}
			// error={error}
            multiline={multiline}
			inputContainerStyle={{paddingLeft: showTitle ? (showTitle === 'Từ' ? 20 : 30) : 0}}
			labelHeight={showTitle ? 0 : 32}
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
			error ?
				<Text style={[{color: errValidColor,fontSize:14}, hideLine && {marginTop: -12, marginBottom: 5}]}>{error}</Text> : null
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
	}
})

export default Input;
