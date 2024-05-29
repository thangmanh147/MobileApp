

import React from 'react';
import { Text, View, Image } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { tintColorInput } from '../../../config/System';
import { ScaledSheet } from 'react-native-size-matters';
const InputBill = ({
    label,
    value,
    editable = true,
    textColor = '#323643',
    tintColor = tintColorInput,
    baseColor = '#CBCBCB',
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
    errorValidate,
    onBlur
}) => (
        <View style={{ justifyContent: 'center', width: width }}>
            <TextField
                fontSize={15}
                autoCapitalize={autoUpperCase ? 'characters' : keyboardEmail ? 'none' : 'words'}
                label={label}
                textColor={textColor}
                tintColor={tintColor}
                baseColor={errorValidate ? '#F97C7C' : baseColor}
                value={value}
                maxLength={maxLength}
                lineWidth={erroCodeValidate ? 2 : 0.5}
                editable={editable}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType ? keyboardType : 'default'}
                onFocus={() => onFocus ? onFocus() : null}
                onChangeText={(text) => onChangeText(text)}
                style={{
                    padding: padding,
                    width,
                    flex: 1,
                }}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {
                pathImage ?
                    <Image resizeMode="contain" source={pathImage} style={styles.ic_image} /> : null
            }

            <Text style={{ color: 'red', position: 'absolute', right: 0, bottom: 17, fontSize: 12 }}>{errorCode ? errorText : ''}</Text>
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

export default InputBill;
