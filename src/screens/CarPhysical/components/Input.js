

import React from 'react';
import { Text, View, Image } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { colorText, TxtColor, tintColorInput, nameApp, textDisable } from '../../../config/System';
import { ScaledSheet } from 'react-native-size-matters';
const Input = ({
	label,
	value,
	editable,
	textColor = TxtColor,
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
    showError,
    showSoChoNgoi,
	errors,
    showValidMoney,
    formatText,
    disableColor=null,
	currency,
	autoCapitalize,
	loadCapacity
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
            formatText={formatText}

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
                backgroundColor:disableColor
			}}
			onBlur={onBlur}
			// error={error}
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
                <Text style={{color:'rgb(213, 0, 0)',fontSize:14}}>{error}</Text> : null
        }
		{
			pathImage ?
				<Image resizeMode="contain" source={pathImage} style={styles.ic_image} /> : null
		}
		{
			currency ?
				<Text style={[styles.textStyle, { top: 36 }]} >VNĐ</Text> : null
		}
		{
			loadCapacity ?
				<Text style={[styles.textStyle, { top: 36 }]} >tấn</Text> : null
		}
        {
            showError ?
            <Text style={{color:'rgb(213, 0, 0)',fontSize:14}}>Định dạng không hợp lệ, Số tiền bảo hiểm phải là bội của 1.000</Text> : null
        }
        {
            showValidMoney ?
                <Text style={{color:'rgb(213, 0, 0)',fontSize:14}}>Số tiền bảo hiểm không nhỏ hơn 10,000,000VNĐ</Text> : null
        }
        {
            showSoChoNgoi ?
                <Text style={{color:'rgb(213, 0, 0)',fontSize:14}}>Số chỗ ngồi không được quá 60</Text> : null
        }
		{/*{*/}
		{/*	errors ? <Text style={{color:'rgb(213, 0, 0)'}} numberOfLines={2}>{errors}</Text> : null*/}
		{/*}*/}
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
		// bottom: 17,
		// width: '14@s',
		// height: '14@vs',
	}
})

export default Input;
