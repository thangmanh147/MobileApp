import React, { Component } from 'react'
import {
    TouchableOpacity,
    Image,
    View,
    Text
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { TextField } from 'react-native-material-textfield'
import { Color, subColor, tintColorInput } from '../../config/System';

const InputForm = ({
    label,
    value,
    keyboardType,
    placeholder,
    textColor = '#323643',
    tintColor = tintColorInput,
    onChangeText,
    maxLength,
    autoCapitalize,
    editable,
    suffix,
    placeholderTextColor,
    onBlur,
    onFocus,
    errorValidate,
    error
}) => (
    <View style={{
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: editable ? '#FFFFFF' : '#ACE5E4',
        height: 45,
        width: '90%',
        justifyContent: 'center',
        borderRadius: 8,
        marginTop: 23,
        paddingVertical: 0,
        alignSelf: 'center'
    }} >
        <View style={{
            position: 'absolute',
            right: 15,
            bottom: errorValidate ? 28 : 10,
            width: 40,
            height: 20
        }}>
            <Text style={{ textAlign: 'right', color: '#414042' }}>{suffix}</Text>
        </View>
        <TextField
            fontSize={14}
            label={label}
            textColor={textColor}
            tintColor={tintColor}
            value={value}
            //paddingRight: 10,
            baseColor={editable ? subColor : Color}
            keyboardType={keyboardType}
            onChangeText={(text) => onChangeText(text)}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
            editable={editable}
            onBlur={onBlur}
            onFocus={onFocus}
            activeLineWidth={0}
            lineWidth={0}
            error={error}
        />
    </View>
)
export default InputForm;
