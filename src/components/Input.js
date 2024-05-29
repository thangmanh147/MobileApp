

import React from 'react';
import { Text, View,Image } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import {tintColorInput} from '../config/System'
const Input = ({
	label,
	value,
	editable=true,
	textColor = '#323643',
	tintColor = tintColorInput,
	baseColor = '#323643',
	keyboardType = 'default',
	onChangeText = 'text',
	secureTextEntry = false,
	width,
	padding=0,
	autoUpperCase,
    disabled,
    showIconDown,
	flex,style,
				   fontSize,
				   labelFontSize,
				   inputContainerPadding
}) => (
    <View style={{flex:flex||1,justifyContent:'center'}}>
        <TextField
			fontSize={fontSize}
			inputContainerPadding={inputContainerPadding}
			labelFontSize={labelFontSize}
            autoCapitalize={autoUpperCase ? 'characters' : 'words' }
            label={label}
            textColor= {textColor}
            tintColor= {tintColor}
            baseColor= {baseColor}
            value={value}
            disabled={disabled}
            lineWidth={0.5}
            editable={editable}
            secureTextEntry = {secureTextEntry}
            keyboardType = {keyboardType}
            onChangeText={ (text) => onChangeText(text) }
            style={{
                padding: padding,
                width,...style
            }}
        />
        {
            showIconDown ?  <View style={{position:'absolute',alignSelf:'flex-end',paddingTop:30}}>
                <Image source={require('../icons/iconAgent/ic_down_trinity.png')} style={{height:10,width:10}}/>
            </View> : null
        }
    </View>
);

export default Input;
