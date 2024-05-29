

import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import {tintColorInput} from '../../config/System';
import { ScaledSheet } from 'react-native-size-matters';
const Input = ({
	label,
	value,
	editable,
	textColor = '#323643',
	tintColor = tintColorInput,
	baseColor = '#CBCBCB',
	keyboardType,
	onChangeText = 'text',
	secureTextEntry = false,
	width,
	padding=0,
	autoTextUpper,
	isPasscode,
	onPress,
	noIconWrite,
	margin,
	marginLeft,
	marginRight,
	erroCodeValidate,
	checkFocus,
	autoFocus,
    onBlur,
    placeholder,
                   isAcreage
}) => (
<View style={{justifyContent: 'center', width: width, marginLeft: marginLeft,
		marginRight: marginRight,flex:1}}>
	<TextField
		editable={editable ? false : true}
		autoFocus={checkFocus ? checkFocus : false}
		// onFocus={checkFocus ? autoFocus : null}
		onFocus={autoFocus ? autoFocus : null}
		autoCapitalize={autoTextUpper ? 'characters' : 'none' }
		label={label}
        placeholder={placeholder}
		textColor= {textColor}
		tintColor= {tintColor}
		baseColor= {value ? '#7c7c7c' : erroCodeValidate ? '#F97C7C' : baseColor}
		value={value}
		lineWidth={erroCodeValidate ? 2 : 0.5}
		// disabledLineType={'solid'}
		// disabledLineWidth={0.5}
		secureTextEntry = {secureTextEntry}
		keyboardType = {keyboardType}
        onBlur = {onBlur}

    onChangeText={ (text) => onChangeText(text) }
		style={{
		padding: padding,
		marginLeft: marginLeft,
		marginRight: marginRight,
		width,
		}}
	/>
	{isPasscode ? secureTextEntry ? (
		<TouchableOpacity onPress={() => onPress()}>
			<Image resizeMode="contain" source={require('../../icons/collaborator/ic_showPasscode.png')} style={styles.ic_image} />
		</TouchableOpacity>
	) :  (
		<TouchableOpacity onPress={() => onPress()}>
			<Image resizeMode="contain" source={require('../../icons/collaborator/ic_showPasscode.png')} style={styles.ic_image} />
		</TouchableOpacity>
		)
	: noIconWrite ? null : (
	<Image resizeMode="contain" source={require('../../icons/collaborator/ic_write.png')} style={styles.ic_image} />)}
    {isAcreage ?
        (<View style={{position: 'absolute',
            right: 0,
            bottom: 17}}><Text style={{flex:1,color:'#999999'}}>{isAcreage}</Text></View>) : null
    }
</View>
);
const styles = ScaledSheet.create({
	ic_image: {
		position: 'absolute',
		right: 0,
		bottom: 17,
		width: 	'14@s',
		height: '14@vs'
	}
})

export default Input;
