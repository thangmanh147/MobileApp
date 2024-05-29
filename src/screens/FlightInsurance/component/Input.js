import React, { Component } from 'react'
import {
    TouchableOpacity,
    Image,
    View
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { TextField } from 'react-native-material-textfield'
import {Color, tintColorInput} from '../../../config/System';

const Input = ({
    openModal,
    label,
    value,
    keyboardType,
    placeholder,
    textColor='#323643',
    tintColor=tintColorInput,
    onChangeText,
    maxLength,
    autoCapitalize,
    editable,
    placeholderTextColor,
    baseColor,
    onFocus,
    onBlur,
    errorValidate
}) => (
        <View style={{ flex: 1, justifyContent: 'space-between', paddingHorizontal: 15 }} onPress={openModal}>
            <TextField
                fontSize={14}
                label={label}
                textColor={errorValidate ? '#F97C7C' : baseColor}
                tintColor={tintColor}
                value={value}
                style={{
                    padding: 0,
                    paddingRight: 10,
                }}
                keyboardType={keyboardType}
                onChangeText={(text) => onChangeText(text)}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                maxLength={maxLength}
                autoCapitalize={autoCapitalize}
                editable={editable}
                baseColor={Color}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </View>
    )
export default Input;
