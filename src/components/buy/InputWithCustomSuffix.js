import React, { Component } from 'react'
import {
    TouchableOpacity,
    Image,
    View,
    Text
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { TextField } from 'react-native-material-textfield'
import { subColor, tintColorInput } from '../../config/System';

const InputWithCustomSuffix = ({
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
}) => (
        <View style={{ justifyContent: 'center', marginVertical: -5 }} >
            <View style={{
                position: 'absolute',
                right: 0,
                bottom: 12,
                width: 40,
                height: 20
            }}>
                <Text style={{ textAlign: 'right', color: '#8D8C8D' }}>{suffix}</Text>
            </View>
            <TextField
                fontSize={14}
                label={label}
                textColor={textColor}
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
                baseColor={subColor}
            />
        </View>
    )
export default InputWithCustomSuffix;
